import mongoose, { Schema } from "mongoose";


// Create a Schema corresponding to the FormType interface
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    channel: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    social: {
      twitter: {
        type: String,
        required: true,
      },
      facebook: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: [String],
      required: true,
    },
    phNumber: [
      {
        number: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Export the model and return your interface to use it in the application
export default mongoose.model("User", UserSchema);
