const fs = require("fs");

const User = require("../models/user.model.js");

const editProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const previousPicture = req.user.profilePicture;
    let newPicture = "";

    if (req.file) {
      newPicture = req.file.path;
      fs.unlink(previousPicture, (err) => {
        if (err) {
          console.log(`Error - failed to delete profile picture: ${err}`);
        } else {
          console.log(`${previousPicture} was deleted`);
        }
      });
    } else {
      newPicture = previousPicture;
    }

    await User.findOneAndUpdate({ _id: userId }, { $set: {
        profilePicture: newPicture,
        firstName: firstName,
        lastName: lastName,
        email: email
      } });

    const user = await User.findOne({ _id: userId }, { password: 0 });

    res.status(200).send({
      user,
      message: "Profile updated successfully",
      success: true
    });
  } catch (err) {
    console.log(`Error in editProfile controller: ${err}`);
    res.status(500).send({
      message: "Failed to update profile",
      success: false,
    });
  }
};

module.exports = { editProfile }