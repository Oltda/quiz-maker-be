import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.sendStatus(401) // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403) // Forbidden
    }

    req.user = user // Store user information in request object
    next() // Proceed to the next middleware/route handler
  })
}

export default authenticateToken
