import usersRouter from "./users.mjs"
import quizesRouter from "./quizes.mjs"
import { Router } from "express"

const router = Router()

router.use(usersRouter)
router.use(quizesRouter)

export default router
