const mongoose = require('mongoose');

const Movement = mongoose.model('Movement');
const Profile = mongoose.model('Profile');

module.exports = {
    async getAll(req, res) {
        const { page = 1, limit } = req.query;
        const movements = await Movement.paginate({},
            {
                page: parseInt(page),
                limit: parseInt(limit),
                sort: {
                    createdAt: -1
                }
            }
        );

        return res.json(movements.docs);
    },

    async getById(req, res) {
        const movement = await Movement.findById(req.params.id);

        return res.json(movement);
    },

    async register(req, res) {
        const movement = await Movement.create(req.body);

        const profile = await Profile.findOne();

        if (profile) {
            if (movement.value) {
                const newBalance = movement.type === 'Saída' ?
                    profile.balance - movement.value : profile.balance + movement.value;

                await Profile.findByIdAndUpdate(
                    profile._id,
                    { ...profile._doc, balance: newBalance },
                    { new: true, useFindAndModify: false }
                );

            }
        }

        return res.json(movement);
    },

    async update(req, res) {
        const oldMovement = await Movement.findById(req.params.id);

        const movement = await Movement.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });

        const profile = await Profile.findOne();

        if (profile) {
            if (movement.value) {

                let newBalance = oldMovement.type === 'Saída' ?
                    profile.balance + oldMovement.value : profile.balance - oldMovement.value;
                
                profile.balance = newBalance;

                newBalance = movement.type === 'Saída' ?
                    profile.balance - movement.value : profile.balance + movement.value;

                await Profile.findByIdAndUpdate(
                    profile._id,
                    { ...profile._doc, balance: newBalance },
                    { new: true, useFindAndModify: false }
                );
            }
        }

        return res.json(movement);
    },

    async delete(req, res) {
        await Movement.findByIdAndDelete(req.params.id);

        return res.send();
    },
}