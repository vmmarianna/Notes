var ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {
    //add new note
    app.post('/notes/add', (req, res) => {
        console.log(req.body.ttl)
        //проверка ttl на null
        if (req.body.ttl) {
            //преобразование строкового ttl в date объект
            var note = { text: req.body.body, title: req.body.title, ttl: new Date(req.body.ttl) }

        } else{
            var note = { text: req.body.body, title: req.body.title, ttl: null }
        }
        db.collection('notes').insertOne(note, (err, result) => {
            console.log('NOTE', note)
            if (err) {
                console.log('ERROR', err)
                res.send({
                    'error': 'An error has occured'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    //get all notes   if ttl null send note
    app.get('/notes/all', (req, res) => {
        //выборка через "логическое или" записей где ттл больше или равен текущему времени или равен нул
        db.collection('notes').find({
            $or: [
                {ttl: {'$gte': new Date()}},
                {ttl: null}
            ]
        }).toArray(function (err, result) {  
            if (err) {
                console.log('An error has occurred', err)
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('result:', result)
                res.send(result);
            }
        });
    });

    //get note by ID
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) }; 
        db.collection('notes').findOne(details, function (err, note) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                //если ттл равен нул или больше или равен текущему времени то запись отдается, иначе просрочена
                if (note.ttl == null || note.ttl >= new Date()){
                    res.send(note);
                } else {
                    console.log('note is expired')
                    res.send({message: "note is expired"})
                }

            }
        });
    });

    //delete note
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };  
        db.collection('notes').remove(details, function (err) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    //update note
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        if (req.body.ttl) {
            var note = { text: req.body.body, title: req.body.title, ttl: new Date(req.body.ttl) }

        } else{
            var note = { text: req.body.body, title: req.body.title, ttl: null }
        } // if ttl is not expired update ttl
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
            }
        });
    });

};