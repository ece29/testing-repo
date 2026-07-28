const express =require('express');
const router = express.Router();

const cityController = require('../../Controllers/city-controllers');
const CityController = require('../../Controllers/city-controllers');
console.log('prince');
const Cityvalue=new cityController();
router.post('/city', Cityvalue.create);
router.delete('/city/:id', Cityvalue.deleteCity);
router.put('/city/:id', Cityvalue.updateCity);
router.get('/city/', Cityvalue.getCity);

// router.post('/getcity/re', Cityvalue.getCityByName);
router.post('/getallcity',Cityvalue.getallcity)

module.exports = router;