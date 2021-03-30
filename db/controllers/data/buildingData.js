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
            },
            vendors: []
        },
        {
            accountName: "Poppa Pills",
            siteName: "Poppa Pills Vegas",
            name: "West Annex",
            address: {
                addressLine1:  "23 The Strip",
                addressLine2: "",
                city: "Las Vegas",
                stateProvince: "Nevada",
                postalCode: "44333",
                country: "USA",
            },
            vendors: []
        },
        {
            accountName: "International House of Pancreas",
            siteName: "Livermore",
            name: "Cirrhosis Corner",
            vendors: []
        },
        {
            accountName: "Appendectomy Self Service",
            siteName: "Bellybutton Vista",
            name: "Hernia Heights",
            vendors: []
        },
        {
            accountName: "Semicolon Cancer Centers",
            siteName: "Sigmoid Center",
            name: "Constitutional Corner",
            vendors: []
        },
        {
            accountName: "Semicolon Cancer Centers",
            siteName: "Transverse Way",
            name: "Sphinter Circle",
            vendors: []
        }

    ];
}

module.exports = { getBuildings }