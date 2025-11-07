import TiresModel from "../models/Tires.Model.js";

// get
async function getTires(req, res, next) {
  try {
    const allController = await TiresModel.getAllTires();

    res.status(200).json(allController);
  } catch (err) {
    res.status(500).json({ message: err.message });
    next(err);
  }
}

export default { getTires };
