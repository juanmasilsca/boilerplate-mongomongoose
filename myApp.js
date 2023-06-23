require('dotenv').config();

const mongoose = require('mongoose');
const mySecret = process.env['MONGO_URI']
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => handleError(error));

const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

// let newPerson = new Person({
//   name: 'Jota',
//   age: 36,
//   favoriteFoods: ["Peanut butter", "Yogurt"]
// });

// newPerson.save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const createAndSavePerson = ((done) => {
  let newPerson = new Person({
    name: "Juan Manuel",
    age: 36,
    favoriteFoods: ["Eggs", "Peanut butter", "Yogurt"]
  });
  newPerson.save((err, data) => {
    if (err) return console.error(err);
     done(null, data);
  });
});

const arrayOfPeople = [{
  name: "Mario",
  age: 36,
  favouriteFoods: ["Peanut butter", "Yogurt"]
}, {
  name: "Lois",
  age: 36,
  favouriteFoods: ["Peanut butter", "Yogurt"]
}];

// Person.create(arrayOfPeople)
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
        done(null, data);
  });
};

const personName = 'Gary';

// Person.find({name: personName})
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return console.error(err);
     done(null, data);
  })
};

const food = "Yogurt";

// Person.findOne({ favouriteFoods: food})
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
     done(null, data);
  });
};

const personId = '6495df497115b205d700fdd8';
const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    data.favoriteFoods.push(foodToAdd);
    data.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
    Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, (err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson);
    });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if (err) return console.error(err);
    done(null, deletedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, removedData) => {
    if (err) return console.error(err);
    done(null, removedData);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch})
    .sort('name')
    .limit(2)
    .select('-age')
    .exec((err, filteredPeople) => {
      if (err) return console.error(err);
      done(null, filteredPeople);
  });
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------
 
exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
