const axios = require('axios').default;
const mongoose = require('mongoose');
const DisplayedObjectInfo = require("../models/DisplayedObjectInfo");

function selectQuest(modelObj) {
  // modelObj keys = [objectId, date, departmentId, q, medium]
  let period = null;
  const { date, q, medium } = modelObj;
  const departmentId = modelObj.departmentId || '*';
  const periods = [
    `dateBegin=-8000&dateEnd=-1000`,
    `dateBegin=-1000&dateEnd=500`,
    `dateBegin=500&dateEnd=1400`,
    `dateBegin=1400&dateEnd=1600`,
    `dateBegin=1600&dateEnd=1800`,
    `dateBegin=1800&dateEnd=1900`,
    `dateBegin=1900&dateEnd=2019`,
  ];

  if (date < -1000) {
    period = periods[0];
  } else if (date >= -1000 && date < 500) {
    period = periods[1];
  } else if (date >= 500 && date < 1400) {
    period = periods[2];
  } else if (date >= 1400 && date < 1600) {
    period = periods[3];
  } else if (date >= 1600 && date < 1800) {
    period = periods[4];
  } else if (date >= 1800 && date < 1900) {
    period = periods[5];
  } else {
    period = periods[6];
  }
  let apiQuery = `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&medium=${medium}&hasImages=true&departmentId=${departmentId}&${period}&q=${q}`;
  console.log('sending query: ', apiQuery);
  return axios
    .get(apiQuery)
    .then(queryResult => {
      if (!queryResult.data.objectIDs) {
        // if no matches, remove highlight requirement
        apiQuery = `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&medium=${medium}&hasImages=true&departmentId=${departmentId}&${period}&q=${q}`;
        console.log('sending query: ', apiQuery);
        return axios.get(apiQuery);
      }
      return queryResult;
    })
    .then(queryResult => {
      //console.log(queryResult.data.objectIDs);
      if (!queryResult.data.objectIDs) {
        // if still no matches, remove culture requirement
        apiQuery = `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&medium=${medium}&hasImages=true&departmentId=${departmentId}&${period}&q=*`;
        console.log('sending query: ', apiQuery);
        return axios.get(apiQuery);
      }
      return queryResult;
    })
    .then(queryResult => {
      if (!queryResult.data.objectIDs) {
        apiQuery = `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&medium=${medium}&q=cat`;
        return axios.get(apiQuery);
      }
      return queryResult;
    })
    .then(response => {
      let { objectIDs } = response.data;
      console.log(modelObj.objectId);
      console.log(objectIDs);

      //add default behavior for when objectIDs = null (no results)

      //check if assessment id is in results and if so remove it
      console.log("Object IDs  not empty.")
      if (objectIDs.includes(Number(modelObj.objectId))) {
        console.log("The initial object is in the result array")
        let index = objectIDs.indexOf(modelObj.objectId);
        objectIDs = objectIDs.splice(index, 1);
        console.log("modified objectIDs: ", objectIDs);
      }

      /*
      //filter ObjectIDs for those that have a description
      DisplayedObjectInfo.find({$and: [ { "objectId": { $in: objectIDs } }, { "description": { $ne: '' } } ] } )
        .then(objArr => {
          objectIDs = objArr;
          console.log("objectIds after db filtering: ", objectIDs);
          return objectIDs;
        })
      */
      console.log("objectIds after db filtering: ", objectIDs);

      return objectIDs[0];
    })
    .then(questObjId =>
      axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${questObjId}`
      )
    )
    .then(object => {
      console.log("The recommended image is: ", object.data)
      const returnObject = object.data;
      return DisplayedObjectInfo.findOne({ objectId: returnObject.objectID })
        .then(object => {
          returnObject.location = object.location;
          returnObject.description = object.description;
          return returnObject;
        })
    })
    .catch(err => console.error(err));
}

module.exports = selectQuest;
