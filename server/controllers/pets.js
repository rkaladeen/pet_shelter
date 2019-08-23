const Pet = require('mongoose').model('Pet');

class PetController {
    getAll(req, res){
      Pet.find({}).sort('type')
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
    getOne(req, res){
      Pet.findOne({_id: req.params._id})
            .then(data => res.json(data))
            .catch(err => res.json(err));
    }
    create(req, res){
        let prod = new Pet(req.body);
        prod.save()
            .then(() => res.json({status: "Pet created!"}))
            .catch(err => res.json(err));
    }
    update(req, res){
      Pet.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true})
            .then(() => res.json({status: "Update successful!"}))
            .catch(err => res.json(err));
    }
    remove(req, res){
      Pet.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({status: "Pet Adopted!"}))
            .catch(err => res.json(err));
    }
    
}

module.exports = new PetController();