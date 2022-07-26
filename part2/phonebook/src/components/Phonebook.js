import React from "react";

const Phonebook = ({persons, filter}) => {
    const re = new RegExp(filter, 'i');
    const filtered = persons.filter(person => person.name.match(re));
    
    return (
      <div>
        <table>
          <tbody>
          {filtered.map(person => < Person key = {person.id} person = {person}/>)}
          </tbody>
        </table>
      </div>
      )
  }
  
  const Person = ({person}) => {
    return(
      <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
      </tr>
    )
  }

export default Phonebook;