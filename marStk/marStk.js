var marStk = {}

marStk.enter = function(){
    marStk.drawBaseMap();
}

marStk.drawBaseMap = function() {
    if (map && map.remove) {
        map.off();
        map.remove();
    }

    $("#main").html('<div class="row"><div id="map" class="col-8" style="height:100vh"></div><div id="info" class="col-4" style="height:100vh"></div></div>')

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

    var infoHtml = ""
    //add UI to view/add target, view/add blue forces, and edit weapon parameters
    infoHtml += '<div class="row"><div class="col-12"><h3>Maritime Strike</h3></div></div>'
    infoHtml += '<div class="row"><div class="col-12"><h4>Targets</h4></div></div>'
    infoHtml += '<div class="row"><div class="col-12"><button type="button" class="btn btn-primary" onclick="marStk.addTarget()">Add Target</button></div></div>'
    infoHtml += '<div class="row"><div class="col-12"><h4>Blue Forces</h4></div></div>'
    infoHtml += '<div class="row"><div class="col-12"><button type="button" class="btn btn-primary" onclick="marStk.addBlueForce()">Add Blue Force</button></div></div>'
    infoHtml += '<div class="row"><div class="col-12"><h4>Weapon Parameters</h4></div></div>'
    infoHtml += '<div class="row"><div class="col-12"><button type="button" class="btn btn-primary" onclick="marStk.editWeaponParameters()">Edit Weapon Parameters</button></div></div>'
    infoHtml += '<div class="row"><div class="col-12"><h4>Run Simulation</h4></div></div>'

    $("#info").html(infoHtml)
    marStk.addTarget()
    marStk.addBlueForce([15.3,142.5])
    marStk.addBlueForce([12.3,146.5])
    marStk.displayShips()

}

marStk.blueForces = []
marStk.target = null
marStk.weapons = []

marStk.addTarget = function(){
    var tgt = {}
    tgt.pos = [13.3,144.5]
    tgt.lastUpdateTime = new Date()
    tgt.name = "Target"
    tgt.type = "ship"
    tgt.reqPk = .7
    tgt.course = 0
    tgt.speed = 5

    marStk.target = tgt
}

marStk.addBlueForce = function(pos){
    var bf = {}
    bf.pos = pos
    bf.lastUpdateTime = new Date()
    bf.name = "Blue Force-" + Math.round(100*Math.random())
    bf.type = "ship"
    bf.course = 0
    bf.speed = 5
    bf.weapons = []
    bf.weapons.push({name:"Ship-Launched Harpoon",type:"anti-ship",range:50,speed:100,quantityPerSalvo:1})

    marStk.blueForces.push(bf)
}

marStk.displayShips = function(){
    //display target with a red circle shape
    if (marStk.target){
        var tgt = marStk.target
        var tgtMarker = L.circle(tgt.pos, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);
    }
    //display blue forces with a blue circle shape
    for (var i=0;i<marStk.blueForces.length;i++){
        var bf = marStk.blueForces[i]
        var bfMarker = L.circle(bf.pos, {
            color: 'blue',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 500
        }).addTo(map);
    }
}

