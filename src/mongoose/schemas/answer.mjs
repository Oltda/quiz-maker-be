import mongoose from "mongoose"



const ResultSchema = new mongoose.Schema(
  {
    questionId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    submittedAnswer: {
      type: String,
      required: true,
    },
  },
  { _id: false }
)

const QuizSubmissionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  studentName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  results: {
    type: [ResultSchema],
  },
})

const QuizSubmission = mongoose.model("QuizSubmission", QuizSubmissionSchema)

export default QuizSubmission
