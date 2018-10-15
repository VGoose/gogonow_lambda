import stations from './stops.JSON';
import { diff, findClosestIndex, getEuclideanDist } from './utils/helpers';

async function getStations() {
	let position = await getUserPosition();
	let userLat = position.coords.latitude;
	let userLon = position.coords.longitude;
	let x, y, dist;
	const dists = new Set();
	let _stations = [];
	for (let key in stations) {
		let stopLat = parseFloat(stations[key].stop_lat);
		let stopLon = parseFloat(stations[key].stop_lon);
		//constants are rough estimates of miles per degree of lat/lon for NYC
		x = diff(userLat, stopLat) * 69.05;
		y = diff(userLon, stopLon) * 52.35;
		dist = getEuclideanDist(x, y); 
		if(dist < 0.5 && !dists.has(dist)) {
			stations[key].dist = dist;
			_stations.push(stations[key])
			dists.add(dist)
		}
	}
	_stations.sort((a, b) => {
		return a.dist - b.dist;
	})
	return _stations
}

function getUserPosition() {
	if (!navigator.geolocation) {
		return 'Your browser does not support gelocation';
	}
	let geo = navigator.geolocation;
	return new Promise((resolve, reject) => {
		geo.getCurrentPosition(resolve, reject)
	})
}

module.exports = {
  getStations,
	getUserPosition,
}