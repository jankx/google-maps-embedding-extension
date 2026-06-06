(function (wp) {
    var registerBlockType = wp.blocks.registerBlockType;
    var el = wp.element.createElement;
    var __ = wp.i18n.__;
    var InspectorControls = wp.block_editor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var TextControl = wp.components.PanelBody; // Map to TextControl if needed
    var RangeControl = wp.components.RangeControl;
    var TextareaControl = wp.components.TextareaControl;
    var BaseControl = wp.components.BaseControl;

    // Use components from wp.components directly
    var components = wp.components;

    registerBlockType('jankx/google-maps-api', {
        title: __('Google Maps (API)', 'jankx'),
        icon: 'location-alt',
        category: 'jankx',
        attributes: {
            latitude: { type: 'number', default: 21.0285 },
            longitude: { type: 'number', default: 105.8542 },
            zoom: { type: 'number', default: 15 },
            height: { type: 'string', default: '450px' },
            markerTitle: { type: 'string', default: 'Hanoi' },
            mapStyles: { type: 'string', default: '' }
        },

        edit: function (props) {
            var attributes = props.attributes;
            var setAttributes = props.setAttributes;

            return [
                el(InspectorControls, { key: 'inspector' },
                    el(components.PanelBody, { title: __('Map Settings', 'jankx'), initialOpen: true },
                        el(components.TextControl, {
                            label: __('Latitude', 'jankx'),
                            type: 'number',
                            value: attributes.latitude,
                            onChange: function (val) { setAttributes({ latitude: parseFloat(val) }); }
                        }),
                        el(components.TextControl, {
                            label: __('Longitude', 'jankx'),
                            type: 'number',
                            value: attributes.longitude,
                            onChange: function (val) { setAttributes({ longitude: parseFloat(val) }); }
                        }),
                        el(components.RangeControl, {
                            label: __('Zoom Level', 'jankx'),
                            min: 1,
                            max: 20,
                            value: attributes.zoom,
                            onChange: function (val) { setAttributes({ zoom: parseInt(val) }); }
                        }),
                        el(components.TextControl, {
                            label: __('Height (e.g. 450px or 50vh)', 'jankx'),
                            value: attributes.height,
                            onChange: function (val) { setAttributes({ height: val }); }
                        }),
                        el(components.TextControl, {
                            label: __('Marker Title', 'jankx'),
                            value: attributes.markerTitle,
                            onChange: function (val) { setAttributes({ markerTitle: val }); }
                        })
                    ),
                    el(components.PanelBody, { title: __('Advanced Styling', 'jankx'), initialOpen: false },
                        el(components.TextareaControl, {
                            label: __('Map Styles (JSON Array)', 'jankx'),
                            help: __('Paste Google Maps styling JSON array here.', 'jankx'),
                            value: attributes.mapStyles,
                            onChange: function (val) { setAttributes({ mapStyles: val }); }
                        })
                    )
                ),
                el('div', { className: props.className, style: { background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '40px', textAlign: 'center' } },
                    el('div', { style: { fontSize: '24px', marginBottom: '8px' } }, '📍'),
                    el('div', { style: { fontWeight: 'bold', color: '#1e293b' } }, __('Google Maps API Workspace', 'jankx')),
                    el('div', { style: { fontSize: '12px', color: '#64748b' } }, attributes.latitude + ', ' + attributes.longitude + ' (Zoom: ' + attributes.zoom + ')')
                )
            ];
        },

        save: function () {
            return null;
        }
    });
})(window.wp);
