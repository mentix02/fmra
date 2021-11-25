const User = require("../models/user");

const verifyRoleToken = (role) => async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];

  if (!token) {
    return res.status(403).json({
      message: "No token provided.",
    });
  }

  const user = await User.findOne({ token });
  if (!user)
    return res.status(403).json({
      message: "Invalid token.",
    });
  else if (user.role !== role)
    return res.status(403).json({
      message: "You are not authorized to perform this action.",
    });

  req.user = user;
  return next();
};

module.exports = {
  teacherAuth: verifyRoleToken("teacher"),
  studentAuth: verifyRoleToken("student"),
};
