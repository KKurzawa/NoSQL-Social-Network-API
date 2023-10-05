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
    .post(createUser);


router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;