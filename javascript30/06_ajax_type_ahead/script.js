$(function() {
	const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
	const cities = []

	const $searchInput = $('.search')
	const $suggestions = $('.suggestions')

	fetch(endpoint)
		.then(data => data.json())
		.then(data => cities.push(...data))

	// Copypasted from stackoverflow, hopefully works ...
	function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
	}

	// Filters an array returning new array which consists of 
	// all the elements that contain wordToMatch
	function findMatches(wordToMatch, cities) {
		return cities.filter(place => {
			// have to be separate to use variable in .match
			// g means global (whole word), i means insensitive to case
			const regex = new RegExp(wordToMatch, 'gi')
			return place.city.match(regex) || place.state.match(regex)
		})
	}

	function displayMatches() {
		const matchArray = findMatches(this.value, cities)
		const html = matchArray.map(place => {
			const regex = new RegExp(this.value, 'gi')
			const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
			const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
			return `
				<li>
					<span class="name">${cityName}, ${stateName}</span>
					<span class="population">${numberWithCommas(place.population)}</span>
				</li>
			`
		}).join('')

		$suggestions.html(html)
	}

	$searchInput.on('keyup', displayMatches)
	$searchInput.on('change', displayMatches)
})