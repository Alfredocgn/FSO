const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const Person = require('./models/person')
const { connectToDatabase } = require('./mongo')



// const generateId = () => {
//   const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
//   return maxId + 1
// }
const errorHandler = (error,req,res,next) => {
  console.error(error.message)

  if(error.nmae === 'CastError'){
    return response.status(400).send({error:'malformatted id'})
  }
  next(error)
}


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


app.get('/api/persons',async (req,res) => {
  try{
    const persons = await Person.find({})
    res.json(persons)
  }catch(error){
    console.error('Error fetching persons:',error.message)
    res.status(500).send({error:'Error fetching persons'})
  }
    
    
})

app.get('/api/persons/:id',async (req,res) => {
  try{
    const person = await Person.findById(req.params.id)
    if(person){
      res.json(person)
    }else{
      res.status(404).send('<h1>Not Found</h1>')
    }
  }catch(error){
    console.error('Error fetching person:',error.message)
    res.status(500).send({error:'Error fetching person'})
  }
})

app.delete('/api/persons/:id',async (req,res) => {
  try{
    await Person.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }catch(error){
    console.error('Error deleting persong:',error.message)
    res.status(500).send({error:'Error deleting person'})
  }
})

app.post('/api/persons',async (req,res) => {
  const body = req.body
  
  if(!body.name || !body.number){
    return res.status(400).json({error: 'name or number missing'})
  }

  try{
    const existingPerson = await Person.findOne({name: body.name})
    if(existingPerson){
      return res.status(400).json({error:'Name must be unique'})
    }
    const person = new Person({
      name:body.name,
      number:body.number
    })
    const savedPerson = await person.save()
    res.json(savedPerson)
  }catch(error){
    console.error('Error saving persong:',error.message)
    res.status(500).send({error:"Error saving person"})
  }

  
})

app.get('/info',async (req,res) => {
  try{
    const count = await Person.countDocuments({})
    const now = new Date()
    const date = now.toString()

    res.send(`<p>Phonebook has info for ${count} people</p> </br> ${date}`)
  }catch(error){
    console.error('Error fetching info:',error.message)
    res.status(500).send({error:'Error fetching info'})
  }

})

app.put('/api/persons/:id',async(req,res) => {
  const id = req.params.id
  const{number} = req.body
  try{
    const updatedPerson = await Person.findByIdAndUpdate(
      id,
      {number},
      { new: true, runValidators: true, context: 'query' },
    )
    if(updatedPerson){
      res.json(updatedPerson)
    }else{
      res.status(404).send({error:'Person not found'})
    }
  }catch(error){
    console.error('Error updatint person:',error.message)
    res.status(500).send({error:'Error updating person'})
  }
})

const unknownEndpoint = (req,res) =>{
  res.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)

app.use(errorHandler)


const PORT = process.env.PORT || 3001 
const startServer = async() =>{
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

startServer()
