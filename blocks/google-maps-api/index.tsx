import React from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MapPin } from 'lucide-react';

interface GoogleMapsApiAttributes {
    latitude: number;
    longitude: number;
    zoom: number;
    height: string;
    markerTitle: string;
    mapStyles: string;
}

registerBlockType('jankx/google-maps-api', {
    title: __('Google Maps (API)', 'jankx'),
    icon: 'location-alt',
    category: 'jankx',
    edit: ({ attributes, setAttributes }: { attributes: GoogleMapsApiAttributes, setAttributes: (attrs: Partial<GoogleMapsApiAttributes>) => void }) => {
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Map Settings', 'jankx')} initialOpen={true}>
                        <TextControl
                            label={__('Latitude', 'jankx')}
                            type="number"
                            value={attributes.latitude}
                            onChange={(val) => setAttributes({ latitude: parseFloat(val) })}
                        />
                        <TextControl
                            label={__('Longitude', 'jankx')}
                            type="number"
                            value={attributes.longitude}
                            onChange={(val) => setAttributes({ longitude: parseFloat(val) })}
                        />
                        <RangeControl
                            label={__('Zoom Level', 'jankx')}
                            min={1}
                            max={20}
                            value={attributes.zoom}
                            onChange={(val) => setAttributes({ zoom: val || 15 })}
                        />
                        <TextControl
                            label={__('Height (e.g. 450px or 50vh)', 'jankx')}
                            value={attributes.height}
                            onChange={(val) => setAttributes({ height: val })}
                        />
                        <TextControl
                            label={__('Marker Title', 'jankx')}
                            value={attributes.markerTitle}
                            onChange={(val) => setAttributes({ markerTitle: val })}
                        />
                    </PanelBody>
                    <PanelBody title={__('Advanced Styling', 'jankx')} initialOpen={false}>
                        <TextareaControl
                            label={__('Map Styles (JSON Array)', 'jankx')}
                            help={__('Paste Google Maps styling JSON array here.', 'jankx')}
                            value={attributes.mapStyles}
                            onChange={(val) => setAttributes({ mapStyles: val })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                        <MapPin className="text-indigo-600" />
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#1e293b' }}>
                        {__('Google Maps API Workspace', 'jankx')}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                        {attributes.latitude}, {attributes.longitude} (Zoom: {attributes.zoom})
                    </div>
                </div>
            </>
        );
    },
    save: () => null,
});
