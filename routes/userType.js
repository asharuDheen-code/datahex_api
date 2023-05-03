const router = require("express").Router();
// controllers
const {
  addUserType,
  getAllUserTypes,
  getUserType,
  updateUserType,
  deleteUserType,
} = require("../controllers/userType");
// middleware
const { protect, authorize } = require("../middleware/auth");

router
  .route("/user_type")
  .post(addUserType)
  .get(getUserType)
  .put(updateUserType)
  .delete(deleteUserType);

router.get(
  "/get_all_usertypes",
  protect,
  // authorize("admin", "customer", "vendor"),
  getAllUserTypes
);

module.exports = router;
