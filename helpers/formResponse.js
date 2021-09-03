const formResponse = {
  formSuccess: (message, status, result) => {
    return {
      message: message,
      statusCode: status,
      data: result,
    }
  },
  formError: (message, status) => {
    return {
      message: message,
      statusCode: status,
    }
  }
}

module.exports = formResponse;
