const mongoose = require("mongoose");

const SleepRecordSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a creator"],
    },
    // user might add a record some day later
    fallingAsleepTime: {
      type: Date,
      required: [true, "Please provide falling asleep time"],
    },
    wakeupTime: {
      type: Date,
      required: [true, "Please provide waking up time"],
      validate: [
        function (wakeupTime) {
          console.log(wakeupTime, this.fallingAsleepTime, this._id);
          return wakeupTime > this.fallingAsleepTime;
        },
        "Waking up time must be later than falling asleep time",
      ],
    },
    comment: {
      type: String,
      maxlength: [1000, "Maximum comment length is 1000"],
    },
    awakenings: {
      type: Number,
      default: 0,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      min: [0, "You cannot have a negative number of awakenings"],
    },
    fallingAsleepMood: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      required: [true, "Please provide a mood during falling asleep"],
      min: [0, "Values 0-10 are available"],
      max: [10, "Values 0-10 are available"],
    },
    wakeupMood: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      required: [true, "Please provide a wakeup mood"],
      min: [0, "Values 0-10 are available"],
      max: [10, "Values 0-10 are available"],
    },
    sleepinessBefore: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      required: [true, "Please provide sleepiness before value"],
      min: [0, "Values 0-10 are available"],
      max: [10, "Values 0-10 are available"],
    },
    sleepinessAfter: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
      required: [true, "Please provide sleepiness after value"],
      min: [0, "Values 0-10 are available"],
      max: [10, "Values 0-10 are available"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SleepRecord", SleepRecordSchema);
