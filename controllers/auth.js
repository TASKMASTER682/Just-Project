const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const DeliveryBoy = require('../Models/DeliveryBoy');



// function authenticateUser(username, password) {
//     // Implement your authentication logic here
//     // For simplicity, assume authentication is successful if the username and password match
//     return username === 'admin' && password === 'password';
//   }


exports.signin= async (req,res)=>{

    try {
        const { username, password } = req.body;

        const deliveryBoy = await DeliveryBoy.findOne({username:username});

        
      
        if (!deliveryBoy) {
          return res.status(400).json({
            error: 'User with that username does not exist. Please sign up',
          });
        }

        // const isMatch = await bcrypt.compare(password, deliveryBoy.password);

        // if (!isMatch) {
        //   return res.status(401).json({
        //     error: 'Invalid username or password',
        //   });
        // }
        // if (password !== deliveryBoy.password) {
        //     return res.status(401).json({
        //       error: 'Invalid username or password',
        //     });
        //   }
        const token = jwt.sign({ _id: deliveryBoy._id }, process.env.JWT_SECRET, {
          expiresIn: '2d',
        });
      
        res.cookie('token', token, { expiresIn: '2d' });
        const { _id, name } = deliveryBoy;
        return res.json({
            _id,
            username,
            name,
            token,
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
} 
// Middleware to require authentication
exports.requireSignin = (req, res, next) => {
    // Check if the Authorization header is present
    if (req.headers && req.headers.authorization) {
      // Extract the token from the Authorization header
      const token = req.headers.authorization.split(' ')[1];
  
      try {
        // Verify the token
        const decoded = jwt.verify(token, secretKey);
        // Add the decoded payload to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware
      } catch (error) {
        res.status(401).send('Invalid token');
      }
    } else {
      res.status(401).send('Authorization header missing');
    }
  };
  
  exports.adminMiddleware =async (req, res, next) => {
    try {
            const adminUserId = req.deliveryBoy._id;
       await DeliveryBoy.findById({ _id: adminUserId }).exec((err, deliveryBoy) => {
            if (err || !deliveryBoy) {
                return res.status(400).json({
                    error: 'deliveryBoy not found'
                });
            }
    
            if (deliveryBoy.role !== 22) {
                return res.status(400).json({
                    error: 'Admin resource. Access denied'
                });
            }
    
            req.username = deliveryBoy;
            next();
        });
    } catch (err) {
         console.error(err.message);
        res.status(500).send('Server error');
    }
    };

    exports.authMiddleware=async (req,res,next)=>{
        try {
            const authUserId=req.deliveryBoy._id;
        await DeliveryBoy.findById({_id:authUserId}).exec((err,deliveryBoy)=>{
            if(err|| !deliveryBoy){
                return res.status(400).json({
                    error:'User not found'
                })
            }
            req.username=deliveryBoy;
            next()
        })
        } catch (err) {
             console.error(err.message);
            res.status(500).send('Server error');
        }
        };
// exports.signout=async (req,res)=>{
//     try {
//          res.clearCookie('token');
//          res.json({
//         message:'Signout success'
//     })
//     } catch (err) {
//          console.error(err.message);
//          res.status(500).send('Server error');
//     }
   
// };
// exports.requireSignin=expressJwt({
//     secret:process.env.JWT_SECRET,
//     algorithms:["HS256"],
    
// });

// exports.authMiddleware=async (req,res,next)=>{
// try {
//     const authUserId=req.deliveryBoy._id;
// await DeliverBoy.findById({_id:authUserId}).exec((err,deliveryBoy)=>{
//     if(err|| !deliveryBoy){
//         return res.status(400).json({
//             error:'DeliveryBoy not found'
//         })
//     }
//     req.profile=deliveryBoy;
//     next()
// })
// } catch (err) {
//      console.error(err.message);
//     res.status(500).send('Server error');
// }
// };

// exports.adminMiddleware =async (req, res, next) => {
// try {
//         const adminUserId = req.deliveryBoy._id;
//    await User.findById({ _id: adminUserId }).exec((err, deliveryBoy) => {
//         if (err || !deliveryBoy) {
//             return res.status(400).json({
//                 error: 'User not found'
//             });
//         }

//         if (deliveryBoy.role !== 22) {
//             return res.status(400).json({
//                 error: 'Admin resource. Access denied'
//             });
//         }

//         req.profile = deliveryBoy;
//         next();
//     });
// } catch (err) {
//      console.error(err.message);
//     res.status(500).send('Server error');
// }
// };



