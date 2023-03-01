import { login, logout, register } from "../Controller/autorisation.js"
import { getAllItems, postItems, putItems, delItems } from "../Controller/items.js"

export const v2RoutsMap = new Map([
  ['login', login],
  ['logout', logout],
  ['register', register],
  ['getItems', getAllItems],
  ['deleteItem', delItems],
  ['addItem', postItems],
  ['editItem', putItems],
])

