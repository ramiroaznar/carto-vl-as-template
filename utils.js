// viz string styles

const countryStyle = `
    color: opacity(ramp($featurecla, bold), 0.7)
    strokeWidth: 0
    width: scaled(sqrt($pop_max)/500)

    @cities: viewPortCount()
    @population: viewPortSum($pop_max)
    @avgPop: viewPortAvg($pop_max)
    @popMin: viewPortMin($pop_max)
    @popMax: viewPortMax($pop_max)

    @countries: viewportHistogram($adm0name)
    @placeTypes: viewportHistogram($featurecla)

    @popHistogram: viewportHistogram($pop_max, 10)
`,

    typeColor = `
    opacity(ramp($featurecla, bold), 0.7)
    `,

    popColor = `
    opacity(ramp(linear($pop_max,@popMin,@popMax), sunset), 0.7)
`,

    aoiStyle = `
    color: opacity(white, 0.01)
    strokeColor: red
    strokeWidth: 3
    `;

vm.aoiStyle = aoiStyle, 
vm.countryStyle = countryStyle, 
vm.typeColor = typeColor;
vm.popColor = popColor;

// formatters

// string formatters
function formatCategory(category) {
    if (category !== null) {
        return formatString(category.split('_').join(' '));
    } else {
        return 'No data'
    }
}

function formatString(str) {
    return str
    .replace(/(\B)[^ ]*/g,match =>(match.toLowerCase()))
    .replace(/^[^ ]/g,match=>(match.toUpperCase()));
}