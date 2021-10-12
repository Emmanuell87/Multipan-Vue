import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const D_productosSchema = new Schema({

    imagen: String,
    nombre: String,
    tipo: String,
    id: Number,
    precio: Number,
    inventario: Boolean,
    color:{
        "eliminar": Boolean,
        "editar": Boolean
    },

})


//convertir a modelo

const D_productos = mongoose.model('Dashboard_productos', D_productosSchema);
export default D_productos