const mongoose = require("mongoose");

if (process.argv.length < 3) {
    console.log("Give password as argument.");
    process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack:${password}
@cluster0.el6io.mongodb.net/phonebookApp?
retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length == 3) {
    console.log("phonebook:");
    Person.find({}).then((result) => {
        result.forEach((person) => {
            console.log(person.name, person.number);
        });

        mongoose.connection.close();
        process.exit(0);
    });
} else if (process.argv.length > 3 && process.argv.length < 5) {
    console.log("Give both name and number as arguments.");
    process.exit(1);
} else if (process.argv.length === 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    });

    person.save().then((result) => {
        console.log(
            `added ${result.name} number ${result.number} to phonebook`
        );
        mongoose.connection.close();
    });
} else {
    console.log("Too much arguments.");
    process.exit(1);
}
