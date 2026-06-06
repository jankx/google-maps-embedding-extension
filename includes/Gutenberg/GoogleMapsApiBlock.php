<?php
namespace Puleeno\Extensions\GoogleMapsEmbedding\Gutenberg;

use Jankx\Gutenberg\Abstracts\Block;
use Puleeno\Extensions\GoogleMapsEmbedding\GoogleMapsEmbeddingExtension;

class GoogleMapsApiBlock extends Block
{
    public function render($attributes, $content = '')
    {
        $api_key = GoogleMapsEmbeddingExtension::get_api_key();
        if (empty($api_key)) {
            if (is_user_logged_in() && current_user_can('edit_posts')) {
                return sprintf(
                    '<div class="jankx-google-maps-api-error" style="background:#fff3cd; color:#856404; padding:20px; border:1px solid #ffeeba; border-radius:8px;">
                        <strong>Google Maps API Block:</strong> %s
                    </div>',
                    __('Please enter your Google Maps API Key in Theme Options -> Integrations.', 'jankx')
                );
            }
            return '';
        }

        $lat = isset($attributes['latitude']) ? $attributes['latitude'] : 21.0285;
        $lng = isset($attributes['longitude']) ? $attributes['longitude'] : 105.8542;
        $zoom = isset($attributes['zoom']) ? $attributes['zoom'] : 15;
        $height = isset($attributes['height']) ? $attributes['height'] : '450px';
        $styles = isset($attributes['mapStyles']) ? $attributes['mapStyles'] : '';
        $marker_title = isset($attributes['markerTitle']) ? $attributes['markerTitle'] : '';

        $map_id = 'google-map-' . uniqid();

        // Enqueue Google Maps Script
        wp_enqueue_script(
            'google-maps-api',
            sprintf('https://maps.googleapis.com/maps/api/js?key=%s', $api_key),
            [],
            null,
            true
        );

        ob_start();
        ?>
        <div class="jankx-google-map-wrapper jankx-google-map-api" style="height: <?php echo esc_attr($height); ?>;">
            <div id="<?php echo esc_attr($map_id); ?>" class="google-map-container" style="width: 100%; height: 100%;"></div>
            <script type="text/javascript">
                document.addEventListener('DOMContentLoaded', function() {
                    function initMap() {
                        var location = { lat: <?php echo floatval($lat); ?>, lng: <?php echo floatval($lng); ?> };
                        var map = new google.maps.Map(document.getElementById('<?php echo esc_js($map_id); ?>'), {
                            zoom: <?php echo intval($zoom); ?>,
                            center: location,
                            <?php if (!empty($styles)) : ?>
                            styles: <?php echo $styles; ?>,
                            <?php endif; ?>
                        });
                        var marker = new google.maps.Marker({
                            position: location,
                            map: map,
                            title: '<?php echo esc_js($marker_title); ?>'
                        });
                    }
                    if (typeof google !== 'undefined') {
                        initMap();
                    } else {
                        window.addEventListener('load', initMap);
                    }
                });
            </script>
        </div>
        <?php
        return ob_get_clean();
    }
}
