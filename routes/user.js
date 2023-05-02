const router = require("express").Router();
const {
  addUser,
  getUser,
  getAllUser,
  deleteCustomer,
  updateUser,
  updateUserField,
  deleteUser,
} = require("../controllers/user");

router
  .route("/user")
  .post(addUser)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);
router.get("/user/get_all_users", getAllUser);
router.patch("/user/update_user_field", updateUserField);

module.exports = router;
