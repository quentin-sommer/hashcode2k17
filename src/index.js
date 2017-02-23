import {readLinePerLineSync} from './utils'

const filename = './input/me_at_the_zoo.in'
const dataStore = {}

const endpointSection = (lineNumber, line) => lineNumber > 2 && line.split(' ').length !== 3
const requestsSections = (lineNumber, line) => lineNumber > 2 && line.split(' ').length === 3
const processLine = (line, lineNumber) => {
  let arr = null
  switch (lineNumber) {
    case 1 :
      arr = line.split(' ')
      dataStore.videoCount = arr[0]
      dataStore.endpointsCount = arr[1]
      dataStore.requestsCount = arr[2]
      dataStore.cacheServCount = arr[3]
      dataStore.cacheServCapacity = arr[4]
      break
    case 2:
      dataStore.videos = line.split(' ')
      break
  }
  if (endpointSection(lineNumber, line)) {
    dataStore.endpoints.push(line)
  } else if (requestsSections(lineNumber, line)) {
    dataStore.requests.push(line)
  }
}

const processEndpoits = () => {
  const tmpArr = []
  let endPointId = 0
  let nextStart = 0
  for (let i = 0; tmpArr.length <= dataStore.endpointsCount; i++) {
    if (nextStart === i) {
      if (dataStore.endpoints[i] === undefined) {
        break
      }
      const declaration = dataStore.endpoints[i].split(' ')
      nextStart = parseInt(declaration[1], 10) + i + 1
      tmpArr.push({
        id: endPointId++,
        latencies: []
      })
    } else {
      const distance = dataStore.endpoints[i].split(' ')
      tmpArr[tmpArr.length - 1].latencies.push({
        cacheId: distance[0],
        distance: distance[1]
      })
    }
  }
  dataStore.endpoints = tmpArr
}

const doSomethingElse = () => {
  //console.log(dataStore.endpoints)
}

const main = () => {
  dataStore.lines = []
  /*
  {
    id,
    latencies: [{
      // cache latencies
      id,
      distance
    }]
  }
   */
  dataStore.endpoints = []
  dataStore.requests = []

  readLinePerLineSync(filename, processLine)
    .then(doSomethingElse)
    .then(processEndpoits)
    .then(() => {
    })
    .catch(console.log)
}

main()
