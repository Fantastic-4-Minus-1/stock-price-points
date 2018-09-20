const { app } = require('./app.js');

const PORT = 3002 || process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

module.exports = {
  app,
};
