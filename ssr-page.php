<?php
$access_token = htmlspecialchars( filter_input( INPUT_GET, 'token' ) );
if ( ! $access_token ) {
	$link = '<a href="https://docs.mapbox.com/help/how-mapbox-works/access-tokens/">access token</a>';
	die( "Invalid $link." );
}

$map_height = filter_input( INPUT_GET, 'height', FILTER_SANITIZE_NUMBER_INT );
$map_height = $map_height ? $map_height . 'px;' : '100vw';
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Map block preview</title>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css">
		<link rel="stylesheet" href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css">
	</head>
	<body>
		<div id="map" style="width: 100%; height: <?php echo $map_height; ?>"></div>
		<script src="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js"></script>
		<script>
			const mapContainer = document.getElementById( 'map' );

			mapboxgl.accessToken = '<?php echo $access_token; ?>';

			const map = new mapboxgl.Map( {
				// The following config should match the ones defined in src/index.js.
				container: mapContainer, // container ID or element
				style: 'mapbox://styles/mapbox/streets-v12', // style URL
				center: [-74.5, 40], // starting position [lng, lat]
				zoom: 9, // starting zoom
			} );

			// Expose a global function for accessing the Mapbox instance.
			window.getMap = () => map;
		</script>
	</body>
</html>
