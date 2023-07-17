const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map(part => <Part key={part.id} part={part} />)}
        </div>
    )
}

const Part = ({part}) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Sum = ({course}) => {
    const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
    return(
        <p><b>total of {total} exercises</b></p>
    )
}

const Course = ({course}) => {
  return (
    <div>
        <Header course={course} />
        <Content course={course} />
        <Sum course={course} />
    </div>
  )
}

export default Course
