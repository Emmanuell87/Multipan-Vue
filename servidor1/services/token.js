var jwt = require("jsonwebtoken")



module.exports = {
    encode : async(user) =>{
        var token = jwt.sign({
            _id : user._id,
            name : user.name,
            apellidos : user.apellidos,
            email : user.email,
            rol : user.rol
        }, "UnafraseSecretaQueCodificaLosDatosdelUsuario", {expiresIn : '24h'});

        return token;
    }
}