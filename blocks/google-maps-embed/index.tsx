import React from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Globe } from 'lucide-react';

interface GoogleMapsEmbedAttributes {
    embedCode: string;
    height: string;
    aspectRatio: string;
}

registerBlockType('jankx/google-maps-embed', {
    title: __('Google Maps (Embed)', 'jankx'),
    icon: 'share-alt2',
    category: 'jankx',
    edit: ({ attributes, setAttributes }: { attributes: GoogleMapsEmbedAttributes, setAttributes: (attrs: Partial<GoogleMapsEmbedAttributes>) => void }) => {
        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Embed Settings', 'jankx')} initialOpen={true}>
                        <TextareaControl
                            label={__('Google Maps Iframe Code / URL', 'jankx')}
                            help={__('Paste the full <iframe> tag from Google Maps share dialog, or just the URL.', 'jankx')}
                            value={attributes.embedCode}
                            onChange={(val) => setAttributes({ embedCode: val })}
                        />
                        <TextControl
                            label={__('Fixed Height (e.g. 450px)', 'jankx')}
                            value={attributes.height}
                            onChange={(val) => setAttributes({ height: val })}
                        />
                        <SelectControl
                            label={__('Aspect Ratio', 'jankx')}
                            value={attributes.aspectRatio}
                            options={[
                                { label: 'None (use Height)', value: 'auto' },
                                { label: '16:9 (Widescreen)', value: '16/9' },
                                { label: '4:3 (Standard)', value: '4/3' },
                                { label: '1:1 (Square)', value: '1/1' },
                                { label: '21:9 (Ultrawide)', value: '21/9' }
                            ]}
                            onChange={(val) => setAttributes({ aspectRatio: val })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                        <Globe className="text-sky-600" />
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#0369a1' }}>
                        {__('Google Maps Embed Placeholder', 'jankx')}
                    </div>
                    <div style={{ fontSize: '11px', color: '#0ea5e9', marginTop: '4px' }}>
                        {attributes.embedCode ? 'Code detected' : 'Waiting for embed code...'}
                    </div>
                </div>
            </>
        );
    },
    save: () => null,
});
