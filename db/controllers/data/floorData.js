function getFloors() {
    return [
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            buildingName: "Main Building",
            name: "Sub Basement",
            note: "-2",
            units: [
                { 
                    name: "Morgue",
                    note: ""
                }
            ]
        },
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            buildingName: "Main Building",
            name: "Basement",
            note: "-1",
            units: [
                { 
                    name: "Dispensary",
                    note: "Pharmacy"
                }
            ]
        },
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            buildingName: "Main Building",
            name: "Ground Floor",
            note: "1",
            units: [
                { 
                    name: "Emergency Dept",
                    note: "ED"
                }
            ]
        },
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            buildingName: "Main Building",
            name: "Second Floor",
            note: "2",
            units: [
                { 
                    name: "Invasive Medicine",
                    note: "Surgery"
                },
                {
                    name: "Recovery",
                    note: "Critical Care"
                }
            ]
        }        
    ]
}

module.exports = { getFloors }