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

// post
async function postUser(req, res, next) {
  try {
    const { userName, email } = req.body;

    if (!userName || !email) {
      return res
        .status(400)
        .json({ message: "userName and email are required" });
    }

    const newUser = await UserModel.postUser({ userName, email });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
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

export default { getUsers, postUser, deleteUser, getSingleUser };
