const router = require('express').Router();
const help = require('../Helper/help');
const fs = require('fs');

router.get('/', function (req, res) {

    console.info(`Received your ${req.method} request}`)
    const dataFromJSON = fs.readFileSync('./db/db.json', 'utf8');
    res.json(JSON.parse(dataFromJSON));

});

router.post('/', function (req, res) {

    console.info(`Received your ${req.method} request`);
    const { title, text } = req.body;
    if (title && text) {
    const newNote = {
        title,
        text,
        id: help(),
    };
    const currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    currentNotes.push(newNote);

    fs.writeFile('./db/db.json', JSON.stringify(currentNotes), (err) =>
    err
    ? console.err(err)
    : console.log(`Note for ${newNote.title} has been taken`)
    );
    const response = {
        status: 'Saved Note',
        body: newNote,
    };

    console.log(response)
    res.status(201).json(response);
    } else {
        res.status(500).json('Your note was not Saved');
    }
});



module.exports = router;