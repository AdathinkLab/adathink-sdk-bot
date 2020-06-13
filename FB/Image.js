const SendFacebook = require("./SendFacebook");

  /**
 * @typedef {Object} Payload
 * @property {String} url - Url del archivo
 * @property {Boolean} is_reusable - El archivo generara un url estatica
 */

/**
 * @typedef {Object} RecipientFacebook
 * @property {String} id - ID Usuario
 */

 /**
 * @typedef {Object} Attachment
 * @property {String} type - Tipo de archivo a enviar (image)
 * @property {Payload} payload - Metadata de carga del archivo
 */

 /**
 * @typedef {Object} MessageAttachmentFacebook
 * @property {String} text - Texto del mensaje
 */

/**
 * @typedef {Object} StructMessageImageFacebook
 * @property {RecipientFacebook} recipient - Recipiente al cual se le enviara el mensaje
 * @property {MessageTextFacebook} message - Objeto de mensaje que se enviara al usuario
 */

/**
 * Crear un Imagen
 * @class */
class Image {
  
  /**
   * @constructor
   * @param {String} id_user - ID del usuario
   * @param {String} url_img - Url de la imagen para enviar al usuario
   */
  constructor(url_img, id_user=null) {
    this.id_user = id_user;
    this.url_img = url_img;
  }

  /**
   * Remplazar la url de la imagen 
   * @function
   * @param {String} url_img - Url de la imagen para enviar al usuario
   */
  setUrlImg(url_img) {
    this.url_img = url_img;
  }

  /**
   * Remplazar el ID del usuario del mensaje de texto simple
   * @function
   * @param {String} id_user - ID del usuario
   */
  setIdUser(id_user) {
    this.id_user = id_user;
  }

  /**
   * Obtener la url de la imagen 
   * @function
   * @returns {String} Url de la imagen para enviar al usuario
   */
  getUrlImg() {
    return this.message;
  }

  /**
   * Obtener el ID del usuario del mensaje de texto simple
   * @function
   * @returns {String} ID del usuario
   */
  getIdUser() {
    return this.id_user;
  }

  /**
   * Obtener la estructura JSON que require FACEBOOK
   * @function
   * @returns {StructMessageImageFacebook} Objeto que require FACEBOOK para enviar una imagen al usuario
   */
  getStruct() {
    return {
      recipient: {
        id: this.id_user,
      },
      message: {
        attachment: {
          type: "image",
          payload: {
            is_reusable: true,
            url: this.url_img,
          },
        },
      },
    }
  }

  /**
   * @ignore
   */
  static enviar(usuario, mensaje, configFB) {
    console.log(usuario + " " + mensaje);
    var _mensaje = {
      recipient: {
        id: usuario,
      },
      message: {
        attachment: {
          type: "image",
          payload: {
            is_reusable: true,
            url: mensaje,
          },
        },
      },
    };
    console.log(_mensaje);
    SendFacebook.enviar(_mensaje, configFB.token);
  }
}

module.exports = Image;
