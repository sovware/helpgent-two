<?php

use HelpGent\WaxFramework\View\View;

?>

<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>HelpGent</title>

    <style type="text/css">
        @media screen and (max-width: 991px) {
            #wrapper {
                padding: 30px 0 !important;
            }

            #wrapper table>tbody>tr>td>table {
                width: 500px;
            }

            #wrapper table>tbody>tr>td>table>tbody>tr>td>table {
                width: 100%;
            }

            #wrapper table table table table tr td {
                padding: 20px !important;
            }

            #wrapper table table table table tr td p {
                margin: 0;
            }
        }

        @media screen and (max-width: 575px) {

            #wrapper table>tbody>tr>td>table {
                width: 340px;
            }

            #wrapper table>tbody>tr>td>table>tbody>tr>td>table {
                width: 100%;
            }
        }
    </style>
</head>

<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="padding: 0;">
    <div id="wrapper" dir="ltr"
        style="background-color: #f7f7f7; margin: 0; padding: 70px 0; width: 100%; -webkit-text-size-adjust: none;">
        <table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%">
            <tr>
                <td align="center" valign="top">
                    <div id="template_header_image">
                    </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_container"
                        style="background-color: #ffffff; border: 1px solid #dedede; box-shadow: 0 20px 50px rgba(0,0,0,.10); border-radius: 20px;">
                        <?php
                        // Header
                        if ( $enable_email_header ) {
                            View::render( 'mail/header', compact( 'subject', 'header_background_color' ) );
                        }
                        // End Header
                        ?>
                        <tr>
                            <td align="center" valign="top">
                                <!-- Body -->
                                <table border="0" cellpadding="0" cellspacing="0" width="600" id="template_body">
                                    <tr>
                                        <td valign="top" id="body_content"
                                            style="background-color: #ffffff; border-radius: 20px;">
                                            <!-- Content -->
                                            <table border="0" cellpadding="20" cellspacing="0" width="100%">
                                                <tr>
                                                    <td valign="top" style="padding: 50px 30px;">
                                                        <div id="body_content_inner"
                                                            style='color: #636363; font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif; font-size: 16px; line-height: 150%; text-align: left;'>
                                                            <?php helpgent_render( $message ) ?>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!-- End Content -->
                                        </td>
                                    </tr>
                                </table>
                                <!-- End Body -->
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <?php
            // Footer
            if ( $enable_email_footer ) {
                View::render( 'mail/footer' );
            }
            // End Footer
            ?>
        </table>
    </div>
</body>

</html>