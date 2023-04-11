const auth = require('./../auth.js');
const express = require('express');
const followersCtrl = require('../controllers/followers.js');
const router = express.Router();
const usersCtrl = require('../controllers/users.js');

router.get('/:login', usersCtrl.getUser)
.put('/theme', auth, usersCtrl.changeDefaultTheme)
.get('/assets/:login', usersCtrl.getAssets)
.get('/stats/:login', usersCtrl.getMeters)
.post('/follow', followersCtrl.follow)
.get('/followers/:login/:limit', followersCtrl.getUserFollowersList)
.get('/followed/:login/:limit', followersCtrl.getUserFollowedList)
.get('/isfollower/:followerLogin/:followedLogin', followersCtrl.isFollower);

module.exports = router;