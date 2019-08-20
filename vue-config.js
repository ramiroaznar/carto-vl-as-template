// ignore airship tags
Vue.config.ignoredElements = [/as-\w+/];

// numeric formatter
const numbFormatter = new Intl.NumberFormat('es-ES', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});

const vm = new Vue({
    el: '#app',
    data: {
        cities: null,
        population: null,
        avgPop: null,
        countries: [],
        placeTypes: [],
        popHistogram: [],
        rangePopulation: null,
        colorViz: 'country',
        aoi: false,
        placeTypesList: ['Populated place','Admin-0 capital','Admin-1 capital', 'Admin-1 region capital', 'Admin-0 region capital'],
        placeTypesChecked: ['Populated place','Admin-0 capital','Admin-1 capital', 'Admin-1 region capital', 'Admin-0 region capital'],
        inputGeojson: '',
        countryNames: '',
        cityNames: '',
        formatter: numbFormatter.format
    },
    computed: {
        visualization: function() {
            // toggle viz object to make the filters work
            if (this.colorViz == 'country') {
                return this.viz;
            } else {
                return this.popViz;
            }
        },
        filters: function() {
            // append all filters
            let filterConditions = [];
            if (this.rangePopulation) {
                const [minRange, maxRange] = this.rangePopulation;
                filterConditions.push(`between($pop_max,${minRange},${maxRange})`);
            }
            if (this.placeTypesChecked) {
                const placeTypesCheckedFilter = this.placeTypesChecked.map((item) => {
                    return `'${item}'`;
                }).join(',');
                filterConditions.push(`$featurecla in [${placeTypesCheckedFilter}]`);
            }
            if (this.countryNames) {
                const countryNamesArr = this.countryNames.split(',');
                const countryNamesFilter = countryNamesArr.map((item) => {
                    return `'${item}'`;
                }).join(',');
                filterConditions.push(`$adm0name in [${countryNamesFilter}]`);
            }
            if (this.cityNames) {
                const cityNamesArr = this.cityNames.split(',');
                const cityNamesFilter = cityNamesArr.map((item) => {
                    return `'${item}'`;
                }).join(',');
                filterConditions.push(`$name in [${cityNamesFilter}]`);
            }
            return filterConditions.join(' and ');
        }
    },
    watch: {
        colorViz: function(value) {
            // toggle visualization styles
            if (value == 'country') {
                this.layer.blendToViz(this.viz);
                this.clearFilters();
            } else {
                this.layer.blendToViz(this.popViz);
                this.clearFilters();
            }
        },
        placeTypesChecked: function(value) {
            if (value.length > 0) {
                // apply filters if filter is applied
                this.visualization.filter.blendTo(this.filters);
            } else {
                // disable filters if filter is not applied
                this.visualization.filter.blendTo('true');
            }  
        },
        rangePopulation: function(value) {
            if (value.length > 0) {
                this.visualization.filter.blendTo(this.filters);
            } else {
                this.visualization.filter.blendTo('true');
            }  
        },
        countryNames: function(value) {
            if (value.length > 0) {
                this.visualization.filter.blendTo(this.filters);
            } else {
                this.visualization.filter.blendTo('true');
            }
        },
        cityNames: function(value) {
            if (value.length > 0) {
                this.visualization.filter.blendTo(this.filters);
            } else {
                this.visualization.filter.blendTo('true');
            }
        },
        aoi: function(value) {
            if (value) {
                // add aoi layer when switch is checked
                this.aoiLayer.addTo(this.map, 'layer');
            } else {
                // remove aoi layer when switch is unchecked
                this.aoiLayer.remove();
            }
        },
        inputGeojson: function(value) {
            // change aoi geometry when textarea is updated
            const newSource = new carto.source.GeoJSON(JSON.parse(value));
            this.aoiLayer.update(newSource, this.aoiViz);
        }
    },
    methods: {
        clearFilters: function() {
            this.placeTypesChecked = this.placeTypesList
            this.taskNames = '';
            this.customerNames = '';
            // TBD
        }
    }
});