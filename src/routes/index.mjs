import usersRouter from "./users.mjs"
import quizesRouter from "./quizes.mjs"
import answersRouter from "./answers.mjs"
import { Router } from "express"

const router = Router()

router.use(usersRouter)
router.use(quizesRouter)
router.use(answersRouter)

export default router
