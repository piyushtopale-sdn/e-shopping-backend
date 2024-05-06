import response from "../../consts/response";
import MESSAGE from "../../consts/messages";
import Admin from '../../models/admin';
import bcrypt from "bcryptjs";
const db = require("../../services/db");

//API to create Admin
export const createAdmin = async (req, res) => {
    const {
        name,
        email,
        phone,
        status,
    } = req.body;
    if (req?.file && req?.file?.filename) {
        var image = req.file.filename
    }
    const password = bcrypt.hashSync(req.body.password, 8);
    try {
        // Validate if user exist in our database
        const oldAdmin = await Admin.findOne({
            email
        });

    if (oldAdmin) return response.somethingErrorMsgResponse(res, 409, "Email already exists");

        let admin = new Admin({
            name,
            email,
            password,
            phone,
            image,
            status,
            accessToken: null,
        })
        const resObject = await admin.save();
        resObject.password = undefined;
        return response.successResponse(res, 200, resObject, MESSAGE.ADMIN_ADDED, resObject.length);
    } catch (error) {
        console.log(error);
        return response.somethingErrorMsgResponse(res, 500, error);
    }
};
