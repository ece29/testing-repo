// db.js
const sql = require('mssql'); // plain mssql, koi msnodesqlv8 nahi
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,         // naya add kiya
  password: process.env.DB_PASSWORD, // naya add kiya
  Port:process.env.DB_PORT,          // naya add kiya
  options: {
    encrypt: true,
    trustServerCertificate: true,
    // trustedConnection: true,      // yeh line REMOVE kar do - ab Windows Auth nahi use kar rahe
  },
  
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server successfully!');
    return pool;
  })
  .catch(err => {
    console.error('Database Connection Failed! Bad Config: ', err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise
};