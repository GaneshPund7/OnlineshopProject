// const { sendMail } = require('../../utils/nodemailer/sendMail');
const orderSchema = require('./order.modal');
const  productSchema = require('../stock/stock.modal');
async function getProduct(req, res) {
    try {
        const get_prodcuts = await productSchema.find().populate('productdetails');

        return res.status(200).json({ message: "Data fetch successfuly..!", get_prodcuts });
    } catch (error) {
        return res.status(404).json("Somthing went wrong..!")
    }
}
// GET all products
 
  async function getProductByID(req, res) {
  try {
    const productId = req.params.id;
    const product = await productSchema.findById(productId).populate()
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get product', error: err });
  }
}


// async function addOrder(req, res) {
//     try {
//             const savedOrder = await productSchema.findById(req.body);
//             res.status(201).json({ message: "Product order created", order: savedOrder });     
//     } catch (error) {
//         res.status(500).json({ message: "Failed to create order", error });
//     }
// }

// const addProductToOrder = async (req, res) => {
//     try {
//       const newOrder = new ProductOrder(req.body); // or use the object shown above directly
//       const savedOrder = await newOrder.save();
//       res.status(201).json({ message: "Product order created", order: savedOrder });
//     } catch (error) {
//       console.error("Error saving product order:", error);
//       res.status(500).json({ message: "Failed to create order", error });
//     }
//   };

 
 
module.exports = { getProduct,getProductByID};