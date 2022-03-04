"use strict";
exports.__esModule = true;
var jwt = require('jsonwebtoken');
function isAuth(req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        var token = req.headers.authorization.split(' ')[1]; // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        var decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(401).json({ message: "Unauthorized" });
    }
}
exports["default"] = isAuth;
