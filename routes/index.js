const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send(`<h1>Error 404, These arent the droids you're looking for.</h1>`);
});

module.exports = router;
