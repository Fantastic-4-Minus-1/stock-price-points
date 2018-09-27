const router = require('express').Router();
const controller = require('./controller');

router.route('/stockPricePoints/')
  .get(controller.all.get)
  .post(controller.company.post);

router.route('/stockPricePoints/:company')
  .get(controller.company.get)
  .put(controller.company.put)
  .delete(controller.company.delete);

module.exports = router;