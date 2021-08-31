const e = require("express");
const { find } = require("../models/marksCardModel");
const mongoose = require("mongoose");
const MarksCardList = require("../models/marksCardModel"),
  addMarksCard = (req, res) => {
    const { student_id, updated_by, marksCard_list } = req.body;

    MarksCardList.findOne({
      student_id: student_id,
    }).exec((err, student) => {
      if (err)
        res.status(400).json({
          err,
        });
      if (student) {
        const findSemister = student.marksCard_list.find((el) => {
          return el.semister === marksCard_list.semister;
        });

        const findIA =
          findSemister !== undefined
            ? findSemister.IA.find((el) => {
                return el.IA_type === marksCard_list.IA.IA_type;
              })
            : null;

        console.log(marksCard_list.IA, "fsadsdf");
        console.log(findIA, "findIA");
        console.log(findSemister, "findSemister");
        if (findSemister === undefined) {
          MarksCardList.findOneAndUpdate(
            {
              student_id: student_id,
            },
            {
              $push: {
                marksCard_list: marksCard_list,
              },
            },
            {
              new: !0,
              upsert: !0,
            }
          ).exec((err, data) => {
            if (err)
              res.status(400).json({
                message: err.message,
              });
            if (data)
              res.status(201).json({
                data,
              });
          });
        } else {
          if (findIA === undefined) {
            MarksCardList.findOneAndUpdate(
              {
                student_id: student_id,
                "marksCard_list.semister": findSemister.semister,
              },
              {
                $push: {
                  "marksCard_list.$.IA": marksCard_list.IA,
                },
              },
              {
                new: true,
                upsert: !0,
              }
            ).exec((err, data) => {
              if (err) res.status(400).json(err);
              if (data) res.status(201).json(data);
            });
          } else {
            if (findIA && findSemister) {
              res.status(400).json({
                message: `${findSemister.semister} ${findIA.IA_type} present in this MarksCard`,
              });
            }
          }
        }
      } else {
        const newMarksCard = new MarksCardList({
          student_id,
          updated_by,
          marksCard_list,
        });

        newMarksCard.save((err, marksCard) => {
          if (err) res.json(err);
          if (marksCard) res.json(marksCard);
        });
      }
    });
  };

getSemMarksCardFaculty = async (req, res) => {
  const { semister, student_id, IA_type } = req.body;
  console.log(semister, student_id, IA_type);
  MarksCardList.findOne({
    student_id: student_id,
  })
    .populate("stud_id", "stud_fname stud_lname")
    .exec((error, studentCard) => {
      if (error) res.status(400).json({ message: error });
      if (studentCard) {
        console.log(studentCard);
        const findSemister = studentCard.marksCard_list.find((el) => {
          return el.semister === semister;
        });

        const findIA = findSemister.IA.find((el) => {
          return el.IA_type === IA_type;
        });

        if (findSemister && findIA) {
          res.status(201).json({
            student: {
              IA: findIA,
              student: studentCard.stud_id,
              semister: findSemister.semister,
            },
          });
        }
      }
    });
};

getMarksCardForStudents = async (req, res) => {
  const semister = req.body.semister;
  const student_id = req.body.student_id;
  const IA_type = req.body.IA_type;
  console.log(semister, student_id, IA_type);
  MarksCardList.findOne({
    student_id: student_id,
  })
    .populate("stud_id", "stud_fname stud_lname")
    .exec((error, studentCard) => {
      if (error) res.status(400).json({ message: error });
      if (studentCard) {
        console.log(studentCard);
        const findSemister = studentCard.marksCard_list.find((el) => {
          return el.semister === semister;
        });

        const findIA = findSemister.IA.find((el) => {
          return el.IA_type === IA_type;
        });

        if (findSemister && findIA) {
          res.status(201).json({
            student: {
              IA: findIA,
              student: studentCard.stud_id,
              semister: findSemister.semister,
            },
          });
        } else {
          res.status(400).json({ message: "Not Found" });
        }
      }
    });
};

updateMarkCard = (req, res) => {
  console.log(req.body);
  const { reg, sem, IA_Type, marks } = req.body;
  // const reg=req.body.reg;
  MarksCardList.find({ student_id: reg }).exec((err, data) => {
    if (err) res.status(400).json({ message: "Student Not Found" });
    if (data) {
      console.log(data);

      const findSem = data[0].marksCard_list.find((el) => {
        return el.semister === sem;
      });

      const findIA =
        findSem &&
        findSem.IA.find((el) => {
          return el.IA_type === IA_Type;
        });

      const removeOldIA = findSem.IA.filter((el) => {
        return el.IA_type !== IA_Type;
      });

      console.log("removed", removeOldIA, "removed");

      removeOldIA.push({
        IA_type: IA_Type,
        marks: marks,
      });

      console.log("added", removeOldIA, "added");
      MarksCardList.findOneAndUpdate(
        {
          student_id: reg,
          "marksCard_list._id": mongoose.Types.ObjectId(findSem._id),
        },
        {
          $set: {
            "marksCard_list.$.IA": removeOldIA,
          },
        },
        { new: true }
      ).exec((er, data) => {
        if (er)
          res.status(400).json({
            ...er,
            message: "Couldn't Update the MarksCard! Try Again",
          });
        if (data) res.status(400).json({ data, message: "Updated MarksCard!" });
      });
    }
  });
};

module.exports = {
  addMarksCard: addMarksCard,
  getMarksCardForStudents: getMarksCardForStudents,
  getSemMarksCardFaculty: getSemMarksCardFaculty,
  updateMarkCard: updateMarkCard,
};
