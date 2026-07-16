'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

let configFromFile = {};
const configPath = path.join(__dirname, '..', 'config', 'config.json');
if (fs.existsSync(configPath)) {
  try {
    const fullConfig = require(configPath);
    configFromFile = fullConfig[env] || {};
  } catch (error) {
    console.warn('Warning: could not load config.json, falling back to env vars.');
  }
}

const dbServer =
  process.env.DB_HOST || process.env.DB_SERVER || configFromFile.host || '127.0.0.1';
const sequelizeConfig = {
  host: dbServer,
  dialect: process.env.DB_DIALECT || configFromFile.dialect || 'mssql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 30000
  }
};

const dbPort = process.env.DB_PORT || configFromFile.port;
if (dbPort) {
  sequelizeConfig.port = parseInt(dbPort, 10);
}

let instanceName;
if (dbServer && dbServer.includes('\\')) {
  const [server, instance] = dbServer.split('\\');
  sequelizeConfig.host = server;
  instanceName = instance;
}

if (sequelizeConfig.dialect === 'mssql') {
  sequelizeConfig.dialectOptions = {
    options: {
      encrypt:
        process.env.DB_ENCRYPT !== undefined
          ? process.env.DB_ENCRYPT === 'true'
          : configFromFile.encrypt !== undefined
          ? configFromFile.encrypt
          : true,
      trustServerCertificate:
        process.env.DB_TRUST_SERVER_CERTIFICATE !== undefined
          ? process.env.DB_TRUST_SERVER_CERTIFICATE === 'true'
          : configFromFile.trustServerCertificate !== undefined
          ? configFromFile.trustServerCertificate
          : true,
      ...(instanceName ? { instanceName } : {})
    }
  };
}

const effectiveDatabase = process.env.DB_NAME || configFromFile.database || 'database_development';
const effectiveUser = process.env.DB_USER || configFromFile.username || 'root';
const effectivePassword = process.env.DB_PASSWORD || configFromFile.password || null;

console.log('Sequelize connection details:');
console.log('  dialect:', sequelizeConfig.dialect);
console.log('  host:', sequelizeConfig.host);
console.log('  port:', sequelizeConfig.port);
if (instanceName) console.log('  instanceName:', instanceName);
console.log('  database:', effectiveDatabase);
console.log('  username:', effectiveUser);

const sequelize = process.env.DB_URL
  ? new Sequelize(process.env.DB_URL, sequelizeConfig)
  : new Sequelize(
      effectiveDatabase,
      effectiveUser,
      effectivePassword,
      sequelizeConfig
    );

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
