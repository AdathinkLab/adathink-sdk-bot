const request=require('request');

/**
 * Clase para envio de mensajes a Whatsapp
 * @class
 */
class SendFacebook{

	/**
	 * @constructor
	 * @param {Array|Object} messages - Arreglo de objetos de mensajes
	 * @param {String} apikey - apikey de facebook
	 */
	constructor(messages, apikey){
		this.apikey = apikey
		this.messages = messages
	}

	/**
	 * Envio de mensajes a Facebook
	 * @function
	 */
	send(){
		const _this = this
		return new Promise(function (resolve, reject){
			let results = []
			async function for_sync(array, index=0){
				if(array.length == index){
					return resolve(results)
				}
				let rs = await _this.request_whatsapp(array[index])
				results.push(rs)
				index++
				for_sync(array, index)
			}
			
			for_sync(_this.messages)
		})
	}

	/**
	 * Hacer request para responder mensaje de Whatsapp
	 * @function
	 * @private
	 * @param {Object} message - Objeto de tipo respuesta para Whatsapp
	 */
	request_whatsapp(message){
		const _this = this
		return new Promise(function(resolve, reject){
            let struct = message.getStruct()
            struct["apikey"] = _this.apikey

			request({
                url: "https://api.gupshup.io/sm/api/v1/msg",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "apikey": _this.apikey,
                    "Cache-Control": "no-cache",
                    "cache-Control": "no-cache"
              
                },
				qs : struct,
				timeout : 60000,
				method: 'POST'
			},function(err,response,body){
				if(err){
                    console.error(err)
					reject(err)
                }
                console.info(body)
				resolve(body)
			})
		})
	}

	/**
	 * @ignore
	 */
   static send(message_object_struct, apikey){

        request({
            url: "https://api.gupshup.io/sm/api/v1/msg",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                apikey: apikey,
                "Cache-Control": "no-cache",
                "cache-Control": "no-cache"
        
            },
            json : true,
            body : message_object_struct,
            timeout : 60000,
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        },function(err,response,body){
            if(err){
                console.error(err);
                return;
            }
            console.log(body)
        })
	}
}

module.exports = SendFacebook;