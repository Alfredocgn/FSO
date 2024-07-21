



export const PersonForm = ({handleSubmit,newName,newNumber,handleNameChange,handleNumberChange}) => {
  return (
    <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
      number: <input value={newNumber} onChange={handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
