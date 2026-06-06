import React from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { MapPin } from 'lucide-react';

import metadata from './block.json';

interface GoogleMapsApiAttributes {
    latitude: number;
    longitude: number;
    zoom: number;
    height: string;
    markerTitle: string;
    mapStyles: string;
}

registerBlockType(metadata as any, {
    edit: ({ attributes, setAttributes }: { attributes: GoogleMapsApiAttributes, setAttributes: (attrs: Partial<GoogleMapsApiAttributes>) => void }) => {
        const { latitude, longitude, zoom, height, markerTitle, mapStyles } = attributes;

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Map Settings', 'jankx')} initialOpen={true}>
                        <TextControl
                            label={__('Latitude', 'jankx')}
                            type="number"
                            value={latitude}
                            onChange={(val) => setAttributes({ latitude: parseFloat(val) })}
                        />
                        <TextControl
                            label={__('Longitude', 'jankx')}
                            type="number"
                            value={longitude}
                            onChange={(val) => setAttributes({ longitude: parseFloat(val) })}
                        />
                        <RangeControl
                            label={__('Zoom Level', 'jankx')}
                            min={1}
                            max={20}
                            value={zoom}
                            onChange={(val) => setAttributes({ zoom: val || 15 })}
                        />
                        <TextControl
                            label={__('Height (e.g. 450px or 50vh)', 'jankx')}
                            value={height}
                            onChange={(val) => setAttributes({ height: val })}
                        />
                        <TextControl
                            label={__('Marker Title', 'jankx')}
                            value={markerTitle}
                            onChange={(val) => setAttributes({ markerTitle: val })}
                        />
                    </PanelBody>
                    <PanelBody title={__('Advanced Styling', 'jankx')} initialOpen={false}>
                        <TextareaControl
                            label={__('Map Styles (JSON Array)', 'jankx')}
                            help={__('Paste Google Maps styling JSON array here.', 'jankx')}
                            value={mapStyles}
                            onChange={(val) => setAttributes({ mapStyles: val })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div style={{
                    background: '#f1f5f9',
                    backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    height: height || '450px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        zIndex: 2
                    }}>
                        <div style={{
                            background: '#ef4444',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            marginBottom: '4px',
                            whiteSpace: 'nowrap'
                        }}>
                            {markerTitle || __('Location', 'jankx')}
                        </div>
                        <MapPin size={32} className="text-red-500 fill-red-200" />
                    </div>

                    <div style={{
                        position: 'absolute',
                        bottom: '16px',
                        left: '16px',
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(4px)',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid white',
                        fontSize: '11px',
                        color: '#475569',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ fontWeight: 'bold', marginBottom: '2px', color: '#1e293b' }}>{__('Google Maps API', 'jankx')}</div>
                        <div>{latitude.toFixed(4)}, {longitude.toFixed(4)}</div>
                        <div>{__('Zoom:', 'jankx')} {zoom}</div>
                    </div>

                    <div style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px'
                    }}>
                        {['+', '−'].map(symbol => (
                            <div key={symbol} style={{
                                width: '28px',
                                height: '28px',
                                background: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                fontWeight: 'bold',
                                color: '#64748b'
                            }}>{symbol}</div>
                        ))}
                    </div>
                </div>
            </>
        );
    },
    save: () => null,
});
