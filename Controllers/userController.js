const getadminData = (req, res) => {
  res.status(200).json({ message: "Admin Data accessed!" });
};

const getuserData = (req, res) => {
  res.status(200).json({ message: "User Data accessed!" });
};

module.exports = { getadminData, getuserData };
