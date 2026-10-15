import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.ts";
// import foodRoutes from "./routes/foodRoutes.ts";
// import categoryRoutes from "./routes/categoryRoutes.ts";
// import orderRoutes from "./routes/orderRoutes.ts";

const app = express();
app.use(
cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
}),
);
app.get("/api/health", (req, res) => {
res.json({ success: true, message: "Restaurant API is running" });
});
app.use(express.json());
app.use("/api/auth", authRoutes);
// app.use("/api/foods", foodRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);

app.use((_req,res)=>{
res.status(404).json({ success: false, message: "Route not found" });
})

export default app;