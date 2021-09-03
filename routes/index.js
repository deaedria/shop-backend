const { ProductRoute } = require("./Products");

class Routes{
    route(){
        return [new ProductRoute().router()]
    }
}

module.exports = { Routes };