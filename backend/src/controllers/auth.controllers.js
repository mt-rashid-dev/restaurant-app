const User = require("../models/user.model.js");
const { generateToken, hashPassword, verifyPassword } = require("../utils/auth.js");

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        message: "Invalid email or password",
        type: "invalid-credentials",
        success: false
      });
    }

    const isPasswordCorrect = await verifyPassword(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).send({
        message: "Invalid email or password",
        type: "invalid-credentials",
        success: false
      });
    }

    generateToken(user._id, res);

    res.status(200).send({
      message: "Sign-in successful",
      success: true,
      profilePicture: user.profilePicture,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    console.log(`Error - sign-in was not successful: ${err}`);
    res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

const signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password
    } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        message: "Email already exists",
        type: "email-error",
        success: false
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    await newUser.save();

    generateToken(newUser._id, res);

    res.status(201).send({
      message: "Sign-up successful",
      success: true,
      user: {
        _id: newUser._id,
        profilePicture: newUser.profilePicture,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    console.log(`Error - sign-up was not successful: ${err}`);
    res.status(500).send({
      message: "Internal server error",
      success: false
    });
  }
};

export const signOut = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).send({
      message: "Logged out successfully"
    });
  } catch (err) {
    console.log(`Error - sign-out was not successful: ${err}`);
    res.status(500).send({
      message: "Internal server error"
    });
  }
};

module.exports = { signIn, signUp, signOut };