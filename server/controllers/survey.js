let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let surveyId;

let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err) 
        {
            return console.error(err);
        }
        else
        {
            res.render('survey/list', 
            {title: 'Survey', 
            SurveyList: surveyList,
            displayName: req.user ? req.user.displayName: '',
            _id: req.user ? req.user._id: ''})
        }
    });
}

module.exports.startSurvey = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToDisplay) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('survey/start', 
            {title: 'Take survay', 
            survey: surveyToDisplay,
            displayName: req.user ? req.user.displayName: ''});
        }
    });
}

module.exports.displayAddPage = ('/add', (req, res, next) => {
    res.render('survey/add', 
    {title: 'Add Survey',
    displayName: req.user ? req.user.displayName: ''})
});

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "description": req.body.description,
        "user_id": req.user._id
    });

    Survey.create(newSurvey, (err, Survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            // get id of created survey
            surveyId = newSurvey._id;
        }
    });
}

// question controller
module.exports.displayQuestions = (req, res, next) => {
    Survey.findById(surveyId, (err, surveyToDisplay) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            res.render('survey/questions', 
            {title: 'Add Questions', 
            survey: surveyToDisplay,
            displayName: req.user ? req.user.displayName: ''});
        }
    });
}

// question controller
module.exports.processQuestions = (req, res, next) => {
    Survey.update({_id: surveyId},
        {
            $push: {
                questions: [{
                    "question": req.body.question,
                    "type": req.body.type,
                    "first": req.body.first,
                    "second": req.body.second,
                    "third": req.body.third,
                    "fourth": req.body.fourth
                }]
            }
        }, (err) => {
        if(err) 
        {
            console.log(err);
            res.end(err)
        }
        else 
        {
            // refresh the survey list
            res.redirect('/survey-list/questions');
        }
    })
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    surveyId = id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            //show the edit view
            res.render('survey/edit', 
            {title: 'Edit Survey', 
            survey: surveyToEdit,
            displayName: req.user ? req.user.displayName: ''});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "description": req.body.description,
        "questions": [{
            "question": req.body.question
        }]
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            // refresh the survey list
            res.redirect(req.get('referer'));
        }
    })
}

module.exports.displayEditQuestionPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findOne({_id: surveyId}, { questions: {$elemMatch: {_id: id}}}
    , (err, questionToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            //show the edit view
            res.render('survey/edit-question', 
            {title: 'Edit Question', 
            question: questionToEdit.questions[0],
            displayName: req.user ? req.user.displayName: ''});
        }
    });
}

module.exports.processEditQuestionPage = (req, res, next) => {
    let id = req.params.id

    Survey.updateOne({ "questions._id": id}, {
        $set: {
                "questions.$.question": req.body.question,
                "questions.$.type": req.body.type,
                "questions.$.first": req.body.first,
                "questions.$.second": req.body.second,
                "questions.$.third": req.body.third,
                "questions.$.fourth": req.body.fourth
        }
    }, (err) => {
        if(err) 
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            // refresh the survey list
            res.redirect('/survey-list/questions');
        }
    })
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err) 
        {
            console.log(err);
            res.end(err)
        }
        else 
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    })
}

module.exports.performDeleteQuestion = (req, res, next) => {
    let id = req.params.id;
    
    Survey.update({_id: surveyId}, {
        $pull: {
            questions: {
                "_id": id
            }
        }
    }, (err) => {
        if(err) 
        {
            console.log(err);
            res.end(err)
        }
        else 
        {
            // refresh the survey list
            res.redirect('/survey-list/questions');
        }
    })
}