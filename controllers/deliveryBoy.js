const DeliveryBoy=require('../Models/DeliveryBoy');
const Order=require('../Models/Order');
const Customer=require('../Models/Customer')

exports.createDeliveryBoy=async(req,res)=>{
    try {
        const { username,name,password } = req.body;
        const deliveryBoy = new DeliveryBoy({username, name, password });
        await deliveryBoy.save();
        res.status(201).json(deliveryBoy);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create delivery boy' });

    }
}

exports.getDeliveryBoys=async (req,res)=>{
    try {
        const deliveryBoys = await DeliveryBoy.find();
        if(!deliveryBoys){
            console.log("No delivey boy found")
        }
        res.json(deliveryBoys);
      } catch (error) {
        console.log('Failed to fetch delivery boy:', error);
        res.status(500).json({ error: 'Failed to fetch delivery boys' });
      }
}
exports.getSingleBoy=async (req,res)=>{
    const {deliveryId}=req.params;
    const currentDate = new Date().toISOString().split('T')[0];


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
        //   orderDate: currentDate,
          isCancelled: false
        });
    
        res.json(deliveryBoyOrders);
      } catch (error) {
        console.error('Failed to fetch delivery boy orders:', error);
        res.status(500).json({ error: 'Failed to fetch delivery boy orders' });
      }
}