const https = require('https');
const fs = require('fs');
const path = require("path")
const Url = require("url");
let validURL = /^(ftp|http|https):\/\/[^ "]+$/;
class DownloadFile {
    /**
   defaultName is boolean
	*/
    static asyncDownload(url, config) { // config -- > ruta , namedefault --> usara el nombre del archivo +
     
        if (!validURL.test(url)) {
            console.log("AH Ingresado un URL No valido ...", url);
            return;
        }
        let newUrl = Url.parse(url);
        let nameFile = path.basename(newUrl.pathname)
        let ruta = "./" + nameFile;
        /*
        si solo tiene la propiedad ruta debera definir la ruta del archivo junto el nombre del archivo ejemplo  ./carpeta/mifile.txt

        si tiene la propiedad ruta y defaultName en true debera especificar en ruta solo el lugar donde se almacenara porque el nombre lo saca del archivo
        */
        if (config.ruta) {
            ruta = config.ruta;
        }
        if (config.defaultName) {
            ruta = config.ruta + "/" + nameFile
        }
        console.log("--------------------", ruta)
        // console.log(path.basename(newUrl.pathname))
        let file = fs.createWriteStream(ruta);
        var request = https.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
                // aqui donde termina
                console.log("se termino")
                file.close();
            });
        }).on('error', function(err) { // Handle errors
            console.log("error")
            fs.unlink();
        });
    }
    // static asyncDownload(url,config){
    // }
    //devuelve en el callback true si ocurrio un error
    static syncDownload(url, config) {

        return new Promise((resolve,reject)=>{
            if (!validURL.test(url)) {
                console.log("AH Ingresado un URL No valido ...", url);
                return;
            }
            let newUrl = Url.parse(url);
            let nameFile = path.basename(newUrl.pathname)
            let ruta = "./" + nameFile;
            /*
            si solo tiene la propiedad ruta debera definir la ruta del archivo junto el nombre del archivo ejemplo  ./carpeta/mifile.txt
    
            si tiene la propiedad ruta y defaultName en true debera especificar en ruta solo el lugar donde se almacenara porque el nombre lo saca del archivo
            */
            if (config.ruta) {
                ruta = config.ruta;
            }
            if (config.defaultName) {
                ruta = config.ruta + "/" + nameFile
            }
            console.log("--------------------", ruta)
            // console.log(path.basename(newUrl.pathname))
            let file = fs.createWriteStream(ruta);
            var request = https.get(url, function(response) {
                response.pipe(file);
                file.on('finish', function() {
                    // aqui donde termina
                    console.log("se termino")
                    file.close();
                    resolve(false)
                });
            }).on('error', function(err) { // Handle errors
                console.log("error")
                resolve(true)
                fs.unlink();
            });

        })

    }
}
module.exports = DownloadFile;
//DownloadFile.asyncDownload("https://scontent.xx.fbcdn.net/v/t1.15752-9/62244011_839875873056762_6610916543649808384_n.jpg?_nc_cat=103&_nc_ad=z-m&_nc_cid=0&_nc_zor=9&_nc_ht=scontent.xx&oh=9b3a7271b43411fbd94a9c7b6b66d2a7&oe=5D91347D")