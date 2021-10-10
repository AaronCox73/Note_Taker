const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
var fs = require('fs');
const path = require("path");

const { notes } = require('./Develop/db/db.json');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));


// get for "GET /api/notes should read the db.json file and return all saved notes as JSON."
app.get('/api/notes', (req, res) => {
    res.json(notes)
})


// make an app.post to "WHEN I enter a new note title and the note’s text"
app.post('/api/notes', (req, res) => {

    req.body.id = notes.length.toString();

    const note = createNote(req.body, notes);

    res.json(note);

});

function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './Develop/db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    return note;
}


// get for "GET /notes should return the notes.html file."
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

// get for "GET * should return the index.html file."
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});





// make a delete request (as a bonus but not required by assignment)
// app.delete('/notes/:id', req, res => {
//     const id = req.params.id;

//     Note.findByIdAndDelete(id)
//         .then(result => {
//             res.json({ redirect: '/notes' })
//         })
// });

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`)
});