import nodemailer from "nodemailer"
import dotenv from "dotenv/config"

export const verifyMail = async (token, email) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.userMail,
            pass: process.env.passMail,
        },
    })

    const verificationLink = `http://localhost:5173/verify/${token}`

    const mailConfigurations = {
        from: process.env.userMail,
        to: email,
        subject: "Verify Your Email Address",
        html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2>Email Verification</h2>
            <p>Hi there</p>
            <p>Thank you for registering. Please verify your email by clicking the button below:</p>

            <a href="${verificationLink}" 
               style="
                    display: inline-block;
                    padding: 12px 25px;
                    margin-top: 20px;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: #4CAF50;
                    text-decoration: none;
                    border-radius: 5px;
               ">
               Verify Email
            </a>
        </div>
        `
    }

    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email Sent Successfully");
            console.log(info);
        }
    });
}
