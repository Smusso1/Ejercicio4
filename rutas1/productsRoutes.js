const {Router} = require('express')
const router = Router()

const productos = [
    {
        "id": 1,
        "type": "jabon",
        "url": "url_del_id_1",
        "price": 3500,
    },
    {
        "id": 2,
        "type": "shampoo",
        "url": "url_del_id_2",
        "price": 5499,
        
    },
    {
        "id": 3,
        "type": "crema",
        "url": "url_del_id_3",
        "price": 16108,
    },
]

function middlewarePersonas(req,res,next){
    console.log("Bueno aca tamo")
    next()
}

router.get('/api/productos',middlewarePersonas, (req ,res) => {
    res.json(productos)
})

router.post('/api/productos', (req, res) => {
    const { type, url,  price } = req.body
    let ultimo = productos.length - 1;
    let id = productos[ultimo].id + 1;
    productos.push({ id, type, url, price});
    res.send(productos[ultimo+1]);
})
//get sobre un producto específico
router.get('/api/productos/:id', (req, res) => {
    let encontrado = productos.find(producto => producto.id == req.params.id);
    let resultado;
    if(encontrado){
        resultado = encontrado;
    } else {
        resultado = {error: 'El producto no existe'};
    }
    res.json(resultado);
})
//put sobre un producto específico
router.put('/api/productos/:id', (req, res) => {
    let resultado
    const indiceEncontrado = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    if (indiceEncontrado === -1) {
        resultado = {error: 'El producto no existe'}
    } else {
        productos[indiceEncontrado] = req.body;
        resultado = "Producto actualizado con exito"
    }
    res.json(resultado)
})
//delete sobre un producto específico
router.delete('/api/productos/:id', (req, res) =>{
    const indiceEncontrado = productos.findIndex((producto) => {
        return producto.id == req.params.id;
    });
    let resultado = "";
    if (indiceEncontrado === -1) {
        resultado = {error: 'El producto no existe'}
    } else {
        productos.splice(indiceEncontrado, 1);
        resultado = "Producto eliminado con éxito"
    }
    res.json(resultado);

})

module.export = router