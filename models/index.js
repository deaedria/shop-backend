const { ProductModel } = require("./Product");

class Model{
    product(){
        return new ProductModel()
    }
}

module.exports = { Model };