import Surveys from '../models/surveys.model.js';

export const surveysHandler = async (req,res) => {
    try {
        const surveyData = req.body;
        const {name, gender, nationality, email, phoneNumber, address, message} = surveyData;
            // Check if any required field is missing
        if(!name || !gender || !nationality || !email || !phoneNumber || !address || !message)
            return res.status(400).json({message: 'All fields are required'});
            
        const survey = await Surveys.findOne({email: email});
        if(survey) return res.status(400).json({message: 'You have already submitted a survey'});

         // Save the data to the database
          await Surveys.create(surveyData);

        res.status(200).json({
        message: 'Survey submitted'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Internal server error'
        })
    }
}


export const getSurveys = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const count = await Surveys.countDocuments();
        const totalPages = Math.ceil(count / limit);

        const surveys = await Surveys.find()
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({ surveys, totalPages });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}
