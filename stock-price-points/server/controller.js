const redis = require('redis');
const model = require('./model');



client.on('error', function (err) {
  console.log('Error ' + err);
})

const controller = {
  all: {
    get: (req, res) => {
      model.all.get()
        .then(data => res.json(data))
        .catch(err => res.status('400').send(err))
    }
  },
  company: {
    post: (req, res) => {
      model.company.post(req.body)
        .then(() => res.send())
        .catch(err => res.status('400').send(err))
    },
    get: (req, res) => {
      client.get(req.params.company, (err, cache) => {
        if (err) { res.send(err); }
        if (cache) { res.json(cache); }
        else {
          model.company.get(req.params.company)
            .then(data => {
              client.setex(req.params.company, 300, JSON.stringify(data));
              res.json(data);
            })
            .catch(err => res.status('400').send(err))
        }
      })
    },
    put: (req, res) => {
      model.company.put(req.body)
        .then(() => res.send())
        .catch(err => res.status('400').send(err))
    },
    delete: (req, res) => {
      model.company.delete(req.params.company)
        .then(() => res.send())
        .catch(err => res.status('400').send(err))
    }
  }
}

module.exports = controller;