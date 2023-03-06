import { ObjectId } from "mongodb";
import Todo from "./todo.js";

export default class User {
  constructor(
    public autUser: string,
    public autPass: string,
    public _id?: ObjectId,
  ) { }
}