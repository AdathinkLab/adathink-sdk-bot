
/**
 * @typedef {Object} StructQuickRepliesOptionFacebook
 * @property {String} content_type - Tipo de opcion
 */

 /**
 * @typedef {Object} StructQuickRepliesTextOptionFacebook
 * @property {String} content_type - Tipo de opción
 * @property {String} title - titulo que muesta la opción
 * @property {String} payload - Valor por debajo que contiene la opción
 * @property {String} image_url - Url de la imagen que enviara la opcion (Opcional)
 */



 /**
 * @constant
 * @static
 */
const TYPE_TEXT = "text"

/**
 * @constant
 * @static
 */
const TYPE_LOCATION = "location"

/**
 * @constant
 * @static
 */
const TYPE_PHONE = "user_phone_number"

/**
 * @constant
 * @static
 */
const TYPE_EMAIL = "user_email"


/**
 * Crear una opcion de Quick Replies
 * @class
 */
class QuickRepliesOption{


    /**
     * @constructor
     * @param {String} type - ID del tipo de opcion a crear
     * @param {String} title - Titulo que muesta la opción (Opcional) (Obligatorio para el tipo TYPE_TEXT)
     * @param {String} payload - Valor por debajo que contiene la opción (Opcional) (Obligatorio para el tipo TYPE_TEXT)
     * @param {String} url_img - Url de la imagen que enviara la opcion (Opcional)
     */
    constructor(type, title=null, payload=null, url_img=null){
        this.type = type
        this.title = title
        this.payload = payload
        this.url_img = url_img
    }

    /**
     * Validar si es del tipo StructQuickRepliesTextOptionFacebook
     * @function
     * @returns {Boolean} True si es una opcion del tipo texto
     */
    isTextOption(){
        return this.type === TYPE_TEXT
    }


    /**
   * Obtener la estructura JSON que require FACEBOOK
   * @function
   * @returns {StructQuickRepliesTextOptionFacebook} Objeto que require FACEBOOK para asignar opciones con playload a los Quick Replies 
   */
  getStructTextOption() {
    let res = {
        "content_type": this.type,
        "title": this.title,
        "payload": this.payload
    }

    if(this.url_img)
        res["image_url"] = this.url_img

    return res
  }

   /**
   * Obtener la estructura JSON que require FACEBOOK
   * @function
   * @returns {StructQuickRepliesOptionFacebook} Objeto que require FACEBOOK para asignar opciones a los Quick Replies
   */
  getStruct() {
    return {
        "content_type": this.type
    }
  }

}

module.exports = {
    QuickRepliesOption,
    TYPE_TEXT,
    TYPE_PHONE,
    TYPE_LOCATION,
    TYPE_EMAIL
}