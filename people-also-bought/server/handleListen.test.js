const handleListen = require('./handleListen.js');
test('should call log with Ruby app listening...', () => {
  const PORT = 3003;
  const log = jest.fn();
  handleListen(log, PORT);
  expect(log.mock.calls).toHaveLength(1);
  expect(log.mock.calls[0][0]).toBe(`Ruby app listening on port ${PORT.toString()}!`);
});