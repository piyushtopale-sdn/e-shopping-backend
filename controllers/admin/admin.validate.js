const { check, validationResult } = require('express-validator');
const message = require("../../consts/messages");
const response = require("../../consts/response");


exports.validateAdmin = [
    check("name")
        .exists()
        .withMessage("MISSING")
        .not()
        .isEmpty()
        .withMessage(message.IS_EMPTY),
    check("email")
        .exists()
        .withMessage(message.IS_EMPTY)
        .isEmail()
        .withMessage(message.EMAIL_NOT_VALID),
    check("password")
        .exists()
        .withMessage("PASSWORD MISSING")
        .not()
        .isEmpty()
        .withMessage("PASSWORD IS_EMPTY"),
    check("phone")
        .exists()
        .withMessage("PHONE MISSING")
        .not()
        .isEmpty()
        .withMessage("PHONE IS_EMPTY")
        .isLength({
            min: 10,
            max: 10
        })
        .withMessage("PHONE NO. IS NOT VALID"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.errorMessageResponse(res, 406, errors.array());
        } else {
            next();
        }
    },
];