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
        .then(newCampus => res.json(newCampus))
        .catch(next);
});

campusRouter.put('/:campusId', (req, res, next) => {
    db.Campus.update(req.body, {
        where: { id: req.params.campusId }
    })
        .then(newCampus => res.json(newCampus))
        .catch(next);
});

campusRouter.delete('/:campusId', (req, res, next) => {
    db.Student.destroy({
        where: { campusId: req.params.campusId }
    })
        .then(() => db.Campus.destroy({
            where: { id: req.params.campusId }
        }))
        .then(deletedCampus => res.json(deletedCampus))
        .catch(next);
});

module.exports = campusRouter;