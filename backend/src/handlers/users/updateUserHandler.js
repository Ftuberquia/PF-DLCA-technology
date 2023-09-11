const updateUser = require ("../../controllers/users/updateUser")

const updateUserHandler = async (req, res) =>{
    const {id} = req.params
    const {username, avatar_img, address, phone, isActive, admin,} = req.body
    try{
        const newUser = await updateUser(username, avatar_img, address, phone, isActive, admin, id)
        return res.status(200).json(newUser)
    } catch(error){
        return res.status(400).json({error: error.message})
    }
}

module.exports = updateUserHandler