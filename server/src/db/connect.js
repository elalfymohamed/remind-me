import mongoose from "mongoose";

export const connectDB = async (urlAPI, port, app) => {
  mongoose
    .connect(urlAPI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      app.listen(port, () => {
        console.log(`server running on port: ${port}`);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
};

mongoose.connection.on("error", (err) => {
  console.log(err);
});
