// import fs from 'fs/promises'
import fs from 'fs'
import { fileMessages, Message } from "../../types";

class MessagesApi{
  fileName;
  filePath;
  file:fileMessages = {
    nextId:1,
    data:[]
  }
  constructor(fileName:string,fileExt:string = 'txt'){
    this.fileName = fileName
    this.filePath = `src/data/${fileName}.${fileExt}`
  }

  async getfile(){
    try {
      const data = await fs.promises.readFile(this.filePath,'utf-8');
      if(!data) return
      this.file = JSON.parse(data)
    } catch (err) {
      if(err instanceof Error){
        console.log(err);
        fs.promises.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8')
      }
    }
  }
  async all():Promise<Message[]>{
    try {
      await this.getfile()
      return this.file.data
    } catch (err) {
      console.log(err);
      return []
    }
  }
  async add(message:Message){
    try {
      await this.getfile()
      message.id = this.file.nextId
      this.file.nextId++
      this.file.data.push(message)
      await fs.promises.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8')
      return message.id
    } catch (err) {
      console.log(err);
    }
  }
}

export default MessagesApi