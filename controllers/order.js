const Order=require('../Models/Order');
const Customer=require('../Models/Customer');
// const {startOfDay,endOfDay} =require('date-fns')

const today = new Date();
today.setHours(0, 0, 0, 0);

exports.createOrders=async ()=>{
 
    try {
        // Find the customer
        const today = new Date();
        const customers = await Customer.find({
          subscriptionStart: { $lte: today },
          subscriptionEnd: { $gte: today },
          rsub:{$gte:0}
        });
    // Create orders for each subscribed customer
    for (customer of customers) {
        // Check if the current day is not a weekend (Saturday or Sunday)
        // if (today.getDay() !== 0 && today.getDay() !== 6) {
        // then create
          
        // }
        const dinnerOrder = new Order({
          customerId: customer._id,
          customerName:customer.name,
          customerPhone:customer.phone,
          address:customer.address,
          orderDate: today,
          mealType: 'dinner',
          deliveryMan:customer.deliveryBoy.name,
          total:customer.dinnerTiffins *(customer.price),
          isCancelled: false,
        });
        

        const lunchOrder = new Order({
          customerId: customer._id,
          customerName:customer.name,
          customerPhone:customer.phone,
          orderDate: today,
          mealType: 'lunch',
          address:customer.address,
          deliveryMan:customer.deliveryBoy.name,
          total:customer.lunchTiffins * (customer.price),
          isCancelled: false,
        });

        if(customer.rsub>=0){
          await lunchOrder.save();
          customer.rsub=customer.rsub-lunchOrder.total
          await customer.save();

        }else{

          console.log('Your lunch cannot be completed');

        }

        if(customer.rsub>=0){
          await dinnerOrder.save();
          console.log('order craeted')
          customer.rsub=customer.rsub-dinnerOrder.total
          await customer.save();
        }else{
          console.log('Your dinner cannot be completed')

        }

        // res.status(201).json(lunchOrder);
       

}

      } catch (error) {
        console.error('Failed to create orders:', error);
        // res.status(500).json({ error: 'Failed to create orders' });
      }
}


exports.cancelOrder=async (req,res)=>{
    
    const { customerId, orderId } = req.params;

    try {
      // Find the customer by ID
      const customer = await Customer.findById(customerId);
  
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      // Find the order by ID
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Check if the order belongs to the customer
      if (order.customerId.toString() !== customer._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      // Check if the order is already cancelled
      if (order.isCancelled) {
        return res.status(400).json({ error: 'Order is already cancelled' });
      }
  
      // Cancel the order
      customer.rsub=customer.rsub+order.total
      customer.save();
      order.isCancelled = true;
      await order.save();
  
      res.json({ message: 'Order cancelled successfully' });
      console.log('cancelled')
    } catch (error) {
      console.error('Failed to cancel order:', error);
      res.status(500).json({ error: 'Failed to cancel order' });
    }
}


exports.getAllDinnerOrders=async (req,res)=>{
  try {
    // Retrieve all orders from the database
    const orders = await Order.find({ delivered:false,isCancelled:false,mealType:'dinner'});
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
exports.getAllLunchOrders=async (req,res)=>{
  try {
    const orders = await Order.find({ delivered:false,isCancelled:false,mealType:'lunch' });
    // createdAt: { $gte: startOfToday, $lte: endOfToday },
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
    console.log(error)
  }
}


exports.deleteOrders=async (req,res)=>{
  try {
    // Delete all orders from the database
    await Order.deleteMany();

    res.status(200).json({ message: 'All orders have been deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete orders' });
  }
}



exports.orderDelivery=async (req,res)=>{
    
  const { customerId, orderId } = req.params;

  try {
    // Find the customer by ID
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Find the order by ID
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the order belongs to the customer
    if (order.customerId.toString() !== customer._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Check if the order is already cancelled
    if (order.isCancelled) {
      return res.status(400).json({ error: 'Order is already cancelled' });
    }

    // Cancel the order
    order.delivered = true;
    await order.save();

    res.json({ message: 'Order Delivered successfully' });
    console.log('Delivered')
  } catch (error) {
    console.error('Failed to deliver order:', error);
    res.status(500).json({ error: 'Failed to Deliver order' });
  }
}