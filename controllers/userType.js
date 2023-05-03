const UserTypes = require("../models/UserTypes");

// @desc      ADD USER TYPE
// @route     POST /api/user/user_type
// @access    public
exports.addUserType = async (req, res) => {
  try {
    const response = await UserTypes.create(req.body);
    res.status(200).json({
      success: true,
      message: `succefully added user type ${response.userTypeName}`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      GET ALL USER TYPES
// @route     GET /api/user/get_all_usertypes
// @access    public
exports.getAllUserTypes = async (req, res) => {
  try {
    const response = await UserTypes.find();
    res.status(200).json({
      success: true,
      message: `all user types`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      GET SPECIFIC USER TYPE
// @route     GET /api/user/user_type
// @access    public
exports.getUserType = async (req, res) => {
  try {
    const { userTypeId } = req.query;
    const response = await UserTypes.findById(userTypeId);
    res.status(200).json({
      success: true,
      message: `specific user type`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      UPDATE SPECIFIC USER TYPE
// @route     PUT /api/user/user_type
// @access    public
exports.updateUserType = async (req, res) => {
  try {
    const { userTypeId } = req.body;
    const response = await UserTypes.findByIdAndUpdate(userTypeId, req.body);
    res.status(200).json({
      success: true,
      message: `updated specific user type`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      DELETE SPECIFIC USER TYPE
// @route     DELETE /api/user/user_type
// @access    public
exports.deleteUserType = async (req, res) => {
  try {
    const { userTypeId } = req.query;
    const response = await UserTypes.findByIdAndDelete(userTypeId);
    res.status(200).json({
      success: true,
      message: `deleted specific user type`,
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};
