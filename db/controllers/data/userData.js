
function getUsers() {
    return  [
        { 
            login: 'admin',
            password: 'adminadmin',
            name: 'Admin',
            email: 'dm_tim@yahoo.com',
            isAdmin: true,
            isUser: true,
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