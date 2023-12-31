const getAllUsers = require ("../../controllers/users/getAllUsers")

const getAllUsersHandler = async (req, res) =>{
    try {
        const users = await getAllUsers()
        res.status(200).json(users)
    } catch (error) {   
        res.status(500).json({message: error.message})
    }
}

module.exports = getAllUsersHandler