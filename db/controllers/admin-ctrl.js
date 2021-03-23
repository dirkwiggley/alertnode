const DataTypes = require('../dataTypes')
const sha256 = require('js-sha256')
const Role = require('../models/role-model')
const roleData = require('./data/roleData')
const Title = require('../models/title-model')
const titleData = require('./data/titleData')
const Account = require('../models/account-model')
const accountData = require('./data/accountData')
const Site = require('../models/site-model')
const siteData = require('./data/siteData')
const Building = require('../models/building-model')
const buildingData = require('./data/buildingData')
const Floor = require('../models/floor-model')
const floorData = require('./data/floorData')
const Unit = require('../models/unit-model')
const unitData = require('./data/unitData')
const Room = require('../models/room-model')
const roomData = require('./data/roomData')
const User = require('../models/user-model')
const userData = require('./data/userData')

initDataTypes = (req, res) => {
    const bodyList = [
        { name: 'role' },
        { name: 'title' },
        { name: 'account' },
        { name: 'site' },
        { name: 'building' },
        { name: 'floor' },
        { name: 'unit' },
        { name: 'room' },
        { name: 'contact' }
    ]

    bodyList.forEach(body => {
        saveDataTypes(res, body)
    })
    return res.status(201).json({
        success: true,
        message: 'DataTypes created!',
    })
}

saveDataTypes = (res, body) => {
    const dataType = new DataType(body)

    if (!dataType) {
        return res.status(400).json({ success: false, error: err })
    }

    dataType
        .save()
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'DataTypes not created!',
            })
        })
}

async function initItems(req, res, items, classType, pluralCap, singular) {
    const successMsg = pluralCap + " created"
    const errMsg1 = singular
    const errMsg2 = pluralCap + " not created"
    let responses = []
    for (const body of items) {
        await saveItem(classType, body, errMsg1, errMsg2).catch(reject => responses.push(reject))
    }
    if (responses.length > 0) {
        return res.status(400).json( { success: false, responses: responses } )
    }
    return res.status(200).json({
        success: true,
        message: successMsg,
    })
}

async function saveItem(classType, body, errMsg1, errMsg2) {
    return new Promise((resolve, reject) => {
        const item = new classType(body)
        if (!item) {
            reject( { status: 400, message: errMsg1, errMsg2} )
        }
    
        classType.findOne({ name: body.name }, (err, foundItem) => {
            if (err) {
                reject( { status: 401, error: error, message: errMsg2} )
            }
    
            if (!foundItem) {
                item.save()
                .catch(error => {
                    reject( { status: 401, error: error, message: errMsg2} )
                })
            }
    
            resolve()
        }).catch(err => console.log(err))
    })
}

function initRoles(req, res) {
    const items = roleData.getRoles()
    initItems(req, res, items, Role, 'Roles', 'role')
}

function initTitles(req, res) {
    const items = titleData.getTitles()
    initItems(req, res, items, Title, 'Titles', 'title')
}

function initAccounts(req, res) {
    const items = accountData.getAccounts()
    initItems(req, res, items, Account, 'Accounts', 'account')
}

function initSites(req, res) {
    const items = siteData.getSites()
    initItems(req, res, items, Site, 'Sites', 'site')
}

function initBuildings(req, res) {
    const items = buildingData.getBuildings()
    initItems(req, res, items, Building, 'Buildings', 'building')
}

function initFloors(req, res) {
    const items = floorData.getFloors()
    initItems(req, res, items, Floor, 'Floors', 'floor')
}

function initUnits(req, res) {
    const items = unitData.getUnits()
    initItems(req, res, items, Unit, 'Units', 'unit')
}

function initRooms(req, res) {
    const items = roomData.getRooms()
    initItems(req, res, items, Room, 'Rooms', 'room')
}

function initUsers(req, res) {
    const items = userData.getUsers();
    // seed user pwds are not encrypted in the data file
    items.forEach(body => {
        const pwd = sha256.hmac('key', body.password)
        body.password = pwd;
    })
    initItems(req, res, items, User, 'Users', 'user')
}

getItemId = (type, name, params) => {
    let items = null;
    switch (type) {
        case DataTypes.ROLE:
            items = params.roles ? params.roles : [];
            break;
        case DataTypes.TITLE:
            items = params.titles ? params.titles : [];
            break;
        case DataTypes.ACCOUNT:
            items = params.accounts ? params.accounts : [];
            break;
        case DataTypes.SITE:
            items = params.sites ? params.sites : [];
            break;
        case DataTypes.BUILDING:
            items = params.buildings ? params.buildings : [];
            break;
        case DataTypes.FLOOR:
            items = params.floors ? params.floors : [];
            break;
        case DataTypes.UNIT:
            items = params.units ? params.units : [];
            break;
        case DataTypes.ROOM:
            items = params.rooms ? params.rooms : [];
            break;
        case DataTypes.CONTACT:
            items = params.contacts ? params.contacts : [];
            break;
        case DataTypes.USER:
            items = params.users ? params.users : [];
            break;            
        default:
            console.log(type, 'WTF?');
    }

    for (const item of items) {
        if (DataTypes.USER === type && item.login === name) {
            return item._id;
        } else if (item.name === name) {
            return item._id;
        }
    }

    return null;
}

async function updateIds(req, res) {
    var roles = null;
    var titles = null;
    var accounts = null;
    var sites = null;
    var buildings = null;
    var floors = null;
    var units = null;
    var users = null;

    roles = await Role.find({ }, (err, roleList) => {
        if (err) {
            console.log('Roles not found!');
            return;
        };

        return roleList;
    });
        
    titles = await Title.find({ }, (err, titleList) => {
        if (err) {
            console.log('Titles not found!');
            return;
        };

        return titleList;
    });
    
    accounts = await Account.find({ }, (err, accountList) => {
        if (err) {
            console.log('Accounts not found!');
            return;
        };

        return accountList;
    });
    
    sites = await Site.find({ }, (err, siteList) => {
        if (err) {
            console.log('Sites not found!');
            return;
        };

        return siteList;
    });

    buildings = await Building.find({ }, (err, buildingList) => {
        if (err) {
            console.log('Buildings not found!');
            return;
        };

        return buildingList;
    });

    floors = await Floor.find({ }, (err, floorList) => {
        if (err) {
            console.log('Floors not found!');
            return;
        };

        return floorList;
    });

    rooms = await Room.find({ }, (err, roomList) => {
        if (err) {
            console.log('Rooms not found!');
            return;
        };

        return roomList;
    });

    units = await Unit.find({ }, (err, unitList) => {
        if (err) {
            console.log('Units not found!');
            return;
        };

        return unitList;
    });

    users = await User.find({ }, (err, userList) => {
        if (err) {
            console.log('Users not found!');
            return;
        }

        return userList;
    });

    let params = {
        'titles': titles,
        'roles': roles,
        'accounts': accounts,
        'sites': sites,
        'buildings': buildings,
        'floors': floors,
        'rooms': rooms,
        'units': units,
        'users': users,
    }
    updateAll(params);

    return res.status(201).json({
        success: true,
        message: 'Request recieved',
    })
};

updateAll = (params) => {
    if (params.roles) {
        for (const role of params.roles) {
            role.save().catch(error => console.log('[updateAll] saveRole: ' + error))
        }
    }
    if (params.titles) {
        for (var title of params.titles) {
            if (title.roles && title.roles.length > 0) {                
                let saveTitle = false;
                // get items that require id substitution here
                for (role of title.roles) {
                    if (role.name && !role.id) {
                        role.id = getItemId(DataTypes.ROLE, role.name, params)
                        if (role.id) {
                            saveTitle = true
                        }
                    }
                }
                if (saveTitle) {
                    title.save().catch(error => console.log('[updateAll] saveTitle: ' + error))
                }
            }
        }
    }
    if (params.accounts) {
        for (var account of params.accounts) {
            let saveAccount = false;
            // get items that require id substitution here
            if (account.sites && account.sites.length > 0) {
                for (site of account.sites) {
                    site.id = getItemId(DataTypes.SITE, site.name, params)
                    if (site.id) { 
                        saveAccount = true 
                    }
                }
            }
            if (saveAccount) {
                account.save().catch(error => console.log('[updateAll] saveAccount: ' + error))
            }
        }
    }
    if (params.sites) {
        for (var site of params.sites) {
            let saveSite = false;
            // get items that require id substitution here
            if (!site.accountId) {
                site.accountId = getItemId(DataTypes.ACCOUNT, site.accountName, params)
                if (site.accountId) {
                    saveSite = true
                }
            }
            for (building of site.buildings) {
                if (!building.id) {
                    building.id = getItemId(DataTypes.BUILDING, building.name, params)
                    if (building.id) {
                        saveSite = true
                    }
                }
            }
            if (saveSite) {
                site.save().catch(error => console.log('[updateAll] saveSite: ' + error))
            }
        }
    }
    if (params.buildings) {
        for (var building of params.buildings) {
            let saveBuidling = false
            // get items that require id substitution here
            if (!building.accountId) {
                building.accountId = getItemId(DataTypes.ACCOUNT, building.accountName, params)
                if (building.accountId) {
                    saveBuilding = true
                }
            }
            if (!building.siteId) {
                building.siteId = getItemId(DataTypes.SITE, building.siteName, params)
                if (building.siteId) {
                    saveBuidling = true
                }
            }
            for (floor of building.floors) {
                if (!floor.id) {
                    floor.id = getItemId(DataTypes.FLOOR, floor.name, params)
                    if (floor.id) {
                        saveBuidling = true
                    }
                }
            }
            if (saveBuidling) {
                building.save().catch(error => console.log('[updateAll] saveBuilding: ' + error))
            }
        }
    }
    if (params.floors) {
        for (var floor of params.floors) {
            let saveFloor = false
            // get items that require id substitution here
            if (!floor.accountId) {
                floor.accountId = getItemId(DataTypes.ACCOUNT, floor.accountName, params)
                if (floor.accountId) {
                    saveFloor = true
                }
            }
            if (!floor.siteId) {
                floor.siteId = getItemId(DataTypes.SITE, floor.siteName, params)
                if (floor.siteId) {
                    saveFloor = true
                }
            }
            if (!floor.buildingId) {
                floor.buildingId = getItemId(DataTypes.BUILDING, floor.buildingName, params)
                if (floor.buildingId) {
                    saveFloor = true
                }
            }
            for (var unit of floor.units) {
                if (!unit.id) {
                    unit.id = getItemId(DataTypes.UNIT, unit.name, params)
                    if (unit.id) {
                        saveFloor = true
                    }
                }
            }
            if (saveFloor) {
                floor.save().catch(error => console.log('[updateAll] saveFloor: ' + error))
            }
        }
    }
    if (params.units) {
        for (var unit of params.units) {
            let saveUnit = false
            // get items that require id substitution here
            if (!unit.accountId) {
                unit.accountId = getItemId(DataTypes.ACCOUNT, unit.accountName, params)
                if (unit.accountId) {
                    saveUnit = true
                }
            }
            if (!unit.siteId) {
                unit.siteId = getItemId(DataTypes.SITE, unit.siteName, params)
                if (unit.siteId) {
                    saveUnit = true
                }
            }
            if (!unit.buildingId) {
                unit.buildingId = getItemId(DataTypes.BUILDING, unit.buildingName, params)
                if (unit.buildingId) {
                    saveUnit = true
                }
            }
            if (!unit.floorId) {
                unit.floorId = getItemId(DataTypes.FLOOR, unit.floorName, params)
                if (unit.buildingId) {
                    saveUnit = true
                }
            }
            for (var room of unit.rooms) {
                if (!room.id) {
                    room.id = getItemId(DataTypes.ROOM, room.name, params)
                    if (room.id) {
                        saveUnit = true
                    }
                }
            }
            if (saveUnit) {
                unit.save().catch(error => console.log('[updateAll] saveUnit: ' + error))
            }
        }
    }
    if (params.rooms) {
        for (var room of params.rooms) {
            let saveRoom = false
            // get items that require id substitution here
            if (!room.accountId) {
                room.accountId = getItemId(DataTypes.ACCOUNT, room.accountName, params)
                if (room.accountId) {
                    saveRoom = true
                }
            }
            if (!room.siteId) {
                room.siteId = getItemId(DataTypes.SITE, room.siteName, params)
                if (room.siteId) {
                    saveRoom = true
                }
            }
            if (!room.buildingId) {
                room.buildingId = getItemId(DataTypes.BUILDING, room.buildingName, params)
                if (room.buildingId) {
                    saveRoom = true
                }
            }
            if (!room.floorId) {
                room.floorId = getItemId(DataTypes.FLOOR, room.floorName, params)
                if (room.buildingId) {
                    saveRoom = true
                }
            }
            if (!room.unitId) {
                room.unitId = getItemId(DataTypes.UNIT, room.unitName, params)
                if (room.unitId) {
                    saveRoom = true
                }
            }
            if (saveRoom) {
                room.save().catch(error => console.log('[updateAll] saveRoom: ' + error))
            }
        }
    }
};

module.exports = {
    initRoles,
    initTitles,
    initAccounts,
    initSites,
    initBuildings,
    initFloors,
    initUnits,
    initRooms,
    initUsers,
    updateIds
}