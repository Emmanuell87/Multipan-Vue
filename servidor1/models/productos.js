import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const D_productosSchema = new Schema({

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

const D_productos = mongoose.model('Dashboard_productos', D_productosSchema);
module.exports =  D_productos;