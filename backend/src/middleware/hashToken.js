import dotenv from "dotenv/config";
import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
import sessionSchema from "../models/sessionSchema.js";

export const hashToken = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        jwt.verify(token, process.env.secretKey, async (err, decoded) => {

            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(400).json({
                        success: false,
                        message: "Access token expired",
                    });
                }

                return res.status(400).json({
                    success: false,
                    message: "Token verification failed",
                });
            }

            const { id } = decoded;

            const user = await userSchema.findById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const existing =
                await sessionSchema.findOne({
                    userId: id
                });

            if (!existing) {
                return res.status(401).json({
                    success: false,
                    message: "User logged out already",
                });
            }
            req.userId = id;
            req.role = user.role;

            next();
        }

        );

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// export const hashToken = async (req, res,next) => {
//     try {
//         const authHeader = req.headers.authorization;
//     //   console.log(authHeader)
//         if (!authHeader || !authHeader.startsWith("Bearer")) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Authorization token is missing or Invalid",
//             });
//         } else {
//             const token = authHeader.split(" ")[1];
//             jwt.verify(token, process.env.secretKey, async (err, decoded) => {
//                 //  console.log(decoded);

//                 if (err) {
//                     if (err.name === "TokenExpiredError") {
//                         return res.status(400).json({
//                             success: false,
//                             message: "The registration Token is Expired",
//                         });
//                     }
//                     return res.status(400).json({
//                         success: false,
//                         message: "Token verification failed, possibly expired",
//                     });
//                 } else {
//                     const { id } = decoded;
//                     const user = await userSchema.findById(id);
//                     if (!user) {
//                         return res.status(404).json({
//                             success: false,
//                             message: "User not found",
//                         });
//                     } else {
//                          const existing = await sessionSchema.findOne({ userId: id });
//                     if (existing) {
//                         req.userId = id;
//                         req.role = user.role;
//                         next();
//                     } else {
//                         return res.status(401).json({
//                             success: true,
//                             message: "User logged out already",
//                         });
//                     }
//                     }
//                 }
//             });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };