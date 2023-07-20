const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();
SECRET_KEY = process.env.SECRET_KEY;

let userSavedData = [];

const registrationApi = (req, res) => {
  const data = req.body;
  console.log(userSavedData);

  const user = userSavedData.find((item) => {
    if (data.email === item.email) {
      console.log(data.email);
      return item;
    }
  });

  if (!user) {
    const salt = 10;
    const hashPass = bcrypt.hashSync(data.password, salt);

    const token = jwt.sign({ email: data.email }, SECRET_KEY, {
      expiresIn: "3D",
    });

    const tempObj = {
      email: data.email,
      password: hashPass,
      token: token,
    };

    userSavedData.push(tempObj);

    return res.send("user registered successfully");
  }

  res.send("user already registered");

  //console.log(userSavedData);
};

const loginApi = (req, res) => {
  console.log(userSavedData);
  const data = req.body;
  console.log(data);

  const user = userSavedData.find((item) => {
    if (data.email === item.email) {
      return item;
    }
  });

  if (!user) {
    return res.send("user not registered");
  } else {
    const isMatch = bcrypt.compareSync(data.password, user.password);
    if (isMatch) {
      return res.send("user logged in successully");
    }

    res.send("plz enter correct password");
  }
};

module.exports = { registrationApi, loginApi };
