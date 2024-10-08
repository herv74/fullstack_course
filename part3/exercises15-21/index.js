require("dotenv").config();

const express = require("express");
const cors = require("cors");

const Person = require("./models/person");

const app = express();

app.use(cors());
app.use(express.static("dist"));

// OPERATIONS

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        if (error.errors.name) {
            return response.status(400).json({ error: error.message });
        } else if (error.errors.number) {
            response.status(400).json({
                error: `The phone number ${error.errors.number.value} is not following
                    a correct format.
                    (example: 09-1234556 / 040-22334455)`
            });
        } else {
            return response.status(400).json({ error: error.message });
        }
    }

    next(error);
};

app.use(express.json());

// -- GET -- //

app.get("/info", (request, response) => {
    Person.find({}).then((persons) => {
        response.send(`<p>Phonebook has info for ${persons.length} people</p>
            <p>${new Date().toString()}</p>`);
    });
});

app.get("/api/persons", (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id)
        .then((person) => {
            if (person) {
                response.json(person);
            }
            response.status(404).end();
        })
        .catch((error) => next(error));
});

// -- POST -- //

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    if (body.name === undefined || body.number === undefined) {
        return response.status(400).json({ error: "content missing" });
    }

    const person = new Person({
        name: body.name,
        number: body.number
    });

    Person.find({ name: person.name }).then((personfound) => {
        if (personfound.length === 0) {
            person
                .save()
                .then((savedPerson) => {
                    response.json(savedPerson);
                })
                .catch((error) => next(error));
        } else {
            Person.findByIdAndUpdate(
                personfound[0]._id.toString(),
                { name: person.name, number: person.number },
                { new: true }
            )
                .then((updatedPerson) => {
                    response.json(updatedPerson);
                })
                .catch((error) => next(error));
        }
    });
});

// -- PUT -- //

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedPerson) => {
            response.json(updatedPerson);
        })
        .catch((error) => next(error));
});

// -- DELETE -- //

app.delete("/api/persons/:id", (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
