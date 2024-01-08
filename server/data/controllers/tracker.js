const prisma = require("../models/index.js").db;

module.exports.getWorkouts = async (req, res) => {
  prisma.pastWorkout
    .findMany({
      where: {
        username: req.query.username,
      },
      select: {
        id: true,
        username: true,
        created_at: true,
        exercise: true,
      },
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports.postWorkout = async (req, res) => {
  let exerArr = req.body.exercises;
  let username = req.body.username;

  // pastWorkoutId
  prisma.pastWorkout
    .create({
      data: {
        username: username,
      },
    })
    .then((data) => {
      console.log(data);
      let arr = [];
      exerArr.forEach((val) => {
        arr.push({
          exercise_name: val.exercise.name,
          set: val.set,
          rep: val.rep,
          pastWorkoutId: data.id,
        });
      });
      prisma.exercise
        .createMany({
          data: arr,
        })
        .then(() => {
          res.sendStatus(200);
        })
        .catch((err) => {
          res.sendStatus(500);
          console.log("inside ", err);
        });
    })
    .catch((err) => {
      res.sendStatus(500);
      console.log("outside ", err);
    });
};
