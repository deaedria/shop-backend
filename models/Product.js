const pg = require('../helpers/connect_db');
const isDataEmpty = require('../helpers/checkDataEmpty');
const { formError, formSuccess } = require('../helpers/formResponse');
const { getWithLimit, getAll, getById, 
        deleteById, createProduct, updateProduct } = require('../helpers/queryProduct');
const { ProductBuilder } = require('../helpers/productBuilder');
const formBody = require('../helpers/formBodyForUpdate');
const formFile = require('../helpers/formFileForUpdate');
const unlinkPhoto = require('../helpers/unlinkPhoto');

class ProductModel {
    getProducts(req) {
        return new Promise((resolve, reject) => {
            const { query: { limit = 20, page = 1 } } = req
            pg.query(getWithLimit(limit, page), (err, result) => {
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("Data Not Found", 404))
                if (err) reject(formError("Get all Product failed", 500))
                const note = { max: 20, limit: parseInt(limit), page: parseInt(page) }
                const data = { products: [...result.rows], note }
                resolve(formSuccess("Get all Product success", 200, data))
            });
        });
    }

    getAllProduct() {
        return new Promise((resolve, reject) => {
            pg.query(getAll(), (err, result) => {
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("Data Not Found", 404))
                if (err) reject(formError("Get all Product failed", 500))
                resolve(formSuccess("Get all Product success", 200, result?.rows))
            });
        });
    }

    getProductById(req) {
        return new Promise((resolve, reject) => {
            const { params: { id: id } } = req
            pg.query(getById(id), (err, result) => {
                if (err) reject(formError("Get product failed", 500))
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) reject(formError("Product not found", 404))
                resolve(formSuccess("Get product success", 200, result.rows[0]))
            });
        });
    }

    deleteProductById(req) {
        return new Promise((resolve, reject) => {
            const { params: { id: id } } = req
            pg.query(getById(id), (error, res) => {
                if (error) reject(formError('Delete product failed', 500))
                const { isEmpty } = isDataEmpty(res)
                if (isEmpty) reject(formError("product not found", 400))
                pg.query(deleteById(id), (err, result) => {
                    if (err) reject(formError('Delete product failed', 500))
                    resolve(formSuccess('Delete product success', 200, result.rows[0]))
                });
            });
        })
    }

    postProduct(req) {
        return new Promise((resolve, reject) => {
            const { body: { name, stock, description, price, categories, 
                            weight, condition, brand, author, rating, seller } } = req;
            const images = req.file?.filename
            const product = new ProductBuilder()
            product.setPrice(price)
                .setCondition(condition)
                .setImage(images)
                .build()
            const {
                product: { _price, _images },
                condition: { _type }
            } = product
            if (!_type) return reject(formError("Add product failed", 500))
            pg.query(createProduct(name, stock, description, _price, categories, weight, 
                _type, brand, author, rating, _images, seller), (err, result) => {
                if (err) return reject(formError("Add product Failed", 500))
                return resolve(formSuccess("Add product success", 201, result?.rows[0]))
            })
        });
    }

    patchProductById(req) {
        return new Promise((resolve, reject) => {
            const { params: { id: id } } = req
            pg.query(getById(id), (error, result) => {
                const { isEmpty } = isDataEmpty(result)
                if (isEmpty) return reject(formError("product id not found", 404))
                if (error) return reject(formResponse("update data failed", 500))
                const { name, stock, description, price, categories, weight, 
                        condition, brand, author, rating, seller } = formBody(req, result)
                const { images } = formFile(req, result)
                if (images != result.rows[0]?.images) {
                    unlinkPhoto(result.rows[0].images)
                    pg.query(updateProduct({ name, stock, description, price, categories, weight, condition, brand, author, rating, seller, id }), (err, response) => {
                        if (err) return reject(formError("update data failed", 500));
                        return resolve(formSuccess(`update data success`, 200, response?.rows[0]));
                    })
                }
                pg.query(updateProduct({ name, stock, description, price, categories, weight, condition, brand, author, rating, seller, id }), (err, response) => {
                    if (err) return reject(formError("update data failed", 500));
                    return resolve(formSuccess(`update data success`, 200, response?.rows[0]));
                })
            })
        })
    }

};
module.exports = { ProductModel };