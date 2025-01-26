import mongoose from "mongoose"

const AnswerSchema = new mongoose.Schema({
  value: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  isCorrect: {
    type: mongoose.Schema.Types.Boolean,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
})

const QuestionSchema = new mongoose.Schema({
  label: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  answers: {
    type: [AnswerSchema], 
    required: true,
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
  active: {
    type: mongoose.Schema.Types.Boolean,
    required:true,
  },
  questions: {
    type: [QuestionSchema],
    required: true,
    unique: false,
  },
})

export const Quiz = mongoose.model("Quiz", QuizSchema)
export const Question = mongoose.model("Question", QuestionSchema)
