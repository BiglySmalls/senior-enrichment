const campusRouter = require('express').Router();
const db = require('../db/models');

campusRouter.get('/', (req, res, next) => {
    db.Campus.findAll()
        .then(campuses => res.json(campuses))
        .catch(next);
});

campusRouter.get('/:campusId/students');

campusRouter.post('/', (req, res, next) => {
    db.Campus.create(req.body)
        .then(campus => res.json(campus))
        .catch(next);
});

campusRouter.put('/:campusId');

campusRouter.delete('/:campusId', (req, res, next) => {
    db.Campus.destroy({
        where: { id: req.params.campusId }
    })
        .then(deletedRow => res.json(deletedRow))
        .catch(next);
});

module.exports = campusRouter;