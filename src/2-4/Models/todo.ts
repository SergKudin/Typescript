import { ObjectId } from "mongodb";

export default class Todo {
  constructor(public text: string, public checked: boolean = false, public id?: string, public _id?: ObjectId) { }
}
