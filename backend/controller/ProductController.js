import Product from '../models/ProductModels.js';
import path from 'path';
import fs from 'fs';

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findAll();
        res.json(product);
    } catch (error) {
        console.log(error);
    } 
}

export const getProductById = async (req, res) => { 
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }  
        });
        res.json(product);
    } catch (error) {
        console.log(error);
    }
}
    
export const saveProduct = async (req, res) => {
    if (!req.files || !req.files.image) {
        console.log('req.files:', req.files);
        return res.status(400).json({ msg: "No file uploaded" });
    }

        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
      
    const name = req.body.name;
    const file = req.files.image;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;   
    const url = `${req.protocol}://${req.get("host")}/images/products/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext)) return res.status(422).json({ msg: "Invalid Images Files" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/products/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Product.create({ name: name, image: fileName, url: url });
            res.json({ msg: "Product created successfully" });
        } catch (error) {
            console.log(error);
        }
    });
}


export const updateProduct = async (req, res) => {
    const product = await Product.findOne({
        where: {
            id: req.params.id
        }  
    });

    if (!product) return res.status(404).json({ msg: "Product not found" });

    try {
        if (!req.files || !req.files.image) {
            const name = req.body.name;
            const url = product.url;
            await Product.update({ name: name, url: url }, {
                where: { 
                    id: req.params.id
                }
            });
            res.json({ msg: "Product updated successfully" });
        } else {
            const file = req.files.image;
            const fileSize = file.data.length;
            const ext = path.extname(file.name);
            const fileName = file.md5 + ext;   
            const url = `${req.protocol}://${req.get("host")}/images/products/${fileName}`;
            const allowedType = ['.png', '.jpg', '.jpeg'];

            if (!allowedType.includes(ext)) return res.status(422).json({ msg: "Invalid Images Files" });
            if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

            file.mv(`./public/images/products/${fileName}`, async (err) => {
                if (err) return res.status(500).json({ msg: err.message });
                const oldFileName = product.image;
                fs.unlinkSync(`./public/images/products/${oldFileName}`);
                await Product.update({ name: req.body.name, image: fileName, url: url }, {
                    where: { 
                        id: req.params.id
                    }   
                });
                res.json({ msg: "Product updated successfully" });
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error occurred while updating the product" });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id
            }  
        });

        if (!product) return res.status(404).json({ msg: "Product not found" });

        const imageName = product.image;
        const imagePath = `./public/images/products/${imageName}`;

        // Periksa apakah file gambar ada sebelum mencoba menghapusnya
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        } else {
            console.log(`File tidak ditemukan: ${imagePath}`);
        }

        await Product.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({ msg: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "An error occurred while deleting the product" });
    }
}


export default { getProduct, getProductById, saveProduct, updateProduct, deleteProduct };