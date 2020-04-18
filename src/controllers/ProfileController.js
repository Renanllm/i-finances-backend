const mongoose = require('mongoose');

const Profile = mongoose.model('Profile');

module.exports = {
    async getAll(req, res) {
        const profile = await Profile.findOne();

        return res.json(profile);
    },

    async register(req, res) {
        const profile = await Profile.create(req.body);

        return res.json(profile);
    },

    async update(req, res) {
        const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });

        return res.json(profile);
    },
}