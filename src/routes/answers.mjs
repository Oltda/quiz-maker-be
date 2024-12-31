import { Router } from "express"
import { checkSchema, validationResult, matchedData } from "express-validator"
import { quizSubmissionValidationSchema } from "../utils/validationSchemas.mjs"
import { Quiz } from "../mongoose/schemas/quiz.mjs"
import QuizSubmission from "../mongoose/schemas/answer.mjs"
import authenticateToken from "../middlewares/authenticateToken.mjs"

const router = Router()

router.post(
  "/api/answers",
  checkSchema(quizSubmissionValidationSchema),
  authenticateToken,
  async (request, response) => {
    if (!request.user) {
      return response.sendStatus(401)
    }
    const result = validationResult(request)
    if (!result.isEmpty()) return response.status(400).send(result.array())

    const data = matchedData(request)
    const { quizId, studentName, accessKey, answers } = data

    const quiz = await Quiz.findById(quizId)
    if (!quiz) {
      return response.sendStatus(404)
    }

  

    const results = quiz.questions.map((quest) => {
      
      const correctAnswers = quest.answers
        .filter((answ) => answ.isCorrect)
        .map((a) => a.value)

      return {
        questionId: quest._id,
        label: quest.label,
        isCorrect: correctAnswers.includes(answers[quest._id].submittedAnswer),
        submittedAnswer: answers[quest._id].submittedAnswer,
      }
    })

    const answerPayload = {
      quizId: quiz._id,
      studentName: studentName,
      results: results,
    }

    console.log(answerPayload)

    const newQuizSubmission = new QuizSubmission(answerPayload)
    try {
      const savedSubmission = await newQuizSubmission.save()
      return response.status(201).send(savedSubmission)
    } catch (err) {
      console.log(err)
      return response.sendStatus(400)
    }
  }
)

export default router

