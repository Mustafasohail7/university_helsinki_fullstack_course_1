const Person = ({person,handleDelete}) => {

  const handleClick = () => {
    window.confirm(`Delete ${person.name}?`)
    handleDelete(person.id)
  }

  return (
      <div>{person.name} {person.number}
      <button onClick={handleClick}>
        delete
      </button>
      </div>
  )
}

export default Person
