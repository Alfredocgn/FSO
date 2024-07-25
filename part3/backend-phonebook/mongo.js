require('dotenv').config()
const mongoose = require('mongoose')

const password = process.env.MONGO_PASS
const username = process.env.MONGO_USER



const url =`mongodb+srv://${username}:${password}@cluster0.wvrfzwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

const connectToDatabase = async () => {
  try{
    await mongoose.connect(url)
    console.log('Connected to Mongo')
  }catch(error){
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1)
  }
}
module.exports = {connectToDatabase};
// const personSchema = new mongoose.Schema({
//   name:String,
//   number:String,
// })

// const Person = mongoose.model('Person',personSchema)

// const addPerson = async(name,number) => {
//   const person = new Person({
//     name,
//     number
//   })
//   try{
//     await person.save()
//     console.log(`Added ${name} number ${number} to phonebook`)
//   }catch(error){
//     console.error('Errod adding person:',error.message)
//   }finally{
//     mongoose.connection.close()
//   }
// }

// const listPersons = async() => {
//   try{
//     const persons = await Person.find({})
//     console.log('Phonebook:')
//     persons.forEach(person => {
//       console.log(`${person}`)
//     })
//   }catch(error){
//     console.error('Error fetching persons:',error.message)

//   }finally{
//     mongoose.connection.close()
//   }

// }

// const main = async() => {
//   await connecToDatabase()
//   if(process.argv.length === 2){
//     await listPersons()
//   }
//   else if(process.argv.length === 4){
//     const name = process.argv[2]
//     const number = process.argv[3]
//     await addPerson(name,number)
//   }else{

//     console.log('Please provide the name and number as arguments: node mongo.js <name> <number>')
//     mongoose.connection.close()
//   }
// }

// main()