var astacApp = {};

//create tasking messaages
//keep track of aircraft playtime/sensor capes/tac reports
//visualize/assess tactics
//set ready alert times for helos

astacApp.enter = function(){
    if (map && map.remove) {
        map.off();
        map.remove();
    }

    $("#main").html('');

    var html = "";
    html += `
    <nav class="navbar navbar-expand-lg navbar-light bg-light p-3">
        <a class="navbar-brand" href="#">ASTAC</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Tasking</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" onclick="astacAssetTracker.enter()">Asset Tracker</a>
                </li>
            </ul>
        </div>
    </nav>
    <div id='astac' class='container-fluid'></div>
    `

    $("#main").html(html)
}

