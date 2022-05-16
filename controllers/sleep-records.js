const getAllRecords = async (req, res) => {
  res.send("All records");
};

const createRecord = async (req, res) => {
  res.send("Create a record");
};

const getRecord = async (req, res) => {
  res.send(`A single record with id ${req.params.id}`);
};

const updateRecord = async (req, res) => {
  res.send("Update a record");
};

const deleteRecord = async (req, res) => {
  res.send("Delete a record");
};

module.exports = {
  getAllRecords,
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
};
