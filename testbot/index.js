var express = require("express");
var {
    FB,
    Image,
    Typing,
    Text,
    QuickReplies,
    QuickRepliesOption
} = require("./../index");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", FB.checkWebhook);

app.post("/", async function(req, res) {
    res.sendStatus(200)
    var FBTools = new FB(req.body)

    FBTools.showReport()

    let user = await FBTools.getInfoUser()

    console.log(user)
    FBTools.addResponse(new Typing())
    FBTools.addResponse(new Image("https://img.peru21.pe/files/article_content_ec_fotos/uploads/2018/10/12/5bc0de3622a15.jpeg"))
    FBTools.addResponse(new Text("Este es una texto que ira despues de la imagen"))

    let option_email = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_EMAIL)

    //Location deprecable
    let option_location = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_LOCATION)
    let option_phone = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_PHONE)

    let option_text = new QuickRepliesOption.QuickRepliesOption(QuickRepliesOption.TYPE_TEXT, "Hola", "Hola por payload", "https://img.peru21.pe/files/article_content_ec_fotos/uploads/2018/10/12/5bc0de3622a15.jpeg")

    let quick = new QuickReplies("Respuestas rapidas :")
    quick.addOption(option_email)
    // quick.addOption(option_location)
    quick.addOption(option_phone)
    quick.addOption(option_text)

    FBTools.addResponse(quick)
    

    let rs = await FBTools.sendResponse()
    console.log(rs)
})

app.listen(3000, function() {
    console.log("Servidor ejecutando..........");
})