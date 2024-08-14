import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    let nameRepeated = false;
    persons.map((person) => {
      if (person.name === personObject.name) {
        alert(`${personObject.name} is already added to phonebook`);
        nameRepeated = true;
      }
    });

    if (!nameRepeated) {
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const personsAfterFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} filterHandler={handleNameFilter} />
      <h3>add a new</h3>
      <PersonForm
        onSubmitAction={addPerson}
        inputName={newName}
        inputNameHandler={handleNameChange}
        inputNumber={newNumber}
        inputNumberHandler={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={personsAfterFilter} />
    </div>
  );
};

export default App;
