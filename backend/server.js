const express = require("express");

const app = express();
app.use(express.json());

const main = async () => {
  app.listen(8080, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
