var SendFacebook = require('./SendFacebook');
class Texto {
    static enviar(usuario, mensaje,configDB) {
        // console.log(usuario + " "  + mensaje)
        var _mensaje = {
            "recipient": {
                "id": usuario
            },
            "message": {
                text: mensaje
            }
        }
        SendFacebook.enviar(_mensaje,configDB.token);
    }
}
module.exports = Texto;