const jwt = require("jsonwebtoken");
import MESSAGE from "../consts/messages";
import response from "../consts/response";

const config = process.env;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && req.headers.authorization.includes("Bearer ")) {
    let token = authHeader.split("Bearer ")[1];
    if (!token)
      return response.successResponse(res, 404, {}, MESSAGE.EMPTY_TOKEN);
    jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
      if (err)
        return response.somethingErrorMsgResponse(
          res,
          403,
          MESSAGE.TOKEN_INVALID
        );
      req._id = decoded._id;
      req.email = decoded.email;
      next();
    });
  } else {
    return response.errorMessageResponse(res, 403, MESSAGE.EMPTY_TOKEN)
  }
};


