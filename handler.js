'use strict';

// with reference to StackOverflow, https://stackoverflow.com/questions/45479961/aws-cognito-verification-email-using-parameters
module.exports.sendEmails = function(event, context) {
  if(event.userPoolId === process.env.cognitoUserPoolId) {
    
    console.log(event) // logging

    if (event.triggerSource === "CustomMessage_AdminCreateUser") { // refer to https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html#cognito-user-identity-pools-working-with-aws-lambda-trigger-sources for list of trigger Source
      const { codeParameter, userAttributes: { name, email } } = event.request;

        // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
        event.response.smsMessage = "Welcome to the service. Your confirmation code is " + event.request.codeParameter;
        event.response.emailSubject = "Welcome to the service";
        event.response.emailMessage = "Thank you for signing up. " + event.request.codeParameter + " is your verification code";
      }
    // Create custom message for other events
  }
  // Customize messages for other user pools
  context.done(null, event);
};