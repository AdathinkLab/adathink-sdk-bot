/*
 *Esta Clase nos ayuda apoder obtener id , que tipo es , obtener Mensajes ,url y engeneral muchas cosas
 * Se creo para poder Crear Una Herramienta Que faciliten algunas validacion y otras cosas
 * v1 - By arsevys :3
 */
 let configFB={
  "token":"",
   "key":""
 }
var FBGraph = require("./FBGraph");
var Texto= require("./Texto");
var Escribiendo= require("./Escribiendo");
 var Imagenes= require("./Imagenes");
 var QuickReplies= require("./Quick_Replies");
 var Button= require("./Button");
class FB {
    //instanciamos la clase y ala vez metemos el json que nos envia Facebook 
    constructor(json) {
        this.jsonFacebook = json;
        this.message = json.entry[0].messaging[0];
        console.log(JSON.stringify(json));
    }

    static checkWebhook(req,res){
          if (req.query['hub.mode'] && req.query['hub.verify_token'] === configFB.key) {
            console.log("Enlazado con facebook");
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error("Failed validation. Make sure the validation tokens match.");
            res.sendStatus(403);
        }
    }
      static setConfig(config){
        configFB=config;
    }

    getConfig(){
        console.log(configFB);
    }
    getId() {
        let d = this.jsonFacebook.entry[0].messaging[0];
        return d.sender.id;
    }
    countMessage() { //la cantidad total de un mensaje
        let h = this.message;
        let c = 0;
        if (h.hasOwnProperty("message")) {
            if (h.message.text) {
                c++;
            } else {
                if (this.message.message.attachments) {
                    this.message.message.attachments.filter(function(l) {
                        if (l.type == "image") {
                            c++;
                        }
                        return true;
                    })
                }
            }
        }
        return c;
    }
    getMessage() { // solo funciona cuando envian solo un mensaje
        let h = this.message;
        let msg = null;
        if (h.hasOwnProperty("message")) {
            if (this.message.message.text) {
                msg = this.message.message.text;
            }
        }
        else if (h.hasOwnProperty("postback")){
            console.log(23444,this.message.postback);
            if(this.message.postback.payload){
                msg=this.message.postback.payload;

            }

        }
        return msg;
    }
    hasMessage() { // solo funciona cuando envian solo un mensaje
        let h = this.message;
        let msg = false;
        if (h.hasOwnProperty("message")) {
            if (this.message.message.text) {
                msg = true;
            }
        }
        return msg;
    }
      hasPostback() { // solo funciona cuando envian solo un mensaje
        let h = this.message;
        let msg = false;
        if (h.hasOwnProperty("postback")) {
            if (this.message.postback.payload) {
                msg = true;
            }
        }
        return msg;
    }
    getImage() { // solo funciona cuando envian solo un mensaje
        let h = this.message;
        let msg = null;
        if (h.hasOwnProperty("message")) {
            if (this.message.message.attachments) {
                if (this.countHasImages() > 1) {
                    console.log("Advertencia este mensaje tiene mas imagenes usar otro metodo que no sea getImage()");
                    msg = this.message.message.attachments[0].payload.url;
                } else if (this.countHasImages() == 1) {
                    msg = this.message.message.attachments[0].payload.url;
                }
            }
        }
        return msg;
    }
    hasImage() { // valida si dentro del mensaje tiene por lo menos una imagen
        let i = false;
        if (this.message.hasOwnProperty("message")) {
            if (this.message.message.attachments) {
                this.message.message.attachments.filter(function(l) {
                    if (l.type == "image") {
                        i = true;
                    }
                    return true;
                })
            }
        }
        return i;
    }
    hasFile() { // valida si dentro del mensaje tiene por lo menos un archivo
        let i = false;
        if (this.message.hasOwnProperty("message")) {
            if (this.message.message.attachments) {
                this.message.message.attachments.filter(function(l) {
                    if (l.type == "file") {
                        i = true;
                    }
                })
            }
        }
        return i;
    }
    //Devuelve un entero
    countHasImages() { // cuantas imagenes tiene en ese mensaje
        let i = 0;
        if (this.message.hasOwnProperty("message")) {
            if (this.message.message.attachments) {
                this.message.message.attachments.filter(function(l) {
                    if (l.type == "image") {
                        i++;
                    }
                })
            }
        }
        return i;
    }
    countHasFile() { // cuantas imagenes tiene en ese mensaje
        let i = 0;
        if (this.message.hasOwnProperty("message")) {
            if (this.message.message.attachments) {
                this.message.message.attachments.filter(function(l) {
                    if (l.type == "file") {
                        i++;
                    }
                })
            }
        }
        return i;
    }
    getInfo( callback) {
        FBGraph.consultar(this.getId(),configFB.token, function(data) {
            return callback(data);
        })
    }
    mostrarReporte() {
        console.log("Id del usuario : " + this.getId());
        console.log("Mensaje de Texto Unico : " + this.getMessage());
        console.log("Total de mensajes : " + this.countMessage());
        console.log("Contiene Imagenes :  " + this.hasImage());
        console.log("Obtener imagen :  " + this.getImage());
        console.log("Cantidad de Imagenes Contenido :" + this.countHasImages());
        console.log("Contiene Archivos : " + this.hasFile());
        console.log("Cantidad de Archivos Contenido  : " + this.countHasFile());
    }
     
     quickReplies(message){
         QuickReplies.enviar(this.getId(),configFB,message);
     }
      sendMessageButton(message){
         Button.enviar(this.getId(),configFB,message);
     }

     typing(){
         Escribiendo.enviar(this.getId(),configFB);
     }
    sendMessage(message){
       Texto.enviar(this.getId(),message,configFB);
    }

    sendImage(url){
       
       Imagenes.enviar(this.getId(),url,configFB);
    }
}
module.exports = FB;

module.exports.configDB=configFB;