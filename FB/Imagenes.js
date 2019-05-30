

var SendFacebook=require('./SendFacebook');
class Imagenes {


static enviar(usuario,mensaje,configFB){
	console.log(usuario + " "  + mensaje)
var _mensaje={
	"recipient":{
    "id":usuario
   },
   "message":{
    "attachment":{
      "type":"image", 
      "payload":{
        "is_reusable": true,
        "url":mensaje
      }
    }
  }
}
console.log(_mensaje);
SendFacebook.enviar(_mensaje,configFB.token);



}



}

module.exports=Imagenes;