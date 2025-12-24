import { Bootstrap } from "@gapi/core";
import { AppModule } from "./app/app.module";

Bootstrap(AppModule).subscribe(() => {
  console.log("Server started at http://localhost:9000/graphql");
  console.log(
    "Test query http://localhost:9000/graphql?query={status{status}}"
  );
});
