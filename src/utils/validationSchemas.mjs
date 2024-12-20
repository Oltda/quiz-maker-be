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
            typeof question.correctAnswer !== "string" ||
            question.correctAnswer.trim() === ""
          ) {
            throw new Error("Each question must have a non-empty label")
          }
          if (
            !Array.isArray(question.answers) ||
            question.answers.length === 0
          ) {
            throw new Error(
              "Each question must have a non-empty array of answers"
            )
          }
          question.answers.forEach((answer) => {
            if (typeof answer !== "string" || answer.trim() === "") {
              throw new Error("Each answer must be a non-empty string")
            }
          })
        })
        return true
      },
    },
  },
}



// {
//    "accessKey":"capitals1",
//    "studentName" : "Thanh",
//    "answers":{
//     "669e764ed57ced3df5470f36": {
//       "submittedAnswer": "Berlin"
//     },
//       "669e764ed57ced3df5470f37": {
//       "submittedAnswer": "Prague"
//     },
//       "669e764ed57ced3df5470f38": {
//       "submittedAnswer": "Rome"
//     },
//       "669e764ed57ced3df5470f39": {
//       "submittedAnswer": "Hanoi"
//     }
//    }
// }
