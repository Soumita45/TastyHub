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

    const mailConfigurations = {
        from: process.env.userMail,
        to: email,
        subject: "Email verification",
        text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:5173/user/verify/${token} 
           Thanks`
    }
    transporter.sendMail(mailConfigurations, function (error, info) {
        if (error) {
            console.error("Error sending email:", error);  
        }
        console.log("Email Sent Successfully");
        console.log(info);
    });
}

