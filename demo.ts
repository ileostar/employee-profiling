
const mockRes = [
  'model1',
  '/www/wwwroot/springboot/Model/ModelParameters/aaaaa',
  'model3/submodel',
]
const expected = [
  'model1',
  'aaaaa',
  'submodel',
]
const modelTotal = mockRes.map((item: string)=>{
  if(item.lastIndexOf('/')){
    const strArr = item.split('/') as Array<string>
    return strArr[strArr.length-1]
  }
  return item
})
console.log(modelTotal)
