import UserModel from "../models/User.Model.js";

// get
async function getUsers(req, res, next) {
  try {
    const allUser = await UserModel.getAllUser();

    res.status(200).json(allUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

export default { getUsers };
