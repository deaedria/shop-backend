const queryProduct = {
    getWithLimit: (limit, page) => {
        return `SELECT id, name, stock, description, 
                        price, categories, weight, 
                        condition, brand, author, 
                        rating, seller, images
                FROM 
                products
                ORDER BY id ASC
                LIMIT ${limit} 
                OFFSET ${(page - 1) * limit}`
    },

    getAll: () => {
        return `SELECT id, name, stock, description, 
                        price, categories, weight, 
                        condition, brand, author, 
                        rating, seller, images
                FROM 
                products
                ORDER BY id ASC`
    },

    getById: (id) => {
        return `SELECT id, name, stock, description, 
                        price, categories, weight, 
                        condition, brand, author, 
                        rating, seller, images
                FROM products 
                WHERE id = ${id} LIMIT 1`
    },

    getByNameAndSeller: (name, seller) => {
        return `SELECT name, seller
                FROM products 
                WHERE name = ${name} AND seller = ${seller}`
    },

    deleteById: (id) => {
        return `DELETE 
                FROM products 
                WHERE id = ${id} 
                RETURNING *`
    },

    createProduct: (name, stock, description, price, categories, weight, condition, brand, author, rating, _images, seller) => {
        return `INSERT INTO products (name, stock, description, 
                                    price, categories, weight, 
                                    condition, brand, author, 
                                    rating, seller)
                VALUES('${name}',${stock? stock: null},'${description}','${price}','${categories}',
                '${weight}','${condition}','${brand}','${author}',${rating ? rating: null},'${seller}')
                RETURNING *`
    },

    updateProduct : ({ name, stock, description, price, categories, weight, condition, brand, author, rating, seller, id }) => {
        return `UPDATE products SET name = '${name}', 
                                stock = ${stock}, 
                                description = '${description}', 
                                price = '${price}', 
                                categories = '${categories}', 
                                weight = '${weight}', 
                                condition = '${condition}',  
                                brand = '${brand}',  
                                author = '${author}',  
                                rating = '${rating}',  
                                seller = '${seller}'
                WHERE id = ${id}
                RETURNING *`
    }

}

module.exports = queryProduct