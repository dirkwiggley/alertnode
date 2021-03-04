function getBuildings() {
    return [
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            name: "Main Building",
            note: "",
            address: {
                addressLine1:  "22 The Strip",
                addressLine2: "",
                city: "Las Vegas",
                stateProvince: "Nevada",
                postalCode: "44333",
                country: "USA",
            },
            floors: [ 
                {
                    name: "Sub Basement",
                    note: "-2"
                },
                {
                    name: "Basement",
                    note: "-1"
                },
                {
                    name: "Ground Floor",
                    note: "1"
                },
                {
                    name: "Second Floor",
                    note: "2"
                }
            ]
        },
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            name: "West Annex",
            note: "",
            address: {
                addressLine1:  "23 The Strip",
                addressLine2: "",
                city: "Las Vegas",
                stateProvince: "Nevada",
                postalCode: "44333",
                country: "USA",
            },
            floors: [ 
                {
                    name: "Morgue Overflow",
                    note: "1"
                }
            ]
        }
    ];
}

module.exports = { getBuildings }