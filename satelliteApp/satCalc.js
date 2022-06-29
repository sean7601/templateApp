var satCalc = {};

satCalc.lookAngle = function(satId, lat, lng, alt, date) {
    alt = 0.0003048 * alt;//convert from feet to km

    var gmst = satellite.gstime(new Date(date));
    var sat = satelliteData[satId]

    var satPos = satellite.propagate(sat.rec, new Date(date));
    var satGeo = satellite.eciToGeodetic(satPos.position, gmst);

    var satEcf   = satellite.eciToEcf(satPos.position, gmst)
    
    var observerGd = {
        longitude: satellite.degreesToRadians(lat),
        latitude: satellite.degreesToRadians(lng),
        height: alt
    };

    var lookAngles = satellite.ecfToLookAngles(observerGd, satEcf)
    return lookAngles;
}

satCalc.getPos = function(satId,date){
    var sat = satelliteData[satId]
    return satCalc.getSatPos(sat,date)
}

satCalc.getSatPos = function(sat,date){
    var gmst = satellite.gstime(new Date(date));
    var satPos = satellite.propagate(sat.rec, new Date(date));
    if(!satPos){
        return null
    }
    var satGeo = satellite.eciToGeodetic(satPos.position, gmst);

    satGeo.lat = satellite.radiansToDegrees(satGeo.latitude);
    satGeo.lon = satellite.radiansToDegrees(satGeo.longitude);

    satGeo.pos = [satGeo.lat, satGeo.lon];

    return satGeo
}

satCalc.findByName = function(name){
    var matches = []
    for(var i=0;i<satelliteData.length;i++){
        if(satelliteData[i].name.includes(name)){
            matches.push(i);
        }
    }
    return matches;
}

satCalc.footprint = function(satId) {
    var sat = satelliteData[satId];
    var pos = satellite.propagate(sat.rec, new Date());
    var height = pos.position.z;
    console.log(sat,pos,height)

    //height is in km
    var footprint = Math.sqrt(2 * height * 6378.1);
    return footprint;
}

