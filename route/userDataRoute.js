const router = require("express").Router();
const UserData = require("../model/userData");
const Joi = require('joi')
const sectorOptions = require('../data')



router.get("/sectors", (req, res, next) => {
  res.json({
    data: sectorOptions,
  });
});

router.post("/uploads", async (req, res) => {
    try {
      // Joi validation schema
      const formDataValidationSchema = Joi.object({
        name: Joi.string().required(),
        selectedCategory: Joi.string().required(),
        selectedSector: Joi.string().required(),
        agreeToTerms: Joi.boolean().required(),
      });
  
      // Validate request body
      const { error } = formDataValidationSchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // Save form details to the database
      const formData = req.body;
  
      const newFormData = new UserData(formData);
      await newFormData.save();
  
      return res.status(201).json({ message: 'Form data saved successfully' });
    } catch (err) {
      console.error('Error saving form data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router;
