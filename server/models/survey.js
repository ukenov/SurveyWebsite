let mongoose = require('mongoose');

// question model
let questionModel = mongoose.Schema({
    question: String,
    type: String,
    first: String,
    second: String,
    third: String,
    fourth: String
},
{
    collection: "questions"
});

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    description: String,
    questions:[questionModel]
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Question', questionModel);
module.exports = mongoose.model('Survey', surveyModel);