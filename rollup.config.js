import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import html from '@rollup/plugin-html';
import copy from 'rollup-plugin-copy'

const env = process.env.MODE;
const isProd = ['prod'].includes(env);
console.log('isProd:', isProd);
const root = process.cwd();

const template = (publicPath) => {
  return `<!DOCTYPE html>
  <html>
    <head lang="en">
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width" />
      <title>rollup-starter-app</title>
      <link rel="shortcut icon" href="${publicPath}favicon.ico"></head>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          color: #333;
          font-weight: 300;
        }
      </style>
    </head>
    <body>
      <h1>rollup-starter-app</h1>
      <p>
        The time is
        <span id="time-now">...</span>
      </p>
      <script src="${publicPath}bundle.js"></script>
    </body>
  </html>`;
};

export default {
  input: 'src/main.js',
  output: {
    file: `${root}/dist/bundle.js`,
    format: isProd ? 'umd' : 'es', // immediately-invoked function expression — suitable for <script> tags
    sourcemap: true
  },
  plugins: [
    resolve(), // tells Rollup how to find date-fns in node_modules
    commonjs(), // converts date-fns to ES modules
    isProd && terser(), // minify, but only in production
    html({
      publicPath: isProd ? '/' : './',
      fileName: 'index.html',
      template: ({ publicPath }) => template(publicPath)
    }),
    copy({
      targets: [
         {
           src: `${root}/public/favicon.ico`,
           dest: 'dist'
         }
       ]
     })
  ]
};
