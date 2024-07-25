const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
  return maxId + 1
}



app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

app.get('/api/persons',(req,res) => {
    res.json(persons)
})

app.get('/api/persons/:id',(req,res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if(person){
    res.json(person)

  }else{
    res.status(404).send('<h1>Not found</h1>')
  }
})

app.delete('/api/persons/:id',(req,res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons',(req,res) => {
  const body = req.body
  if(!body.name || !body.number){
    return res.status(400).json({error: 'name or missing'})
  }

  const existingPerson = persons.find(p => p.name === body.name)
  if(existingPerson){
    return res.status(400).json({error:'name must be unique'})
  }

  const person = {
    name: body.name,
    number:body.number,
    id: generateId()

  }
  persons = persons.concat(person)
  res.json(person)
})

app.get('/info',(req,res) => {
  const now = new Date()
  const date = now.toString()

  res.send(`<p>Phonebook has info for ${persons.length} people</p> </br> ${date}`)
})
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

const unknownEndpoint = (req,res) =>{
  res.status(404).send({error:'unknown endpoint'})
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

