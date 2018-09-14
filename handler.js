const AWS = require('aws-sdk')
const cognitoIdp = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'})

const CustomMessage_AdminCreateUser = require('./htmls/CustomMessage_AdminCreateUser').CustomMessage_AdminCreateUser
const CustomMessage_ForgotPassword = require('./htmls/CustomMessage_ForgotPassword').CustomMessage_ForgotPassword

'use strict'

// with reference to StackOverflow, https://stackoverflow.com/questions/45479961/aws-cognito-verification-email-using-parameters
module.exports.sendEmails = function(event, context, callback) {
  if(event.userPoolId === process.env.cognitoUserPoolId) {
    
console.log("event", event) // logging

    const { usernameParameter, codeParameter, userAttributes: { name, email } } = event.request

    switch (event.triggerSource) {
      case "CustomMessage_AdminCreateUser":
        event.response.smsMessage = "Welcome to the service. Your confirmation code is " + event.request.codeParameter
        event.response.emailSubject = `Welcome ${name}`
        event.response.emailMessage = CustomMessage_AdminCreateUser(usernameParameter, codeParameter, name)
        break
      case "CustomMessage_ForgotPassword":
        event.response.emailSubject = 'Reset password'
        event.response.emailMessage = CustomMessage_ForgotPassword(usernameParameter, codeParameter, name)
        break
    }
    // Create custom message for other events
  }
  // Customize messages for other user pools
console.log("event.response", event.response) // logging
  callback(null, event)
}

// https://github.com/aws-amplify/amplify-js/issues/369#issuecomment-369933670
module.exports.validateUniqueEmails = function(event, context) {
  console.log(JSON.stringify(event))

  // check if email is already in use
  if (event.request.userAttributes.hasOwnProperty('email')) {
    const email = event.request.userAttributes.email
    
    const params = {
      UserPoolId: event.userPoolId,
      Filter: 'email = "' + email + '"',
    }
    
    cognitoIdp.listUsers(params).promise()
    .then (results => {
      console.log(JSON.stringify(results))
      // if the usernames are the same, dont raise and error here so that
      // cognito will raise the duplicate username error
      if (results.Users.length > 0 && results.Users[0].Username !== event.userName) {
        console.log('Duplicate email address in signup. ' + email)
        context.done(Error('A user with the same email address exists'))
      }
      context.done(null, event)
    })
    .catch (error => {
      console.error(error)
      context.done(error)      
    })
  }
}
