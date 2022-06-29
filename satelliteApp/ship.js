var ship = {};

ship.pos = [13.3,144.5]
ship.goal = [[18,133.5],[13,144]]
ship.speed = 25;
ship.detectCount = 0;
ship.minDist = 9e30
ship.currGoal = 0;

ship.times = 0


ship.simControl = function(date){
    ship.minDist = 9e30
    ship.detectCount = 0;
    ship.currGoal = 0;
    ship.pos = [13.3,144.5]
    var distTilDone = 9999999;
    while(distTilDone > 5 || ship.currGoal < ship.goal.length){
        distTilDone = ship.sim(date);
        if(distTilDone < 5){
            ship.currGoal++;
        }
    }
}
ship.sim = function(date){
    ship.times++

    var sats = planetLabData
    ship.evaluateDetect(sats,date);
    var distTilDone = ship.updatePos(1/60);
    if(ship.times%100==0){
        console.log(ship.times,distTilDone)
    }
    date = new Date(date.getTime() + 1000 * 60 * 1/60);
    //drawSats.drawAllPlanetLabs(date);
    //ship.draw();

    return distTilDone
}
//geomath.get_bearing_between_two_points(lat1,lng1,lat2,lng2)
//geomath.llFromDistance(latitude, longitude, distance, bearing)

ship.updatePos = function(minutes){
    var hours = minutes/60;
    var dist = hours * ship.speed;
    var bearing = geomath.get_bearing_between_two_points(ship.pos[0],ship.pos[1],ship.goal[ship.currGoal][0],ship.goal[ship.currGoal][1]);
    var newPos = geomath.llFromDistance(ship.pos[0],ship.pos[1],dist,bearing);
    ship.pos = newPos;

    dist = geomath.get_distance_between_points(ship.pos[0],ship.pos[1],ship.goal[ship.currGoal][0],ship.goal[ship.currGoal][1]);
    return dist;
}

ship.draw = function(){
    if(ship.marker){
        map.removeLayer(ship.marker);
    }
    ship.marker = L.marker(ship.pos);
    ship.marker.addTo(map);
}

ship.evaluateDetect = function(sats,date){
    var detects = 0;
    for(var i=0;i<sats.length;i++){
        var sat = sats[i];
        var satPos;
        try{
            satPos = satCalc.getSatPos(sat,date)
        }
        catch(e){
            continue
        }

        var dist = geomath.get_distance_between_points(ship.pos[0],ship.pos[1],satPos.pos[0],satPos.pos[1]);
        ship.minDist = Math.min(ship.minDist,dist)
        if(dist < 15){
            detects++;
        }
    }
    this.detectCount += detects;
}