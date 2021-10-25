const mongoose = require('mongoose');
const {Schema} = mongoose;


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const keysSchema = new Schema({

    email: {
        type:String,
        required: true,
        maxLength: 100,
        trim: true, // Si mandan espacios en blanco, el los quita
        unique : true, // para validar que cada correo sea unico
        lowercase : true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type:String,
        required: true,
        minlength: 8,
        maxlength: 100
    },
    name: {
        type:String, 
        required:[true, 'Nombre obligatorio'],
        maxlength: 100,
    },
    apellidos: {
        type:String, 
        required:[true, 'Nombre obligatorio'],
        maxlength: 100,
    },
    estado: {
        type : Number,
        default : 1
    },
    rol : {
        type : String,
        required: true,
        enum: ["Administrador", "User"]
    },
    createdAt: {
        type : Date,
        default : Date.now
    }


})


//convertir a modelo

const Keys = mongoose.model('Keys', keysSchema);
module.exports = Keys;