import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: {Authorization : token}
  }
  try{
    const request = await axios.get(baseUrl,config)
    return request.data

  }catch(error){
    console.log(error)
  }

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

const update = async (newObject) => {

  const config = {
    headers: {Authorization : token}
  }
  try{
    const response = await axios.put(`${baseUrl}/${newObject.id}`,newObject,config)

    return response.data
  }catch(error){
    console.log(error)
  }

}

const remove = async(id) => {
  const config = {
    headers: {Authorization : token}
  }
  const res = await axios.delete(`${baseUrl}/${id}`,config)
  return res.data

}

export default { getAll,create,update,setToken,remove }