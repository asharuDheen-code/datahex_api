const multer = require("multer");
const uniqid = require("uniqid");
//
const User = require("../models/User");

const id = uniqid();

// multer
const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase();
    cb(null, id + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// @desc      create user
// @route     POST /api/v1/user
// @access    public
exports.addUser = async (req, res) => {
  try {
    const singleImage = upload.single("image");
    singleImage(req, res, async function (err) {
      const url = req.protocol + "://" + req.get("host");
      // const user = new User({
      //   userDisplayName: req?.body?.userDisplayName,
      //   username: req?.body?.username,
      //   email: req?.body?.email,
      //   authType: req?.body?.authType,
      //   authKey: req?.body?.authKey,
      //   userType: req?.body?.userType,
      //   userImage: url + "/images/" + req?.file?.filename,
      // });
      const user = await User.create({
        userDisplayName: req?.body?.userDisplayName,
        username: req?.body?.username,
        email: req?.body?.email,
        authType: req?.body?.authType,
        authKey: req?.body?.authKey,
        userType: req?.body?.userType,
        userImage: url + "/images/" + req?.file?.filename,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "successfully added",
          });
        })
        .catch((err) => {
          console.log(err),
            res.status(500).json({
              error: err,
            });
        });
    });
  } catch (err) {
    console.log("all error", err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      create user
// @route     POST /api/v1/user
// @access    public
// exports.createUser = async (req, res) => {
//   try {
//     const response = await User.create(req.body);
//     res.status(200).json({
//       success: true,
//       message: "succefully registered",
//       // response,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(204).json({
//       success: false,
//       message: err,
//     });
//   }
// };

// @desc      get user
// @route     GET /api/user
// @access    public
exports.getUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const response = await User.findById(userId);
    res.status(200).json({
      success: true,
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

// @desc      get all users
// @route     GET /api/v1/user/get_all_users
// @access    public
exports.getAllUser = async (req, res) => {
  try {
    const { user } = req.query;
    const response = await User.find();
    res.status(200).json({
      success: true,
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

// @desc      update user
// @route     PUT /api/v1/user
// @access    public
exports.updateUser = async (req, res) => {
  try {
    const singleImage = upload.single("image");
    singleImage(req, res, async function (err) {
      const url = req.protocol + "://" + req.get("host");
      const { user_id } = req.body;
      const user = await User.findByIdAndUpdate(user_id, {
        userDisplayName: req?.body?.userDisplayName,
        username: req?.body?.username,
        email: req?.body?.email,
        authType: req?.body?.authType,
        authKey: req?.body?.authKey,
        userType: req?.body?.userType,
        userImage: url + "/images/" + req?.file?.filename,
      });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "successfully added",
          });
        })
        .catch((err) => {
          console.log(err),
            res.status(500).json({
              error: err,
            });
        });
    });
  } catch (err) {
    console.log("all error", err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      update user field
// @route     PATCH /api/v1/user/update_user_field
// @access    public
exports.updateUserField = async (req, res) => {
  try {
    const singleImage = upload.single("image");
    singleImage(req, res, async function (err) {
      const url = req.protocol + "://" + req.get("host");
      const { user_id, userDisplayName } = req.body;
      const user = await User.findByIdAndUpdate(user_id, { userDisplayName });
      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "successfully added",
          });
        })
        .catch((err) => {
          console.log(err),
            res.status(500).json({
              error: err,
            });
        });
    });
  } catch (err) {
    console.log("all error", err);
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};

// @desc      delete user
// @route     DELETE /api/v1/user
// @access    public
exports.deleteUser = async (req, res) => {
  try {
    const { user_id } = req.query;
    const response = await User.findByIdAndDelete(user_id);
    res.status(200).json({
      success: true,
      message: "succefully deleted",
    });
  } catch (err) {
    res.status(204).json({
      success: false,
      message: err,
    });
  }
};
