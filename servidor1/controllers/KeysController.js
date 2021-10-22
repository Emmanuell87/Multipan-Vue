const models = require("../models");
const bcrypt = require('bcryptjs');
const token = require('../services/token')

module.exports = {
    add : async(req, res, next) => {
        try {

            const checkEmail = await models.Keys.findOne( { email : req.body.email});// Variable para validar si el correo existe
            if(!checkEmail){
                console.log('a')
                // Suponiendo que el usuario no existe
                req.body.password = await bcrypt.hash(req.body.password, 10)// Encriptar el password
                const keyDB = await models.Keys.create(req.body);
                res.status(200).json(keyDB)
            }else{
                res.status(400).send({
                    message : "El usuario ya existe!"
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
                    res.status(400).send({
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