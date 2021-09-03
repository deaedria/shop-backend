const formFile = (req, result) => {
    const filePhoto = req.file?.filename
        ? `/upload/product/${req.file.filename}`
        : result.rows[0]?.images

    return {
        images: filePhoto
    }
}

module.exports = formFile;
