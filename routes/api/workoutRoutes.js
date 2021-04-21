const router = require("express").Router();
const Workout = require("../../models/workout.js");

router.get("/", (req, res) => {
    Workout.find({})
        .sort({ day: -1 })
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.get("/range", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.status(400).json(err)
        })
})

router.post("/", async (req, res) => {
    Workout.create(req.body).then(dbWorkout => {
        res.json(dbWorkout)
    })
})

router.put("/:id", (req, res) => {
    console.log(req.params)
    console.log(req.body)
    if (req.body.type === "cardio") {
        console.log("cardio")
        Workout.updateOne({ _id: req.params.id }, {
            $set:
            {
                exercises: [{
                    name: req.body.name,
                    distance: req.body.distance,
                    duration: req.body.duration
                }]
            }
        }).then(updatedWorkout => {
            res.json(updatedWorkout)
        })
    } else if (req.body.type === "resistance") {
        console.log("resistance")
        Workout.updateOne({ _id: req.params.id }, {
            $set:
            {
                exercises: [{
                    name: req.body.name,
                    duration: req.body.duration,
                    weight: req.body.weight,
                    reps: req.body.reps,
                    sets: req.body.sets
                }]
            }
        }).then(updatedWorkout => {
            res.json(updatedWorkout)
        })
    }

})

module.exports = router;