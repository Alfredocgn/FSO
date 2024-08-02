import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: {Authorization : token}
  }
  try{
    const response = await axios.post(baseUrl,newObject,config)
    return response.data

  }catch(error){
    console.log(error)
  }
}

const update = async (id,newObject) => {
  try{
    const request = await axios.put(`${baseUrl}/${id}`,newObject)
    return respose.data
  }catch(error){
    console.log(error)
  }
  
}

export default { getAll,create,update,setToken }