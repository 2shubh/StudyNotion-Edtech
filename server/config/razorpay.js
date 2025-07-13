const Razorpay = require("razorpay");


exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});


console.log("RZP ID:", process.env.RAZORPAY_KEY);
console.log("RZP SECRET:", process.env.RAZORPAY_SECRET);
