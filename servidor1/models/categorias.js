const mongoose = require('mongoose');
const {Schema} = mongoose;

const D_categoriasSchema = new Schema({

    imagen: {
        type: String,
        required: true
    },
    name: {
        type:String, 
        required:[true, 'Nombre obligatorio'],
        maxlength: 100,
    },
    cantidad: {
        type : Number
    },
    createdAt: {
        type : Date,
        default : Date.now
    }

})


//convertir a modelo

const D_categorias = mongoose.model('Dashboard_categorias', D_categoriasSchema);
module.exports = D_categorias;