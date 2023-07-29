/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

const save = ( { attributes } ) => {
	const blockProps = useBlockProps.save( {
		id: 'map-container',
	} );

	return (
		<div { ...blockProps }>
			<p className="loading">
				<i>Loading map..</i>
			</p>

			<div { ...{
				id: 'map',
				style: { height: '300px' },
				'data-token': attributes.accessToken,
			} }></div>
		</div>
	);
};

export default save;
