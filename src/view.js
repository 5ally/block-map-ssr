/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady( () => {
	const mapContainer = document.getElementById( 'map' );

	// Just an example which removes the data-token attribute, after we read
	// its value.
	const accessToken = mapContainer.dataset.token;
	mapContainer.removeAttribute( 'data-token' );

	const map = new mapboxgl.Map( {
		accessToken,
		// The following config should match the ones defined in ssr-page.php.
		container: mapContainer, // container ID or element
		style: 'mapbox://styles/mapbox/streets-v12', // style URL
		center: [-74.5, 40], // starting position [lng, lat]
		zoom: 9, // starting zoom
	} );

	map.on( 'load', () => {
		const loading = document.querySelector( '#map-container .loading' );
		loading.parentNode.removeChild( loading );

		console.log( '[front-end] map ready', map );
	} );
} );
