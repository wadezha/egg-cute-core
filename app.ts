
const assert = require('assert');

export default app => {
  assert(app.config.cuteCore, '[egg-cute-core] config invalid');
};