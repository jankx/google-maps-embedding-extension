import React from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, TextareaControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Globe } from 'lucide-react';

import metadata from './block.json';

interface GoogleMapsEmbedAttributes {
    embedCode: string;
    height: string;
    aspectRatio: string;
}

registerBlockType(metadata as any, {
    edit: ({ attributes, setAttributes }: { attributes: GoogleMapsEmbedAttributes, setAttributes: (attrs: Partial<GoogleMapsEmbedAttributes>) => void }) => {
        const { embedCode, height, aspectRatio } = attributes;

        // Extract src from iframe code if a full iframe tag was pasted
        let src = '';
        if (embedCode) {
            const match = embedCode.match(/src="([^"]+)"/);
            src = match ? match[1] : embedCode;
        }

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Embed Settings', 'jankx')} initialOpen={true}>
                        <TextareaControl
                            label={__('Google Maps Iframe Code / URL', 'jankx')}
                            help={__('Paste the full <iframe> tag from Google Maps share dialog, or just the URL.', 'jankx')}
                            value={embedCode}
                            onChange={(val) => setAttributes({ embedCode: val })}
                        />
                        <TextControl
                            label={__('Fixed Height (e.g. 450px)', 'jankx')}
                            value={height}
                            onChange={(val) => setAttributes({ height: val })}
                        />
                        <SelectControl
                            label={__('Aspect Ratio', 'jankx')}
                            value={aspectRatio}
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

                {src ? (
                    <div className="jankx-google-map-preview" style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined,
                        minHeight: height || '450px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid #e2e8f0'
                    }}>
                        <iframe
                            src={src}
                            width="100%"
                            height="100%"
                            style={{ border: 0, position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
                            loading="lazy"
                        />
                        <div style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            background: 'rgba(255,255,255,0.9)',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: '#64748b',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            zIndex: 10
                        }}>
                            {__('Editor Preview', 'jankx')}
                        </div>
                    </div>
                ) : (
                    <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '60px 40px', textAlign: 'center' }}>
                        <div style={{ fontSize: '32px', marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                            <Globe className="text-sky-500" size={48} />
                        </div>
                        <div style={{ fontWeight: 'bold', color: '#0369a1', fontSize: '18px' }}>
                            {__('Google Maps Embed', 'jankx')}
                        </div>
                        <div style={{ fontSize: '13px', color: '#0ea5e9', marginTop: '8px', maxWidth: '300px', marginInline: 'auto' }}>
                            {__('Paste an iframe code from Google Maps to see the preview here.', 'jankx')}
                        </div>
                    </div>
                )}
            </>
        );
    },
    save: () => null,
});
