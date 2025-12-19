import express from 'express';
import Interaction from './interactionModel';



const router = express.Router(); // eslint-disable-line

// create an interaction
router.post('/', async (req, res) => {
    const interaction = await Interaction(req.body).save();
    res.status(201).json(interaction);
});

// delete an interaction
router.delete('/:id', async (req, res) => {
    const result = await Interaction.deleteOne({
        _id: req.params.id,
    });
    if (result.deletedCount) {
        res.status(204).json();
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find interaction' });
    }
});

// Get user interactions
router.get('/:id', async (req, res) => {
    const interactions = await Interaction.find({
        username: req.params.id,
    });
    res.status(200).json(interactions);
});

export default router;
