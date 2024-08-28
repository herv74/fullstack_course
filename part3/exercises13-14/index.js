require("dotenv").config();

const Person = require("./models/person");

if (process.argv.length == 2) {
    console.log("phonebook:");
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(person.name, person.number);
        });

        process.exit(0);
    });
} else if (process.argv.length > 2 && process.argv.length < 4) {
    console.log("Give both name and number as arguments.");
    process.exit(1);
} else if (process.argv.length === 4) {
    const person = new Person({
        name: process.argv[2],
        number: process.argv[3]
    });

    person.save().then((result) => {
        console.log(
            `added ${result.name} number ${result.number} to phonebook`
        );
        
        process.exit(0);
    });
} else {
    console.log("Too much arguments.");
    process.exit(1);
}
