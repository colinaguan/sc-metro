const User = require('../models/user.model.js');

// Creates a new user
exports.create = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        favorites: req.body.favorites || []
    });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a user"
            })
        })
}

exports.getUserById = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
}

// Gets user
exports.getUser = (req, res) => {
    User.findOne({ username: req.params.userId })
        .then(user => {
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error retrieving user with id " + req.params.userId
            });
        });
}

// Gets all users
exports.getAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving users."
            });
        });
}

// Updates current user
exports.update = (req, res) => {
    User.findByIdAndUpdate({ user: req.params.userId }, {
        username: req.body.username,
        password: req.body.password,
        favorites: req.body.favorites
    }, { new: true })
        .then(user => {
            if (!yser) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Error updating user with id " + req.params.userId
            });
        });
}

// Deletes user
exports.deleteById = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
}

exports.delete = (req, res) => {
    User.deleteOne({ username: req.params.userId })
        .then(user => {
            res.send(user);
        }).catch(err => {
            return res.status(404).send({
                message: "Error deleting user " + req.params.userId
            })
        })
}