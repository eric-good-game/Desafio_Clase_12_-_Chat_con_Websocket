type Product = {
  name:string,
  price:number,
  thumbnail:string,
  id:number|null
}
type Message = {
  email:string,
  date:Date,
  content:string,
  id:number | null
}
type id = {
  nextId:number,
}
type fileProducts = id & {
  data:Product[]
}

type fileMessages = id & {
  data:Message[]
}

export {
  Product,
  fileProducts,
  fileMessages,
  Message
}