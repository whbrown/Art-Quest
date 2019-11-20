const axios = require('axios').default;

function selectQuest(modelObj) {
  // modelObj keys = [objectId, date, departmentId, q, medium]
  let period = null;
  const { date, departmentId, q, medium } = modelObj;

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

  return axios
    .get(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&isHighlight=true&medium=${medium}&hasImages=true&departmentId=${departmentId}&${period}&q=${q}`
    )
    .then(response => {
      const { objectIDs } = response.data;
      const questObjId = objectIDs.find(id => id !== modelObj.objectId);
      return axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${questObjId}`
      );
    });
}

module.exports = selectQuest;
