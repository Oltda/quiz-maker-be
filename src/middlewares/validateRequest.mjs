import { validationResult, matchedData } from "express-validator"

const validateRequest = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).send(result.array())
  }

  req.validatedData = matchedData(req)
  next()
}

export default validateRequest
