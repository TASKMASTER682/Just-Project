const mongoose = require('mongoose');

const deliveryBoySchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        max:32,
        unique:true,
        index:true,
        lowercase:true
    },
    name: {
      type: String,
      required: true
    },
 
    password:{
        type:String,
        required:true
    },
    role:{
      type:Number,
      default:1
    },

    assignedOrders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }]
  })

  module.exports=mongoose.model('DeliveryBoy',deliveryBoySchema);