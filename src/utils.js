const linebyline = require('linebyline')

export const readLinePerLineSync = (filename, fn) => new Promise(resolve => {
  linebyline(filename)
    .on('line', fn)
    .on('close', () => {
      resolve(`end reading ${filename}`)
    })
})

// prevent default import, only named imports allowed for clarity
export default undefined
