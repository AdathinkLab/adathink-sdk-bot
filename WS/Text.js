const { PHONE_WHATSAPP } = require("./../config")


class Text{

    constructor(message, phone){
        this.message = message;
        this.phone = phone;
    }

    setMessage(message){
        this.message = message;
    }

    getMessage(){
        return this.message;
    }

    setPhone(phone){
        this.phone = phone;
    }

    getPhone(){
        return this.phone;
    }

    getStruct(){
        return {
            channel: "whatsapp",
            source: PHONE_WHATSAPP,
            destination: this.phone,
            message: this.message
        }
    }

}


module.exports = Text;