import { useState, useEffect } from "react";
import personService from "./services/person";

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({
    message: null,
    messageType: 0,
  });

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
    };

    let nameRepeated = false;
    persons.map((person) => {
      if (
        person.name === personObject.name &&
        person.number === personObject.number
      ) {
        alert(`${personObject.name} is already added to phonebook`);
        nameRepeated = true;
      } else if (person.name === personObject.name) {
        nameRepeated = true;

        if (
          confirm(`${personObject.name} is already added to phonebook, 
          replace the old number with a new one?`)
        ) {
          handleNumberUpdate(person.id, personObject);

          setNotificationMessage({
            message: `${personObject.name} number updated`,
            messageType: 0,
          });
          setTimeout(() => {
            setNotificationMessage({ message: null, messageType: 0 });
          }, 5000);
        }
      }
    });

    if (!nameRepeated) {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");

        setNotificationMessage({
          message: `Added ${personObject.name}`,
          messageType: 0,
        });
        setTimeout(() => {
          setNotificationMessage({ message: null, messageType: 0 });
        }, 5000);
      });
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

  const handleNumberUpdate = (id, personObject) => {
    personService
      .update(id, { ...personObject, id: id })
      .then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        );
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        setNotificationMessage({
          message: `Information of ${personObject.name} has already been removed from server`,
          messageType: 1,
        });
        setTimeout(() => {
          setNotificationMessage({ message: null, messageType: 1 });
        }, 5000);

        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  const handlePersoneDeleted = (id, name) => {
    if (confirm(`Do you really want to delete ${name} from your phonebook?`)) {
      personService.remove(id).catch((error) => {
        setNotificationMessage({
          message: `Information of ${name} has already been removed from server`,
          messageType: 1,
        });
        setTimeout(() => {
          setNotificationMessage({ message: null, messageType: 1 });
        }, 5000);
      });

      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  const personsAfterFilter = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage.message}
        messageType={notificationMessage.messageType}
      />
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
      <Persons
        persons={personsAfterFilter}
        handleDelete={handlePersoneDeleted}
      />
    </div>
  );
};

export default App;
