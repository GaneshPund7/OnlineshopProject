const razorpay = require("./razorpay");

const createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;
  try {
    if (!amount) {
      res.status(400).json({ error: "Amount is required to procced..!" })
    }
    const paymentDetails = {
      amount: amount* 100,
      currency: currency || "INR",
      receipt: receipt || `${Date.now()}`,
    };
    const order = await razorpay.orders.create(paymentDetails);
    res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({ error: "Payment failed plese try again" });
  }
};

module.exports = createOrder;