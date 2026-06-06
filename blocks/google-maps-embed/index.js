(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.block_editor.InspectorControls;
    var components = wp.components;

    registerBlockType('jankx/google-maps-embed', {
        title: __('Google Maps (Embed)', 'jankx'),
        icon: 'share-alt2',
        category: 'jankx',
        attributes: {
            embedCode: { type: 'string', default: '' },
            height: { type: 'string', default: '450px' },
            aspectRatio: { type: 'string', default: '16/9' }
        },

        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return [
                el(InspectorControls, { key: 'inspector' },
                    el(components.PanelBody, { title: __('Embed Settings', 'jankx'), initialOpen: true },
                        el(components.TextareaControl, {
                            label: __('Google Maps Iframe Code / URL', 'jankx'),
                            help: __('Paste the full <iframe> tag from Google Maps share dialog, or just the URL.', 'jankx'),
                            value: attributes.embedCode,
                            onChange: function (val) { setAttributes({ embedCode: val }); }
                        }),
                        el(components.TextControl, {
                            label: __('Fixed Height (e.g. 450px)', 'jankx'),
                            value: attributes.height,
                            onChange: function (val) { setAttributes({ height: val }); }
                        }),
                        el(components.SelectControl, {
                            label: __('Aspect Ratio', 'jankx'),
                            value: attributes.aspectRatio,
                            options: [
                                { label: 'None (use Height)', value: 'auto' },
                                { label: '16:9 (Widescreen)', value: '16/9' },
                                { label: '4:3 (Standard)', value: '4/3' },
                                { label: '1:1 (Square)', value: '1/1' },
                                { label: '21:9 (Ultrawide)', value: '21/9' }
                            ],
                            onChange: function (val) { setAttributes({ aspectRatio: val }); }
                        })
                    )
                ),
                el('div', { className: props.className, style: { background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '40px', textAlign: 'center' } },
                    el('div', { style: { fontSize: '24px', marginBottom: '8px' } }, '🌍'),
                    el('div', { style: { fontWeight: 'bold', color: '#0369a1' } }, __('Google Maps Embed Placeholder', 'jankx')),
                    el('div', { style: { fontSize: '11px', color: '#0ea5e9', marginTop: '4px' } }, attributes.embedCode ? 'Code detected' : 'Waiting for embed code...')
                )
            ];
        },

        save: function () {
            return null;
        }
    });
})(window.wp);
