const mongoose=require('mongoose');

const customerSchema=new mongoose.Schema({


    name:{
        type:String,
        trim:true,
        required:true,
        max:32,
        
    },
    email:{
      type:String,
      trim:true,
      max:32,
      lowercase:true,
  },
    address:{
        type:String,

    },
    phone:{
        type:Number,
        required:true
    },
    subscription:{
        type:Number,
    },
    dinnerTiffins: {
        type: Number,
      },
    lunchTiffins: {
        type: Number,
      },
    deliveryBoy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryBoy',
      },
    active:{
        type:Boolean,
        default:true,
      },
    subscriptionStart: {
        type: Date,
        // required:true
      },
    subscriptionEnd: {
        type: Date,
        // required:true
      },
      price:{
        type:Number
      },
      rsub:{
        type:Number,
      },
 
    pincode:{
        type:Number
    },
 
},{timestamps:true}
);
module.exports=mongoose.model('Customer',customerSchema);

// userSchema.virtual('password')
//      .set(function(password){
//          //create a temporarity variable called _password
//          this._password=password
//          //generate salt
//          this.salt=this.makeSalt()

//          //encryptPassword

//          this.hashed_password=this.encryptPassword(password)
//      })
//      .get(function(){
//          return this._password;
//      });

// userSchema.methods={
//     authenticate:function(plainText){
//      return this.encryptPassword(plainText)===this.hashed_password;
//     },


//     encryptPassword:function(password){
//         if(!password) return ''
//         try {
//             return crypto.createHmac('sha1',this.salt)
//             .update(password)
//             .digest('hex');
//         } catch (err) {
//             return ''
//         }
//     },
//     makeSalt:function(){
//         return Math.round(new Date().valueOf()*Math.random()) + '';
//     }
// };



