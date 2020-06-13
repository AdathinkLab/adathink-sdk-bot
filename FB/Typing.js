var SendFacebook=require('./SendFacebook')

/**
 * @typedef {Object} RecipientFacebook
 * @property {String} id - ID Usuario
 */

 /**
 * @typedef {Object} MessageTextFacebook
 * @property {String} text - Texto del mensaje
 */

/**"sender_action":"typing_on"
 * @typedef {Object} StructMessageTipingFacebook
 * @property {RecipientFacebook} recipient - Recipiente al cual se le enviara el mensaje
 * @property {String} sender_action - Tipo de acción 
 */

/**
 * Crear un objeto escribiendo
 * @class
 */
class Typing {

	/**
     * @constructor
     * @param {String} id_user - ID del usuario
     */
	constructor(id_user=null){
		this.id_user = id_user
	}

	/**
     * Remplazar el ID del usuario del mensaje "Escribiendo"
     * @function
     * @param {String} id_user - ID del usuario
     */
    setIdUser(id_user){
        this.id_user = id_user
	}
	
	/**
     * Obtener el ID del usuario del mensaje "Escribiendo"
     * @function
     * @returns {String} ID del usuario
     */
    getIdUser(){
        return this.id_user
	}
	
	/**
     * Obtener la estructura JSON que require FACEBOOK
     * @function
     * @returns {StructMessageTipingFacebook} Objeto que require FACEBOOK para enviar "Escribiendo" al usuario
     */
    getStruct(){
        return {
			"recipient":{
				"id":this.id_user
			},
			"sender_action":"typing_on"
		}
    }

	/**
	 * @ignore
	 */
	static enviar(usuario,configFB){

		var es={
		"recipient":{"id":usuario},
		"sender_action":"typing_on"

		}
		SendFacebook.enviar(es,configFB.token)
	}

}


module.exports= Typing;