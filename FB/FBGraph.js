var request = require('request');
/**
 * Crear un Graph para obtener los datos de un usuario
 * @class
 */
class FBGraph {

    /**
	 * @constructor
	 * @param {String} id_user - ID del usuario
	 * @param {String} token - Token de facebook
	 */
	constructor(id_user, token){
		this.id_user = id_user
		this.token = token
    }

    /**
	 * Hacer request para obtener el perfil publico de Facebook
	 * @function
	 * @returns {Promise} Promesa que devolvera los datos del usuario
	 */
	getInfoUser(){
        const _this = this
		return new Promise(function(resolve, reject){
			request({
                url: `https://graph.facebook.com/v2.6/${ _this.id_user }?access_token=${ _this.token }`,
                method: "GET"
            }, (error, response, body) => {
                if (error) {
                    return reject(error)
                }
                var user = JSON.parse(body);
                return resolve(user)
            })
		})
	}

    /**
     * @ignore
     */
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

