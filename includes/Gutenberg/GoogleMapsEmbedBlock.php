<?php
namespace Puleeno\Extensions\GoogleMapsEmbedding\Gutenberg;

use Jankx\Gutenberg\Abstracts\Block;

class GoogleMapsEmbedBlock extends Block
{
    public function render($attributes, $content = '')
    {
        $embed_code = isset($attributes['embedCode']) ? $attributes['embedCode'] : '';
        $height = isset($attributes['height']) ? $attributes['height'] : '450px';
        $aspect_ratio = isset($attributes['aspectRatio']) ? $attributes['aspectRatio'] : '16/9';

        if (empty($embed_code)) {
            if (is_user_logged_in() && current_user_can('edit_posts')) {
                return sprintf(
                    '<div class="jankx-google-maps-embed-placeholder" style="background:#f1f5f9; color:#475569; padding:40px; border:2px dashed #cbd5e1; border-radius:12px; text-align:center;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom:12px; opacity:0.5;"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                        <div style="font-weight:bold; font-size:14px;">Google Maps Embed Block</div>
                        <div style="font-size:12px; margin-top:4px;">%s</div>
                    </div>',
                    __('Please paste your Google Maps iframe embed code in the block settings.', 'jankx')
                );
            }
            return '';
        }

        // Extract src from iframe code if a full iframe tag was pasted
        if (preg_match('/src="([^"]+)"/', $embed_code, $matches)) {
            $src = $matches[1];
        } else {
            $src = $embed_code; // Assume it's just the URL
        }

        ob_start();
        ?>
        <div class="jankx-google-map-wrapper jankx-google-map-embed" style="position: relative; width: 100%; aspect-ratio: <?php echo esc_attr($aspect_ratio); ?>; min-height: <?php echo esc_attr($height); ?>;">
            <iframe 
                src="<?php echo esc_url($src); ?>" 
                width="100%" 
                height="100%" 
                style="border:0; position: absolute; top: 0; left: 0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        </div>
        <?php
        return ob_get_clean();
    }
}
