const App = () => {
  const course = {
    name: 'half stack application development',
    parts: [
      {
        name: 'fundamentals of react',
        exercises: 10
      },
      {
        name: 'using props to pass data',
        exercises:7
      },
      {
        name: 'state of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course = {course}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
    </>
  )
}
const Header = (course) => {
  //console.log(course.name) 
  return (<>
  <h1>{course.course.name}</h1>
  </>)
}
const Content = (parts) => {
  //console.log(parts)
  return (
    <>
    <Part part = {parts.parts[0]} />
    <Part part = {parts.parts[1]} />
    <Part part = {parts.parts[2]} />
    </>
  )
}
const Part = (part) =>{
  //console.log(part)
  return (
    <>
    <p>
      {part.part.name} {part.part.exercises}
    </p>
    </>
  )
}
const Total = (parts) => {
  const s = parts.parts.reduce((sum, a) => sum + a.exercises, 0)
  return (
    <>
    <p>Total number of exercises {s}</p>
    </>
  )
}


export default App;
