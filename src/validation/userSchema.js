const joi = require('joi');

const schema = {
  signup: joi
    .object({
      email: joi.string().email().required(),
      mobile: joi
        .number()
        .integer()
        .message('Invalid mobile number. Must be number')
        .min(1000000000)
        .message('Invalid mobile number')
        .max(9999999999)
        .message('Invalid mobile number')
        .required(),
      module: joi.required(),
      name: joi.string().max(100).required(),
      password: joi.string().required(),
    })
    .options({ abortEarly: false, allowUnknown: true }),
  login: joi
    .object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .options({ abortEarly: false, allowUnknown: true }),
};

module.exports = schema;
