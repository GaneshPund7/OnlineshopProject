// const { sendMail } = require('../../utils/nodemailer/sendMail');
const  productSchema = require('./stock.modal');

async function getProduct(req, res) {
    try {
        const get_prodcuts = await productSchema.find();
        return res.status(200).json({ message: "Data fetch successfuly..!", get_prodcuts });
    } catch (error) {
        return res.status(404).json("Somthing went wrong..!")
    }
}

async function addProdcut(req, res) {
    try {
            const addProdcut = await productSchema.create(req.body);
            return res.status(200).json({ message: "Product added successfuly..!", addProdcut });      
    } catch (error) {
        return res.status(404).json({message:"You dont have permission add product", error: error.message })
    }
}

async function updateProduct(req, res) {
    const { id } = req.params;
  try{
    if (!id) {
        return res.status(400).send("Invalid Id Please try agian");
    }
    const updateProduct = await productSchema.findOneAndUpdate({ _id: id }, req.body, { new: true });
    return res.status(200).json("User Updated successfully..!", updateProduct);
  }catch(error){
    return res.status(404).json({error: error.message})
  }
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        await productSchema.findOneAndRemove({ _id: id });
        res.status(200).send("Product deleted Successfuly");
    } catch (error) {
        return res.status(404).send("Somthing wend wrong")
    }
}
 
module.exports = { getProduct, addProdcut, updateProduct, deleteProduct};