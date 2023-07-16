const DeliveryBoy=require('../Models/DeliveryBoy');
const Order=require('../Models/Order');
const Customer=require('../Models/Customer')
const bcryptjs=require('bcrypt');
const jwt = require('jsonwebtoken');


exports.createDeliveryBoy=async(req,res)=>{
    try {
        const { username,name,password } = req.body;

        const salt=await bcryptjs.genSalt(10);
        const hashPassword=await bcryptjs.hash(password,salt)

        const deliveryBoy = new DeliveryBoy({username, name, password:hashPassword });

        await deliveryBoy.save();
        res.status(201).json(deliveryBoy);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create delivery boy' });

    }
}
exports.loginBoy=async(req,res)=>{
try {
  const { username,password } = req.body;
  const deliveryBoy = await DeliveryBoy.findOne({username:username});

  if(!deliveryBoy){
    res.json('No Such Employee Found')
    console.log('No Employee')

  }
  const validPassword=await bcryptjs.compare(password,deliveryBoy.password)

  if(!validPassword){
    res.json('Your Password is Wrong')
    console.log('wrong password')
  }else{
    const tokenData={
      id:deliveryBoy._id,
      role:deliveryBoy.role,
      username:deliveryBoy.username,
    }
    const token= jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'1d'})

    res.cookie('token',token, { httpOnly: true})
    res.json({ token, tokenData});
    console.log(token)

  }

} catch (error) {
  res.status(500).json({ error: 'Failed to Login' });
}
}

exports.signout=async (req,res)=>{
  try {
       res.clearCookie('token');
       res.json({
      message:'Signout success'
  })
  } catch (err) {
       console.error(err.message);
       res.status(500).send('Server error');
  }
 
};



exports.getDeliveryBoys=async (req,res)=>{
    try {
        const deliveryBoys = await DeliveryBoy.find({});
        if(!deliveryBoys){
            console.log("No delivey boy found")
        }
        await res.json(deliveryBoys);
      } catch (error) {
        console.log('Failed to fetch delivery boy:', error);
        res.status(500).json({ error: 'Failed to fetch delivery boys' });
      }
}
exports.getSingleBoy=async (req,res)=>{
    const {deliveryId}=req.params;


    try {
        // Find the delivery boy by ID
        const deliveryBoy = await DeliveryBoy.findById(deliveryId);
    
        if (!deliveryBoy) {
          return res.status(404).json({ error: 'Delivery boy not found' });
        }
    
        // Find the customers assigned to the delivery boy with the given ID
        const customers = await Customer.find({ deliveryBoy: deliveryId });
    
        // Get the customer IDs
        const customerIds = customers.map(customer => customer._id);
    
        // Find the orders for the customer IDs and current date
        const deliveryBoyOrders = await Order.find({
          customerId: { $in: customerIds },
          isCancelled: false,
          delivered:false
        });
    
        res.json(deliveryBoyOrders);
      } catch (error) {
        console.error('Failed to fetch delivery boy orders:', error);
        res.status(500).json({ error: 'Failed to fetch delivery boy orders' });
      }
}

exports.deletBoys=async (req,res)=>{
  try {
    // Delete all orders from the database
    await DeliveryBoy.deleteMany();

    res.status(200).json({ message: 'All Delivery Boys have been deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete orders' });
  }
}
