import express from 'express'
import cors from 'cors'
import mongoose from "mongoose";
const app = express();
const PORT = 4001;
app.use(cors());
app.use(express.json());

// Routes
import userRoutes from './routes/userRoutes.js'
app.use("/api/users", userRoutes);

const uri = "";

mongoose.connect(uri, {
  useNewUrlParser: true,
});``

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});



app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
