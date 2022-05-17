const SleepRecord = require("../models/SleepRecord");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllRecords = async (req, res) => {
  const {
    user: { id: userId },
  } = req;
  const records = await SleepRecord.find({ createdBy: userId });
  res.status(StatusCodes.OK).json({ records });
};

const createRecord = async (req, res) => {
  const {
    user: { id: userId },
  } = req;
  const createdBody = {
    fallingAsleepTime: req.body.fallingAsleepTime,
    wakeupTime: req.body.wakeupTime,
    comment: req.body.comment,
    awakenings: req.body.awakenings,
    fallingAsleepMood: req.body.fallingAsleepMood,
    wakeupMood: req.body.wakeupMood,
    sleepinessBefore: req.body.sleepinessBefore,
    sleepinessAfter: req.body.sleepinessAfter,
  };
  const record = await SleepRecord.create({
    createdBy: userId,
    ...createdBody,
  });
  res.status(StatusCodes.OK).json({ record });
};

const getRecord = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: recordId },
  } = req;
  const record = await SleepRecord.findOne({
    createdBy: userId,
    _id: recordId,
  });
  if (!record) {
    throw new NotFoundError(`Record with id ${recordId} not found`);
  }
  res.status(StatusCodes.OK).json({ record });
};

const updateRecord = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: recordId },
  } = req;
  const updateBody = {};
  if (req.body.fallingAsleepTime)
    updateBody.fallingAsleepTime = req.body.fallingAsleepTime;
  if (req.body.wakeupTime) updateBody.wakeupTime = req.body.wakeupTime;
  if (req.body.comment) updateBody.comment = req.body.comment;
  if (req.body.awakenings) updateBody.awakenings = req.body.awakenings;
  if (req.body.fallingAsleepMood)
    updateBody.fallingAsleepMood = req.body.fallingAsleepMood;
  if (req.body.wakeupMood) updateBody.wakeupMood = req.body.wakeupMood;
  if (req.body.sleepinessBefore)
    updateBody.sleepinessBefore = req.body.sleepinessBefore;
  if (req.body.sleepinessAfter)
    updateBody.sleepinessAfter = req.body.sleepinessAfter;
  const record = await SleepRecord.findOne({
    createdBy: userId,
    _id: recordId,
  });
  if (!record) {
    throw new NotFoundError(`Record with id ${recordId} not found`);
  }
  Object.assign(record, updateBody);
  await record.save();
  res.status(StatusCodes.OK).json({ record });
};

const deleteRecord = async (req, res) => {
  const {
    user: { id: userId },
    params: { id: recordId },
  } = req;
  const record = await SleepRecord.findOneAndDelete({
    createdBy: userId,
    _id: recordId,
  });
  if (!record) {
    throw new NotFoundError(`Record with id ${recordId} not found`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
};
