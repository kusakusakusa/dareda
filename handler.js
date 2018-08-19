'use strict';

// with reference to StackOverflow, https://stackoverflow.com/questions/45479961/aws-cognito-verification-email-using-parameters
module.exports.sendEmails = function(event, context, callback) {
  if(event.userPoolId === process.env.cognitoUserPoolId) {
    
console.log("event", event) // logging

    if (event.triggerSource === "CustomMessage_AdminCreateUser") { // refer to https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools-working-with-aws-lambda-triggers.html#cognito-user-identity-pools-working-with-aws-lambda-trigger-sources for list of trigger Source
      const { usernameParameter, codeParameter, userAttributes: { name, email } } = event.request;

        // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
        event.response.smsMessage = "Welcome to the service. Your confirmation code is " + event.request.codeParameter;
        event.response.emailSubject = `Welcome ${name}`;
        event.response.emailMessage = `<!DOCTYPE html>
          <html>
          <head>
            <title>Activate Account</title>
          </head>
          <body style="margin: 0px; padding: 0px; font-family: arial, san-serif; background:#f1f1f1; text-align: center;">
            <!-- Container -->
            <div style="margin: 0 auto;  max-width: 600px; background: #fff;border-bottom: 4px #ec2227 solid;border-top: 4px #ec2227 solid;">
              <!-- Header - Brand Logo -->
              <div style=" width: 100%; height: 100px; text-align: left ">
                <!-- <img src="<TODO INSERT BRAND LOGO HERE>" alt="Logo" height="20px" style="margin-top:40px; margin-left: 40px"> -->
              </div>
              <!-- Body -->
              <div style="padding:40px">
                <!-- APP ICON -->
                <div align="center"> <img src="appicon.png" height="60px"></div>
                  <br/>
                  <br/>
                <div style="width: 100%; text-align: center;" > 
                  <p style="line-height:30px; font-size:30px;font-weight: 800; color:#ec2227; letter-spacing: -1px;">Almost there!</p>
                </div>
                <div style="width: 100%; text-align: left;" > 
                  <p style="font-size: 16px; color:#464646; letter-spacing: 0px; line-height: 20px">  
                    Hi ${name}, <br/><br/>

                    <!-- Hide username if not mean for display -->
                    <div style="display: none">${usernameParameter}</div>

                    Thank you for registering with {2}!<br/>
                    Your account is created and this is your temporary password:

                    <br/><br/>

                  <div style="padding: 20px 0px; text-align: center; margin-left: 10%; border-radius: 10px; color: #ffffff; background:#ec2227; width: 80%">${codeParameter}</div>
                  <br/>
                  <br/>

                  <p style="font-size: 16px; color:#464646; letter-spacing: 0px;"> Thank you, <br/>
                  {2}
                  </p>
                </div>
              </div>
              <!-- Footer -->
              <div style=" width: 100%; height: 100px;"> </div>
            </div>
              <!-- Copyright -->
            <div><p style="font-size: 12px; color:#b7b7b7;">This is a system-generated message, please do not reply to this email. <br/> {3} All Rights Reserved</p></div>
              
          </body>
          </html>`;
      }
    // Create custom message for other events
  }
  // Customize messages for other user pools
console.log("event.response", event.response) // logging
  callback(null, event)
};