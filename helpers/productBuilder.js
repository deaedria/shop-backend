class Condition {
    constructor({ type }) {
        this._type = type
    }
}

class ProductBuilder {
    constructor() {
        this.product = {}
    }

    setPrice(price) {
        if (price) this.product._price = `$${price}`
        if (price == undefined) this.product._price = undefined
        return this
    }

    setCondition(condition) {
        if (condition.toLowerCase() != 'new' || condition.toLowerCase() != 'used') this.condition = new Condition({ type: 'false' })
        if (condition.toLowerCase() == 'new') this.condition = new Condition({ type: 'new' })
        if (condition.toLowerCase() == 'used') this.condition = new Condition({ type: 'used' })
        return this
    }

    setImage(images) {
        if (images) this.product._images = `'/upload/product/${images}'`
        if (images == undefined) this.product._images = undefined
        return this
    }

    build() {
        return this.product
    }
}

module.exports = { ProductBuilder }