import { useState,useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import {getPersons,addPerson, deletePerson, updatePerson} from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [searchName,setSearchName] = useState('')







  useEffect(() => {
    const fetchPersons = async () => {
      const data = await getPersons()
      setPersons(data)
    }
    fetchPersons()
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const existingPerson = persons.find((person) => person.name === newName)
    if(existingPerson){
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)){
        const updatedPerson = {...existingPerson,number:newNumber}
        await updatePerson(existingPerson.id,updatedPerson)
        setPersons(persons.map(person => person.id === existingPerson.id ? updatedPerson : person))

      }
      setNewName('')
      setNewNumber('')
      return
    }
    const newPerson = {
      name:newName,
      number:newNumber,
      id:(persons.length + 1).toString(),
    }
    const returnedPerson = await addPerson(newPerson)
    setPersons(persons.concat(returnedPerson))


    setNewName('')
    setNewNumber('')

  }




  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)

  } 

  const handleSearchChange = (e) => {
    setSearchName(e.target.value)

  }
  const handleDelete = async(id) =>{
    if(window.confirm('Do you really want to delete this person?')){
      const response = await deletePerson(id)
      if(response){
        setPersons(persons.filter(person => person.id !== id))

      }else{
        console.log('Failed to delete person with id', id)
      }

    }

  }
  const personsToShow = searchName ? persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>s
      <Filter handleSearchChange={handleSearchChange} searchName={searchName}  />
      <h2>add a new</h2>
      <PersonForm handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} />
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App