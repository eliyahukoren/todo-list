import mongoose from "mongoose";
import { app } from "./app";

const PORT: string | number = process.env.PORT || 4000;
const URI: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const startApp = async() => {

  try{
    await mongoose.connect(URI)
    console.log(`Server: Connected to MongoDB ${process.env.MONGO_DB}`);
  }catch(error){
    console.log(error);
  }

  app.listen(PORT, () =>
    console.log(`Server: Running on http://localhost:${PORT}`)
  );
}

startApp();


