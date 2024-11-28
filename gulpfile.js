const babel = require('gulp-babel')
const run = require('gulp-run')
const concat = require('gulp-concat')
const ts = require('gulp-typescript')
const uglify = require('gulp-uglify-es').default
const fs = require('fs')
const packJson = require('./package.json')
const { series, src, dest } = require('gulp')

const tsProject = ts.createProject('tsconfig.json')

const removeOldDist = () => run('rm -rf dist').exec()

function buildJS() {
  return src('src/**/*.js')
    .pipe(useBabel())
    .pipe(uglify())
    .pipe(dest('dist'))
}

const buildTS = () => {
  return src('src/**/*.ts')
    .pipe(tsProject())
    .pipe(dest('dist'))
}

const useBabel = () => {
  return babel({
    presets: ['@babel/preset-react', '@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties'],
  })
}

const concatTs = () => {
  return src(['dist/prototypes/**.d.ts', '!dist/prototypes/ProtoSetter.d.ts'])
    .pipe(concat('dist/prototypes.d.ts'))
    .pipe(dest('./'))
}

const fixPrototypesTS = async () => fs.writeFileSync('dist/prototypes.d.ts', 'export {};\n', { flag: 'a' })

const concatPrototypesJs = () => {
  return src(['dist/prototypes/**.js', '!dist/prototypes/ProtoSetter.js'])
    .pipe(concat('dist/prototypes.js'))
    .pipe(dest('./'))
}

const clearPrototypesTs = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('dist/prototypes.d.ts', 'utf8', (e, content) => {
      if (e) return reject(e)
      const content2 = content
        .replace(/\n/g, 'å')
        .replace(/export {};/g, '')
        .replace(/å+/g, 'å')
        .replace(/å/g, '\n')
      fs.writeFile('dist/prototypes.d.ts', content2, e => {
        if (e) return reject(e)
        resolve()
      })
    })
  })
}

const makeProtoSetterLocalMethod = protoSetter => {
  return protoSetter.replace('exports.setProto = void 0;', '').replace('exports.setProto =', 'const setProto =')
}

const useProtoSetterLocal = content => {
  return content
    .replace(/\n/g, 'å')
    .replace(/"use strict";/g, '')
    .replace(/const ProtoSetter_1 = require\("\.\/ProtoSetter"\);/g, '')
    .replace(/Object\.defineProperty\(exports, "__esModule", { value: true }\);/g, '')
    .replace(/ProtoSetter_1\.setProto/g, 'setProto')
    .replace(/å+/g, 'å')
    .replace(/å/g, '\n')
}

const concatPrototypesJs2 = () => {
  return new Promise(resolve => {
    const protoSetter = fs.readFileSync('dist/prototypes/ProtoSetter.js', 'utf8')
    const prototypes = fs.readFileSync('dist/prototypes.js', 'utf8')
    const protoSetterParsed = makeProtoSetterLocalMethod(protoSetter)
    const prototypesParsed = useProtoSetterLocal(prototypes)
    fs.writeFileSync('dist/prototypes.js', protoSetterParsed + prototypesParsed + 'exports.setProto = setProto;\n')
    resolve()
  })
}

const removeDistPrototypesFolder = () => run('rm -rf dist/prototypes').exec()

const addPackageJson = () => {
  return new Promise(resolve => {
    const { devDependencies, scripts, ...content } = packJson
    fs.writeFile('dist/package.json', JSON.stringify(content, null, 2) + '\n', () => resolve())
  })
}

const addIndex = () => {
  return new Promise(resolve => fs.writeFile('dist/index.js', '', () => resolve()))
}

exports.default = series(
  removeOldDist,
  buildTS,
  buildJS,
  concatTs,
  fixPrototypesTS,
  concatPrototypesJs,
  concatPrototypesJs2,
  removeDistPrototypesFolder,
  clearPrototypesTs,
  addPackageJson,
  addIndex
)
