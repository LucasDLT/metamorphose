import  server  from "./server";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";



AppDataSource.initialize()
  .then(() => {
    console.log("Data Source inicializada correctamente!");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });