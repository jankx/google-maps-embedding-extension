<?php
namespace Puleeno\Extensions\GoogleMapsEmbedding;

use Jankx\Extensions\AbstractExtension;
use Puleeno\Extensions\GoogleMapsEmbedding\Gutenberg\GoogleMapsApiBlock;
use Puleeno\Extensions\GoogleMapsEmbedding\Gutenberg\GoogleMapsEmbedBlock;

class GoogleMapsEmbeddingExtension extends AbstractExtension
{
    protected static $instance;

    public function __construct()
    {
        $this->register_autoloader();
        parent::__construct();
    }

    protected function register_autoloader()
    {
        spl_autoload_register(function ($class) {
            $prefix = 'Puleeno\\Extensions\\GoogleMapsEmbedding\\';
            $base_dir = __DIR__ . '/includes/';

            $len = strlen($prefix);
            if (strncmp($prefix, $class, $len) !== 0) {
                return;
            }

            $relative_class = substr($class, $len);
            $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

            if (file_exists($file)) {
                require $file;
            }
        });
    }

    public function init(): void
    {
        self::$instance = $this;
    }

    public function register_hooks(): void
    {
        // Add theme options for Google Maps API Key
        add_filter('jankx/option/pages', [$this, 'register_option_page']);
        add_filter('jankx/option/sections', [$this, 'register_option_sections'], 10, 2);

        // Register Gutenberg blocks
        add_action('jankx/gutenberg/register-blocks', [$this, 'register_blocks_in_service'], 10, 2);
    }

    public function register_option_page($pages)
    {
        $pages[] = [
            'id' => 'integrations',
            'name' => __('Integrations', 'jankx'),
            'args' => [
                'description' => __('Third-party service integrations', 'jankx'),
                'priority' => 90,
                'icon' => 'dashicons-admin-links',
            ],
        ];
        return $pages;
    }

    public function register_option_sections($sections, $page_title)
    {
        // Use the untranslated title or ID if needed, but normally it matches the 'name'
        if ($page_title === __('Integrations', 'jankx')) {
            $sections['google_maps'] = [
                'id' => 'google_maps',
                'title' => __('Google Maps', 'jankx'),
                'fields' => [
                    [
                        'id' => 'google_maps_api_key',
                        'type' => 'text',
                        'title' => __('Google Maps API Key', 'jankx'),
                        'description' => __('Enter your Google Maps JavaScript API Key. Required for the "Google Maps API" block.', 'jankx'),
                    ],
                ],
            ];
        }
        return $sections;
    }

    public function register_blocks_in_service($repository, $app)
    {
        $extension_path = rtrim($this->get_extension_path(), '/');
        $blocks_dir = $extension_path . '/blocks';

        if (is_dir($blocks_dir)) {
            // Block 1: Google Maps JS API
            if (file_exists($blocks_dir . '/google-maps-api/block.json')) {
                $block = new GoogleMapsApiBlock($blocks_dir . '/google-maps-api');
                $repository->registerBlock($block);
            }

            // Block 2: Google Maps Embed (Iframe)
            if (file_exists($blocks_dir . '/google-maps-embed/block.json')) {
                $block = new GoogleMapsEmbedBlock($blocks_dir . '/google-maps-embed');
                $repository->registerBlock($block);
            }
        }
    }

    public static function get_api_key()
    {
        if (class_exists('\Jankx\Adapter\Options\Helper')) {
            return \Jankx\Adapter\Options\Helper::getOption('google_maps_api_key', '');
        }
        return '';
    }
}
