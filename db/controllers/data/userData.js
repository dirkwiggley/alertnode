
function getUsers() {
    return  [
        { 
            login: 'admin',
            password: 'adminadmin',
            name: 'Admin',
            email: 'dm_tim@yahoo.com',
            isAdmin: true,
            isClinicalUser: true,
            isFacilitiesUser: true,
            accountId: "",
            siteId: "",
            buildingId: "",
            floorId: "",
            unitId: "",
            token: null
        }
    ]
}

module.exports = { getUsers }