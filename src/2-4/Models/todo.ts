import { ObjectId } from "mongodb";

export default class Todo {
  constructor(public name: string, public checked?: string, public id?: ObjectId) { }
}


// export interface todoType {
//   // id: string,
//   text: string,
//   checked?: string
// }

// const TodoSchema: Schema = new Schema<todoType>({
//   // id: { type: String, required: true, unique: true },
//   text: { type: String, required: true },
//   checked: String,
// });

// export default model<todoType>('Todo', TodoSchema);