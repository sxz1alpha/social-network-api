const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    postThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controllers');

router
    .route('/')
    .get(getAllThoughts);
    
router
    .route('/:id')
    .post(postThought)
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;