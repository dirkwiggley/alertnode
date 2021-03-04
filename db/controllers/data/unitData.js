function getUnits() {
    return [
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            buildingName: "Main Building",
            floorName: "Sub Basement",
            name: "Morgue",
            note: "",
            rooms: [
                { 
                    name: "001"
                }
            ]
        },
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            buildingName: "Main Building",
            floorName: "Basement",
            name: "Dispensary",
            note: "Pharmacy",
            rooms: [
                {
                    name: "01"
                }
            ]
        },
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            buildingName: "Main Building",
            floorName: "Ground Floor",
            name: "Emergency Dept",
            note: "ED",
            rooms: [
                {
                    name: "101"
                }
            ]
        },
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            buildingName: "Main Building",
            floorName: "Second Floor",
            name: "Invasive Medicine",
            note: "Surgery",
            rooms: [
                {
                    name: "201"
                }
            ]
        },
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            buildingName: "Main Building",
            floorName: "Second Floor",
            name: "Recovery",
            note: "Critical Care",
            rooms: [
                {
                    name: "202"
                }
            ]
        }        
    ]
}

module.exports = { getUnits }