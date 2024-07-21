

export const Persons = ({personsToShow,handleDelete}) => {
  return (
    <div>
      <h2>Numbers</h2>
      {personsToShow.map(p => {

        return <><p key={p.id}>{p.name} {p.number}</p> <button onClick={() => handleDelete(p.id)}>Delete</button></>

      })}
      
    </div>
  )
}
