function exampleFunction() {
	alert("trans rights motherfucker!")
	}
gsap.to(".logo", {duration: 2, x: 400, backgroundColor: "#560563", borderRadius: "20%", border: "5px solid white", ease: "bounce"});
var map = d3.geomap()
	.geofile ('d3-geomap/topojson/world/countries.json')
	.draw(d3.select('#map'));