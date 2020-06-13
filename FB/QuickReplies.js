const SendFacebook = require('./SendFacebook')
const QuickRepliesOption = require('./QuickRepliesOption') 

/**
 * @typedef {Object} RecipientFacebook
 * @property {String} id - ID Usuario
 */

 /**
 * @typedef {Object} MessageQuickRepliestFacebook
 * @property {String} text - Texto del mensaje
 * @property {Array|QuickRepliesOption} quick_replies - Opciones que se mostraran en el quick
 */

/**
 * @typedef {Object} StructMessageQuickRepliesFacebook
 * @property {RecipientFacebook} recipient - Recipiente al cual se le enviara el mensaje
 * @property {MessageQuickRepliesFacebook} message - Objeto de mensaje que se enviara al usuario
 */


/**
 * Crear una Respuesta Rapida
 * @class
 */
class QuickReplies {

    
    

    /**
     * @constructor
     * @param {String} id_user - ID del usuario
     * @param {String} message - Mensaje para enviar al usuario
     */
    constructor(message, id_user=null){
        this.id_user = id_user
        this.message = message
        this.options = []

        /**
         * @constant
         * @member {Number}
         */
        this.MAX_BUTTONS = 13
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
     * @returns {StructMessageQuickRepliesFacebook} Objeto que require FACEBOOK para enviar mensaje de Quick Replies al usuario
     */
    getStruct(){
        let list = this.options.map(function(quickRepliesOption){
            if(quickRepliesOption.isTextOption())
                return quickRepliesOption.getStructTextOption()
            else
                return quickRepliesOption.getStruct()
        })
        return {
            "recipient": {
                "id": this.id_user
            },
            "message": {
                "text": this.message,
                "quick_replies": list
            }
        }
    }

    /**
     * Agregar una nueva opción al Quick Replies
     * @function
     * @param {QuickRepliesOption} option - Objecto QuickRepliesOption para agregar la lista
     */
    addOption(option){
        this.options.push(option)
    }

    /**
     * Agregar una nueva opción al Quick Replies
     * @function
     * @param {Array|QuickRepliesOption} list_option - Array de Objectos QuickRepliesOption para resplazar la lista
     */ 
    setOption(list_option){
        this.options = list_option
    }

    /**
     * @ignore
     */
    static enviar(usuario, configFB,mensaje) {
        var msj = {
            "recipient": {
                "id": usuario
            },
            "message": {
                "text": "",
                "quick_replies": []
            }
        };
        msj.message.text = mensaje.title;
        for (var i = 0; mensaje.replies.length > i; i++) {
            var rp = {
                "content_type": "text",
                "title": "",
                "payload": ""
            };
            rp.title = mensaje.replies[i].title;
            rp.payload = mensaje.replies[i].payload;
            msj.message.quick_replies.push(rp);
        }

        console.log(JSON.stringify(msj));
        SendFacebook.enviar(msj,configFB.token);
    }
}
module.exports = QuickReplies;