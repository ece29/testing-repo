// node_modules/// node_modules/



const express=require('express');
const boduyParser=require('body-parser');
const{port}=require('./config/serverConfig');



const cityrepository=require('../repositories/city-repository');


const setupserver=async()=>{
    const app=express();
    app.use(boduyParser.json());
    app.use(boduyParser.urlencoded({extended:true}));
    const repo=new cityrepository();
    deleteCity=async()=>{
        try{
            await repo.deleteCity(1);
        } catch(error){
            console.log("something went wrong in utility layer");
            throw {error};
        }
    }
    app.listen(port,()=>{
  console.log(`server started on port ${port}`);    
    }); 
}