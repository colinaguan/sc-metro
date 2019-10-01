const Route = require('../models/route.model.js');

// Updates routes
exports.update = (req, res) => {
    const route = new Route({
        route: req.body.route,
        label: req.body.label,
        twoWay: req.body.twoWay,
        inbound: req.body.inbound,
        outbound: req.body.outbound || {},
        schoolTerm: req.body.schoolTerm,
        operating: req.body.operating
    });

    route.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Route"
            });
        });
};

// Retrieve and return all routes from the database.
exports.getAll = (req, res) => {
    Route.find()
        .then(routes => {
            res.send(routes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving routes."
            });
        });
};

exports.getOne = (req, res) => {
    Route.findOne({ route: req.params.routeId })
        .then(route => {
            res.send(route);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Route not found with id " + req.params.routeId
                });
            }
            return res.status(500).send({
                message: "Error retrieving route with id " + req.params.routeId
            });
        });
}

// Deletes all routes
exports.delete = (req, res) => {
    Route.findByIdAndRemove(req.params.routeId)
        .then(route => {
            if (!route) {
                return res.status(404).send({
                    message: "Route not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Route deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Route not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Could not delete route with id " + req.params.noteId
            });
        });
};

// Retrieve a Route identified by the routeId in the request
exports.findOne = (req, res) => {
    Route.findById(req.params.routeId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Route not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + req.params.noteId
            });
        });
};