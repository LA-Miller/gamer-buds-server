require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");
app.use(require("./middleware/headers"))

app.use(Express.json());

app.use("/user", controllers.userController);
app.use("/post", controllers.postController);
app.use("/favorites", controllers.favGamesController);

app.use(require("./middleware/validate-jwt"));

// Changes made
dbConnection.authenticate()
    .then(() => dbConnection.sync({ force: true }))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    })
