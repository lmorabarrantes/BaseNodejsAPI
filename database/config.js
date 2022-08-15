import mongoose from "mongoose";
const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MOONGO_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
  }
};

export default dbConection;
