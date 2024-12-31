import { Router } from "express"
import { Quiz } from "../mongoose/schemas/quiz.mjs"
import { checkSchema, validationResult } from "express-validator"
import { quizValidationSchema } from "../utils/validationSchemas.mjs"
import authenticateToken from "../middlewares/authenticateToken.mjs"


const router = Router()

router.post(
  "/api/quiz",
  checkSchema(quizValidationSchema),
  authenticateToken,
  async (request, response) => {
    const result = validationResult(request)
    if (!result.isEmpty()) return response.status(400).send(result.array())

    const data = { ...request.body, userId: request.user.userId }
    const newQuiz = new Quiz(data)

    try {
      const savedQuiz = await newQuiz.save()
      return response.status(201).send(savedQuiz)
    } catch (err) {
      console.log(err)
      return response.sendStatus(400)
    }
  }
)

router.get("/api/quiz/:id", authenticateToken, async (request, response) => {
  const id = request.params.id

  try {
    const quiz = await Quiz.findById(id)
    if (!quiz) {
      return response.sendStatus(404)
    }
    return response.status(200).json(quiz) //
  } catch (err) {
    console.log(err)
    return response.sendStatus(404)
  }
})

router.put(
  "/api/quiz/:id",
  authenticateToken,
  checkSchema(quizValidationSchema),
  async (request, response) => {
    const id = request.params.id
    const data = { ...request.body, userId: request.user.userId }

    try {
      const quiz = await Quiz.findByIdAndUpdate(id, data, { new: true })
      if (!quiz) {
        return response.status(404).send({ error: "Quiz not found" })
      }
      return response.status(200).json(quiz)
    } catch (err) {
      console.log(err)
      return response.sendStatus(404)
    }
  }
)

router.put(
  "/api/update-my-quizzes",
  authenticateToken,
  checkSchema({
    "*": quizValidationSchema,
  }),
  async (request, response) => {
    const userId = request.user.userId
    const quizUpdates = request.body 

    if (!Array.isArray(quizUpdates)) {
      return response
        .status(400)
        .json({ error: "Request body must be an array of quiz updates." })
    }

    try {
      const updatePromises = quizUpdates.map(async (quizUpdate) => {
        const { _id, ...data } = quizUpdate

        return Quiz.findOneAndUpdate(
          { _id: _id, userId },
          { ...data, userId },
          { new: true }
        )
      })

      const updatedQuizzes = await Promise.all(updatePromises)

      const successfulUpdates = updatedQuizzes.filter((quiz) => quiz !== null)

      return response.status(200).json({
        updatedQuizzes: successfulUpdates,
        failedUpdates: quizUpdates.length - successfulUpdates.length,
      })
    } catch (err) {
      console.log(err)
      return response.status(500).json({ error: "Could not update quizzes." })
    }
  }
)

router.get("/api/my-quizes", authenticateToken, async (request, response) => {
  try {
    const quizes = await Quiz.find({ userId: request.user?.userId })
    return response.status(200).json(quizes)
  } catch (err) {
    console.log(err)
    return response
      .sendStatus(500)
      .json({ error: "Could not retrieve quizzes" })
  }
})

export default router
