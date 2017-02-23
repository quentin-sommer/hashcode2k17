import {readLinePerLineSync} from './utils'

const filename = './exampleData.csv'
const dataStore = {}

const processLine = (line, lineNumber) => {
  console.log(lineNumber)
  dataStore.lines.push(line.split(','))
}

const doSomethingElse = () => {
  console.log('doSomethingElse')
}

const main = () => {
  dataStore.lines = []
  readLinePerLineSync(filename, processLine)
    .then(console.log)
    .then(doSomethingElse)
    .then(() => console.log(dataStore.lines))
}

main()
