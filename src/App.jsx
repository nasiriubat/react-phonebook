import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterData, setFilterData] = useState(persons)
  const [searchText, setsearchText] = useState('')

  const existCheck = (name) => {
    return persons.some(person => person.name == name)
  }
  const setNameHandler = (event) => {
    setNewName(event.target.value)
  }
  const setNumberHandler = (event) => {
    setNewNumber(event.target.value)
  }
  const filterPersons = (event) => {
    setsearchText(event.target.value)
    setFilterData(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const addPerson = (event) => {
    event.preventDefault();

    if (existCheck(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newObj = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      const newArray = persons.concat(newObj);
      setPersons(newArray)
      setFilterData(newArray)
      setNewName('')
      setNewNumber('')
    }

  }

  return (
    <div>
      <h2> Phonebook </h2>
      <Filter text={searchText} filterHandler={filterPersons} />

      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        setNameHandler={setNameHandler}
        setNumberHandler={setNumberHandler}
        name={newName}
        number={newNumber}
      />
      
      <h3>Numbers</h3>
      <Persons data = {filterData} />
    </div>
  )
}

export default App