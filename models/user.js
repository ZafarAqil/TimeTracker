const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    department: {
      type: String,
      required: true
    },
    isManager: {
      type: Boolean,
      default: false
    },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
