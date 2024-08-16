import Product from '../models/ProductModels.js';
import path from 'path';

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
    
}

export const deleteProduct = async (req, res) => {

}


export default { getProduct, getProductById, saveProduct, updateProduct, deleteProduct };