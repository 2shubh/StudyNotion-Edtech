const mongoose=require("mongoose")

const chatbotschema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },

    PhoneNumber:{
        type:Number,
        require:true,
    },

    email:{
        type:String,
        require:true,
    },

    querystring:{
        type:String,
        require:true,
    },
    
});

module.exports = mongoose.model("Chatbot", chatbotschema);