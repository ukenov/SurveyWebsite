let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

let surveyController = require('../controllers/survey');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Survey List page - READ Operation */
router.get('/', surveyController.displaySurveyList);

/* GET Route for the Survey page - READ Operation */
router.get('/start/:id', surveyController.startSurvey);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, surveyController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, surveyController.processAddPage);

/* GET Route for displaying the whole survey - CREATE Operation */
router.get('/questions', requireAuth, surveyController.displayQuestions);

/* POST Route for processing the whole survey - CREATE Operation */
router.post('/questions', requireAuth, surveyController.processQuestions);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', requireAuth, surveyController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', requireAuth, surveyController.processEditPage);

/* GET Route for displaying the Edit Question page - UPDATE Operation */
router.get('/edit-question/:id', requireAuth, surveyController.displayEditQuestionPage);

/* POST Route for processing the Edit Question page - UPDATE Operation */
router.post('/edit-question/:id', requireAuth, surveyController.processEditQuestionPage);

/* GET to perform Deletion  - DELETE Operation */
router.get('/delete/:id', requireAuth, surveyController.performDelete);

/* GET to perform Deletion  - DELETE question Operation */
router.get('/delete-question/:id', requireAuth, surveyController.performDeleteQuestion);

/* GET to perform Deletion  - DELETE question Operation */
router.post('/start/:id', surveyController.finishSurvey);

module.exports = router;