import { ok } from 'assert';
import { RawSource } from 'webpack-sources';
import DedupeStringPlugin from '../src/index';

// initialize objects and create test code with expectations
const plugin = new DedupeStringPlugin();
const gzipSpace = Array(1000000).join(' ');
const code = `function() {
                const longString = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; ${gzipSpace}
                const longString2 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
              }`;
const expected = `function() {var _="xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; const longString = _; const longString2 = _; }`;

// wire up the fake compiler and fake settings
const fakeAssets = {
  'test.js': new RawSource(code)
};
const fakeCompiler: any = {
  options: {
    devtool: true
  },
  plugin: (name: 'compilation', callback: Function) => {
    callback({
      assets: fakeAssets,
      plugin: (name2: 'optimize-chunk-assets', callback2: Function) => {
        callback2([{
          files: ['test.js']
        }], () => {
          // do nothing
        });
      }
    });
  }
};

// execute the plugin
plugin.apply(fakeCompiler);

// gather the results
const result = fakeAssets['test.js'];

const codeResult = result.source().replace(/[\s]+/g, ' ');

// assert the result matches the expectations
ok(codeResult === expected, `Result (${result}) did not equal expected (${expected})`);
