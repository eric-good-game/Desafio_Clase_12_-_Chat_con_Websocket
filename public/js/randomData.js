function getRandomData(){
  const data = [
    ['Mochila','Lapíz','Libreta','Globo terráqueo','Regla','Calculadora'],
    ['7','200.00','75.30','345.67','15','164'],
    [
      'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-1024.png',
      'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-1024.png'
    ]
  ]
  const ids = ['name','price','thumbnail']
  ids.forEach((id, idx)=>{
    let num;
    for (let i = 0; i < 10; i++) {
      num = Math.floor(Math.random() * 6);
    }
    document.getElementById(id).value = data[idx][num]
    formData[id] = data[idx][num]
  })
}

document.getElementById('randomData').onclick = (e)=>{
  getRandomData()
}