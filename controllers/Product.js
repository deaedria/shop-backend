const { Model } = require("../models")

class ProductController extends Model {
    async getProducts(req, res) {
        try {
            const result = await super.product().getProducts(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    }

    async getAllProduct(req, res) {
        try {
            const result = await super.product().getAllProduct()
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    }

    async getProductById(req, res) {
        try {
            const result = await super.product().getProductById(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    }

    async deleteProductById(req, res) {
        try {
            const result = await super.product().deleteProductById(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    }

    async postProduct(req, res) {
        try {
            const result = await super.product().postProduct(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    }

    async patchProductById(req, res) {
        try {
            const result = await super.product().patchProductById(req)
            res.status(result.statusCode).send(result)
        } catch (error) {
            res.status(error.statusCode).send(error)
        }
    }
}

module.exports = { ProductController }