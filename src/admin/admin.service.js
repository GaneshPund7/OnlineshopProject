const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const seckretKey = "GaneshPund"
const randomstring = require('randomstring');

async function createToken(payload, seckretKey) {    
   let token = jwt.sign(payload, seckretKey, { expiresIn: '5000s' });
    return token;
}

async function verifyAdminToken(req, res, next){
    try{
    const token = req.headers.authorization.split(' ')[1]
     jwt.verify(token, seckretKey);
    // return decoded
    next()
    }catch(error){
        res.status(400).json({message: "You dont have permission to access this service"})
    }
}

async function encryptPassword(password) {
    try {
        const comSalt = 10;
        const encryptPassword = await bcrypt.hash(password, comSalt);
        return encryptPassword
    } catch (error) {
        return res.status(400).send("Somthing went wrong..!")
    }
}

async function decryptpassword(password, encPassword) {
    try {
        const comaprepass = bcrypt.compare(password, encPassword);
        return comaprepass;
    } catch (error) {
        return res.status(404).send("Somthing went wrong..!")
    }
}
async function forgetpassword() {

}

 function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: 'numeric'
    });
}
module.exports = { encryptPassword, decryptpassword, createToken , verifyAdminToken, generateOTP}