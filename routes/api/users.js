const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} =require('../../controllers/user-controller.js');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/:friendId')
    .put(addFriend)
    .delete(deleteFriend);

module.exports = router;