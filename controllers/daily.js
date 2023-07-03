// const Daily=require('../Models/Daily');
// const Order=require('../Models/Order');
// const DeliveryBoy=require('../Models/DeliveryBoy')

// //in update section do it properly from stupro
// exports.updateOrders=async (req,res)=>{
//     try {
//         const { orderId } = req.params;
//         const { adminNote } = req.body;
//         const dashboard = new Daily({ order: orderId, adminNote });
//         await dashboard.save();
//         res.json(dashboard);
        
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to update order via dashboard' });

//     }

// }

// exports.assignOrder=async (req,res)=>{
//     try {
//     const { orderId } = req.params;
//     const { deliveryBoyId } = req.body;
//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }
//     const deliveryBoy = await DeliveryBoy.findById(deliveryBoyId);
//     if (!deliveryBoy) {
//       return res.status(404).json({ error: 'Delivery boy not found' });
//     }
//     order.assignedTo = deliveryBoy;
//     await order.save();
//     res.json(order)
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to assign order' });

//     }
// }