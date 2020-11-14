let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

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
            res.render('survey/list', {title: 'Survey', SurveyList: surveyList})
        }
    });
}

module.exports.displayAddPage = ('/add', (req, res, next) => {
    res.render('survey/add', {title: 'Add Survey'})
});

module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "description": req.body.description
    });

    Survey.create(newSurvey, (err, Survey) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            // refresh the survey list
            res.redirect('/survey-list');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else 
        {
            //show the edit view
            res.render('survey/edit', {title: 'Edit Survey', survey: surveyToEdit});
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "description": req.body.description
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
            res.redirect('/survey-list');
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