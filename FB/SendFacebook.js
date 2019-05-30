var request=require('request');

class SendFacebook{
   static enviar(mensaje,token){
 // console.log("SendFacebbok pe",configFB);
request({
	url:  "https://graph.facebook.com/v2.6/me/messages?access_token=" + token ,
      json : true,
      body : mensaje,
	  timeout : 60000,
	  method: 'POST',
	  headers: {
	       "Content-Type": "application/json"
	            }
},function(err,response,body){
	if(err){
		console.log(err);
		return;
	}
	console.log(body);
	console.log("mensaje enviado");
});



}
}

module.exports=SendFacebook;
