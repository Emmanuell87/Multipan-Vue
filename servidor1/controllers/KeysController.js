const models = require("../models");
const bcrypt = require('bcryptjs');
const token = require('../services/token')

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var validatePassword = function(password) {
    return password.length>=8;
};

var validarDatos = function(item){
    let email = item.email.length > 0
    let password = item.password.length > 0 
    let name = item.name.length > 0
    let apellidos = item.apellidos.length > 0
    let rol = item.rol.length > 0
    if(email && password && name && apellidos && rol){
        return true
    }else{
        return false
    }
    
}

module.exports = {
    add : async(req, res, next) => {
        try {
            
            const checkEmail = await models.Keys.findOne( { email : req.body.email});// Variable para validar si el correo existe
            if(!checkEmail){
                if(validatePassword(req.body.password)){
                    // Suponiendo que el usuario no existe
                    req.body.password = await bcrypt.hash(req.body.password, 10)// Encriptar el password
                    if(req.body.rol==null){
                        req.body.rol = 'User'
                        console.log(req.body.rol)
                    }
                    const keyDB = await models.Keys.create(req.body);
                    res.status(200).json(keyDB)
                }else{
                    res.status(400).send({
                        message : "Debe tener minimo 8 caracteres!"
                    })
                } 
            }else{
                res.status(400).send({
                    message : "El usuario ya existe!",
                    type : 2
                })
            }            
            
        } catch (error) {
            res.status(500).send({
                message : "Ocurrio un error Interno"
            });
            next(error);            
        }

    },

    //Obtener todas las keys
    // router.get('/keys', async (req, res) => {
        
    //     try {
            
    //         const keyDB= await Keys.find();
    //         res.json(keyDB)

    //     } catch (err) {
    //         return res.status(500).json({
    //             mensaje: 'Ocurrio un error',
    //             err
    //         })
    //     }
    // })
    list : async(req, res, next) => {
        try {
            
            const reg= await models.Keys.find({rol : 'Administrador'}).sort({createdAt:-1});
            res.status(200).json(reg)

        } catch (error) {
            res.status(500).send({
                message : "Ocurrio un error Interno"
            });
            next(error);            
        }
    },

    enabled : async(req, res, next) => {
        try {
            
            const reg= await models.Keys.findByIdAndUpdate({_id:req.body._id},
                                                            {estado:1});
            res.status(200).json(reg)

        } catch (error) {
            res.status(500).send({
                message : "Ocurrio un error Interno"
            });
            next(error);            
        }
    },

    disabled: async(req, res, next) => {
        try {
            
            
            const reg= await models.Keys.findByIdAndUpdate({_id:req.body._id},
                                                            {estado:0});
            res.status(200).json(reg)

        } catch (error) {
            res.status(500).send({
                message : "Ocurrio un error Interno"
            });
            next(error);            
        }
    },

    update: async(req, res, next) => {
        try {
            
            if(validarDatos(req.body)){    
                if(validateEmail(req.body.email)){

                    if(validatePassword(req.body.password)){
                    
                        let password = req.body.password; // guardar contraseña de la solicitud en una variable
                        const reg0 = await models.Keys.findOne({_id : req.body._id}) //Crear un registro donde vamos hacer una consulta del usuario

                        //VALIDACION
                        //Si la contraseña que llega en la peticion es diferente a la que esta en la DB
                        //Es porque el usuario cambio contraseña 
                        
                        if(password != reg0.password){
                            req.body.password = await bcrypt.hash(req.body.password, 10)// Encriptar el password

                        }


                        const reg = await models.Keys.updateOne({_id:req.body._id},
                            {
                                rol: req.body.rol,
                                name: req.body.name,
                                apellidos: req.body.apellidos,
                                password: req.body.password, // si no se modifico el password se deja tal cual
                                email: req.body.email,
                                estado: req.body.estado
                            }    
                        )
                        
                    
                        res.status(200).json(reg)
                    }else{
                        res.status(400).send({
                            message : "Debe tener minimo 8 caracteres",
                        })
                    }
                }else{
                    res.status(400).send({
                        message : "Formato de email inválido",
                    })
                }
            }else{
                res.status(400).send({
                    message : "Los campos no pueden estar vacíos",
                })
            }
        } catch (error) {
            res.status(500).send({
                message : "Ocurrio un error Interno"
            });
            next(error);            
        }
    },


    login: async(req, res, next) => {
        try {
            let checkUser = await models.Keys.findOne({ // variable para validar si el usuario existe o tiene estado activo
                email : req.body.email,
                estado : 1
            })

            if(checkUser){// empezar a comparar las contraseñas
                let match = await bcrypt.compare(req.body.password, checkUser.password);

                if( match ){// si las contraseñas coinciden, vamos a generar el token
                    // generemos un token con los datos de la sesion
                    //res.status(200).json({checkUser})
                    let tokenReturn = await token.encode(checkUser);
                    res.status(200).json({checkUser, tokenReturn})

                }else{// si las contraseñas no coinciden
                    res.status(401).send({
                        message : "Usuario no autorizado"
                    })
                }

            }else{// si el ususario no exste
                res.status(404).send({
                    message : "Usuario no encontrado"
                })
            }
        } catch (error) {
            console.log(error);
            next(error)
            
        }
    }
}


//         /*RUTAS PARA MANEJO DE DATOS DE USUARIOS*/
// //Agregar una key
// router.post('/nueva-key', )

// // Obtener una key a partir de un id
// router.get('/key/:id', async(req, res)=>{
//     const _id = req.params.id;

//     try {
//         const keyDB = await Keys.findOne({_id});
//         res.json(keyDB)
//     } catch (err) {
//         return res.status(500).json({
//             mensaje: 'Ocurrio un error',
//             err
//         })
//     }
// })


// //Obtener todas las keys
// router.get('/keys', async (req, res) => {
    
//     try {
        
//         const keyDB= await Keys.find();
//         res.json(keyDB)

//     } catch (err) {
//         return res.status(500).json({
//             mensaje: 'Ocurrio un error',
//             err
//         })
//     }
// })


// // router.delete('/key/:id', async (req, res) => {

// //     const _id = req.params.id;

// //     try {
        
// //         const keyDB = await Keys.findByIdAndDelete({_id});

// //         if(!keyDB){
// //             return res.status(400).json({
// //                 mensaje: 'No se encontró el id indicado', 
// //                 error
// //             })
// //         }

// //         res.json(keyDB)
// //     } catch (err) {
// //         return res.status(500).json({
// //             mensaje: 'Ocurrio un error',
// //             err
// //         })
// //     }

// // })

// // Actualizar una key a partir de un id
// router.put('/key/:id', async (req, res) => {
    
//     const _id = req.params.id;
//     const body = req.body;

//     try {
        
//         const keyDB = await Keys.findByIdAndUpdate(
//             _id, 
//             body,
//             {new: true}
//         );
//         res.json(keyDB);
//     } catch (err) {
//         return res.status(500).json({
//             mensaje: 'Ocurrio un error',
//             err
//         })
//     }
// })