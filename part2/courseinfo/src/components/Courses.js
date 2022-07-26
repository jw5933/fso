import React from "react"

const Courses = ({courses}) => {
    return (
      <>
      {courses.map((course) => 
        (<Course key = {course.id} course = {course}/>)
      )}
      </>
      
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
        <Header name = {course.name}/>
        <Content parts = {course.parts}/>
        <Total parts = {course.parts}/>
      </>
    )
  }
  const Header = ({name}) => 
    <>
    <h1>{name}</h1>
    </>
  
  const Content = ({parts}) => {
    return (
      <>
      {parts.map(part => <Part key = {part.id} part = {part}/>)}
      </>
    )
  }
  const Part = ({part}) =>{
    //console.log(part)
    return (
      <>
      <p>{part.name} {part.exercises}</p>
      </>
    )
  }
  const Total = ({parts}) => {
    const s = parts.reduce((sum, a) => sum + a.exercises, 0)
    return (
      <>
      <p><b>Total of {s} exercises</b></p>
      </>
    )
  }

  export default Courses;