const router = require('express').Router();
const thoughtRoutes = require('./thought-routes')
const userRoutes = require('./user-routes');
const {User, Thought} = require('../../models');
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);


// router.get('/thoughts', (req, res) => {
//     Thought.find({}, (err, result) => {
//         if (err) {
//           res.status(500).json({ message: 'Internal server error' });
//         }
//         res.status(200).json(result);
//       });
// })


// router.get('/users', (req, res) => {
//     User.find({}, (err, result) => {
//         if (err) {
//           res.status(500).json({ message: 'Internal server error' });
//         }
//         res.status(200).json(result);
//       });
// })

module.exports = router;