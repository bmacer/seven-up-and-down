 const users = []

 const sevenUsers = [];

 const addUserToSeven = ({id, name, room, max}) => {
    const numberOfUsersInRoom = users.filter(user => user.room === room).length
    if(numberOfUsersInRoom === max) {
        return { error: 'Seven Room full' } 
    }
    const newUser = { id, name, room }
    sevenUsers.push(newUser)
    console.log("sevenUsers");
    console.log(sevenUsers);
    return { newUser }
 }

 const addUser = ({id, name, room}) => {
    const numberOfUsersInRoom = users.filter(user => user.room === room).length
    if(numberOfUsersInRoom === 4)
    return { error: 'Room full' }

    const newUser = { id, name, room }
    users.push(newUser)
    console.log("uuusers");
    console.log(users);
    return { newUser }
}

const removeUser = id => {
    const removeIndex = users.findIndex(user => user.id === id)

    if(removeIndex!==-1)
        return users.splice(removeIndex, 1)[0]
}

const getUser = id => {
    return users.find(user => user.id === id)
}

const getUsersInRoom = room => {
    return users.filter(user => user.room === room)
}

module.exports = { addUser, addUserToSeven, removeUser, getUser, getUsersInRoom }