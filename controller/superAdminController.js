const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

const adminRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorResponse("Please Input all field", 400));
  }
  const typeOfUser = "Admin";
  try {
    const user = await User.create({
      username,
      email,
      password,
      typeOfUser,
    });
    res.status(200).json({
      success: true,
      data: "admin added",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdmin = async(req,res,next)=>{
    try {
        const admin = await User.findById(req.params.id);
        await admin.remove();
        res.status(200).json({
            message:'Admin deleted',
        })
        
    } catch (error) {
        res.status(400).json({
            message:'Admin not Found'
        })
        
    }

}
module.exports = {adminRegister,deleteAdmin}
