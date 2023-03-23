export interface User {
  login: string,
  pass: string
}

export interface Todo {
  user: string,
  text: string,
  checked: boolean,
  id: string,
  _id?: string,
}

// checked: false
// id:"63ffb1eb0f0303259b94efac"
// text:"w1"
// user:"w"
// _id:"63ffb1eb0f0303259b94efac"