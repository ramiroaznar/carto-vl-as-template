document
    .querySelector('as-responsive-content')
    .addEventListener('ready', () => {

        // declare Mapbox GL map instance
        const map = new mapboxgl.Map({
            container: 'map',
            style: carto.basemaps.voyager, // CARTO voyager basemap
            center: [2,41],
            zoom: 2,
            scrollZoom: true,
            dragRotate: false,
            touchZoomRotate: false,
            hash: true
        });

        // add zoom controls
        const nav = new mapboxgl.NavigationControl({
            showCompass: false
            });

        map.addControl(nav, 'top-left');

        // define CARTO user
        carto.setDefaultAuth({
            user: 'ramiroaznar',
            apiKey: 'default_public'
        });

        // create a CARTO VL layer
            const source = new carto.source.Dataset(`ne_10m_populated_places_simple`),
            viz = new carto.Viz(countryStyle),
            layer = new carto.Layer('layer', source, viz);

        // add CARTO VL layers to the map
        layer.addTo(map, 'watername_ocean');

        // populate textarea input with a preloaded GeoJSON
        vm.inputGeojson = JSON.stringify(aoi, null, 4);

        // create aoi CARTO layer but without adding it into the map
        const aoiSource = new carto.source.GeoJSON(aoi),
            aoiViz = new carto.Viz(aoiStyle),
            aoiLayer = new carto.Layer('aoiLayer', aoiSource, aoiViz);
        
        // attach layer and map objects to the Vue instance
        // to be used in the vue config    
        vm.aoiViz = aoiViz, vm.aoiLayer = aoiLayer, 
        vm.viz = viz, vm.layer = layer,
        vm.map = map;

        layer.on('updated' , function () {

            // update aggregated metrics
            vm.cities = viz.variables.cities.value,
            vm.population = viz.variables.population.value,
            vm.avgPop = viz.variables.avgPop.value,
            vm.legendData = layer.viz.color.getLegendData().data;

            // update category widgets
            vm.placeTypes = viz.variables.placeTypes.value.map( c => {
                return {
                    name: formatCategory(c.x),
                    value: c.y
                }
            });

            vm.countries = viz.variables.countries.value.map( c => {
                return {
                    name: formatCategory(c.x),
                    value: c.y
                }
            });

            // update histogram widgets
            vm.popHistogram = viz.variables.popHistogram.value.map(entry => {
                return {
                    start: entry.x[0],
                    end: entry.x[1],
                    value: entry.y
                }
            });

        });
    });
