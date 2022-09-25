const router = require('express').Router();
const { getAllThoughts, createThought, getThoughtById } = require('../../controllers/thought-controller')

router.route('/').get(getAllThoughts).post(createThought)

router.route('/:thoughtId').get(getThoughtById)//.put().delete()

module.exports = router;