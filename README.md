# egg-cute-core

<!--
Description here.
-->

## Install

```bash
$ npm i egg-cute-core --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.cuteCore = {
  enable: true,
  package: 'egg-cute-core',
};
```

## Configuration

``` 

config.cuteCore = {
  code: {
    success: 0,
    error: 1,
  },
  msg: {
    success: 'SYS_SUCCESS_MESSAGE',
    error: 'SYS_ERROR_MESSAGE',
  },
  loads: []
};

```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
