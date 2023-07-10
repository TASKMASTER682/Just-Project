const mongoose=require('mongoose');


const orderSchema = new mongoose.Schema({
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: true
    },
    customerName: {
      type:String,
      required: true
    },    
    customerPhone: {
      type:Number,
      required: true
    },
    address:{
      type:String
    },
    mealType: {
        type: String,
        enum: ['dinner', 'lunch'],
      },
    isCancelled: {
        type: Boolean,
        default: false,
      },
    price:{
      type:Number,
    },
    deliveryMan:{
      type:String
    },
    delivered:{
      type:Boolean,
      default:false
    },
    total:{
      type:Number
    }

  },{timestamps:true});


  module.exports=mongoose.model('Order',orderSchema);