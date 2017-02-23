import {readLinePerLineSync} from './utils'
import _ from 'lodash'

const filename = './input/me_at_the_zoo.in'
const dataStore = {}

const endpointSection = (lineNumber, line) => lineNumber > 2 && line.split(' ').length !== 3
const requestsSections = (lineNumber, line) => lineNumber > 2 && line.split(' ').length === 3
const int = val => parseInt(val, 10)
const itMap = (map, fn) => Object.keys(map).forEach(key => fn(map[key]))

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
  let res = dataStore.requests.reduce((acc, request) => {
    if (acc[request.endpointId] === undefined) {
      acc[request.endpointId] = {}
      acc[request.endpointId].endpointId = request.endpointId
      acc[request.endpointId].servLatency = dataStore.endpoints[request.endpointId].servLatency
      acc[request.endpointId].videos = []
      acc[request.endpointId].connectedCaches = []
    }
    acc[request.endpointId].videos.push({
      videoId: request.videoId,
      number: request.number,
      weight: dataStore.videos[request.videoId].weight,
      weightXnumber: request.number * dataStore.videos[request.videoId].weight
    })
    return acc
  }, {})
  dataStore.endpoints.map(endpoint => {
    res[endpoint.id].connectedCaches = endpoint.latencies
    res[endpoint.id].videos = _.sortBy(res[endpoint.id].videos, [(video) => video.weightXnumber]).reverse()
  })
  res = _.sortBy(res, [entry => entry.videos[0].weightXnumber]).reverse()
  console.log(res[0])
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
    .then(processEndpoits)
    .then(processRequests)
    .then(doSomethingElse)
    .then(() => {
      //    console.log(dataStore.endpoints)
//      console.log(dataStore)
    })
    .catch(console.log)
}

main()
