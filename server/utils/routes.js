const Pets = require('../controllers/pets');

module.exports = app => {
  app.get("/pets", Pets.getAll);
  app.get("/pets/:_id", Pets.getOne);
  app.post("/pets", Pets.create);
  app.put("/pets/:_id", Pets.update);
  app.delete("/pets/:_id", Pets.remove);
}