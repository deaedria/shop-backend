const { ProductController } = require("./Product");

class Controller{
    product(){
        return new ProductController()
    }
}

module.exports = { Controller };