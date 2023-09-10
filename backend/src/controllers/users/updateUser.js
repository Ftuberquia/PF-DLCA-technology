const {Users} = require ("../../db")

const updateUsers = async(username, avatar_img, address, phone, isActive, admin, id) =>{
    const user = await Users.findOne({where:{id:id}})
    let updates = {}

    if(username !== undefined || username === "") {
        updates.username = username;
    }
    if(avatar_img !== undefined || avatar_img === "") {
        updates.avatar_img = avatar_img;
    }
    if(address !== undefined || address === "") {
        updates.address = address;
    }
    if(phone !== undefined || phone === "") {
        updates.phone = phone;
    }
    if(isActive !== undefined){
        updates.isActive = isActive
    }
    if(admin !== undefined){
        updates.admin = admin
    }
    await user.update(updates);

    return user
}

module.exports = updateUsers