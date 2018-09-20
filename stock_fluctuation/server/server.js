const app = require("./app.js").app;
const PORT = process.env.PORT || 3001;

app.listen(PORT, err =>
  console.log(err || `Now listening on port ${PORT}  🤓 👨🏽‍💻`)
);
