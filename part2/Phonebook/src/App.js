import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {getAll,create,update,eliminate} from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if(searchText === '') {
      setFilteredPersons(persons)
      return
    }
    const afterSearch = persons.filter(person => person.name.toLowerCase().startsWith(searchText.toLowerCase()))
    setFilteredPersons(afterSearch)
  },[searchText,persons])

  const fetchData = () => {
    getAll()
    .then(data => {
      setPersons(data)
      setFilteredPersons(data)
    })
  }

  useEffect(fetchData,[])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: number
    }
    const nameExists = persons.some(person => person.name === personObject.name)
    if (nameExists) {
      window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)
      update( persons.find(person => person.name === personObject.name).id, personObject)
      .then(data => {
        const afterUpdate = persons.map(person => person.id === data.id ? data : person)
        setPersons(afterUpdate)
        setFilteredPersons(afterUpdate)
      })
      return
    }
    create(personObject)
    .then(data => {
      setPersons(persons.concat(data))
      setFilteredPersons(persons.concat(data))
    })
    setNewName('')
    setNumber('')
  }

  const handleNumberChange = (event) => {
    setNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchText(event.target.value)
  }

  const handleDelete = (id) => {
    eliminate(id)
    .then(() => {
      const afterDelete = persons.filter(person => person.id !== id)
      setPersons(afterDelete)
      setFilteredPersons(afterDelete)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} number={number} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App