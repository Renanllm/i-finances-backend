const mongoose = require('mongoose');

const Movement = mongoose.model('Movement');

module.exports = {
    async getAll(req, res) {
        const { page = 1 } = req.params;
        const movements = await Movement.paginate({}, { page, limit: 5 });
        
        return res.json(movements.docs);
    }, 

    async getById(req, res) {
        const movement = await Movement.findById(req.params.id);

        return res.json(movement);
    },

    async register(req, res) {
        const movement = await Movement.create(req.body);

        return res.json(movement);
    },

    async update(req, res) {
        const movement = await Movement.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });

        return res.json(movement);
    },

    async delete(req, res) {
        await Movement.findByIdAndDelete(req.params.id);

        return res.send();
    },
}