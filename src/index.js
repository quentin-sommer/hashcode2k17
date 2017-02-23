import {readLinePerLineSync} from './utils'

const filename = './input/me_at_the_zoo.in'
const dataStore = {}

const endpointSection = (lineNumber, line) => lineNumber > 2 && line.split(' ').length !== 3
const requestsSections = (lineNumber, line) => lineNumber > 2 && line.split(' ').length === 3
const int = val => parseInt(val, 10)
const processLine = (line, lineNumber) => {
  let arr = null
  switch (lineNumber) {
    case 1 :
      arr = line.split(' ')
      dataStore.videoCount = int(arr[0])
      dataStore.endpointsCount = int(arr[1])
      dataStore.requestsCount = int(arr[2])
      dataStore.cacheServCount = int(arr[3])
      dataStore.cacheServCapacity = int(arr[4])
      break
    case 2:
      dataStore.videos = line.split(' ').map((entry, index) => ({
        id: index,
        weight: int(entry)
      }))
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
      nextStart = int(declaration[1]) + i + 1
      tmpArr.push({
        id: endPointId++,
        servLatency: int(declaration[0]),
        latencies: []
      })
    } else {
      const distance = dataStore.endpoints[i].split(' ')
      tmpArr[tmpArr.length - 1].latencies.push({
        cacheId: int(distance[0]),
        distance: int(distance[1])
      })
    }
  }
  dataStore.endpoints = tmpArr
}

const processRequests = () => {
  const tmpArr = []
  for (let i = 0; i < dataStore.requestsCount; i++) {
    const requestDesc = dataStore.requests[i].split(' ')
    tmpArr.push({
      videoId: int(requestDesc[0]),
      endpointId: int(requestDesc[1]),
      number: int(requestDesc[2])
    })
  }
  dataStore.requests = tmpArr
}

const doSomethingElse = () => {
  //console.log(dataStore.endpoints)
}

const main = () => {
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
    .then(processRequests)
    .then(() => {
      //console.log(dataStore.videos)
      console.log(dataStore)
    })
    .catch(console.log)
}

main()
