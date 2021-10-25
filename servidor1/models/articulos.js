const mongoose = require('mongoose');
const {Schema} = mongoose;

const D_articulosSchema = new Schema({

    imagen: {
        type : String,
        required: true,
    },
    nombre: {
        type:String, 
        required:[true, 'Nombre obligatorio'],
        maxlength: 100,
    },
    tipo: {
        type : String,
        required : true
    },
    id: {
        type : Number,
        required: true
    },
    precio: {
        type : Number
    },
    inventario: {
        type : Boolean,
        required : true,
        default : true
    }

})


//convertir a modelo

const D_articulos = mongoose.model('Dashboard_articulos', D_articulosSchema);
module.exports =  D_articulos;