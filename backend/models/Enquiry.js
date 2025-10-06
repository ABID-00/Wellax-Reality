const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    enquiry: {
      type: String,
      required: true,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: true,
      require: true,
      trim: true,
      match: [/^\+?\d{10,15}$/, "Invalid phone number"],
    },
  },
  { timestamps: true }
);

// const Enquiry = mongoose.model("Enquiry", enquirySchema);
module.exports = mongoose.model("Enquiry", enquirySchema);
