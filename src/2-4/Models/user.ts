import { ObjectId } from "mongodb";

export default class User {
  constructor(
    public autUser: string,
    public autPass: string,
    public _id?: ObjectId,
  ) { }
}