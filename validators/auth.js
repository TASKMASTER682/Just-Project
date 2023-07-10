const {check}=require('express-validator');


// exports.userSignupValidator=[
//     check('name').not().isEmpty().withMessage('name is required'),
//     check('email').isEmail().withMessage('Unique email is required'),
//     check('password').isLength({min:6}).withMessage('password must be of minimum 6 characters'),

// ];

exports.userSigninValidator=[
    check('email').isEmail().withMessage('Unique email is required'),
    check('password').isLength({min:6}).withMessage('password must be of minimum 6 characters'),

];

// exports.forgotPasswordValidator = [
//     check('email')
//         .not()
//         .isEmpty()
//         .isEmail()
//         .withMessage('Must be a valid email address')
// ];

// exports.resetPasswordValidator = [
//     check('newPassword')
//         .not()
//         .isEmpty()
//         .isLength({ min: 6 })
//         .withMessage('Password must be at least 6 characters long')
// ];