import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export const getPersons = async () => {
  try{
    const request = await axios.get(baseUrl)
    return request.data 
  }catch(error){
    console.log(error)
  }
} 

export const addPerson = async (newPerson) => {
  try{
    const request = await axios.post(baseUrl,newPerson)
    return request.data
  }catch(error){
    console.log(error)
  }
}

export const deletePerson = async (id) => {
  
  try{
    const response = await axios.delete(`${baseUrl}/${id}`)
    return response.status
  }catch(error){
    console.log(error)
  }
}

export const updatePerson = async (id,updatedPerson) => {
  try{
    const response = await axios.put(`${baseUrl}/${id}`,updatedPerson)
    return response.data
  }catch(error){
    console.log(error)
  }
}

