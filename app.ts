
const assert = require('assert');
const path = require('path');

export default app => {
  assert(app.config.cuteCore, '[egg-cute-core] config invalid');

  if (!app.config.cuteCore.loads) {
    return;
  }

  const loads = ([...new Set(app.config.cuteCore.loads)]).filter(f => f);
  loads.forEach(f => {
    const paths = app.loader.getLoadUnits().map((unit) => path.join(unit.path, `app/${f}`));
    app.loader.loadToContext(paths, f, { call: true, caseStyle: 'lower', fieldClass: `${f}Classes`, });
  });
};