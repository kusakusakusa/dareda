module.exports.CustomMessage_ForgotPassword = (usernameParameter, codeParameter, name) => {
  return `
    <!DOCTYPE html>
    <html>

      <head>
        <title>Forgot Password</title>
      </head>

      <body style="margin: 0px; padding: 0px; font-family: arial, san-serif; background:#f1f1f1; text-align: center">

        <!-- Container -->
        <div style="margin: 0 auto; max-width: 600px; background: #fff; border-bottom: 4px #ec2227 solid; border-top: 4px #ec2227 solid">

          <!-- Header - Brand Logo -->
          <div style="width: 100%; height: 100px; text-align: left">

            <!-- <img src="https://t4.rbxcdn.com/2d5d9e7b8bb8d4524a7dfcf9c48c889c" alt="Logo" height="20px" style="margin-top: 40px; margin-left: 40px"> -->
          </div>

          <!-- Body -->
          <div style="padding: 40px">

            <!-- APP ICON -->
            <div align="center">
              <img src="https://t4.rbxcdn.com/2d5d9e7b8bb8d4524a7dfcf9c48c889c" height="60px">
            </div>

            <br/>
            <br/>

            <div style="width: 100% text-align: left" > 
              <p style="font-size: 16px color:#464646 letter-spacing: 0px line-height: 20px">  
                Hi ${name},
              </p>

              <p style="font-size: 16px color:#464646 letter-spacing: 0px line-height: 20px">  
                We've received a request to reset your password. If you didn't make the request, just ignore this message. Otherwise, you can reset your password using this confirmation code:
              </p>

              <br/><br/>

              <div style="padding: 20px 0px; text-align: center; margin-left: 10%; border-radius: 10px; color: #ffffff; background:#ec2227; width: 80%">

                ${codeParameter}

              </div>
              
              <br/><br/>

              <p style="font-size: 16px; color:#464646 letter-spacing: 0px">
                Thank you.
              </p>

            </div>
          </div>

          <!-- Footer -->
          <!-- <div style=" width: 100%; height: 100px">
          </div> -->
        </div>

        <!-- Copyright -->
        <div>
          <p style="font-size: 12px; color: #b7b7b7">
            This is a system-generated message, please do not reply to this email.
            <br/>
            Copyright © ${(new Date()).getFullYear()} {Company Name}
          </p>
        </div>
          
      </body>
    </html>
  `
}