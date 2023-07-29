/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { mapMarker } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	icon: mapMarker,
} );
