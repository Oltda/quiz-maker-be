import mongoose from "mongoose"

const QuestionSchema = new mongoose.Schema({
  label: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  answers: {
    type: [String], // An array of strings
    required: true,
  },
  correctAnswer: {
    type: mongoose.Schema.Types.String,
  },
})

const QuizSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  title: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,
  },
  accessKey: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: false,
  },
  questions: {
    type: [QuestionSchema],
    required: true,
    unique: false,
  },
})

export const Quiz = mongoose.model("Quiz", QuizSchema)
export const Question = mongoose.model("Question", QuestionSchema)
