import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const keysSchema = new Schema({

    email: String,
    password: String,
    name: {type:String, required:[true, 'Nombre obligatorio']},
    apellidos: String,



})


//convertir a modelo

const Keys = mongoose.model('Keys', keysSchema);
export default Keys