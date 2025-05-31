const jwt = require('jsonwebtoken');

const generateAccessToken = (id, duration) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: duration
    })
}

const generateRefreshToken = (id, duration) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, 
    { expiresIn: duration });
};

module.exports = {generateAccessToken,generateRefreshToken};