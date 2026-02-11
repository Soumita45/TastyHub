import mongoose from "mongoose";
import dotenv from "dotenv/config"

const url = process.env.url

export async function dbConnection() {
    try {
        await mongoose.connect(url)
        console.log("mongodb connected")
    } catch (error) {
        console.log("mongodb  not connected")

    }
}