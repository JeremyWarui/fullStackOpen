const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map((person) =>
        <li key={person.id}>{person.name} {person.number}
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </li>
      )}
    </div>
  )
}

export default Persons
