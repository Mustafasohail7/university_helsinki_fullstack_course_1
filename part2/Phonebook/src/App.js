import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {getAll,create,update,eliminate} from './services/phonebook'
import Successful from './components/Successful'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filteredPersons, setFilteredPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [message,setMessage] = useState(null)
  const [error,setError] = useState(null)

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
      .catch(
        setError(`Information of ${personObject.name} has already been removed from server`),
        setTimeout(() => {
          setError(null)
        }, 3000),
        setPersons(persons.filter(person => person.name !== personObject.name)),
        setFilteredPersons(persons.filter(person => person.name !== personObject.name))
      )
      .then(
        setMessage(`Updated ${personObject.name}`),
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      )
      return
    }
    create(personObject)
    .then(data => {
      setPersons(persons.concat(data))
      setFilteredPersons(persons.concat(data))
    })
    .then(
      setMessage(`Added ${personObject.name}`),
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    )
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
    .then(
      setError(`Deleted ${persons.find(person => person.id === id).name}`),
      setTimeout(() => {
        setError(null)
      }, 3000)
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Successful message={message} error={error} />
      <Filter searchText={searchText} handleSearch={handleSearch} />
      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} handleNameChange={handleNameChange} number={number} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App