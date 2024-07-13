export const createValidationSchema = {
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
  displayName: {
    notEmpty: true,
  },
  password: {
    notEmpty: true,
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
            throw new Error(
              "Each question must have a non-empty correct answer"
            )
          }
          if (
            typeof question.correctAnswer !== "string" ||
            question.label.trim() === ""
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
