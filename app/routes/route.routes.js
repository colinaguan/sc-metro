module.exports = (app) => {
    const route = require('../controllers/route.controller.js');

    // Update Routes
    app.post('/routes', route.update);

    // Retrieve all Routes
    app.get('/routes', route.getAll);

    // Retrieve a Route
    app.get('/routes/:routeId', route.getOne)

    // Delete all Routes
    app.delete('/routes/:routeId', route.delete);

    // Retrieve a single Route with a routeId
    app.get('/routes/:routeId', route.findOne);

}