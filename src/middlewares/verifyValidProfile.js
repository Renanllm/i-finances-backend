const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'Usuário não autenticado.'
        });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    const jwtVerified = jwt.verify(token, process.env.SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(500).send({
                    auth: false,
                    message: 'Não foi possível autenticar o token.'
                });
            }

            req.userId = decoded.id;
            next();
        });
};