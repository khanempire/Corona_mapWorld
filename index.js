function updateMap() {
    //console.log("Updating map with realtime data")
    fetch("/data.json")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data)
            rsp.data.forEach(element => {
                latitude = element.latitude;
                longitude = element.longitude;

                cases = element.infected;
                recover=element.recovered;
                death=element.dead;
                if ((cases>255) && (recover>cases/2) && (death<75)){
                    color = "rgb(0,255,0)";
                }
                else if(cases>255){
                    color = "rgb(255,0,0)";
                }
                else{
                    color = `rgb(${cases},${recover},0)`;
                }

                // Mark on the map
                new mapboxgl.Marker({
                    draggable: false,
                    color: color
                }).setLngLat([longitude, latitude])
                .addTo(map); 
            });
        })
}

let interval = 20000;
setInterval( updateMap, interval); 