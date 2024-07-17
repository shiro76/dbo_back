const { body, validationResult } = require('express-validator');

const validateSignup = [
    body('username')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
        .trim().escape(),
    body('email')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
        .escape(),
    body('password2')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }).escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateLogin = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .trim().escape(),
    body('password')
        .notEmpty().withMessage('Password is required')
        .escape(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateSignup,
    validateLogin
};





// const { body, validationResult } = require('express-validator');

// const validateSignup = [
//     body('username')
//         .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long')
//         .trim().escape(),
//     body('email')
//         .isEmail().withMessage('Please enter a valid email address')
//         .normalizeEmail(),
//     body('password')
//         .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
//         .escape(),
//     body('password2')
//         .custom((value, { req }) => {
//             if (value !== req.body.password) {
//                 throw new Error('Passwords do not match');
//             }
//             return true;
//         }).escape(),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//     }
// ];
