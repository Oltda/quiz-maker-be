import { Router } from "express"
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator"
import {
  registerUserSchema,
  userLoginSchema,
  forgotPasswordSchema,
} from "../utils/validationSchemas.mjs"
import { User } from "../mongoose/schemas/user.mjs"
import { hashPassword } from "../utils/helpers.mjs"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import validateRequest from "../middlewares/validateRequest.mjs"

const router = Router()

dotenv.config()

router.post(
  "/register",
  checkSchema(registerUserSchema),
  validateRequest,
  (req, res) => {
    const { username, email, password } = req.validatedData

    bcrypt
      .hash(password, 10)
      .then((hash) => {
        User.create({ username, email, password: hash })
          .then((user) => res.json("Success"))
          .catch((err) => res.json(err))
      })
      .catch((err) => res.json(err))
  }
)

router.post(
  "/login",
  checkSchema(userLoginSchema),
  validateRequest,
  (req, res) => {
    const { email, password } = req.validatedData

    User.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, role: user.role },
              process.env.JWT_SECRET,
              { expiresIn: "1d" }
            )
            res.cookie("token", token)
            // return res.json("Success")
            return res.send({ token: token })
          } else {
            return res.json("The password is incorrect")
          }
        })
      } else {
        return res.json("No record exists")
      }
    })
  }
)

router.post("/logout", (req, res) => {
  res.clearCookie("token")
  return res.json("Logged out successfully")
})

router.post(
  "/forgot-password",
  checkSchema(forgotPasswordSchema),
  validateRequest,
  (req, res) => {
    const { email } = req.validatedData
    User.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.send({ Status: "User does not exist" })
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      })
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "quiz.maker.service@gmail.com",
          pass: process.env.MAIL_APP_PASWORD,
        },
      })
      //TODO  -- update url link for reset password - environment
      var mailOptions = {
        from: "quiz.maker.service@gmail.com",
        to: "dan.olt@hotmail.cz",
        subject: "Reset your password",
        text: `http://localhost:5173/reset-password/${user._id}/${token}`,
      }

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error)
        } else {
          return res.send({ Status: "Success" })
        }
      })
    })
  }
)

router.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params
  const { password } = req.body

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" })
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }))
        })
        .catch((err) => res.send({ Status: err + "error occured" }))
    }
  })
})

export default router
