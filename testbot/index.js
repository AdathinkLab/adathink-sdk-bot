var express = require("express");
var {
    FB
} = require("adathink-sdk-bot");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
let config = {
    token: "EAAp9LYaQvtcBAJBebBsjJesl2kkNn6PGoHlhStGXildHZCQJwr5jt6RhVQHeHbUiXbc9rJE6fLAGDxPbw36ORMAPjZAbQdhlHX9Il7znRMysyG0ZCPFhZBUumSd4OEBFhegg8b8VNeDfNzWR3Wix25nl2XcZCGMoXmaJ5MhIX5AZDZD",
    key: "prueba"
}
FB.setConfig(config);
// EAAp9LYaQvtcBANaEgcO2OKgsQbz19FxZAYGi43ZCoZCKNO9Dk06E9N4XmQ7KaHX4vT9gAfIckRIVDxOspeZC4hv05hyWml6mq5wLpNCSupU74UqxJGeqKhX8PBTfZBoLU2CXigpyMm0Jt6a4cSo8otCoaZAY14cz87Ubm9NA0ZC8wZDZD
app.get("/", FB.checkWebhook);
app.post("/", function(req, res) {
    console.log("LLegando--")
    var FBTools = new FB(req.body);
    console.log(FBTools.getId());
    FBTools.mostrarReporte();
    FBTools.sendImage("https://img.peru21.pe/files/article_content_ec_fotos/uploads/2018/10/12/5bc0de3622a15.jpeg");
    FBTools.typing();
    FBTools.sendMessage("Quiero hacer una prueba-..........")
    FBTools.getInfo(function(user) {
        console.log(user);
        FBTools.sendImage(user.profile_pic)
    })

    FBTools.quickReplies({"title":"demossss","replies":[{"title":"ok","payload":"si"},{"title":"oka","payload":"no"}]})
    // FBTools.sendMessageButton({"text":"hola esto ees  una prueba","button":[{
    //         "type":"web_url",
    //         "url":"https://www.messenger.com",
    //         "title":"Visit Messenger"
    //       }]})

    res.sendStatus(200);
})
app.listen(3000, function() {
    console.log("Servidor ejecutando..........");
})