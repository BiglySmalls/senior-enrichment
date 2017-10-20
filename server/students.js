const studentRouter = require('express').Router();
const db = require('../db/models');

studentRouter.get('/', (req, res, next) => {
    db.Student.findAll()
        .then(students => res.json(students))
        .catch(next);
});

studentRouter.get('/:studentId', (req, res, next) => {
    db.Student.findOne({
        where: { id: req.params.studentId }
    })
        .then(updatedStudent => res.json(updatedStudent))
        .catch(next);
});

studentRouter.post('/', (req, res, next) => {
    db.Student.create(req.body)
        .then(student => res.json(student))
        .catch(next);
});

studentRouter.put('/:studentId', (req, res, next) => {
    db.Student.update(req.body, {
        where: { id: req.params.studentId }
    })
        .then(student => res.json(student))
        .catch(next);
});


studentRouter.delete('/:studentId', (req, res, next) => {
    db.Student.destroy({
        where: { id: req.params.studentId }
    })
        .then(deletedRow => res.json(deletedRow))
        .catch(next);
});

module.exports = studentRouter;