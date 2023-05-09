var map = new maplibregl.Map({
    container: 'map',
    style:'https://api.maptiler.com/maps/basic-v2/style.json?key=gEwTz8EZKm1Uu0GCcZVM',
    // style:'https://api.maptiler.com/maps/bright-v2/style.json?key=gEwTz8EZKm1Uu0GCcZVM',
    //center: [-0.11,51.49],
    center: [-101.6313894764541, 21.166128124361702],
    zoom: 6
});
map.on('load', ()=>{
    map.addSource('Starts_points',{
    type:'geojson',
    data:'http://192.168.100.6:4001/api/users/allgeousers'
    //data:'http://172.18.70.151:4005/api/branches/all'
    });
    map.addLayer({
        'id':'Stars',
        'type':'symbol',
        'source':'Starts_points',
        'layout':{
            'icon-image':'Star_icon',
            'icon-size':0.05,
        }
    });
    //https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678063-beer-512.png
    map.loadImage('/beer-icon.png',
        (error,image)=>{
            if(error) throw error;
            map.addImage('Star_icon',image);
        });
});