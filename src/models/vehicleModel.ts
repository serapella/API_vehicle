import mongoose from "mongoose";

type VehicleType = {
  type: string;
  merk: string;
  model: string;
  bouwjaar: number;
  prijs: number;
  cilinderinhoud: number;
  rijbewijs: string;
};

const vehicleSchema = new mongoose.Schema<VehicleType>({
  type: { type: String, required: true },
  merk: { type: String, required: true },
  model: { type: String, required: true },
  bouwjaar: { type: Number, required: true },
  prijs: { type: Number, required: true },
  cilinderinhoud: { type: Number, required: true },
  rijbewijs: { type: String, required: true },
});

export const Vehicle = mongoose.model<VehicleType>("Vehicle", vehicleSchema); // Named export

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// type UserType = {
//   naam: string;
//   email: string;
//   avatar: string;
//   wachtwoord: string;
//   favorieten: mongoose.Types.ObjectId[];
// };

// const userSchema = new mongoose.Schema<UserType>({
//   naam: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   avatar: {
//     type: String,
//     default:
//       "https://greekherald.com.au/wp-content/uploads/2020/07/default-avatar.png",
//   },
//   wachtwoord: {
//     type: String,
//     required: true,
//   },
//   favorieten: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vehicle",
//     },
//   ],
// });

// userSchema.pre("save", async function (next) {
//   if (this.isModified("wachtwoord")) {
//     this.wachtwoord = await bcrypt.hash(this.wachtwoord, 10);
//   }
//   next();
// });

// export const User = mongoose.model<UserType>("User", userSchema);
