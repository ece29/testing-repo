const express =require("express");
console.log("Starting server...");
const {port}=require("./src/config/serverconfig.js");
const setupandstartserver =async()=>{
    const app=express();
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`)
        // console.log(process.env);
    });
}
setupandstartserver();

