const CustomMessage_AdminCreateUser = require('./htmls/CustomMessage_AdminCreateUser').CustomMessage_AdminCreateUser
const CustomMessage_ForgotPassword = require('./htmls/CustomMessage_ForgotPassword').CustomMessage_ForgotPassword

'use strict';

// with reference to StackOverflow, https://stackoverflow.com/questions/45479961/aws-cognito-verification-email-using-parameters
module.exports.sendEmails = function(event, context, callback) {
  if(event.userPoolId === process.env.cognitoUserPoolId) {
    
console.log("event", event) // logging

    const { usernameParameter, codeParameter, userAttributes: { name, email } } = event.request

    switch (event.triggerSource) {
      case "CustomMessage_AdminCreateUser":
        event.response.smsMessage = "Welcome to the service. Your confirmation code is " + event.request.codeParameter;
        event.response.emailSubject = `Welcome ${name}`;
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
};