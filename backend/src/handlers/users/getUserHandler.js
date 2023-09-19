const checkUserExists = require ("../../controllers/users/getUser")

const checkUserHandler = async (req, res) =>{
    const {email} = req.params
    try {
        const user = await checkUserExists(email)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
module.exports = checkUserHandler