const mongoose = require('mongoose')
mongoose.set('useUnifiedTopology', true)

if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('use: node mongo.js password [name number]')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-lnfmm.mongodb.net/node-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({})
    .then(result => {
      console.log('phonebook:')
      result.forEach(person => console.log(`${person.name} ${person.number}`))
      mongoose.connection.close()
    })
}

if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(() => {
    console.log(`Added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })
}


