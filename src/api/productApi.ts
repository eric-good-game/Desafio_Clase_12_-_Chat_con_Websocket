// import fs from 'fs/promises'
import fs from 'fs'
import { fileProducts, Product } from "../../types"

const initialData = {
  nextId:1,
  data:[]
}

class ProductApi{
  
  fileName
  filePath
  file:fileProducts = initialData

  constructor(fileName:string,fileExt='txt'){
    this.fileName = fileName
    this.filePath = `./src/data/${fileName}.${fileExt}`
  }

  async getFile(){
    
    try {
      const data = await fs.promises.readFile(this.filePath,'utf-8');
      if(!data){
        this.file=initialData;
        return  
      }
      this.file = JSON.parse(data)
    } catch (err:unknown) {
      if(err instanceof Error){
        switch (err.name) {
          case 'SyntaxError':
            console.log(err);
            break;
          case 'Error':
            console.log('error');
            await fs.promises.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8')
            break;
          default:  
            console.log(err);
            break;
        }
      }
    }
  }
  async all(){
    try {
      await this.getFile()
      return this.file.data
    } catch (err) {
      console.log(err); 
    }
  }
  async create(product:Product){
    try {
      await this.getFile()
      product.id = this.file.nextId
      this.file.nextId++;
      this.file.data.push(product)
      await fs.promises.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8')
      return product.id
    } catch (err) {
      console.log(err); 
    }
  }
}

export default ProductApi