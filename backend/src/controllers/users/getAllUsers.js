const {Users} = require ("../../db")

const moment = require ("moment")

const getAllUsers = async () => {
    const users = await Users.findAll({
      attributes: ['id', 'first_name', 'last_name',"email", 'avatar_img', 'admin', 'isActive','createdAt'],
    });
    const formattedUsers = users.map((user) =>{
        const formattedCreatedAt = moment(user.creactedAt).format('YYYY-MM-DD')
        return {
            ...user.toJSON(),
            createdAt: formattedCreatedAt
        }
    })
    return formattedUsers
  };

module.exports = getAllUsers