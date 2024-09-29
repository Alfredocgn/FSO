
import {  useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/CreatePerson';
import { ALL_PERSONS } from './queries';
import { SetStateAction, useState } from 'react';
import PhoneForm from './components/PhoneForm';



export interface Person{
  name:string
  phone:string
  id:string
  address:{
    street:string
    city:string
  }
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const result = useQuery(ALL_PERSONS,{
    pollInterval:2000
  })

  if (result.loading)  {
    return <div>loading...</div>
  }

  const notify = (message: SetStateAction<null>) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={(message: string) => notify(message as unknown as SetStateAction<null>)} />
      <PhoneForm setError={(message: string) => notify(message as unknown as SetStateAction<null>)} />
    </div>
  )
}
const Notify = ({errorMessage}:{errorMessage:string | null}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App