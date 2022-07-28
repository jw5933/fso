import React from "react";
import numService from "../services/numbers.js"

const Phonebook = ({persons, filter, deleteObj, handleError}) => {
    const re = new RegExp(filter, 'i');
    const filtered = persons.filter(person => person.name.match(re));
    
    return (
      <div>
        <table>
          <tbody>
          {filtered.map(person => 
            < Person 
              key = {person.id}
              person = {person}
              deleteObj = {deleteObj}
              handleError = {handleError}
            />
          )}
          </tbody>
        </table>
      </div>
      )
  }
  
  const Person = ({person, deleteObj, handleError}) => {
    const handleClick = () => {
      if (window.confirm(`Delete ${person.name} from phonebook?`)){
        numService.deleteObj(person.id)
        .then(deleteObj(person.id))
        .catch((error) => handleError(person))
      }
    }
    return(
      <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td>
          <button onClick={() => {handleClick()}}>
            delete
          </button>
        </td>
      </tr>
    )
  }

export default Phonebook;