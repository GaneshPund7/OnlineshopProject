const { sendMail } = require('../../utils/nodemailer/sendMail');
const adminSchema = require('./admin.modal');
const otpSchema = require('../../auth/otp/otp.modal');
const {encryptPassword, createToken, verifyToken} = require('./admin.service');
const randomstring = require('randomstring');
const jwt = require('jsonwebtoken');
const seckretKey = "GaneshBhai"
const { generateOTP } = require('./admin.service');

async function getAdmin(req, res) {
    try {
        const get_user = await adminSchema.find();
        return res.status(200).json({ message: "Data fetch successfuly..!", get_user });
    } catch (error) {
        return res.status(404).json("Somthing went wrong..!")
    }
}

async function addAdmin(req, res) {
    const { adminName, email, password } = req.body;
    let encPassword = await encryptPassword(password);
    try {
        if (!adminName || !email || !password) {
            return res.status(400).send("All field are required..!");
        } else {
            const addAdmin = await adminSchema.create({ adminName, email, password: encPassword});
            return res.status(200).json({ message: "Data added successfuly..!", addAdmin })
        }
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

async function updateAdmin(req, res) {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Invalid Id Please try agian");
    }
    const updateAdmin = await adminSchema.findOneAndUpdate({ _id: id }, req.body, { new: true });

    return res.status(200).json("User Updated successfully..!", updateAdmin);

}

async function deleteAdmin(req, res) {
    const { id } = req.params;
    try {
        await adminSchema.findOneAndRemove({ _id: id });
        res.status(200).send("User Deleted Successfuly");
    } catch (error) {
        return res.status(404).send("Somthing wend wrong")
    }
}

async function forgetPassword(req, res) {
    // const allEmails =[
    //     "sachin.ram@nimapinfotech.com",
    //    "ganeshpund0000@gmail.com"
    // ]
    const { email } = req.body;
    const get_user = await adminSchema.findOne({ email });
     const token = await createToken(req.body,seckretKey);
    const otp = generateOTP();
    await otpSchema.create({ email, otp });
    if (!get_user) {
        res.status(404).json({token: token, message: "Email is not found..." });
    }
    await sendMail(email, otp);
    res.status(200).send("Password send on register mail");
}

async function verifyOtp(req, res) {
    const { email, otp } = req.body;
    // const token = req.headers.authorization.split(' ')[1]
 
    try {
        // const decoded = jwt.verify(token, seckretKey);
        // const email = token.email;
        // console.log("email",email)

        const verifyOtp = await otpSchema.findOneAndDelete({ email, otp });
        if (verifyOtp) {
            res.status(200).json({ success: true, message: "Otp verify successfully..!" });
        } else {
            res.status(400).json({ success: false, message: "Invalid opt please try again..!" });
        }
    } catch (error) {
        console.log(error.message)
    }
}

async function updatePassword(req, res) {
    const { email, password} = req.body;
    let encPassword = await encryptPassword(password);
    try { 
        const updatePassword = await adminSchema.findOneAndUpdate({ email }, {password:encPassword}, { new: true });
        if (updatePassword) {
            return res.status(200).json({ message: "Password Updated successfully" });
        }
    } catch (error) {
        return res.status(404).json({message: "Somthing went wrong", error: error.message});
    }
}
module.exports = { getAdmin, addAdmin, updateAdmin, deleteAdmin, forgetPassword, verifyOtp, updatePassword};