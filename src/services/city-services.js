const cityRepository = require("../repositories/city-repository.js");

class CityService {
    constructor() {
        this.cityRepository = new cityRepository();
    }

    async createCity(data) {

        try{
        
        
        return await this.cityRepository.createCity(data);
        }
        catch(error){
            console.log("something went wrong in service layer");
            throw {error};
        }
    }

    async deleteCity(cityId) {
        try {
            return await this.cityRepository.deleteCity(cityId);
        } catch (error) {
            console.log("something went wrong in service layer");
            throw {error};
        }
    }

    async updateCity(cityId, data) {
        try {
            return await this.cityRepository.updateCity(cityId, data);
        } catch (error) {
            console.log("something went wrong in service layer");
            throw {error};
        }
    }

    async getCity(cityId) {
        try {
            return await this.cityRepository.getCity(cityId);
        } catch (error) {
            console.log("something went wrong in service layer");
            throw {error};
        }
    }

    async getCityByName(cityName) {
        try {
            return await this.cityRepository.getCityByName(cityName);
        } catch (error) {
            console.log("something went wrong in service layer");
            throw {error};
        }   
}


async getAllCities(filter){
    try{
        const cities=await this.cityRepository.getAllCities({name:filter.name});
        return cities;

    }
    catch(error){
        console.log("changes in the city")
        throw(error);
    }
}

}
module.exports = CityService;