
var SendFacebook=require('./SendFacebook');

class Button {


static enviar(usuario,configFB,data){
var template={
  "recipient":{
    "id":usuario
  },
  "message":{
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":data.text,
        "buttons":data.button
        
      }
    }
  }

}
// if(i==dato.rows.length-1){
  // console.log(template)
SendFacebook.enviar(template,configFB.token);
// }


}



}

module.exports=Button;