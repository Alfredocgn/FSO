const express = require('express')
const app = express()

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.use(express.json())

app.get('/',(req,res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes',(req,res) => {
  res.json(notes)
})

app.get('/api/notes/:id',(req,res) => {
  const id = Number(req.params.id)

  const note = notes.find(note => note.id === id)
  if(note){
    res.json(note)
  }else{
    res.status(404).send('<h1>Not Found</h1>')
  }
})

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes',(req,res) => {
  const body = req.body

  if(!body.content){
    return response.status(400).json({error:'content missing'})
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId()
  }
  notes = notes.concat(note)
  res.json(note)
})

app.delete('/api/notes/:id',(req,res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  res.status(204).send('Note deleted')
})

const PORT = 3001 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})