/*
  Todo interface that extends the Document type provided by mongoose.
  Will be using to interact with MongoDB.
*/
import { Document } from "mongoose";

export interface ITodo extends Document {
  name: string;
  description: string;
  status: boolean;
}
