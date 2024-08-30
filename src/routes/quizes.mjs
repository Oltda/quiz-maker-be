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

    // if (!request.user) {
    //   return response.sendStatus(401)
    // }

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
      return response.sendStatus(404) // Return 404 if quiz not found
    }
    return response.status(200).json(quiz) //
  } catch (err) {
    console.log(err)
    return response.sendStatus(404)
  }
})

export default router
