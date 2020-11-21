let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Survey Model
let Survey = require('../models/survey');

let surveyController = require('../controllers/survey')

/* GET Route for the Survey List page - READ Operation */
router.get('/', surveyController.displaySurveyList);

/* GET Route for the Survey page - READ Operation */
router.get('/start/:id', surveyController.startSurvey);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', surveyController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', surveyController.processAddPage);

/* GET Route for displaying the whole survey - CREATE Operation */
router.get('/questions', surveyController.displayQuestions);

/* POST Route for displaying the whole survey - CREATE Operation */
router.post('/questions', surveyController.processQuestions);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', surveyController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', surveyController.processEditPage);

/* GET to perform Deletion  - DELETE Operation */
router.get('/delete/:id', surveyController.performDelete);

module.exports = router;