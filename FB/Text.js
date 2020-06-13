const SendFacebook = require('./SendFacebook');


/**
 * @typedef {Object} RecipientFacebook
 * @property {String} id - ID Usuario
 */

 /**
 * @typedef {Object} MessageTextFacebook
 * @property {String} text - Texto del mensaje
 */

/**
 * @typedef {Object} StructMessageTextSimpleFacebook
 * @property {RecipientFacebook} recipient - Recipiente al cual se le enviara el mensaje
 * @property {MessageTextFacebook} message - Objeto de mensaje que se enviara al usuario
 */


/**
 * Crear un mensaje de texto simple
 * @class 
 */
class Text {


    /**
     * @constructor
     * @param {String} id_user - ID del usuario
     * @param {String} message - Mensaje para enviar al usuario
     */
    constructor(message, id_user=null){
        this.id_user = id_user
        this.message = message
    }
    
    /**
     * Remplazar el texto del mensaje de texto simple
     * @function
     * @param {String} message - Mensaje para enviar al usuario
     */
    setMessage(message){
        this.message = message
    }

    /**
     * Remplazar el ID del usuario del mensaje de texto simple
     * @function
     * @param {String} id_user - ID del usuario
     */
    setIdUser(id_user){
        this.id_user = id_user
    }
    
    /**
     * Obtener el texto del mensaje de texto simple
     * @function
     * @returns {String} Mensaje para enviar al usuario
     */
    getMessage(){
        return this.message
    }

    /**
     * Obtener el ID del usuario del mensaje de texto simple
     * @function
     * @returns {String} ID del usuario
     */
    getIdUser(){
        return this.id_user
    }

    /**
     * Obtener la estructura JSON que require FACEBOOK
     * @function
     * @returns {StructMessageTextSimpleFacebook} Objeto que require FACEBOOK para enviar mensaje al usuario
     */
    getStruct(){
        return {
            "recipient": {
                "id": this.id_user
            },
            "message": {
                "text": this.message
            }
        }
    }
    
    /**
     * @ignore
     */
    static enviar(id_recipient, message, configDB) {
        // console.log(usuario + " "  + mensaje)
        var _mensaje = {
            "recipient": {
                "id": usuario
            },
            "message": {
                text: message
            }
        }
        SendFacebook.enviar(_mensaje,configDB.token);
    }
}

module.exports = Text;