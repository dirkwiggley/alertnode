function getAlarmType() {
    return [
        {
            name: "Nurse Call",
        },
        {
            name: "Patient Monitoring",
        },
        {
            name: "Fire",
        },
        {
            name: "Gasses",
        },
        {
            name: "Refrigeration",
        },
        {
            name: "Electrical",
        },
        {
            name: "Security"
        },
        {
            name: "Wandering"
        }
    ]
}

module.exports = { getAlarmType }