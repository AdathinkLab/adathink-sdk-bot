var request = require('request');
// var option = require("./../../../config/config")
class FBGraph {
    static consultar(id,token, callback) {
        request({
            url: "https://graph.facebook.com/v2.6/" + id + "?access_token=" + token+ "",
            method: "GET"
        }, (error, response, body) => {
            var contexto = {
                sessionId: id,
                contexts: [{
                    name: 'usuario',
                    parameters: {
                        'id_fb': id
                    }
                }]
            }
            if (error) {
                callback(false, {})
                return;
            }
            var user = JSON.parse(body);
            console.log(user, 789);
            return callback(user)
            // console.log(user)
        })
    }
}
module.exports = FBGraph;

