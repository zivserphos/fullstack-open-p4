const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  userName: {
    unique: true,
    required: true,
    type: String,
  },
  hashPassword: {
    required: true,
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
    },
  ],
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.hashPassword;
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
