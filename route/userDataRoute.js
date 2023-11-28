const router = require("express").Router();
const UserData = require("../model/userData");
const Joi = require('joi')
const sectorOptions = require('../data')

router.get("/sectors", (req, res, next) => {
  res.json({
    data: sectorOptions,
  });
});

router.get("/uploads", async (req, res) => {
  try {
    const details = await UserData.find();
    res.status(200).json({
      data: details
    });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post("/uploads", async (req, res) => {
  try {
    const formDataValidationSchema = Joi.object({
      name: Joi.string().required(),
      selectedCategory: Joi.string().required(),
      selectedSector: Joi.string().required(),
      agreeToTerms: Joi.boolean().required(),
    });

    const { error } = formDataValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const formData = req.body;
    const newFormData = new UserData(formData);
    await newFormData.save();

    return res.status(201).json({ message: 'Form data saved successfully' });
  } catch (err) {
    console.error('Error saving form data:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete("/uploads/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFormData = await UserData.findByIdAndDelete(id);

    if (!deletedFormData) {
      return res.status(404).json({ error: 'Form data not found' });
    }

    return res.status(200).json({ message: 'Form data deleted successfully' });
  } catch (err) {
    console.error('Error deleting form data:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put("/uploads/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Joi validation schema for update
    const formDataValidationSchema = Joi.object({
      name: Joi.string(),
      selectedCategory: Joi.string(),
      selectedSector: Joi.string(),
      agreeToTerms: Joi.boolean(),
    });

    const { error } = formDataValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedFormData = await UserData.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedFormData) {
      return res.status(404).json({ error: 'Form data not found' });
    }

    return res.status(200).json({ message: 'Form data updated successfully', data: updatedFormData });
  } catch (err) {
    console.error('Error updating form data:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;