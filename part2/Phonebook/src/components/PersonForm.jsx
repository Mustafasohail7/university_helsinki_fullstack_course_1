const PersonForm = ({hanldeSubmit,newName,handleNameChange,number,handleNumberChange}) => {
  return (
    <form onSubmit={hanldeSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>number: <input value={number} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm
