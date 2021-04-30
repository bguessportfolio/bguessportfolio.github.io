function exampleFunction() {
	alert("trans rights motherfucker!")
	}
gsap.to(".logo", {duration: 2, x: 400, backgroundColor: "#560563", borderRadius: "20%", border: "5px solid white", ease: "bounce"});
var map = L.map('map').setView([37.8, -96], 4);

L.geoJson(statesData).addTo(map);
// control that shows state info on hover
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Trans Disenfranchisement Scores</h4>' +  (props ?
			'<b>' + props.name + '</b><br />' + props.density + ' of 22'
			: 'Hover over a state to see its score (ranging from 5-22)');
	};

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		return d > 20 ? '#980043' :
				d > 18  ? '#dd1c77' :
				d > 16  ? '#df65b0' :
				d > 14  ? '#c994c7' :
				d > 12   ? '#d4b9da' :
				d > 10   ? '#f1eef6' :
							'#FFFFFF';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.density)
		};
	}

	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 3,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	var geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

	map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 10, 20, 50, 100, 200, 500, 1000],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);