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
    
        //Descarga las foto perfil 

    //  let download =  await DownloadFile.syncDownload(user.profile_pic,{ruta:"./files/perfil.jpg"})
    // console.log(download)


     //Descargar una imagen 
     //Si el usuario envia una foto con este metodo , trae la url
    //  console.log("Imagenes",FBTools.getImage())


    // Valida si el usuario envio una foto, si  tieene foto , lo descargar

    //  if(FBTools.hasImage()){
    //  let download =  await DownloadFile.syncDownload(FBTools.getImage(),{ruta:"./files",defaultName:true})
    //     console.log(download)
    //  }
        //Mensajes Agrupados
        FBTools.addResponse(new Typing())
        FBTools.addResponse(new Text("Hola que tal"))
        FBTools.addResponse(new Image("https://miro.medium.com/max/554/1*42aKSdKAWZ3VtqT5ICd82w.png"))
        FBTools.addResponse(new Text("este es una imagen"))
    
        let quick = new QuickReplies("estas opciones ")
        let option_email = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_EMAIL);
        let option_text = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_TEXT,"X","1");
    
        quick.addOption(option_email);
        quick.addOption(option_text);
    
        FBTools.addResponse(quick);
    
        let result  = await FBTools.sendResponse()
        console.log(result)
})


app.listen(3150 , function(){
    console.log("Mi servidor esta ejecutando")
})