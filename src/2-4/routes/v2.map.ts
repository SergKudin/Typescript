import { login, logout, register } from "../Controller/autorisation.js"
import { getAllItems, postItems, putItems, delItems } from "../Controller/items.js"

export const v2RoutsMap = new Map([
  ['login', login],
  ['logout', logout], //undefined
  ['undefined', logout], //undefined
  ['register', register],
  ['getItems', getAllItems],
  ['deleteItem', delItems],
  ['addItem', postItems],
  ['createItem', postItems],
  ['editItem', putItems],
])

