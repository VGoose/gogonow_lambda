import stops from '../stops.JSON';


// module.exports.findClosestStation = async function findClosestStation(x, radius) {

// 	let stationDists = await getStationsEuclideanDist();
// 	let station;


// 	//euclidean distance comparison
// 	//calc euclidean distance of all stops, make into a sorted array
// 	//match 
// 	return station;
// }


module.exports = {

	findClosestStation: () => {

	},

	getUserPosition: () => {
		if (!navigator.geolocation) {
			return 'Your browser does not support gelocation';
		}
		let geo = navigator.geolocation;
		return new Promise((resolve, reject) => {
			geo.getCurrentPosition(resolve, reject)
		})	
	},

	getEuclideanDist: (a, b) => {
		if(typeof a && typeof b !== 'number') {
			throw new Error('Both arguments must be numbers');
		}
		let result = Math.sqrt(a*a + b*b);
		return result;
	},

	getStationsEuclideanDist: async () => {
		let x, y;
		let stationsEuclideanDist = [];
		for(stop in stops) {
			x = parseFloat(stops[stop].stop_lat);
			y = parseFloat(stops[stop].stop_lon);
			stationsEuclideanDist.push(getEuclideanDist(x, y));
		}
		return stationsEuclideanDist;
	}
}