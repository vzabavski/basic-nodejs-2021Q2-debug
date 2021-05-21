var router = require('express').Router();
// var Game = require('../db').import('../models/game');

const Game = require('../models/game');

router.get('/all', (req, res) => {
    Game.findAll({ where: { owner_id: req.user.id } })
        .then(games => {
            res.status(200).json({
                games: games,
                message: "Data fetched."
            })
        })
        .catch((e) => {
            res.status(500).json({
                message: "Data not found"
            })
        })
})

router.get('/:id', (req, res) => {
    Game.findOne({ where: { id: req.params.id, owner_id: req.user.id } })
        .then(game => {
            res.status(200).json({
                game: game
            })
        })
        .catch(e => {
            res.status(500).json({
                message: "Data not found."
            })
        })
})

router.post('/create', (req, res) => {
    Game.create({
        title: req.body.game.title,
        owner_id: req.body.user.id,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    })
        .then(game => {
            res.status(200).json({
                game: game,
                message: "Game created."
            })
        })
        .catch(e => {
            res.status(500).send(e.message)
        })
})

router.put('/update/:id', (req, res) => {
    Game.update({
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played
    },
        {
            where: {
                id: req.params.id,
                owner_id: req.user
            }
        })
        .then(game => {
            res.status(200).json({
                game: game,
                message: "Successfully updated."
            })
        })
        .catch(e => {
            res.status(500).json({
                message: e.message
            })
        })
})

router.delete('/remove/:id', (req, res) => {
    Game.destroy({
        where: {
            id: req.params.id,
            owner_id: req.user.id
        }
    })
    .then(game => {
        res.status(200).json({
            game: game,
            message: "Successfully deleted"
        })
    })
    .catch(e => {
        res.status(500).json({
            error: e.message
        })
    })
})

module.exports = router;
