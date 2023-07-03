const Customer=require('../Models/Customer')
const DeliveryBoy=require('../Models/DeliveryBoy');
const Order =require('../Models/Order');
const {subMonths}=require('date-fns');

exports.createCustomer=async (req,res)=>{

    const { name,address,phone,email,subscription,subscriptionStart, subscriptionEnd, dinnerTiffins, lunchTiffins,pincode,deliveryBoy } = req.body;


    try {
        const userExist =await Customer.findOne({phone:phone});
        const assignedDeliveryBoy = await DeliveryBoy.findById(deliveryBoy);

        if(userExist){
            res.status(401).json('User with this phone number already exist')
            console.log('User with this phone number already exist')
        }else{
            if (!assignedDeliveryBoy) {
                return res.status(404).json({ error: 'Delivery boy not found' });
              }
            const customer = new Customer({ name,address,phone,email,subscription,subscriptionStart, subscriptionEnd, dinnerTiffins, lunchTiffins,pincode,deliveryBoy: assignedDeliveryBoy._id});
            await customer.save();
            // const data = await response.json();

            res.status(201).json('User Created');
        }        
    } catch (error) {
        res.status(500).json({ error: 'Failed to create customer' });
        res.json(req.body);

    }
}
exports.updateCustomer=async (req,res)=>{
    try {
        const customerId = req.params.id;
        const updatedCustomer = req.body;
    
        const result = await Customer.findByIdAndUpdate(customerId, updatedCustomer, { new: true });
    
        res.json(result);
      } catch (error) {
        console.log('Failed to update customer:', error);
        res.status(500).json({ error: 'Failed to update customer' });
      }
}

exports.getAllCustomers=async (req,res)=>{
    try {
        const customers = await Customer.find().sort(-1);
        res.json(customers);
      } catch (error) {
        console.log('Failed to fetch customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
      }
}

exports.customerOrderHistory=async (req,res)=>{
  try {
    // Get the customer ID from the request parameters
    const { customerId } = req.params;
    const lastMonth = subMonths(new Date(), 1);

    // Find the customer by ID
    const customer = await Customer.findById(customerId);

    // If the customer doesn't exist, return an error
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Find all orders for the customer
    const orders = await Order.find({customerId});
    // Prepare the response data
    const orderHistory = orders.map((order,key) => (
      
       { 
        orderDate: order.createdAt,
        name:order.customerName,
        isCancelled: order.isCancelled,
        newMeal:order.mealType,
        deliveryStatus: order.delivered ,
        lunches:customer.lunchTiffins,
        dinners:customer.dinnerTiffins,
        orderId:order._id,
        subscription:customer.subscription
       }
    ));
    // Send the order history as the API response
    res.json(orderHistory);
  } catch (error) {
    console.error('Failed to fetch order history:', error);
    res.status(500).json({ error: 'Failed to fetch order history' });
  }
}


