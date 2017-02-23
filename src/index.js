import {readLinePerLineSync} from './utils'

const filename = './input/me_at_the_zoo.in'
const dataStore = {}

const processLine = (line, lineNumber) => {
  switch (lineNumber) {
    case 1 :
      const arr = line.split(' ')
      dataStore.videoCount = arr[0]
      dataStore.endpointsCount = arr[1]
      dataStore.requestsCount = arr[2]
      dataStore.cacheServCount = arr[3]
      dataStore.cacheServCapacity = arr[4]
      break
  }
  dataStore.lines.push(line.split(','))
}

const doSomethingElse = () => {
}

const main = () => {
  dataStore.lines = []
  readLinePerLineSync(filename, processLine)
    .then(doSomethingElse)
}

main()
