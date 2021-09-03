const route = require('express').Router()
const { Controller } = require('../controllers')
const { uploadImage } = require('../helpers/formUpload')

class ProductRoute extends Controller {
    router() {
        return [
            route.get(`/api/v1/products`, super.product().getProducts),
            route.get(`/api/v1/products/all`, super.product().getAllProduct),
            route.get('/api/v1/products/:id', super.product().getProductById),
            route.delete('/api/v1/products/:id', super.product().deleteProductById),
            route.post('/api/v1/products', uploadImage, super.product().postProduct),
            route.patch('/api/v1/products/:id', uploadImage, super.product().patchProductById)
        ]
    }
}

module.exports = { ProductRoute }