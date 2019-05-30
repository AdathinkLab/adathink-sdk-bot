var SendFacebook=require('./SendFacebook');

class Escribiendo {

static enviar(usuario,configFB){

	var es={
       "recipient":{"id":usuario},
       "sender_action":"typing_on"

	}
	SendFacebook.enviar(es,configFB.token)
}

}


module.exports=Escribiendo;