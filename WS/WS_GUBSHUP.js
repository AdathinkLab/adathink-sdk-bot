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

    /**
     * Validar si es un mensaje de tipo de texto
     * @function
     * @returns {Boolean} True si es un mensaje de texto y false si no
     */
    isTextTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_TEXT){
                return true;
            }
        }
        return false;
    }

    /**
     * Validar si es un mensaje de tipo de imagen
     * @function
     * @returns {Boolean} True si es un mensaje de imagen y false si no
     */
    isImageTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_IMAGE){
                return true;
            }
        }
        return false;
    }

    /**
     * Validar si es un mensaje de tipo de audio
     * @function
     * @returns {Boolean} True si es un mensaje de audio y false si no
     */
    isAudioTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_AUDIO){
                return true;
            }
        }
        return false;
    }

    /**
     * Validar si es un mensaje de tipo de contacto
     * @function
     * @returns {Boolean} True si es un mensaje de contacto y false si no
     */
    isContactTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_CONTACT){
                return true;
            }
        }
        return false;
    }

    /**
     * Validar si es un mensaje de tipo de archivo
     * @function
     * @returns {Boolean} True si es un mensaje de archivo y false si no
     */
    isFileTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_FILE){
                return true;
            }
        }
        return false;
    }

    /**
     * Validar si es un mensaje de tipo de ubicación
     * @function
     * @returns {Boolean} True si es un mensaje de ubicación y false si no
     */
    isLocationTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_LOCATION){
                return true;
            }
        }
        return false;
    }

    /**
     * Validar si es un mensaje de tipo de video
     * @function
     * @returns {Boolean} True si es un mensaje de video y false si no
     */
    isVideoTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_VIDEO){
                return true;
            }
        }
        return false;
    }

    /**
     * Validar si es un evento de tipo mensaje
     * @function
     * @returns {Boolean} True si es un evento de tipo mensaje y false si no
     */
    isEventTypeMessage(){
        if(this.isMessage()){
            if(this.payload.type == TYPE_MESSAGE.TYPE_EVENT){
                return true;
            }
        }
        return false;
    }

    /**
     * Obtener el mensaje enviado por el usuario
     * @function
     * @returns {String} retornamos el mensajes y si no hay mensaje retornamos un NULL
     */
    getMessage(){
        if(this.isTextTypeMessage()){
            return this.payload.payload.text;
        }
        return null;
    }

    /**
     * Obtener el nombre del usuario
     * @function
     * @returns {String} retornamos el nombre del usuarioy si no hay nombre del usuario retornamos un NULL
     */
    getUserName(){
        if(this.isMessage()){
            return this.payload.sender.name;
        }
        return null;
    }

    /**
     * Obtener el celular del usuario 
     * @function
     * @returns {String} retornamos el celular del usuario y si no hay celular del usuario  retornamos un NULL
     */
    getUserPhone(){
        if(this.isMessage()){
            return this.payload.sender.dial_code;
        }
        return null;
    }

    /**
     * Obtener el celular del usuario con codigo de pais 
     * @function
     * @returns {String} retornamos el celular del usuario con codigo de pais y si no se encuentra  retornamos un NULL
     */
    getUserFullPhone(){
        if(this.isMessage()){
            return this.payload.sender.country_code + this.payload.sender.dial_code;
        }
        return null;
    }

    /**
     * Obtener el codigo de pais 
     * @function
     * @returns {String} retornamos el codigo de pais y si no se encuentra  retornamos un NULL
     */
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