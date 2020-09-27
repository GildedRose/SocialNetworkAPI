const router = require('express').Router();
const thoughtRoute = require('./thought-route');
const userRoute = require('./user-route');

router.use('/Thought', thoughtRoute);
router.use('/User', userRoute);

module.exports = router;