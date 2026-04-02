import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let mongodbURI = process.env.MONGO_URI;
        const projectName = "resumeBuilder";

        if (!mongodbURI) {
            throw new Error("MONGO_URI not set");
        }

        // remove trailing slash
        if (mongodbURI.endsWith("/")) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        // ✅ CONNECT FIRST
        await mongoose.connect(`${mongodbURI}/${projectName}`);

        console.log("✅ DB Connected Successfully");

        // ✅ THEN listen to events (optional)
        mongoose.connection.on("error", (err) => {
            console.log("MongoDB error:", err);
        });

    } catch (error) {
        console.error("❌ DB connection failed:", error.message);
    }
};

export default connectDB;