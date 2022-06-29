var drawSats = {};

drawSats.drawByCountry = function(countryCode,date){
    if(!date){
        date = new Date();
    }
    var count = 0
    for(var i=0;i<satelliteData.length;i++){
        var sat = satelliteData[i];
        if(sat.satcat == null){
            continue;
        }
        if(!sat.satcat.active || sat.satcat.country != countryCode){
            continue;
        }
        if(sat.ucs == null){
            continue;
        }

        if(sat.ucs.user == "Commercial" || sat.ucs.purpose == "Communications"){
            continue;
        }

        if(!sat.ucs.detailedPurpose.includes("Imaging") && !sat.ucs.detailedPurpose.includes("imaging")){
            continue;
        }

        try{
            drawSats.eraseDrawing(i)
            var pos = satCalc.getPos(i,date).pos;
            var footprint = satCalc.footprint(i)
            if(footprint < 0 || isNaN(footprint)){
                continue;
            }
            
            
            sat.drawing = L.circle(pos,{color:'red',fillColor:'red',fillOpacity:0.1,radius:500}).addTo(map);
            
            sat.radiusDrawing = L.circle(pos,{fill:false,radius:footprint*1000*.1}).addTo(map);
            console.log(sat,sat.ucs.purpose,footprint,sat.ucs.detailedPurpose)
            count++
            
        }catch(e){
            console.log(e)
        }
    }
    console.log("count",count)

}

drawSats.drawAllPlanetLabs = function(date){
    if(!date){
        date = new Date();
    }
    for(var i=0;i<planetLabData.length;i++){
        var sat = planetLabData[i];
        try{
            drawSats.eraseDrawing(i)
            var pos = satCalc.getSatPos(sat,date)
            var footprint = 50;//km
            if(sat.drawing){
                map.removeLayer(sat.drawing);
            }
            if(sat.radiusDrawing){
                map.removeLayer(sat.radiusDrawing);
            }
            sat.drawing = L.circle(pos,{color:'red',fillColor:'red',fillOpacity:0.1,radius:500}).addTo(map);
            
            sat.radiusDrawing = L.circle(pos,{fill:false,radius:footprint*1000*.1}).addTo(map);
            
        }catch(e){
            console.log(e)
        }
    }


}

drawSats.eraseDrawing = function(satId){
    var sat = satelliteData[satId];
    if(sat.drawing){
        map.removeLayer(sat.drawing);
    }

    if(sat.radiusDrawing){
        map.removeLayer(sat.radiusDrawing);
    }
}


drawSats.animate = function(){
    var date = new Date();
    drawSats.interval = setInterval(function(){
        //drawSats.drawByCountry("PRC",date);
        drawSats.drawByName("STARLINK",date)
        //drawSats.drawAllPlanetLabs(date)
        date = new Date(date.getTime() + 1 * 10 * 1000);
        ship.draw(date)
        ship.updatePos(1/6)
        document.getElementById("date").innerHTML = date.toLocaleString();
    },100);
}

//stop animation
drawSats.stop = function(){
    clearInterval(drawSats.interval);
}


drawSats.drawByName = function(namePart,date){
    if(!date){
        date = new Date();
    }
    var count = 0
    for(var i=0;i<satelliteData.length;i++){
        var sat = satelliteData[i];
        if(!sat.name.includes(namePart)){
            continue;
        }
        

        try{
            //drawSats.eraseDrawing(i)
            var pos = satCalc.getPos(i,date).pos;
            var footprint = 50;//km
            
            
            sat.drawing = L.circle(pos,{color:'red',fillColor:'red',fillOpacity:0.1,radius:500}).addTo(map);
            
            sat.radiusDrawing = L.circle(pos,{stroke:false,radius:footprint*1000}).addTo(map);
            count++
            
        }catch(e){
            //console.log(e)
        }
    }
    console.log("count",count)

}