import Dedupe, { DedupeOptions } from 'de-dupe';
import { Compiler } from 'webpack';
import { RawSource, ReplaceSource, SourceMapSource } from 'webpack-sources';

const pluginName = 'dedupe-string-plugin';

export interface DedupeStringPluginOptions extends DedupeOptions {

}

export default class StripWhitespacePlugin {
  private dedupe: Dedupe;

  constructor(options?: DedupeStringPluginOptions) {
    options = options || {};
    options.type = 'gzip';
    options.includeReplacements = true;
    this.dedupe = new Dedupe(options);
  }

  public apply(compiler: Compiler) {
    const dedupe = this.dedupe.dedupe.bind(this.dedupe);

    compiler.plugin('compilation', (compilation: any) => {
      compilation.plugin('optimize-chunk-assets', (chunks: any, callback: Function) => {
        chunks.forEach((chunk: any) => {
          chunk.files
            .forEach((file: string) => {
              const asset = compilation.assets[file];
              const code = asset.source();

              const result = dedupe(code);
              if (!result.replacements) {
                return;
              }

              if (result.replacements.length === 0) {
                // nothing to do here
                return;
              }

              if (!compiler.options.devtool) {
                compilation.assets[file] = new RawSource(result.code);
              } else {
                const replaceSource = new ReplaceSource(compilation.assets[file], pluginName);

                // perform the replacements
                for (let replacement of result.replacements) {
                  replaceSource.replace(replacement.start, replacement.end, replacement.text);
                }

                // generate the new sourcemap
                const sourceAndMap = replaceSource.sourceAndMap();
                const { source, map } = sourceAndMap;

                // replace the asset with the new sourcemap
                compilation.assets[file] = new SourceMapSource(result.code, pluginName, map, code);
              }
            });
        });
        callback();
      });
    });
  }
}
