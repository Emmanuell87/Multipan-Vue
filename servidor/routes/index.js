import express from "express";
const router = express.Router();

//importacion de modelos
import Keys from '../models/keys'
import Productos from '../models/productos'


        /*RUTAS PARA MANEJO DE DATOS DE USUARIOS*/
//Agregar una key
router.post('/nueva-key', async(req, res)=>{

    const body=req.body;

    try {
        const keyDB = await Keys.create(body);
        res.status(200).json(keyDB)
    } catch (err) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            err
        })
    }

})

// Obtener una key a partir de un id
router.get('/key/:id', async(req, res)=>{
    const _id = req.params.id;

    try {
        const keyDB = await Keys.findOne({_id});
        res.json(keyDB)
    } catch (err) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            err
        })
    }
})


//Obtener todas las keys
router.get('/keys', async (req, res) => {
    
    try {
        
        const keyDB= await Keys.find();
        res.json(keyDB)

    } catch (err) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            err
        })
    }
})


// router.delete('/key/:id', async (req, res) => {

//     const _id = req.params.id;

//     try {
        
//         const keyDB = await Keys.findByIdAndDelete({_id});

//         if(!keyDB){
//             return res.status(400).json({
//                 mensaje: 'No se encontró el id indicado', 
//                 error
//             })
//         }

//         res.json(keyDB)
//     } catch (err) {
//         return res.status(500).json({
//             mensaje: 'Ocurrio un error',
//             err
//         })
//     }

// })

// Actualizar una key a partir de un id
router.put('/key/:id', async (req, res) => {
    
    const _id = req.params.id;
    const body = req.body;

    try {
        
        const keyDB = await Keys.findByIdAndUpdate(
            _id, 
            body,
            {new: true}
        );
        res.json(keyDB);
    } catch (err) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            err
        })
    }
})


        /*RUTAS PARA MANEJO DE DATOS DE PRODUCTOS*/
router.post('/nuevo-producto', async(req, res)=>{

    const body=req.body;

    try {
        const D_productoDB = await Productos.create(body);
        res.status(200).json(D_productoDB)
    } catch (err) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            err
        })
    }

});


//Obtener todos los productos
router.get('/productos', async (req, res) => {
    
    try {
        
        const keyDB= await Productos.find();
        res.json(keyDB)

    } catch (err) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            err
        })
    }
})

router.delete('/producto/:id', async (req, res) => {

    const _id = req.params.id;

    try {
        
        const keyDB = await Productos.findByIdAndDelete({_id});

        if(!keyDB){
            return res.status(400).json({
                mensaje: 'No se encontró el id indicado', 
                error
            })
        }

        res.json(keyDB)
    } catch (err) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            err
        })
    }

})

router.put('/producto/:id', async (req, res) => {
    
    const _id = req.params.id;
    const body = req.body;

    try {
        
        const keyDB = await Productos.findByIdAndUpdate(
            _id, 
            body,
            {new: true}
        );
        res.json(keyDB);
    } catch (err) {
        return res.status(500).json({
            mensaje: 'Ocurrio un error',
            err
        })
    }
})



module.exports = router;