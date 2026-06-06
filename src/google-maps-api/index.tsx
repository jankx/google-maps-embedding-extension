import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from '../../blocks/google-maps-api/block.json';

interface GoogleMapsApiAttributes {
    latitude: number;
    longitude: number;
    zoom: number;
    height: string;
    markerTitle: string;
    mapStyles: string;
}

interface EditProps {
    attributes: GoogleMapsApiAttributes;
    setAttributes: (attrs: Partial<GoogleMapsApiAttributes>) => void;
    className?: string;
}

function Edit({ attributes, setAttributes }: EditProps) {
    const blockProps = useBlockProps({
        style: {
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center' as const,
        },
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Map Settings', 'jankx')} initialOpen={true}>
                    <TextControl
                        label={__('Latitude', 'jankx')}
                        type="number"
                        value={String(attributes.latitude)}
                        onChange={(val: string) => setAttributes({ latitude: parseFloat(val) })}
                    />
                    <TextControl
                        label={__('Longitude', 'jankx')}
                        type="number"
                        value={String(attributes.longitude)}
                        onChange={(val: string) => setAttributes({ longitude: parseFloat(val) })}
                    />
                    <RangeControl
                        label={__('Zoom Level', 'jankx')}
                        min={1}
                        max={20}
                        value={attributes.zoom}
                        onChange={(val: number | undefined) => setAttributes({ zoom: val ?? 15 })}
                    />
                    <TextControl
                        label={__('Height (e.g. 450px or 50vh)', 'jankx')}
                        value={attributes.height}
                        onChange={(val: string) => setAttributes({ height: val })}
                    />
                    <TextControl
                        label={__('Marker Title', 'jankx')}
                        value={attributes.markerTitle}
                        onChange={(val: string) => setAttributes({ markerTitle: val })}
                    />
                </PanelBody>
                <PanelBody title={__('Advanced Styling', 'jankx')} initialOpen={false}>
                    <TextareaControl
                        label={__('Map Styles (JSON Array)', 'jankx')}
                        help={__('Paste Google Maps styling JSON array here.', 'jankx')}
                        value={attributes.mapStyles}
                        onChange={(val: string) => setAttributes({ mapStyles: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>📍</div>
                <div style={{ fontWeight: 'bold', color: '#1e293b' }}>
                    {__('Google Maps API Placeholder', 'jankx')}
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    {attributes.latitude}, {attributes.longitude} (Zoom: {attributes.zoom})
                </div>
            </div>
        </>
    );
}

registerBlockType(metadata.name as any, {
    ...metadata,
    edit: Edit,
    save: () => null,
} as any);
