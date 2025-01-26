export const registerUserSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage: "Must be between 5 - 32 characters",
    },
    notEmpty: {
      errorMessage: "Username must not be empty",
    },
    isString: true,
  },
  email: {
    notEmpty: {
      errorMessage: "Email must not be empty",
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password must not be empty",
    },
  },
}

export const userLoginSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email must not be empty",
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
  },
  password: {
    notEmpty: {
      errorMessage: "Password must not be empty",
    },
  },
}

export const forgotPasswordSchema = {
  email: {
    notEmpty: {
      errorMessage: "Email must not be empty",
    },
    isEmail: {
      errorMessage: "Email must be a valid email address",
    },
  },
}

export const resetPasswordSchema = {
  password: {
    notEmpty: {
      errorMessage: "Password must not be empty",
    },
  },
}

export const quizSubmissionValidationSchema = {
  accessKey: {
    isString: {
      errorMessage: "accessKey must be a string",
    },
    notEmpty: {
      errorMessage: "accessKey must not be empty",
    },
  },
  quizId: {
    isString: {
      errorMessage: "quizId must be a string",
    },
    notEmpty: {
      errorMessage: "quizId must not be empty",
    },
  },
  studentName: {
    isString: {
      errorMessage: "studentName must be a string",
    },
    notEmpty: {
      errorMessage: "studentName must not be empty",
    },
  },
  answers: {
    custom: {
      options: (answers) => {
        if (typeof answers !== "object" || Array.isArray(answers)) {
          throw new Error("Answers must be an object")
        }
        const keys = Object.keys(answers)
        if (keys.length === 0) {
          throw new Error("Answers must not be empty")
        }
        keys.forEach((questionId) => {
          const answer = answers[questionId]
          if (typeof questionId !== "string" || questionId.trim() === "") {
            throw new Error(`Each key in answers must be a non-empty string`)
          }
          if (
            typeof answer.submittedAnswer !== "string" ||
            answer.submittedAnswer.trim() === ""
          ) {
            throw new Error(
              `Each answer object must have a non-empty submittedAnswer for questionId ${questionId}`
            )
          }
        })
        return true
      },
    },
  },
}

export const quizValidationSchema = {
  title: {
    isString: {
      errorMessage: "Title must be a string",
    },
    notEmpty: {
      errorMessage: "Title must not be empty",
    },
  },
  active: {
    isBoolean: {
      errorMessage: "Active must be a boolean",
    },
    notEmpty: {
      errorMessage: "Active must not be empty",
    },
  },
  questions: {
    isArray: {
      errorMessage: "Questions must be an array",
    },
    notEmpty: {
      errorMessage: "Questions must not be empty",
    },
    custom: {
      options: (questions) => {
        questions.forEach((question) => {
          if (
            typeof question.label !== "string" ||
            question.label.trim() === ""
          ) {
            throw new Error("Each question must have a non-empty label")
          }
          if (
            !Array.isArray(question.answers) ||
            question.answers.length === 0
          ) {
            throw new Error(
              `Answer must be an object`
            )
          }
          const orderSet = new Set()
          question.answers.forEach((answer) => {
            if (typeof answer !== "object" || answer === null) {
              throw new Error("Each answer must be a non-empty string")
            }

            if (typeof answer.value !== "string" || answer.value.trim() === "") {
              throw new Error(
                "Answer for question must have a non-empty value"
              )
            }

            if (
              typeof answer.isCorrect !== "boolean"
            ) {
              throw new Error("isCorrect must be a boolean")
            }
            if (typeof answer.order !== "number") {
              throw new Error("Answer.order must be a number")
            }
            if(orderSet.has(answer.order)){
              throw new Error("Answer.order must be unique within a question.")
            }
            orderSet.add(answer.order)
          })
        })
        return true
      },
    },
  },
}




