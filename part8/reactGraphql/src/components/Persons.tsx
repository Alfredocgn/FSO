import {  useLazyQuery } from "@apollo/client"
import { Person } from "../App"
import { useEffect, useState } from "react"
import { FIND_PERSON } from "../queries"



const Persons = ({ persons }: { persons: Person[] }) => {
  const [getPerson,result] = useLazyQuery(FIND_PERSON)
  const [person,setPerson] = useState<Person | null> (null)

  const showPerson = (name:string) => {
    getPerson({variables:{nameToSearch:name}})
  }

  useEffect(()=>{
    if(result.data){
      setPerson(result.data.findPerson)
    }
  },[result])

  if(person){
    return(
      <div>
        <h2>{person.name}</h2>
        <div>{person.address.street} {person.address.city}</div>
        <button onClick={() => setPerson(null)}>close</button>
      </div>
    )
  }


  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => showPerson(p.name)}>show address</button>
        </div>  
      )}
    </div>
  )
}

export default Persons