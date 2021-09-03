const formBody = (req, result) => {
    const {
        name= result.rows[0]?.name,
        stock= result.rows[0]?.stock,
        description= result.rows[0]?.description, 
        price= result.rows[0]?.price, 
        categories= result.rows[0]?.categories, 
        weight= result.rows[0]?.weight, 
        condition= result.rows[0]?.condition, 
        brand= result.rows[0]?.brand, 
        author= result.rows[0]?.author, 
        rating= result.rows[0]?.rating,
        seller= result.rows[0]?.seller
    } = req.body

    return {
        name: name,
        stock: stock,
        description: description, 
        price: price, 
        categories: categories, 
        weight: weight, 
        condition: condition, 
        brand: brand, 
        author: author, 
        rating: rating,
        seller: seller
    }
}

module.exports = formBody;