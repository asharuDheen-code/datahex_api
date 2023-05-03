const router = require("express").Router();
// controllers
const {
  addUser,
  getUser,
  getAllUser,
  deleteCustomer,
  updateUser,
  updateUserField,
  deleteUser,
} = require("../controllers/user");
// middleware
const { protect, authorize } = require("../middleware/auth");

router
  .route("/user")
  .post(addUser)
  .get(protect, authorize("admin", "customer", "vendor"), getUser)
  .put(updateUser)
  .delete(deleteUser);
router.get(
  "/user/get_all_users",
  protect,
  authorize("admin", "customer", "vendor"),
  getAllUser
);
router.patch("/user/update_user_field", updateUserField);

module.exports = router;
