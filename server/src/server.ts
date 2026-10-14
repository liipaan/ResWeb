import "dotenv/config";
import app from "./app.ts";
import { connectDB } from "./config/db.ts";

const PORT : number = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
try {
    await connectDB();

    app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
}
}

void startServer();