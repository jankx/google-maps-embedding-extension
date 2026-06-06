import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import metadata from '../../blocks/google-maps-embed/block.json';

interface GoogleMapsEmbedAttributes {
    embedCode: string;
    height: string;
    aspectRatio: string;
}

interface EditProps {
    attributes: GoogleMapsEmbedAttributes;
    setAttributes: (attrs: Partial<GoogleMapsEmbedAttributes>) => void;
}

function Edit({ attributes, setAttributes }: EditProps) {
    const blockProps = useBlockProps({
        style: {
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center' as const,
        },
    });

    const aspectRatioOptions = [
        { label: __('None (use Height)', 'jankx'), value: 'auto' },
        { label: __('16:9 (Widescreen)', 'jankx'), value: '16/9' },
        { label: __('4:3 (Standard)', 'jankx'), value: '4/3' },
        { label: __('1:1 (Square)', 'jankx'), value: '1/1' },
        { label: __('21:9 (Ultrawide)', 'jankx'), value: '21/9' },
    ];

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Embed Settings', 'jankx')} initialOpen={true}>
                    <TextareaControl
                        label={__('Google Maps iframe Code / URL', 'jankx')}
                        help={__('Paste the full <iframe> tag from the Google Maps share dialog, or just the URL.', 'jankx')}
                        value={attributes.embedCode}
                        onChange={(val: string) => setAttributes({ embedCode: val })}
                    />
                    <TextControl
                        label={__('Fixed Height (e.g. 450px)', 'jankx')}
                        value={attributes.height}
                        onChange={(val: string) => setAttributes({ height: val })}
                    />
                    <SelectControl
                        label={__('Aspect Ratio', 'jankx')}
                        value={attributes.aspectRatio}
                        options={aspectRatioOptions}
                        onChange={(val: string) => setAttributes({ aspectRatio: val })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌍</div>
                <div style={{ fontWeight: 'bold', color: '#0369a1' }}>
                    {__('Google Maps Embed Placeholder', 'jankx')}
                </div>
                <div style={{ fontSize: '11px', color: '#0ea5e9', marginTop: '4px' }}>
                    {attributes.embedCode
                        ? __('Embed code detected', 'jankx')
                        : __('Paste your iframe embed code in the sidebar →', 'jankx')}
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
