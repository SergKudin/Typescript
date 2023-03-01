import { ObjectId } from "mongodb";

export default class Todo {
  constructor(
    public user: string,
    public text: string,
    public checked: boolean = false,
    public id?: string,
    public _id?: ObjectId,
  ) { }
}
