import jwt from "jsonwebtoken"

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    //return res.sendStatus(401)
    return res.send({
      unauthorized: "!!!",
      cookies: req.cookies,
    })
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

///------------------------------
// import jwt from "jsonwebtoken"

// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"] // Get the Authorization header
//   const token = authHeader && authHeader.split(" ")[1] // Extract the token (assuming it is in the format "Bearer TOKEN")

//   console.log("AAAA#########")

//   if (!token) {
//     return res.sendStatus(401) // Unauthorized
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403) // Forbidden
//     }

//     req.user = user // Store user information in request object
//     next() // Proceed to the next middleware/route handler
//   })
// }

// export default authenticateToken
