const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "NA",
  },
  designation: {
    type: String,
    default: "NA",
  },
  company: {
    type: String,
    default: "NA",
  },
  industry: {
    type: String,
    default: "NA",
  },
  email: {
    type: String,
    default: "NA",
  },
  phNo: {
    type: String,
    default: "NA",
  },
  country: {
    type: String,
    default: "NA",
  },
  user: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("contact", contactSchema);
