var satelliteApp = {};

satelliteApp.drawBaseMap = function() {
    if (map && map.remove) {
        map.off();
        map.remove();
    }

    $("#main").html('<div id="map" style="height:100vh"></div>')

    setTimeout(() => {
        map = L.map('map').setView([13.3,144.5], 3);
        //draw landmasses
        var theGrid = L.vectorGrid.slicer(largeWorld, {
            vectorTileLayerStyles: {
                sliced:{
                    weight: 0,
                        fillColor: '#0a5408',
                        fillOpacity: 1,
                        color: "black",
                        stroke: true,
                        fill: true,
                        }
            }
        }).addTo(map);
    
    
        map.on('click', function(e) {
            console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        });        
    }, 10);

    setTimeout(function(){drawSats.drawByCountry("PRC",new Date());},2000)

}