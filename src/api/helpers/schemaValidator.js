const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, strict: false, removeAdditional: false });
addFormats(ajv);

function validateSchema(data, schema, resourceName = 'response') {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    const details = validate.errors
      .map(error => `${error.instancePath || '/'} ${error.message}`)
      .join('; ');
    throw new Error(`Schema validation failed for ${resourceName}: ${details}`);
  }

  return true;
}

module.exports = { validateSchema };
