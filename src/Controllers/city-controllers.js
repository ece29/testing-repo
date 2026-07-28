const cityservice=require("../services/city-services")


// inside the controller file in class we cant create or put he function in a varable we have to put the function inside the class and we can use the arrow function to avoid the this keyword problem


class CityController{
    constructor(){
        this.cityservice=new cityservice();
    }


        create=async (req,res)=>{
        try{
            const city=await this.cityservice.createCity(req.body);
            return res.status(201).json({
                data:city,
                success:true,   
            })
        } catch(error){
            console.log("something went wrong in controller layer");
            return res.status(500).json({   
                success:false,
                error:error.message
            })
        }   
    }


       deleteCity=async (req,res)=>{
        try{
            const response=await this.cityservice.deleteCity(req.params.id);
            return res.status(200).json({
                data:response,
                success:true,
                message:"Successfully deleted the city"
            })
        }
    catch(error){
        console.log("something went wrong in controller layer");
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }   
}   


 updateCity=async (req,res)=>{
    try{
        const response=await this.cityservice.updateCity(req.params.id,req.body);           
        return res.status(200).json({
            data:response,
            success:true,
            message:"Successfully updated the city"
        })
    }
    catch(error){
        console.log("something went wrong in controller layer");
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}
 getCity=async (req,res)=>{
    try{
        const response=await this.cityservice.getCity(req.params.id);
        return res.status(200).json({
            data:response,
            success:true
        })
    } catch(error){
        console.log("something went wrong in controller layer");
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}   
getCityByName=async (req,res)=>{
    console.log("server started of getcitybyname");
    try{
        const response=await this.cityservice.getCityByName(req.query.name);
        return res.status(200).json({
            data:response,
            success:true
        })
    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }
}  
getallcity=async(req,res)=>{
    try{
        const cities=await this.cityservice.getAllCities(req.query);
        return res.status(200).json({
            data:cities,
            success:true,
            message:'data uccessfully fetched ',
            err:{}
        });
    }
catch(error){
    return res.status(500).json({
data:{},
success:false,
message:'not able to fetch the cities',
err:error
    });
}
}


}
module.exports=CityController;