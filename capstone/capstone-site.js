gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.panel').forEach((panel, i) => {
  ScrollTrigger.create({
    trigger: panel,
    start: "center center", 
    end: "bottom",
    pin: true, 
    pinSpacing: "false" 
  });
});

gsap.to("#img2", {
	scrollTrigger: {
	trigger: "#img2",
	toggleActions: "restart pause resume pause"
},
	duration: 0.5, 
	x: -25, 
	ease: "power4",
});
gsap.to("#img3", {
	scrollTrigger: {
	trigger: "#img3",
	toggleActions: "restart pause resume pause"	
},
	duration: 1, 
	x: -25,
	ease: "power4",
});
gsap.to("#img4", {
	scrollTrigger: {
	trigger: "#img4",
	toggleActions: "restart pause resume pause"
},
	duration: 1.5, 
	x: -25, 
	ease: "power4",
});
gsap.to("#img5", {
	scrollTrigger: {
	trigger: "#img5",
	toggleActions: "restart pause resume pause"
},
	duration: 2, 
	x: -25, 
	ease: "power4",
});

gsap.fromTo('#img7', {scale: 3, opacity: 0}, {scale: 1, opacity: 1, duration: 1,});

let tween1 = gsap.fromTo('#img7', {scale: 3, autoAlpha: 0}, {scale: 1, duration: 1, autoAlpha: 1, ease: "power4"}),
	st = ScrollTrigger.create({
		trigger: "#img6",
		animation: tween1,
		start: "top center",
		toggleActions: "play none none none",
	})
console.log(st.animation);

gsap.fromTo('#img12', {opacity: 0, x: 0, y: 0}, {opacity: 1, y: '-40%', x: '50%', duration: 0.75});
let tween4 = gsap.fromTo('#img12', {opacity: 0}, {opacity: 1, y: '-40%', x: '50%', duration: 0.75, ease: 'power4'}),
	st3 = ScrollTrigger.create({
		trigger: "#img12",
		animation: tween4,
		start: "bottom center",
		delay: 2,
		toggleActions: "play none none none",
	})
console.log(st3.animation);

gsap.fromTo('#img13', {opacity: 0, x: 0, y: 0}, {opacity: 1, y: '-30%', x: '-60%', duration: 0.75});
let tween5 = gsap.fromTo('#img13', {opacity: 0}, {opacity: 1, y: '-30%', x: '-60%', duration: 0.75, ease: 'power4'}),
	st4 = ScrollTrigger.create({
		trigger: "#img12",
		animation: tween5,
		start: "bottom center",
		toggleActions: "play none none none",
	})
console.log(st4.animation);

gsap.fromTo('#img14', {opacity: 0, x: 0, y: 0}, {opacity: 1, y: '-120%', x: '50%', duration: 0.75});
let tween6 = gsap.fromTo('#img14', {opacity: 0}, {opacity: 1, y: '-120%', x: '50%', duration: 0.75, ease: 'power4'}),
	st5 = ScrollTrigger.create({
		trigger: "#img12",
		animation: tween6,
		start: "bottom center",
		toggleActions: "play none none none",
	})
console.log(st5.animation);

gsap.fromTo('#img11', {opacity: 0, x: 0, y: 0}, {opacity: 1, y: '-125%', x: '-60%', duration: 0.75});
let tween7 = gsap.fromTo('#img11', {opacity: 0}, {opacity: 1, y: '-125%', x: '-60%', duration: 0.75, ease: 'power4'}),
	st6 = ScrollTrigger.create({
		trigger: "#img12",
		animation: tween7,
		start: "bottom center",
		toggleActions: "play none none none",
	})
console.log(st6.animation);

var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmd1ZXNzIiwiYSI6ImNrb2FyZHFhZzF6dWUydXM3emh0aDJybGQifQ.NomOSOqx4P1_psShygTyGw', {
    maxZoom: 18,
    id: 'mapbox/light-v9',
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
	'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

// control that shows state info on hover
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h5>Trans Voter Ability Scores</h5>' +  (props ?
			'<b>' + props.name + '</b><br>' + '<b>' + props.law + '</b>' + props.lawtype + '<br>' + '<b>' + props.withid + '</b>' + props.idnum + '<br>' + '<b>' + props.markerchange + '</b>' + props.markerpol + '<br>' + '<b>' + props.dlprice + '</b>' + props.dlnum + '<br>' + '<b>' + props.sidprice + '</b>' + props.sidnum + '<br>' + '<b>' + props.totalscore + '</b>' + ' of 22'
			: 'Hover over a state to see how easy it is for trans people to vote there <br> (scores range from 5-22) <br> * indicates lack of data in one or more areas, which may affect score');
	};

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		return d > 20 ? '#f1eef6' :
				d > 18  ? '#d4b9da' :
				d > 16  ? '#c994c7' :
				d > 14  ? '#df65b0' :
				d > 12   ? '#dd1c77' :
				d > 10   ? '#980043' :
							'#87003a';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '1',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.totalscore)
		};
	}

	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 2,
			color: '969696',
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
			click: highlightFeature
		});
	}

	geojson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

	map.attributionControl.addAttribution('Data Sources: <a href="https://docs.google.com/spreadsheets/d/155FFFx_pHS1Gd1SbtZL9-Trpk55hX6XR2Vpi-iSFmyw/edit?usp=sharing">Data Compiled With Sources</a>');


	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 10, 12, 14, 16, 18, 20, 22],
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