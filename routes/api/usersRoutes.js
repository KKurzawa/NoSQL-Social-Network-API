const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/usersController');

router
    .route('/')
    .get(getUsers)
    // .get(getSingleUser)
    .post(createUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendID')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;