const Order=require('../Models/Order');
const Customer=require('../Models/Customer');
const {startOfDay,endOfDay} =require('date-fns')

// exports.createOrder=async (req,res)=>{
//     try {
//         const { customerId, dinner,lunch,total } = req.body;
//         const customer = await Customer.findById(customerId);
//         if (!customer) {
//           return res.status(404).json({ error: 'Customer not found' });
//         }
//         const order = new Order({ customerId, dinner,lunch,total });
//         await order.save();
//         res.status(201).json(order);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to create order' });

//     }
// }
const today = new Date();
const startOfToday = startOfDay(today);
const endOfToday = endOfDay(today);

exports.createOrders=async ()=>{
    // const { customerId, subscriptionStartDate, subscriptionEndDate } = req.body;
 
    try {
        // Find the customer
        const today = new Date();
        const customers = await Customer.find({
          subscriptionStart: { $lte: today },
          subscriptionEnd: { $gte: today },
        });
    // Create orders for each subscribed customer
    for (customer of customers) {
        // Check if the current day is not a weekend (Saturday or Sunday)
        // if (today.getDay() !== 0 && today.getDay() !== 6) {
        // then create
          
        // }
        const price=60;
        const dinnerOrder = new Order({
          customerId: customer._id,
          customerName:customer.name,
          customerPhone:customer.phone,
          orderDate: today,
          mealType: 'dinner',
          total:customer.dinnerTiffins * price,
          isCancelled: false,
        });

        const lunchOrder = new Order({
          customerId: customer._id,
          customerName:customer.name,
          customerPhone:customer.phone,
          orderDate: today,
          mealType: 'lunch',
          total:customer.lunchTiffins * price,
          isCancelled: false,
        });

        await dinnerOrder.save();
        await lunchOrder.save();
        // res.status(201).json(lunchOrder);
        console.log('order craeted')
       

}

      } catch (error) {
        console.error('Failed to create orders:', error);
        // res.status(500).json({ error: 'Failed to create orders' });
      }
}

// exports.inactiveOrders=async ()=>{
//   try {
//     // Find the orders that are not cancelled and have been created 23 hours ago
//     const ordersToUpdate = await Order.find({
//       isCancelled: false,
//       createdAt: { $lte: new Date(Date.now() - 23 * 60 * 60 * 1000) },
//     });

//     // Update the orders and set isCancelled to true
//     await Order.updateMany(
//       { _id: { $in: ordersToUpdate.map((order) => order._id) } },
//       { $set: { isCancelled: true } }
//     );

//     console.log('Orders cancelled successfully.');
//   } catch (error) {
//     console.error('Error cancelling orders:', error);
//   }
// }

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
    const orders = await Order.find({ isCancelled:false,mealType:'dinner'});
    // createdAt: { $gte: startOfToday, $lte: endOfToday },
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
exports.getAllLunchOrders=async (req,res)=>{
  try {
    // Retrieve all orders from the database
    const orders = await Order.find({ isCancelled:false,mealType:'lunch'});
    // createdAt: { $gte: startOfToday, $lte: endOfToday },
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
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
// const customer = await Customer.findById(customerId);
    
// // Create daily dinner and lunch orders for the subscribed period
// const orders = [];
// const currentDate = new Date(subscriptionStartDate);
// const endDate = new Date(subscriptionEndDate);
// while (currentDate <= endDate) {
//   // Check if the order is not cancelled for the current date
//   if (!customer.cancellations.includes(currentDate.toISOString().split('T')[0])) {
//       const order = new Order({
//       customer: customer._id,
//       date: currentDate,
//       // Set other order details...
//     });
//     orders.push(await order.save());
//   }
//   currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
// }

// res.status(201).json({ orders });

//list All orders with details of customer


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