
let FB = require("./FB/FB.js")
let WS_GUBSHUP = require("./WS/WS_GUBSHUP.js")

/** @module FB */
module.exports = {
	/**Modulo para integración con facebook*/
	FACEBOOK:{
		...FB
	},
	WS_GUBSHUP:{
		...WS_GUBSHUP
	}
}