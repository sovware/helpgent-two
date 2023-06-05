<?php

namespace HelpGent\App\Repositories;

class SettingsRepository
{
    protected array $settings = [];

    public function get_fields() {
        $db_settings = $this->db_settings();
        $menu        = $this->fields();

        foreach ( $menu as &$items ) {
            foreach ( $items as &$item ) {
                if ( 'fields' === $item['content_type'] ) {
                    $this->process_fields( $item['fields'], $db_settings );
                }
            }
        }
        return $menu;
    }

    private function process_fields( array &$fields, array $db_settings ) {
        foreach ( $fields as $key => &$field ) {
            if ( 'group' === $field['type'] ) {
                $this->process_fields( $field['fields'], $db_settings );
            } elseif ( isset( $db_settings[$key] ) ) {
                $field['value'] = $db_settings[$key];
            }
        }  
    }

    public function save( array $settings ) {
        return update_option( 'helpgent-settings', $settings );
    }

    public function db_settings() {
        if ( empty( $this->settings ) ) {
            $this->settings = get_option( 'helpgent-settings', [] );
        }
        return $this->settings;
    }

    private function fields() {
        $svg_icon_dir = helpgent_url( 'assets/svg/icon' );

        $fields = [
            'general' => [
                [
                    'label'        => esc_html__( 'General', 'helpgent' ),
                    'type'         => 'nav-item',
                    'content_type' => 'fields',
                    'fields'       => $this->general_setting_fields(),
                    'svg_icon'     => $svg_icon_dir . '/slider.svg' 
                ]
            ],
            'email'   => [
                [
                    'label'        => esc_html__( 'Email', 'helpgent' ),
                    'type'         => 'nav-item',
                    'content_type' => 'fields',
                    'fields'       => $this->email_general_setting_fields(),
                    'svg_icon'     => $svg_icon_dir . '/envelope.svg' 
                ]
            ],
            'test'    => [
                [
                    'label'        => esc_html__( 'Test', 'helpgent' ),
                    'type'         => 'nav-item',
                    'content_type' => 'hook',
                    'hook'         => 'my-custom-content-area',
                    'svg_icon'     => $svg_icon_dir . '/envelope.svg' 
                ]
            ],
        ];

        return apply_filters( 'helpgent_setting_fields', $fields );
    }

    private function email_general_setting_fields() {
        return [
            'enable_email_notification' => [
                'label' => esc_html__( "Enable Email Notification", 'helpgent' ),
                'type'  => 'toggle',
                'value' => 'no'
            ],
            'email_admin_event'         => [
                'label'     => esc_html__( "Admin Events", 'helpgent' ),
                'type'      => 'radio',
                'value'     => 'first_message_in_conversation',
                'options'   => [
                    ['value' => 'first_message_in_conversation', 'label' => esc_html__( 'First message in a conversation', 'helpgent' )],
                    ['value' => 'every_message_in_conversation', 'label' => esc_html__( 'Every message in a conversion', 'helpgent' )]
                ],
                'condition' => [
                    'enable_email_notification' => 'yes'
                ]
            ],
            'email_user_event'          => [
                'label'     => esc_html__( "User Events", 'helpgent' ),
                'type'      => 'radio',
                'value'     => 'first_message_in_conversation',
                'options'   => [
                    ['value' => 'first_message_in_conversation', 'label' => esc_html__( 'First message in a conversation', 'helpgent' )],
                    ['value' => 'every_message_in_conversation', 'label' => esc_html__( 'Every message in a conversion', 'helpgent' )]
                ],
                'condition' => [
                    'enable_email_notification' => 'yes'
                ]
            ],
        ];
    }

    private function general_setting_fields() {
        return [
            'open_ended'      => [
                'label'  => esc_html__( "Open Ended", 'helpgent' ),
                'type'   => 'group',
                'fields' => [
                    'enable_guest_conversation' => [
                        'label'   => esc_html__( 'Enable Guest Conversation', 'helpgent' ),
                        'type'    => 'toggle',
                        'package' => 'free',
                        'value'   => 'yes'
                    ],
                    'chat_head_position'        => [
                        'label'   => esc_html__( 'Chat Head Position', 'helpgent' ),
                        'type'    => 'select',
                        'package' => 'free',
                        'options' => [
                            ['value' => 'bottom-right', 'label' => esc_html__( 'Bottom Right', 'helpgent' )],
                            ['value' => 'bottom-left', 'label' => esc_html__( 'Bottom Left', 'helpgent' )],
                            ['value' => 'bottom-middle', 'label' => esc_html__( 'Bottom Middle', 'helpgent' )]
                        ]
                    ]
                ],
            ],
            'voice_and_video' => [
                'label'  => esc_html__( 'Voice And Video', 'helpgent' ),
                'type'   => "group",
                'fields' => [
                    'maximum_video_record_length' => [
                        'label'       => esc_html__( "Maximum Video Record Length", 'helpgent' ),
                        'type'        => 'number',
                        'description' => "<span style='color:red';>" . esc_html__( "You can use maximum of 2 mins in free version.", 'helpgent' ) . "</span>",
                        'value'       => 2,
                        'max'         => 2
                    ],
                    'maximum_voice_record_length' => [
                        'label'       => esc_html__( "Maximum Voice Record Length", 'helpgent' ),
                        'type'        => 'number',
                        'description' => "<span style='color:red';>" . esc_html__( "You can use maximum of 2 mins in free version.", 'helpgent' ) . "</span>",
                        'value'       => 2,
                        'max'         => 2
                    ]
                ]
            ]
        ];
    }
}
