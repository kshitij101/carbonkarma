const axios = require('axios');

export const getTotalDistanceByTypeAndDate = (email, fromDate, toDate) => {
    let totalDistanceByType = {};
    const jsonData = JSON.parse(localStorage.getItem("data")) || {};

    if (jsonData.hasOwnProperty(email)) {
        const filteredData = jsonData[email].filter(obj => {
            const objDate = new Date(obj.date);
            return objDate >= new Date(fromDate) && objDate <= new Date(toDate);
        });

    
        filteredData.forEach(obj => {
            const { type, distance_value } = obj;
            if (totalDistanceByType.hasOwnProperty(type)) {
                totalDistanceByType[type] += distance_value;
            } else {
                totalDistanceByType[type] = distance_value;
            }
        });
    }

    return totalDistanceByType;
}

export const aggregateData = (email, fromDate, toDate) => {
    const data = JSON.parse(localStorage.getItem("data")) || {};
    const userEntries = data[email] || [];
    
    const filteredEntries = userEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= new Date(fromDate) && entryDate <= new Date(toDate);
    });
    
    const fromDateObj = new Date(fromDate);
    const toDateObj = new Date(toDate);
    let aggregationPeriod;
    if ((toDateObj - fromDateObj) / (1000 * 60 * 60 * 24) <= 7) {
        aggregationPeriod = 'daily';
    } else if ((toDateObj - fromDateObj) / (1000 * 60 * 60 * 24) <= 30) {
        aggregationPeriod = 'weekly';
    } else {
        aggregationPeriod = 'monthly';
    }
    
    const aggregationFormats = {
        daily: 'YYYY-MM-DD',
        weekly: 'YYYY-WW',
        monthly: 'YYYY-MM'
    };
    
    const aggregatedData = filteredEntries.reduce((result, entry) => {
        const entryDate = new Date(entry.date);
        const key = entryDate.toISOString().slice(0, aggregationFormats[aggregationPeriod].length);
        result[key] = (result[key] || 0) + entry.distance_value;
        return result;
    }, {});

    return { aggregationPeriod, data: aggregatedData };
}

async function processObjects(email, fromDate, toDate) {
    try {
        const data = JSON.parse(localStorage.getItem("data")) || {};

        if (data.hasOwnProperty(email)) {
            const objects = data[email].filter(obj => {
                const objDate = new Date(obj.date);
                return objDate >= new Date(fromDate) && objDate <= new Date(toDate);
            });

            // Determine aggregation level
            let aggregation;
            const fromDateObj = new Date(fromDate);
            const toDateObj = new Date(toDate);
            const timeDifference = toDateObj.getTime() - fromDateObj.getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);

            if (daysDifference >= 30) {
                aggregation = 'monthly';
            } else if (daysDifference >= 7) {
                aggregation = 'weekly';
            } else {
                aggregation = 'daily';
            }

            const groupedObjects = {};
            objects.forEach(obj => {
                const objDate = new Date(obj.date);
                let key = '';
                if (aggregation === 'weekly') {
                    key = `${objDate.getFullYear()}-W${getISOWeek(objDate)}`;
                } else if (aggregation === 'monthly') {
                    key = `${objDate.getFullYear()}-${objDate.getMonth() + 1}`;
                } else { // daily
                    key = obj.date;
                }
                if (!groupedObjects[key]) {
                    groupedObjects[key] = [];
                }
                groupedObjects[key].push(obj);
            });

            for (const key in groupedObjects) {
                const promises = [];
                groupedObjects[key].forEach(obj => {
                    const promise = obj.type === 'vehicle' ?
                        axios.post('https://www.carboninterface.com/api/v1/estimates', {
                            "type": "vehicle",
                            "distance_unit": "mi",
                            "distance_value": obj.distance_value,
                            "vehicle_model_id": "7268a9b7-17e8-4c8d-acca-57059252afe9"
                        }, { headers: { Authorization: "Bearer 3Nv9SU206leKYrVS3vcIA" } }) :
                        axios.post('https://www.carboninterface.com/api/v1/estimates', {
                            "type": "flight",
                            "legs": [
                                {"departure_airport": obj.legs[0].departure_airport, "destination_airport": obj.legs[0].destination_airport}
                            ]
                        }, { headers: { Authorization: "Bearer 3Nv9SU206leKYrVS3vcIA" } });

                    promises.push(promise);
                });

                const responses = await Promise.all(promises);

                responses.forEach((response, index) => {
                    const obj = groupedObjects[key][index];
                    const carbonEmission = response.data.data.attributes.carbon_lb;
                    const actualEmission = obj.efficient === 1 ? carbonEmission * 0.6 : carbonEmission;
                    obj.carbonEmission = carbonEmission;
                    obj.actualEmission = actualEmission;
                });
            }

            console.log(groupedObjects);
        } else {
            console.log("Email not found in data.");
        }
    } catch (error) {
        console.error("Error processing objects:", error);
    }
}

// Helper function to get ISO week number
function getISOWeek(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const daysSinceFirstDayOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((daysSinceFirstDayOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getEmailObjects(email) {
    let data = JSON.parse(localStorage.getItem("data")) || {};
    console.log(data);
    if (data.hasOwnProperty(email)) {
        console.log("Email already exists in the JSON file.");
        return;
    }

    const numObjects = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
    const objects = generateRandomObjects(numObjects);

    data[email] = objects;

    localStorage.setItem("data", JSON.stringify(data));

    console.log("Email added to JSON file with corresponding list of objects.");
}

function generateRandomObjects(numObjects) {
    const types = ["flight", "vehicle", "walking", "cycling", "public_transport"];
    const dates = ["01/10/2024", "01/11/2024", "02/10/2024", "02/11/2024", "03/11/2024", "04/05/2024"];
    const airports = ["JFK", "LAX", "ORD"];
    const airport_distances = {
        "JFK": { "JFK": 0, "LAX": 2450, "ORD": 740 },
        "LAX": { "JFK": 2450, "LAX": 0, "ORD": 1740 },
        "ORD": { "JFK": 740, "LAX": 1740, "ORD": 0 }
    };

    let objects = [];

    for (let i = 0; i < numObjects; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        let obj = { "type": type };

        const randomDate = dates[Math.floor(Math.random() * dates.length)];
        obj.date = randomDate;

        if (type === "flight") {
            let departure, destination;
            do {
                departure = airports[Math.floor(Math.random() * airports.length)];
                destination = airports[Math.floor(Math.random() * airports.length)];
            } while (departure === destination);

            obj.legs = [{ "departure_airport": departure, "destination_airport": destination }];
            obj.distance_value = airport_distances[departure][destination];
            obj.efficient = Math.round(Math.random());
        }

        if (type === "vehicle") {
            obj.vehicle_model_id = "7268a9b7-17e8-4c8d-acca-57059252afe9";
            obj.efficient = Math.round(Math.random());
            obj.distance_value = Math.floor(Math.random() * 100);
        }

        if (type === "cycling" || type === "walking") {
            obj.distance_value = Math.floor(Math.random() * 10) + 1;
        }

        if (type !== "flight" && type !== "vehicle" && type !== "cycling" && type !== "walking") {
            obj.distance_value = Math.floor(Math.random() * 100);
            obj.efficient = 1;
        }

        obj.distance_value = Math.max(0, obj.distance_value);

        let dateExists = false;
        for (const o of objects) {
            if (o.type === type && o.date === obj.date) {
                dateExists = true;
                break;
            }
        }
        if (dateExists) {
            i--;
            continue;
        }

        objects.push(obj);
    }

    return objects;
}

async function calculateCarbonEmissionAndScore(objects) {
    for (const obj of objects) {
        let body;
        if (obj.type === 'vehicle') {
            body = {
                "type": "vehicle",
                "distance_unit": "mi",
                "distance_value": obj.distance_value,
                "vehicle_model_id": "7268a9b7-17e8-4c8d-acca-57059252afe9"
            };
        } else if (obj.type === 'flight') {
            body = {
                "type": "flight",
                "legs": [{
                    "departure_airport": obj.legs[0].departure_airport,
                    "destination_airport": obj.legs[0].destination_airport
                }]
            };
        }

        try {
            const response = await axios.post("https://www.carboninterface.com/api/v1/estimates", body, {
                headers: {
                    'Authorization': 'Bearer 3Nv9SU206leKYrVS3vcIA',
                    'Content-Type': 'application/json'
                }
            });
            const carbonEmission = response.data.data.attributes.carbon_lb;
            obj.carbonEmission = carbonEmission;

            obj.score = calculateScore(obj);
            
            // Call the Ripple function here and pass the required data
            // rippleFunction(obj);
        } catch (error) {
            console.error('Error occurred while fetching carbon emission:', error);
        }
    }
}

function calculateScore(obj) {
    if (obj.type === 'vehicle' || obj.type === 'flight') {
        if (obj.efficient === 1) {
            return 0.6 * obj.carbonEmission;
        } else {
            return 0;
        }
    } else if (obj.type === 'public_transport') {
        return 0.8 * obj.distance_value;
    } else if (obj.type === 'cycling' || obj.type === 'walking') {
        return obj.distance_value;
    } else {
        return 0; // Default value for unknown types
    }
}



async function processObjectsUnGrouped(email, fromDate, toDate) {
    try {
        let data = JSON.parse(localStorage.getItem("data")) || {};

        if (data.hasOwnProperty(email)) {
            const objects = data[email].filter(obj => {
                const objDate = new Date(obj.date);
                return objDate >= new Date(fromDate) && objDate <= new Date(toDate);
            });

            const promises = [];
            objects.forEach(obj => {
                const promise = obj.type === 'vehicle' ?
                    axios.post('https://www.carboninterface.com/api/v1/estimates', {
                        "type": "vehicle",
                        "distance_unit": "mi",
                        "distance_value": obj.distance_value,
                        "vehicle_model_id": "7268a9b7-17e8-4c8d-acca-57059252afe9"
                    }, { headers: { Authorization: "Bearer 3Nv9SU206leKYrVS3vcIA" } }) :
                    axios.post('https://www.carboninterface.com/api/v1/estimates', {
                        "type": "flight",
                        "legs": [
                            {"departure_airport": obj.legs[0].departure_airport, "destination_airport": obj.legs[0].destination_airport}
                        ]
                    }, { headers: { Authorization: "Bearer 3Nv9SU206leKYrVS3vcIA" } });

                promises.push(promise);
            });

            const responses = await Promise.all(promises);

            responses.forEach((response, index) => {
                const obj = objects[index];
                const carbonEmission = response.data.data.attributes.carbon_lb;
                const actualEmission = obj.efficient === 1 ? carbonEmission * 0.6 : carbonEmission;
                obj.carbonEmission = carbonEmission;
                obj.actualEmission = actualEmission;
            });

            console.log(objects);
            console.log('objects');
        } else {
            console.log("Email not found in data.");
        }
    } catch (error) {
        console.error("Error processing objects:", error);
    }
}

// Export functions as needed
export { processObjects, getEmailObjects, processObjectsUnGrouped };
