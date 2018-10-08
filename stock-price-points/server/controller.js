const model = require('./model');

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
      model.company.get(req.params.company)
        .then(data => res.json(data))
        .catch(err => res.status('400').send(err))
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