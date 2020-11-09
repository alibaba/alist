import { compile, getCompileConfig } from '../../scripts/build'
import ts from 'typescript'
import tsImportPluginFactory from 'ts-import-plugin'
import glob from 'glob'
import * as fs from 'fs-extra'

const transformer = tsImportPluginFactory({
  libraryName: 'antd',
  // style: 'css',
})

function buildESM() {
  const { fileNames, options } = getCompileConfig(require.resolve('./tsconfig.json'), {
    outDir: './esm',
    module: ts.ModuleKind.ESNext
  })
  compile(fileNames, options)
  console.log('esm build successfully')
}

const TEMP_OUT_DIR = './temp_esm'
const TEMP_OUT_DIR_UMD = './temp_umd'

function buildTempESM() {
  const { fileNames, options } = getCompileConfig(require.resolve('./tsconfig.json'), {
    outDir: TEMP_OUT_DIR,
    module: ts.ModuleKind.ESNext
  })
  compile(fileNames, options, { before: [transformer] })

  console.log('temporary esm build successfully')
}

function clearTempESM() {
  fs.removeSync(TEMP_OUT_DIR)

  console.log('clear temporary esm build successfully')
}

function clearTempUMD() {
  fs.removeSync(TEMP_OUT_DIR_UMD)

  console.log('clear temporary umd build successfully')
}

function buildES5() {
  const rootNames = glob.sync(`${TEMP_OUT_DIR}/**/*.js`)
  compile(rootNames, {
    allowJs: true,
    esModuleInterop: true,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES5,
    outDir: './lib',
    declaration: false,
  })
  console.log('es5 build successfully')
}

function buildTempUMD() {
  const { fileNames, options } = getCompileConfig(require.resolve('./tsconfig.json'), {
    moduleResolution: ts.ModuleResolutionKind.Classic,
    allowUmdGlobalAccess: true,
    module: ts.ModuleKind.UMD,
    outDir: TEMP_OUT_DIR_UMD,    
  })
  compile(fileNames, options, { before: [transformer] })

  console.log('temporary umd build successfully')
}

function buildUMD() {
  const rootNames = glob.sync(`${TEMP_OUT_DIR_UMD}/**/*.js`)
  compile(rootNames, {
    allowJs: true,
    allowUmdGlobalAccess: true,
    esModuleInterop: true,
    moduleResolution: ts.ModuleResolutionKind.Classic,
    module: ts.ModuleKind.UMD,
    target: ts.ScriptTarget.ES5,
    outDir: './dist',
    declaration: false,
  })
  console.log('umd build successfully')
}



buildESM()

buildTempESM()
buildES5()
clearTempESM()

// buildTempUMD()
// buildUMD()
// clearTempUMD()
