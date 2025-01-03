import express from "express"

import cookieParser from "cookie-parser"
import session from "express-session"
import passport from "passport"
import "./strategies/local-strategy.mjs"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
import routes from "./routes/index.mjs"
import dotenv from "dotenv"
import cors from "cors"

//https://www.youtube.com/watch?v=YXjORp170Lg&t=564s

const app = express()

dotenv.config()

//compass connect uri -> mongodb://localhost:27017
mongoose
  // .connect("mongodb://localhost/quiz_maker")
  .connect(process.env.DATABASE_URI)
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(`Error: ${err}`))

app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use(
  cors({
    // origin: "http://localhost:8080",
    origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
    credentials: true,
    methods: ["GET", "POST", "PUT"],
  })
)

app.use(routes)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`)
})

app.get("/", (request, response) => {
  request.session.visited = true
  response.status(201).send({ msg: "Hello" })
})

app.get("/health", (req, res) => {
  res.send({ status: "ok" })
})
