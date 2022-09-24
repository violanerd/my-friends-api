const router = require('express').Router();
const { getAllThoughts } = require('../../controllers/thought-controller')
router.route('/').get(getAllThoughts)

// router.get('/', (req, res) => {
//     Thought.find({}, (err, result) => {
//         if (err) {
//           res.status(500).json({ message: 'Internal server error' });
//         }
//         res.status(200).json(result);
//       });
// })

module.exports = router;