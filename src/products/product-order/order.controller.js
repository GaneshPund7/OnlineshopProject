// const { sendMail } = require('../../utils/nodemailer/sendMail');
const orderSchema = require('./order.modal');

async function getProduct(req, res) {
    try {
        const get_prodcuts = await orderSchema.find();
        return res.status(200).json({ message: "Data fetch successfuly..!", get_prodcuts });
    } catch (error) {
        return res.status(404).json("Somthing went wrong..!")
    }
}

// async function addProdcut(req, res) {
//     try {
//             const savedOrder = await orderSchema.create(req.body);
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

 
 
module.exports = { getProduct, addProdcut, updateProduct, deleteProduct};