const Text = require("./Text");
const SendWhatsapp = require("./SendWhatsapp");
const { APIKEY_GUPSHUP } = require("./../config")

/**
 * Diccionario de los tipos de eventos posibles en gupshup.
 * @enum
 * 
 */
const TYPE_EVENT = {
    USER_EVENT: "user-event",
    MESSAGE_EVENT: "message-event",
    MESSAGE: "message"
}

/**
 * Diccionario de los tipos de mensajes posibles en gupshup.
 * @enum
 * 
 */
const TYPE_MESSAGE = {
    TYPE_TEXT: "text",
    TYPE_IMAGE: "image",
    TYPE_FILE: "file",
    TYPE_AUDIO: "audio",
    TYPE_VIDEO: "video",
    TYPE_CONTACT: "contact",
    TYPE_LOCATION: "location"
}

/**
 * Objeto que permite manejar el flujo de un bot con Whatsapp GupShup
 * @class
 */
class WS_GUBSHUP {

    

    /**
     * Llenar datos de REQUEST para ser manejados
     * @constructor
     * @param {Object} req - Datos de REQUEST de la solicitudes HTTP
     */
    constructor(req) {
        this.version = req["version"]
        
        if(this.version == 1){
            throw Error("Actualmente no tenemos soporte para las version 01 de GupShup")
        }
        else{
            this.app_name = req["app"]
            this.timestamp = req["timestamp"]
            this.type_event = req["type"]
            this.payload = req["payload"]
            // if(this.isMessageEvent()){
            //     this.id_message_gupshup = req["context"]["gsid"]
            //     this.id_message_whatsapp = req["context"]["id"]
            // }
        }

        this.responses = []
    }

    /**
     * Obtener la versión del API Gupshup
     * @function
     * @returns {Number} Retorna el número de versión. 
     */
    getVersion(){
        return this.version;
    }

    /**
     * Obtener el timestamp de cuando se lanzo el evento
     * @function
     * @returns {Number} Fecha en formato de timestamp
     */
    getTimestamp(){
        return this.timestamp;
    }

    /**
     * Obtener el nombre de la app al cual se le envio el evento.
     * @function
     * @returns {String} Nombre de la aplicación.
     */
    getAppName(){
        return this.app_name;
    }


    /**
     * Obtener la fecha y hora del evneto en formato de Date
     * @function
     * @returns {Date} Fecha y hora del evento.
     */
    getDateTime(){
        return new Date(this.timestamp)
    }

    /**
     * Validar si es un mensaje entrante enviado por un usuario
     * @function
     * @returns {Boolean} True si es un mensaje entrante y false si no
     */
    isMessage(){
        return TYPE_EVENT.MESSAGE == this.type_event
    }

    /**
     * Validar si es un evento de seguimiento de un mensaje enviado por el API BUSSINESS
     * @function
     * @returns {Boolean} True si es un evento de mensaje enviado por el API BUSSINESS y false si no
     */
    isUserEvent(){
        return TYPE_EVENT.USER_EVENT == this.type_event
    }

    /**
     * Validar si es un evento de usuario (Configuración de Webhook, Configuración proxy, etc)
     * @function
     * @returns {Boolean} True si es un evento de usuario y false si no
     */
    isMessageEvent(){
        return TYPE_EVENT.MESSAGE_EVENT == this.type_event
    }

    isTextTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_TEXT){
                return true;
            }
        }
        return false;
    }

    isImageTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_IMAGE){
                return true;
            }
        }
        return false;
    }

    isAudioTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_AUDIO){
                return true;
            }
        }
        return false;
    }

    isContactTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_CONTACT){
                return true;
            }
        }
        return false;
    }

    isFileTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_FILE){
                return true;
            }
        }
        return false;
    }

    isLocationTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_LOCATION){
                return true;
            }
        }
        return false;
    }

    isVideoTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_VIDEO){
                return true;
            }
        }
        return false;
    }

    isEventTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_EVENT){
                return true;
            }
        }
        return false;
    }

    getMessage(){
        if(this.isTextTypeMessage()){
            return this.payload.payload.text;
        }
        return null;
    }

    getUserName(){
        if(this.isMessage()){
            return this.payload.sender.name;
        }
        return null;
    }

    getUserPhone(){
        if(this.isMessage()){
            return this.payload.sender.dial_code;
        }
        return null;
    }

    getUserFullPhone(){
        if(this.isMessage()){
            return this.payload.sender.country_code + this.payload.sender.dial_code;
        }
        return null;
    }

    getUserContryCode(){
        if(this.isMessage()){
            return this.payload.sender.country_code;
        }
        return null;
    }


    /**
     * Agregar un elemento de Respuesta
     * @function
     * @param {Object} response - Un objeto de respuesta (Text)
     */
    addResponse(response){
        response.setPhone(this.getUserFullPhone())
        this.responses.push(response)
    }

    /**
     * Remplazar los elementos de Respuesta
     * @function
     * @param {Array|Object} responses - Un Array de objetos de respuesta (Quick Replies, Text, Typing, Image)
     */
    setResponses(responses){
        const _this = this;
        responses = responses.map(function(response){
            response.setPhone(_this.getUserFullPhone())
            return response
        })
        this.responses = responses
    }

    /**
     * Funcion para enviar todas las respuestas agregadas
     * @function
     * @returns {Promise} Promesa que devolvera el resultado de los mensajes enviados
     */
    sendResponse(){
        let sendWhatsapp = new SendWhatsapp(this.responses, APIKEY_GUPSHUP)
        return sendWhatsapp.send()
    }

}



module.exports  = {
    WS_GUBSHUP,
    Text
}