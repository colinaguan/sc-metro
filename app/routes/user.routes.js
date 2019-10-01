module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Update User
    app.post('/users', user.create);

    // Find one User
    app.get('/users/:userId', user.getUserById);

    app.get('/users/username/:userId', user.getUser);

    // Get all users
    app.get('/users', user.getAll);

    // Update User information
    app.put('/users/:userId', user.update);

    // Delete User
    app.delete('/users/:userId', user.deleteById);

    app.delete('/users/username/:userId', user.delete);

}