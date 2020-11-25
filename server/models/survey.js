let mongoose = require('mongoose');

// question model
let questionModel = mongoose.Schema({
    question: String,
    type: String,
    first: String,
    second: String,
    third: String,
    fourth: String
});

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    description: String,
    user_id: String,
    questions:[questionModel]
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);