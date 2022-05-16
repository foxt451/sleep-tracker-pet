const mongoose = require("mongoose");

const SleepRecordSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a creator"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SleepRecord", SleepRecordSchema);
