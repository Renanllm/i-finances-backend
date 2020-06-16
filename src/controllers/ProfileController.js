const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Profile = mongoose.model('Profile');

const BCRYPT_SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const EXP_TIME_TOKEN = parseInt(process.env.EXP_TIME);

module.exports = {
    async getUser(req, res) {
        const userId = req.userId;

        if (userId) {
            const profile = await Profile.findById(userId);

            return res.json(profile);
        }

    },

    async register(req, res) {
        const name = req.body.name;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const profileModel = {
            name,
            password: hashedPassword,
            balance: req.body.balance,
            email: req.body.email
        }

        await Profile.create(profileModel);

        return res.status(200).send('Usuário cadastrado com sucesso!');
    },

    async login(req, res) {
        let profile = await Profile.findOne({ name: req.body.name });
        if (!profile) {
            res.status(401).send('Não foi encontrado um usuário com o login informado!');
        } else if (await bcrypt.compare(req.body.password, profile.password)) {
            let payload = {
                id: profile._id,
                login: profile.login
            };
            var token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: EXP_TIME_TOKEN
            });

            res.status(200).send({ auth: true, token: token });
        } else {
            res.status(401).send('Senha inválida!');
        }
    },

    async delete(req, res) {
        await Profile.findByIdAndDelete(req.params.id)

        return res.send();
    }
}