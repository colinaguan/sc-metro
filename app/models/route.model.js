const mongoose = require('mongoose');

const RouteSchema = mongoose.Schema({
    route: String,
    label: String,
    twoWay: Boolean,
    inbound: {
        weekday: [
            {
                stop: String,
                departures: [String],
                schoolTerm: Boolean,
                operating: Boolean
            }
        ],
        weekend: [
            {
                stop: String,
                departures: [String],
                schoolTerm: Boolean,
                operating: Boolean
            }
        ]
    },
    outbound: {
        default: {},
        weekday: [
            {
                stop: String,
                departures: [String],
                schoolTerm: Boolean,
                operating: Boolean
            }
        ],
        weekend: [
            {
                stop: String,
                departures: [String],
                schoolTerm: Boolean,
                operating: Boolean
            }
        ]
    }
});

module.exports = mongoose.model('Route', RouteSchema);