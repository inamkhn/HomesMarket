import mongoose from "mongoose";


export const connect = () => {
    mongoose
      .connect(process.env.MONGO_URL)
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        throw err;
      });
  };