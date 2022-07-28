import { Request, Response } from "express";

function formatData(req:Request,res:Response,next:Function){
  const keys = ['name','price','thumbnail'];
  const data:{[key:string]:string|number}  = {}
  switch(req.method){
    case 'POST':
      keys.forEach(key=>{
        if(!req.body.hasOwnProperty(key)){
          // error
          return
        }
        let value = req.body[key];
        switch (key) {
          case 'price':
            value = parseFloat(value);
            if(value<0){
              throw new Error('not pass middleware.')
            }
            break;
          case 'name':
          case 'thumbnail':
            if(!value.trim()){
              throw new Error('not pass middleware.')
            }
            break;
        
          default:
            break;
        }
        if(!value){
          throw new Error('not pass middleware.')
        }
        data[key] = value;
      })
      break
  }
  req.body = data;
  next()
}

export default formatData