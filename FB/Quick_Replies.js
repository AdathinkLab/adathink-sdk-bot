var SendFacebook = require('./SendFacebook');
class Quick_Replies {
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
        // console.log(mensaje);
    }
}
module.exports = Quick_Replies;