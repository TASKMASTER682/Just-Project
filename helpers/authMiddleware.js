exports.isAdmin=async (req,res,next)=>{
    try {
            const adminUserId = req.deliveryBoy._id;

            await DeliveryBoy.findById({ _id: adminUserId }).exec((err, deliveryBoy) => {
                if (err || !deliveryBoy) {
                    return res.status(400).json({
                        error: 'Delivery Boy not found'
                    });
                }
                if (deliveryBoy.role !== 10) {
                    return res.status(400).json({
                        error: 'Admin resource. Access denied'
                    });
                }
                req.id = deliveryBoy;
                next();
            });

        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
}








// export const createJob = async (job, token) => {

//     return await fetch(`${API}/job`, {
//         method: 'POST',
        // headers: {
        //     Accept: 'application/json',
        //     Authorization: `Bearer ${token}`
        // },
//         body: job
//     })
//         .then(response => {
//             handleResponse(response);
//             return response.json();
//         })
//         .catch(err => console.log(err));
// };


// const token = getCookie('token');


// createJob(formData, token).then(data => {