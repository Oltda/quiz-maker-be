import { Router } from "express"
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator"
import { createValidationSchema } from "../utils/validationSchemas.mjs"
import { User } from "../mongoose/schemas/user.mjs"
import { hashPassword } from "../utils/helpers.mjs"

const router = Router()

router.post(
  "/api/users",
  checkSchema(createValidationSchema),
  async (request, response) => {
    const result = validationResult(request)
    if (!result.isEmpty()) return response.status(400).send(result.array())

    const data = matchedData(request)
    data.password = hashPassword(data.password)
    const newUser = new User(data)
    try {
      const savedUser = await newUser.save()
      return response.status(201).send(savedUser)
    } catch (err) {
      return response.sendStatus(400)
    }
  }
)

export default router
