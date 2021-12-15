const app = require("./app");
require("./db/mongo");
const PORT = process.env.PORT || 3001;

const listener = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.close = () => {
  listener.close();
};

module.exports = app;
