/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useRef, useState } from '@wordpress/element';
import { TextControl } from '@wordpress/components';

// Build the URL to the map's SSR page.
const ssrPageUrl = ( accessToken, mapHeight ) => {
	/* TDA_MAP_SSR_URL is defined in block-map-ssr.php */
	let url = TDA_MAP_SSR_URL;

	url += ( url.indexOf( '?' ) >= 0 ) ? '&' : '?';
	url += 'token=' + accessToken;
	url += '&height=' + mapHeight;

	return url;
};

const Edit = ( { attributes, setAttributes } ) => {
	const { accessToken } = attributes;

	const mapContainer = useRef( null );

	const [ mapLoaded, setMapLoaded ] = useState( false );

	const onMapFrameLoad = () => {
		let map;

		// Note: getMap is defined on the SSR page. It's a custom function which
		// returns the Mapbox instance for the map initialized on that SSR page.
		try {
			map = mapContainer.current.contentWindow.getMap();
		} catch ( error ) {
			console.log( 'Error accessing the Mapbox\'s map instance!', error );
			return;
		}

		map.on( 'load', () => {
			setMapLoaded( true );
			console.log( 'map ready', map );
		} );

		// Your code here..
	};

	return (
		<div { ...useBlockProps() }>
			{ /* In this demo, I'm deliberately not using <InspectorControls>. */ }
			<fieldset>
				<TextControl
					label="Access Token"
					value={ accessToken }
					onChange={ ( value ) => setAttributes( { accessToken: value } ) }
				/>
			</fieldset>

			{ ( accessToken && ! mapLoaded ) && <i>Loading map..</i> }

			{ accessToken && (
				<iframe
					src={ ssrPageUrl( accessToken, 300 ) }
					width="100%"
					height="300"
					style={ { border: 0, overflow: 'hidden' } }
					id="map-frame"
					onLoad={ onMapFrameLoad }
					ref={ mapContainer }
				></iframe>
			) }
		</div>
	);
};

export default Edit;
