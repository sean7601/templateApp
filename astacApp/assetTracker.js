var astacAssetTracker = {};

astacAssetTracker.assets = [];

astacAssetTracker.enter = function(){
    var html = `
    <button class="btn btn-primary" onclick="astacAssetTracker.addAsset()">Add Asset</button>
    <table class="table table-striped">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Callsign</th>
                <th scope="col">Type</th>
                <th scope="col">SOB</th>
                <th scope="col">Check-in Time</th>
                <th scope="col">Playtime</th>
                <th scope="col">Altitude</th>
                <th scope="col">Fuel Rng</th>
                <th scope="col">Radar Rng</th>
                <th scope="col">ESM Rng</th>
                <th scope="col">EOIR Rng</th>
            </tr> 
        </thead>
        <tbody>`
            for (var i = 0; i < astacAssetTracker.assets.length; i++) {
                html += `
                <tr>
                <th scope="row">${i+1}</th>
                    <td>${astacAssetTracker.assets[i].callsign}</td>
                    <td>${astacAssetTracker.assets[i].type}</td>
                    <td>${astacAssetTracker.assets[i].sob}</td>
                    <td>${astacAssetTracker.prettyTime(astacAssetTracker.assets[i].checkinTime)}</td>
                    <td>${astacAssetTracker.assets[i].playtime}</td>
                    <td>${astacAssetTracker.assets[i].altitude}</td>
                    <td>${astacAssetTracker.assets[i].fuelRange}</td>
                    <td>${astacAssetTracker.assets[i].radarRange}</td>
                    <td>${astacAssetTracker.assets[i].esmRange}</td>
                    <td>${astacAssetTracker.assets[i].eoirRange}</td>
                    <td><button class="btn btn-primary" onclick="astacAssetTracker.editAsset(${i})">Edit</button></td>
                    <td><button class="btn btn-primary" onclick="astacAssetTracker.deleteAsset(${i})">Delete</button></td>
                </tr>
                `
            }
        html += `
        </tbody>
    </table>`
    $("#astac").html(html)
}

astacAssetTracker.prettyTime = function(time){
    var date = new Date(time);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    //make hours two digits
    if (hours < 10) {
        hours = "0" + hours;
    }
    //make minutes two digits
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    var prettyTime = hours + ":" + minutes;
    return prettyTime
}