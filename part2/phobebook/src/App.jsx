import { useState,useEffect } from 'react'
import { Filter } from './components/Filter'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import {getPersons,addPerson, deletePerson, updatePerson} from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [searchName,setSearchName] = useState('')
  const [notification,setNotification] = useState({message:'',type:''})




  useEffect(() => {
    const fetchPersons = async () => {
      const data = await getPersons()
      setPersons(data)
    }
    fetchPersons()
  }, [])

  useEffect(()=> {
    if(notification.message){
      const timer = setTimeout(()=> {
        setNotification({message:'',type:''})
      },5000)
      return () => clearTimeout(timer)
    }
  },[notification])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const existingPerson = persons.find((person) => person.name === newName)
    if(existingPerson){
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update the number?`)){
        const updatedPerson = {...existingPerson,number:newNumber}
        try{
          const returnedPerson = await updatePerson(existingPerson.id,updatedPerson)
          setPersons(persons.map(person => person.id === existingPerson.id ? returnedPerson : person))
          setNotification({mesage:`${newName}'s number updated`,type:'success'})

        }catch(error){
          setNotification({message:error.error, type:'error'})
        }

      }
      setNewName('')
      setNewNumber('')
      return
    }
    const newPerson = {
      name:newName,
      number:newNumber,
    }
    try{
      const returnedPerson = await addPerson(newPerson)
      setPersons(persons.concat(returnedPerson))
      setNotification({message:`${newName} added to phonebook`,type:'success'})

    }catch(error){
      setNotification({message:error.error, type:'error'})
    }



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
  const handleDelete = async (id) => {
    if (window.confirm('Do you really want to delete this person?')) {
      try {
        await deletePerson(id);
        setPersons(persons.filter((person) => person.id !== id));
        setNotification({ message: 'Person deleted', type: 'success' }); 
      } catch (error) {
        setNotification({ message: `Failed to delete person`, type: 'error' });
      }
    }
  };
  const personsToShow = searchName ? persons.filter((person) => person.name.toLowerCase().includes(searchName.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter handleSearchChange={handleSearchChange} searchName={searchName}  />
      <h2>add a new</h2>
      <PersonForm handleNumberChange={handleNumberChange} handleNameChange={handleNameChange} handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} />
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App