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

// Post
async function postUser(req, res, next) {
  try {
    const { userName, email } = req.body;

    if (!userName || !email) {
      return res
        .status(400)
        .json({ message: "userName and email are required" });
    }
    const user = await UserModel.postUser({ userName, email });
    const status = user.created_at ? 201 : 200;
    return res.status(status).json(user);
  } catch (err) {
    next(err);
    return res.status(500).json({ message: err.message });
  }
}

// delete
async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const deletedUser = await UserModel.deleteUser(id);

    if (!deletedUser || deletedUser.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// get single user
async function getSingleUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await UserModel.getSingleUser(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

// get user by email
async function getUserEmail(req, res, next) {
  try {
    const email = req.query.email?.trim();

    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.filterUserEmail (email);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

export default { getUsers, postUser, deleteUser, getSingleUser, getUserEmail };
