const bcrypt = require('bcrypt');
const db = require('../utils/db');

exports.follow = (req, res, next) => {
    db.collection('followers').findOne({ followerLogin: req.body.followerLogin, followedLogin: req.body.followedLogin })
        .then(exists => {
            if (exists) {
                return res.status(400).json({ error: 'Already followed' })
            }
            db.collection('users').findOne({ login: req.body.followedLogin })
                .then(followedUser => {
                    db.collection('users').findOne({ login: req.body.followerLogin })
                        .then(followerUser => {
                            db.collection('followers').insertOne({
                                followerLogin: req.body.followerLogin,
                                followedLogin: req.body.followedLogin,
                                followedAvatar: followedUser.avatar,
                                followerAvatar: followerUser.avatar,
                                date: new Date()
                            })
                                .then(valid => {
                                    if (!valid) {
                                        return res.status(403).json({ error: 'Unauthorized' });
                                    }
                                    res.status(204).json();
                                })
                                .catch(err => res.status(500).json({ error: err }));
                        })
                        .catch(err => res.status(500).json({ error: err }));
                })
                .catch(err => res.status(500).json({ error: err }))
        })
        .catch(err => res.status(500).json({ error: err }))
}

exports.unfollow = (req, res, next) => {
    db.collection('followers').findOne({ followerLogin: req.query.followerLogin, followedLogin: req.query.followedLogin })
        .then(exists => {
            if (!exists) {
                return res.status(400).json({ error: 'Not followed' })
            }
            db.collection('followers').deleteOne({ followerLogin: req.query.followerLogin, followedLogin: req.query.followedLogin })
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error: 'Could not unfollow' });
                    }
                    res.status(204).json()
                })
                .catch(err => res.status(500).json({ error: err }))
        })
        .catch(err => res.status(500).json({ error: err }))
}

exports.isFollower = (req, res, next) => {
    db.collection('followers').findOne({ followedLogin: req.params.followedLogin, followerLogin: req.params.followerLogin })
        .then(result => {
            res.status(200).json({ found: result ? true : false });
        })
        .catch(err => res.status(500).json({ error: err }))
}

exports.getUserFollowersList = (req, res, next) => {
    db.collection('followers').find({ followedLogin: req.params.login }).limit(Number(req.params.limit)).toArray()
        .then(followersList => {
            res.status(200).json({ followersList: followersList });
        })
        .catch(err => res.status(500).json({ error: err }))
}

exports.getUserFollowedList = (req, res, next) => {
    db.collection('followers').find({ followerLogin: req.params.login }).limit(Number(req.params.limit)).toArray()
        .then(followedList => {
            res.status(200).json({ followedList: followedList });
        })
        .catch(err => res.status(500).json({ error: err }));
}