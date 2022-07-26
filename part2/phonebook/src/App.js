import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Phonebook from "./components/Phonebook";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filter, setFilter] = useState('');

  const handleClick = (event) => {
    event.preventDefault();
    //console.log(newName);
    if (newName === '' || newNum === ''){
      alert('Please enter valid name/number');
      return;
    }

    const re = new RegExp(`^${newName}$`, 'i');
    const nameExists = persons.filter(person => person.name.match(re));
    
    if (nameExists.length === 0){
      setPersons(persons.concat({name:newName, number: newNum, id: persons.length + 1}));
      setNewName('');
      setNewNum('');
    }
    else{
      alert(`${newName} already exists in the phonebook`);
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  }
  
  const handleFilter = (event) =>{
    setFilter(event.target.value);
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleFilter = {handleFilter}/>

      <h2>Add a new entry</h2>
      <Form 
        newName={newName}
        newNum = {newNum} 
        handleNameChange = {handleNameChange}
        handleNumChange = {handleNumChange}
        handleClick = {handleClick}
      />

      <h2>Numbers</h2>
      <Phonebook persons = {persons} filter = {filter}/>
    </>
  );
}

export default App;
