<?php
/**
 * Plugin Name:       Mapbox GL JS demo (SSR)
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Author:            Sally CJ
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       tda-map
 *
 * @package           create-block
 */

function create_block_tda_block_map_ssr_block_init() {
	wp_register_script(
		'mapbox-gl',
		'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js',
		array(),
		null,
		true // Print in the footer.
	);

	// Define TDA_MAP_SSR_URL for src/index.js.
	$script = sprintf(
		'const TDA_MAP_SSR_URL = \'%s\';',
		esc_js( esc_url( plugins_url( 'ssr-page.php', __FILE__ ) ) )
	);
	// Front-end/non-admin side.
	wp_add_inline_script( 'mapbox-gl', $script, 'after' );
	// Admin side.
	wp_add_inline_script( 'wp-blocks', $script, 'after' );

	wp_register_style(
		'mapbox-gl',
		'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css',
		array(),
		null
	);

	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_tda_block_map_ssr_block_init' );
