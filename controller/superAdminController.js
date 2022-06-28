const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

const adminRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorResponse('Please Input all field', 400));
  }
  const role = 'Admin';
  try {
    const user = await User.create({
      username,
      email,
      password,
      role,
    });
    res.status(200).json({
      message: 'admin added',
      statusCode: 200,
      data: [{ email: user.email, role: user.role }],
    });
    return next();
  } catch (error) {
    return next(error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findById(req.params.id);
    await admin.remove();
    res.status(200).json({
      message: 'Admin deleted',
    });
  } catch (error) {
    res.status(400).json({
      message: 'Admin not Found',
    });
  }
};
module.exports = { adminRegister, deleteAdmin };
