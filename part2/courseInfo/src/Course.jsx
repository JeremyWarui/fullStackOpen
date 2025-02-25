const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </>
  )
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return (sum += part.exercises)
  }, 0)
  return <b>total of {total} exercises</b>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
