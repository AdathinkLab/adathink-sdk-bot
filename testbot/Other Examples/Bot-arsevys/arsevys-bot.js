var express = require("express");
var {FB,Text,Typing ,Image,QuickReplies,
    QuickRepliesOption , DownloadFile} = require("adathink-sdk-bot")



  

//IMPORTANTE!!!!

FB.config({
    TOKEN_FACEBOOK:"Xg3AU",
    KEY_FACEBOOK: "Adathink Code" 
})
//Enlaze entre tu servidor y facebook
app.get("/",FB.checkWebhook)


app.post("/", async function(req,res){
    
    
})


app.listen(3150 , function(){
    console.log("Mi servidor esta ejecutando")
})