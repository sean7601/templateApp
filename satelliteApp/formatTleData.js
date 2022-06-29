//satcat
var satcat = satcat.split("\n")
var satcatData = {}
for(var i = 0; i < satcat.length; i++){
    var data = satcat[i].split(",")
    var sat = {};
    sat.name = data[0]
    sat.norad = data[2]
    sat.status = data[4]
    //active satellites designator are +, P, B, S, or X
    if(sat.status == "+" || sat.status == "P" || sat.status == "B" || sat.status == "S" || sat.status == "X"){
        sat.active = true
    }
    else{
        sat.active = false
    }
    sat.country = data[5]

    satcatData[utils.cleanName(data[0])] = sat
}


//ucs
//5 is user, 6 is purpose, 7 is detailed purpse, 26 is norad, 27 is comments
ucs = ucs.split("\n")
var ucsData = {}
for(var i = 0; i < ucs.length; i++){
    var data = ucs[i].split(",")
    var sat = {};
    sat.user = data[5]
    sat.purpose = data[6]
    sat.detailedPurpose = data[7]
    sat.norad = data[26]
    sat.comments = data[27]
    ucsData[data[26]] = sat
}



//tle
tleData = (tleData.split("\n"))
var satelliteData = []
for(var i=0;i<tleData.length;i+=3){
    var sat = {};
    sat.name = tleData[i].trim()
    sat.name = sat.name.slice(2,tleData[i].length);
    sat.line1 = tleData[i+1].trim()
    sat.line2 = tleData[i+2].trim()
    sat.rec = satellite.twoline2satrec(sat.line1, sat.line2);
    if(satcatData[utils.cleanName(sat.name)]){
        sat.satcat = satcatData[utils.cleanName(sat.name)]

        if(ucsData[sat.satcat.norad]){
            sat.ucs = ucsData[sat.satcat.norad]
        }
        else{
            sat.ucs = null
        }
    }
    else{
        sat.satcat = null
        sat.ucs = null
    }


    

    satelliteData.push(sat);
}

planetLab = planetLab.split("\n")
var planetLabData = []
for(var i=0;i<planetLab.length;i+=3){
    var sat = {};
    sat.name = tleData[i].trim()
    sat.line1 = tleData[i+1].trim()
    sat.line2 = tleData[i+2].trim()
    try{
    sat.rec = satellite.twoline2satrec(sat.line1, sat.line2);
    planetLabData.push(sat)
    }
    catch(err){
        console.log(err)
    }
}
console.log(planetLabData)

console.log(satelliteData)