require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");
app.use(require("./middleware/headers"))

app.use(Express.json());

app.use(cors());

app.use("/user", controllers.userController);
app.use("/post", controllers.postController);

app.use(require("./middleware/validate-jwt"));

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    })
