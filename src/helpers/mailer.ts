import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
// import User from '../src/models/userModel';
import User from '../models/userModel'

export const sendMail = async({email,emailType,userId}:any) =>{
    try{
        // TODO : configure mail for usage
          const hashedToken = await bcryptjs.hash(userId.toString(),10)

          if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId,{verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        } else if(emailType === "RESET"){
          await User.findByIdAndUpdate(userId, {forgotPasswordToken : hashedToken, forgotPasswordExpiry: Date.now() + 3600000})
        }
          const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "28acfbfdb7a27b", // should not be here
              pass: "cf98ef189d8639"  // should not be here 
            }
          });

         const mailOptions = {
            from: "radhasharma2786@gmail.com", // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", // Subject line
            html: `<p>Click<a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY" ? "verify your email": 
              "reset your password"} or copy and paste the link below in your browser.
              <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
              </p>`, // html body
          }
          const mailResponse = await transporter.sendMail(mailOptions)
          return mailResponse;

    } catch (error: any){
        throw new Error(error.message)
    }
}