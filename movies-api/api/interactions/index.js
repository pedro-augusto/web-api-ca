import express from 'express';
import Interaction from './interactionModel';



const router = express.Router(); // eslint-disable-line

// create an interaction
router.post('/', async (req, res) => {
    const interaction = await Interaction(req.body).save();
    res.status(201).json(interaction);
});

// delete an interaction
router.delete('/:username/:movieId/:interactionType', async (req, res) => {
  const { username, movieId, interactionType } = req.params;

  const result = await Interaction.deleteOne({
    username,
    movieId,
    interactionType,
  });

  if (result.deletedCount === 0) {
    return res.status(404).json({ msg: "Interaction not found" });
  }

  res.status(204).end();
});

// Get user interactions
router.get('/:id', async (req, res) => {
    const interactions = await Interaction.find({
        username: req.params.id,
    });
    res.status(200).json(interactions);
});

export default router;
