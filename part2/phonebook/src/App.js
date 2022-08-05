import { useState, useEffect} from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Phonebook from "./components/Phonebook";
import numService from "./services/numbers.js"
import Notification from "./components/Notification";
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('');
  const [newNum, setNewNum] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    numService.getAll()
    .then(initialNums => {
      setPersons(initialNums)
    })
  }, [])

  const deleteObj = id => {
    const newPersons = persons.reduce(
      function(arr, person){
        return (
          person.id !== id? arr.concat(person)
          : arr
        )
      }, []
    )
    //console.log(newPersons);
    setPersons(newPersons);
  }

  const handleError = (p) => {
    setErrorMessage(`Information for ${p.name} was already deleted.`)
    setTimeout(
      () =>{
        setErrorMessage(null)
      }, 3000
    )
    setPersons(persons.filter(person => person.id !== p.id))
  }

  const handleClick = (event) => {
    event.preventDefault();

    // if (newName === '' || newNum === ''){
    //   alert('Please enter valid name/number');
    //   return;
    // }

    const re = new RegExp(`^${newName}$`, 'i');
    const nameExists = persons.filter(person => person.name.match(re));

    if (nameExists.length === 0){
      const obj = {name:newName, number: newNum};

      //creating new phonebook entry
      numService
      .create(obj)
      .then(
        returnedObj => {
          setPersons(persons.concat(returnedObj))
          setMessage(`${returnedObj.name} was added to the phonebook.`)
          setTimeout(
            () =>{
              setMessage(null)
            }, 3000
          )

          setNewName('');
          setNewNum('');
        }
      )
      .catch(error => {
        //console.log(error)
        setErrorMessage(error.response.data);
        setTimeout(
          () =>{
            setErrorMessage(null)
          }, 5000
        )
      })
    }
    else if (window.confirm(`${newName} already exists in the phonebook. Do you want to replace the old number?`)){
      const newPerson = {...nameExists[0]}
      newPerson.number = newNum
      //updating number
      numService
      .update(newPerson.id, newPerson)
      .then(data => {
        setPersons(persons.map(person => person.id === newPerson.id ? data : person))
        setNewName('');
        setNewNum('');
      })
      .catch(error => {
        //console.log(error)
        setErrorMessage(error.response.data)
        setTimeout(
          () =>{
            setErrorMessage(null)
          }, 3000
        )
      })
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value);
  }
  
  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  return (
    <>
      <h2 className="top-heading">Phonebook</h2>
      <Notification message = {message} classType = {"add"}/>
      <Notification message = {errorMessage} classType = {"error"}/>

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
      <Phonebook 
        persons = {persons}
        filter = {filter}
        deleteObj = {deleteObj}
        handleError = {handleError}
      />
    </>
  );
}

export default App;
