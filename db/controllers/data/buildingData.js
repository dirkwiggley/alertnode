function getBuildings() {
    return [
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            name: "Main Building",
            address: {
                addressLine1:  "22 The Strip",
                addressLine2: "",
                city: "Las Vegas",
                stateProvince: "Nevada",
                postalCode: "44333",
                country: "USA",
            }
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
            }
        }
    ];
}

module.exports = { getBuildings }