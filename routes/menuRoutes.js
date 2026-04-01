const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/Menu');

// POST route to add a menu item
router.post('/menu', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log("menu data saved");
        res.status(200).json(response);
    } catch (err) {
        console.log("error saving menu data", err);
        res.status(500).json({ error: 'internal server error' });
    }
});

// GET route to fetch all menu items
router.get('/menu', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("menu data fetched");
        res.status(200).json(data);
    } catch (err) {
        console.log("error fetching menu data", err);
        res.status(500).json({ error: 'internal server error' });
    }
});

// Parameterized GET route for category
router.get('/menu/:categoryType', async (req, res) => {
    try {
        const categoryType = req.params.categoryType;
        if (['breakfast', 'lunch', 'dinner', 'snack'].includes(categoryType)) {
            const response = await MenuItem.find({ category: categoryType });
            console.log("menu data fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'invalid category type' });
        }
    } catch (err) {
        console.log("error fetching menu data", err);
        res.status(500).json({ error: 'internal server error' });
    }
});

module.exports = router;
