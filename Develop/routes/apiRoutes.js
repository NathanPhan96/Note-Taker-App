const router = require('express').Router();

router.get('/', function (req, res) {

    res.json(`Received your ${req.method} request}`)
    const dataFromJSON = fs.readFileSync('./db/db.json', 'utf8');
    res.json(JSON.parse(dataFromJSON));

});

router.post('/', function (req, res) {

    res.json(`Received your ${req.method} request`);
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
    };
    const currentNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    currentNotes.push(newNote);
});



module.exports = router;