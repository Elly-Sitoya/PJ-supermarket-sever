const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createDefaultAdmin = async () => {
  const defaultAdminEmail = "peterkioko453@gmail.com";

  const defaultAdmin = await User.findOne({ email: defaultAdminEmail });

  if (defaultAdmin) {
    console.log('Admin already exists"');
    return;
  }

  const newAdmin = new User({
    name: "Peter Kioko",
    email: defaultAdminEmail,
    passwordHash: bcrypt.hashSync("12345678", 10),
    phone: "+254704942094",
    isAdmin: true,
    street: "Eldoret",
    apartment: "Ndovu Apartments",
    zip: "12345",
    city: "Eldoret City",
    country: "Kenya",
  });

  const savedAdmin = await newAdmin.save();
  console.log("Default admin created:", savedAdmin);
};

module.exports = createDefaultAdmin;
