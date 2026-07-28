const {City}=require('../models/index')
const {op}=import('sequelize')

class CityRepository{
    async createCity({name}){
        try{   
            const city=await City.create({name:name});
            return city;
        } catch(error){
            console.log("something went wrong in repository layer");
            throw {error};
        }
    }



async deleteCity(cityId){
    try{
        await City.destroy({
            where: {
                id: cityId
            }
        });
    } catch(error){
        console.log("something went wrong in repository layer");
        throw {error};
    }
}


async updateCity(cityId,data){
    try{
        const city=await City.findByPk(cityId);
        if(!city){
            throw new Error("City not found");
        }
        city.name=data.name;a
        await city.save()
        return city;
    } catch(error){
        console.log("something went wrong in repository layer");
        throw {error};
    }
}

async getCity(cityId){
    try{
        const city=await City.findByPk(cityId);
        return city;
    } catch(error){
        console.log("something went wrong in repository layer");
        throw {error};
    }

}


async getCityByName(filter){
    try{
        if(!filter.name){
            throw new Error("City name is required");   
        }
        const city=await City.findOne({
            where: {
                name: filter.name
            }
        });
        return city;
    } catch(error){
        console.log("something went wrong in repository layer");
        throw {error};
    }
}

async getAllCities(filter){
   try{
    if(filter.name){
        const cities=await City.findAll({
where:{ 
    name:{
        [op.startswith]:filter.name
   }
}
    });
return cities;
    }

    const cities=await City.findAll();
    return cities
}
    catch(error){
        console.log("something went wrong");
        throw{error};

    }
   }



}
module.exports=CityRepository;