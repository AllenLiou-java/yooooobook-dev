const modulesFiles = require.context('./apiList', true, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 指定路徑的的檔案名稱
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)

  modules[moduleName] = value.default || value

  return modules
}, {})

export default modules
