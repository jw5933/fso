import React from "react";

const Form = ({newName, newNum, handleNameChange, handleNumChange, handleClick}) => (
    <>
      <form>
  
        <table>
        <tbody>
          <tr>
            <td>name:</td>
            <td>
              <input
              value = {newName}
              onChange = {handleNameChange}
              />
            </td>
          </tr>
  
          <tr>
            <td>number:</td>
            <td>
              <input 
              value = {newNum}
              onChange = {handleNumChange}
              />
            </td>
          </tr>
        </tbody>
        </table>
  
        <div>
          <button onClick = {handleClick} type = 'submit'>add</button>
        </div>
  
      </form>
    </>
    
  )

  export default Form;