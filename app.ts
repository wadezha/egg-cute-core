
const assert = require('assert');
const path = require('path');

export default app => {
  assert(app.config.cuteCore, '[egg-cute-core] config invalid');
  
  if (app.config.cuteCore.entityPath) {
    const directory = path.join(app.config.baseDir, app.config.cuteCore.entityPath);
    app.loader.loadToContext(directory, 'entity');
  }
};