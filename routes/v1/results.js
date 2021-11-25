const express = require("express");

const Result = require("../../models/Result");
const { studentAuth, teacherAuth } = require("../../middleware/auth");

const router = express.Router();

router.get("/search", studentAuth, async (req, res) => {
  const { dob, rollno } = req.query;

  if (!(dob && rollno))
    return res.status(400).json({
      message: "Please provide both dob and rollno.",
    });

  console.log(new Date(dob).toISOString());
  const result = await Result.findOne({ rollno, dob: new Date(dob) });

  if (result) return res.json(result);
  else
    return res.status(404).json({
      message: "No result found for given dob and rollno.",
    });
});

router.post("/add", teacherAuth, async (req, res) => {
  const { dob, rollno, score, name } = req.body;

  if (!(dob && rollno && score && name))
    return res.status(400).json({
      message: "Please provide all the details.",
    });

  const oldResult = await Result.findOne({ rollno });

  if (oldResult)
    return res.status(400).json({
      message: "Result already exists for given rollno.",
    });

  const result = await Result.create({ dob, rollno, score, name });
  return res.status(201).json(result);
});

router.get("/list", teacherAuth, async (req, res) => {
  res.json(await Result.find());
});

router.delete("/delete/:rollno", teacherAuth, async (req, res) => {
  const result = await Result.findOneAndDelete({ rollno: req.params.rollno });

  if (!result)
    return res.status(404).json({
      message: "No result found for given id.",
    });

  res.status(200).json(result);
});

router.get("/detail/:rollno", teacherAuth, async (req, res) => {
  const rollno = Math.abs(parseInt(req.params.rollno));

  if (isNaN(rollno))
    return res.status(400).json({
      message: "Please provide a valid rollno.",
    });

  const result = await Result.findOne({ rollno: req.params.rollno });

  if (!result)
    return res.status(404).json({
      message: "No result found for given roll no.",
    });

  res.json(result);
});

router.patch("/edit/:rollno", teacherAuth, async (req, res) => {
  const { dob, score, name } = req.body;

  delete req.body["_id"];
  delete req.body["rollno"];

  const result = await Result.findOneAndUpdate(
    { rollno: req.params.rollno },
    req.body,
    {
      new: true,
    }
  );

  if (!result)
    return res.status(404).json({
      message: "No result found for given id.",
    });

  res.status(200).json(result);
});

module.exports = router;
