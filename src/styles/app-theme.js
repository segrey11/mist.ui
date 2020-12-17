const documentContainer = document.createElement('template');
documentContainer.innerHTML = `<custom-style>
<style>
body {
    /* takes too long. we can add later */
    font-family: Roboto, 'Noto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    /*font-family: Helvetica, Arial, sans-serif;*/
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    color: #424242;
    line-height: 20px;
    font-size: 16px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    background-color: #eeeeee;
}

html {
    --primary-text-color: var(--light-theme-text-color);
    --primary-background-color: var(--light-theme-background-color);
    --secondary-text-color: var(--light-theme-secondary-color);
    --disabled-text-color: var(--light-theme-disabled-color);
    --divider-color: var(--light-theme-divider-color);
    --error-color: var(--paper-deep-orange-a700);
    /* color definitions */
    --paper-grey-50: #fafafa;
    --paper-grey-100: #f5f5f5;
    --paper-grey-200: #eeeeee;
    --paper-grey-300: #e0e0e0;
    --paper-grey-400: #bdbdbd;
    --paper-grey-500: #9e9e9e;
    --paper-grey-600: #757575;
    --paper-grey-700: #616161;
    --paper-grey-800: #424242;
    --paper-grey-900: #212121;
    --paper-blue-grey-50: #eceff1;
    /* aka --mist-lighter-color */
    --paper-blue-grey-100: #cfd8dc;
    --paper-blue-grey-200: #b0bec5;
    /* aka --mist-light-color */
    --paper-blue-grey-300: #90a4ae;
    --paper-blue-grey-400: #78909c;
    --paper-blue-grey-500: #607d8b;
    --paper-blue-grey-600: #546e7a;
    --paper-blue-grey-700: #455a64;
    --paper-blue-grey-800: #37474f;
    --paper-blue-grey-900: #263238;
    /* aka --mist-dark-color */
    /* opacity for dark text on a light background */
    --dark-divider-opacity: 0.12;
    --dark-disabled-opacity: 0.38;
    /* or hint text or icon */
    --dark-secondary-opacity: 0.54;
    --dark-primary-opacity: 0.87;
    /* opacity for light text on a dark background */
    --light-divider-opacity: 0.12;
    --light-disabled-opacity: 0.3;
    /* or hint text or icon */
    --light-secondary-opacity: 0.7;
    --light-primary-opacity: 1.0;
    /*
 * Primary and accent colors. Also see color.html for more colors.
 */
    --primary-color: #3f51b5;
    /* --paper-indigo-500 */
    --light-primary-color: #c5cae9;
    /* --paper-indigo-100 */
    --dark-primary-color: #303f9f;
    /* --paper-indigo-700 */
    --accent-color: #039BE5;
    /* --paper-pink-a200 */
    --light-accent-color: #ff80ab;
    /* --paper-pink-a100 */
    --dark-accent-color: #f50057;
    /* --paper-pink-a400 */
    /* overriding defaults */
    --primary-color: #263238;
    --light-primary-color: #B0BEC5;
    --dark-primary-color: #eceff1;
    --accent-color: #2196F3;
    --light-accent-color: #ff80ab;
    --dark-accent-color: #f50057;
    /*
 * Material Design Light background theme
 */
    --light-theme-background-color: #ffffff;
    --light-theme-base-color: #000000;
    --light-theme-text-color: #212121;
    --light-theme-secondary-color: #737373;
    /* for secondary text and icons */
    --light-theme-disabled-color: #9b9b9b;
    /* disabled/hint text */
    --light-theme-divider-color: #dbdbdb;
    /*
 * Material Design Dark background theme
 */
    --dark-theme-background-color: #212121;
    --dark-theme-base-color: #ffffff;
    --dark-theme-text-color: #ffffff;
    --dark-theme-secondary-color: #bcbcbc;
    /* for secondary text and icons */
    --dark-theme-disabled-color: #646464;
    /* disabled/hint text */
    --dark-theme-divider-color: #3c3c3c;

    --paper-input-container-focus-color: var(--mist-blue);
    --paper-toggle-button-checked-button-color: var(--mist-blue);
    --paper-toggle-button-checked-bar-color: var(--mist-blue);

    /* Mist styles */

    /* informational colors */
    --green-color: #69b46c;
    --red-color: #d96557;
    --orange-color: #e9a644;
    --blue-color: #47b3e3;
    --gray-dark-color: #cfd8dc;
    --gray-light-color: #eceff1;
    /* three primary colors */
    --mist-dark-color: #263238;
    --mist-light-color: #B0BEC5;
    --mist-lighter-color: #eceff1;

    /*accent color*/
    --mist-blue: #2196F3;
    --paper-button-text: #fff; 
    --paper-fab-background: var(--mist-blue);
    --paper-fab-color: #fff;

    /* base spacing unit is 8px according to material-design */
    --half-spacing: 4px;
    --one-spacing: 8px;
    --two-spacing: 16px;
    --three-spacing: 24px;
    --four-spacing: 36px;
    --five-spacing: 40px;
    --six-spacing: 48px;
    --seven-spacing: 56px;
    --eight-spacing: 64px;

    --base-background-color: #eeeeee;

    /* Components */
    --header-color: #fff;

    /* sections colors */
    --base-section-color: #424242;
    /*#3a846b;*/
    --dashboard-section-color: #424242;
    --incidents-section-color: #d96557;
    --stacks-section-color: #0277BD;
    --machines-section-color: #8c76d1;
    --networks-section-color: #795548;
    --volumes-section-color: #00838f;
    /*#bf360c;*/
    --zones-section-color: #3F51B5;
    --keys-section-color: #009688;
    --images-section-color: #0099cc;
    --scripts-section-color: #d48900;
    --templates-section-color: #0097a7;
    --tunnels-section-color: #795548;
    --schedules-section-color: #43A047;
    --teams-section-color: #607D8B;
    --account-section-color: #2F2F3E;
    --clouds-section-color: #424242;
    --members-section-color: #607D8B;
    --insights-section-color: #2F2F3E;

    /* sidebar links colors */
    --base-sidebar-link-color: #424242;

    --dashboard-sidebar-link-color: #424242;
    --incidents-sidebar-link-color: #d96557;
    --stacks-sidebar-link-color: #0277BD;
    --machines-sidebar-link-color: #8c76d1;
    --networks-sidebar-link-color: #795548;
    --volumes-sidebar-link-color: #00838f;
    --zones-sidebar-link-color: #3F51B5;
    --keys-sidebar-link-color: #009688;
    --images-sidebar-link-color: #0099cc;
    --scripts-sidebar-link-color: #d48900;
    --templates-sidebar-link-color: #0097a7;
    --tunnels-sidebar-link-color: #795548;
    --schedules-sidebar-link-color: #43A047;
    --teams-sidebar-link-color: #607D8B;
    --account-sidebar-link-color: #2F2F3E;
    --clouds-sidebar-link-color: #424242;
    --members-sidebar-link-color: #607D8B;
    --insights-sidebar-link-color: #2F2F3E;

    /* mist list actions fill */
    --mist-list-actions-fill-color: var(--header-color);

    /* single page header icon background */
    --single-page-header-icon-background-color: rgba(255, 255, 255, 0.15);

    /* tiles */
    --tiles-background-color: #ffffff;
    --tiles-text-color: rgba(0, 0, 0, 0.32);
    --tiles-title-color: rgba(0, 0, 0, 0.54);
    --tiles-icon-background-color: #424242;
    --tiles-icon-color: #ffffff;

    --app-costs-highlight-background-color: #ffff8d;
    --app-costs-highlight-text-color: rgba(0, 0, 0, 0.54);
    --app-costs-sub-text-color: rgba(0, 0, 0, 0.32);

    /* text colors */
    --text-on-dark-bg: #fff;
    --text-on-dark-bg-opaque-54: rgba(255, 255, 255, .54);
    --text-on-dark-bg-opaque-87: rgba(255, 255, 255, .87);
    --text-on-light-bg: #000;
    --text-on-light-bg-opaque-54: rgba(0, 0, 0, .54);
    --text-on-light-bg-opaque-87: rgba(0, 0, 0, .87);

    /* single pages */
    --single-pages-content-padding: 36px 36px 80px 36px;

    /* logo */
    --logo-image: url('/ui/assets/logos/logo-white-34.svg');

    --logo-purchase: url('/ui/assets/logos/logo-vertical-v2.svg');
    --logo-purchase-height: 128px;
    --logo-purchase-margin-top: -50px;

    /* page-dashboard.html */
    --page-dashboard-content-padding: 0 0 80px;


    /* mist-rules */
    --mist-rules-head-text-color: var(--text-on-dark-bg);

    --page-dashboard-content-mixin: {
        -webkit-overflow-scrolling: touch;
    }

    /* machines/machine-page.html */
    --machine-page-head-mixin: {
        background-color: var(--machines-section-color);
        color: var(--text-on-dark-bg);
    }

    --mist-monitoring-head-mixin: {
        background-color: var(--machines-section-color);
        color: var(--text-on-dark-bg);
    }

    /* keys/key-page.html */
    --key-page-head-mixin: {
        background-color: var(--keys-section-color);
        color: var(--text-on-dark-bg);
    }

    /* scripts/script-page.html */
    --script-page-head-mixin: {
        background-color: var(--scripts-section-color);
        color: var(--text-on-dark-bg);
    }

    /* images/image-page.html */
    --image-page-head-mixin: {
        background-color: var(--images-section-color);
        color: var(--text-on-dark-bg);
    }

    /* stacks/image-page.html */
    --stack-page-head-mixin: {
        background-color: var(--stacks-section-color);
        color: var(--text-on-dark-bg);
    }

    /* networks/network-page.html */
    --network-page-head-mixin: {
        background-color: var(--networks-section-color);
        color: var(--text-on-dark-bg);
    }

    --volume-page-head-mixin: {
        background-color: var(--volumes-section-color);
        color: var(--text-on-dark-bg);
    }

    /* tunnels/tunnels-page.html */
    --tunnel-page-head-mixin: {
        background-color: var(--tunnels-section-color);
        color: var(--text-on-dark-bg);
    }

    /* clouds/cloud-page.html */
    --cloud-page-head-mixin: {
        background-color: var(--clouds-section-color);
        color: var(--text-on-dark-bg);
    }

    /* teams/team-page.html */
    --team-page-head-mixin: {
        background-color: var(--teams-section-color);
        color: var(--text-on-dark-bg);
    }

    /* members/member-page.html */
    --member-page-head-mixin: {
        background-color: var(--members-section-color);
        color: var(--text-on-dark-bg);
    }

    /* schedules/schedule-page.html */
    --schedule-page-head-mixin: {
        background-color: var(--schedules-section-color);
        color: var(--text-on-dark-bg);
    }

    /* templates/template-page.html */
    --template-page-head-mixin: {
        background-color: var(--templates-section-color);
        color: var(--text-on-dark-bg);
    }

    /* zones/zone-page.html */
    --zone-page-head-mixin: {
        background-color: var(--zones-section-color);
        color: var(--text-on-dark-bg);
    }

    /* page-insights.html */
    --insights-page-head-mixin: {
        background-color: var(--insights-section-color);
        color: var(--text-on-dark-bg);
    }

}

/* Breakpoints */

/* Small */
@media (max-width: 600px) {}

/* Tablet+ */
@media (min-width: 601px) {}

/* Material Design Adaptive Breakpoints */
/*
Below you'll find CSS media queries based on the breakpoint guidance
published by the Material Design team. You can choose to use, customise
or remove these breakpoints based on your needs.

http://www.google.com/design/spec/layout/adaptive-ui.html#adaptive-ui-breakpoints
*/

/* mobile-small */
@media all and (min-width: 0) and (max-width: 360px) and (orientation: portrait) {}

/* mobile-large */
@media all and (min-width: 361px) and (orientation: portrait) {}

/* mobile-small-landscape */
@media all and (min-width: 0) and (max-width: 480px) and (orientation: landscape) {}

/* mobile-large-landscape */
@media all and (min-width: 481px) and (orientation: landscape) {}

/* tablet-small-landscape */
@media all and (min-width: 600px) and (max-width: 960px) and (orientation: landscape) {}

/* tablet-large-landscape */
@media all and (min-width: 961px) and (orientation: landscape) {}

/* tablet-small */
@media all and (min-width: 600px) and (orientation: portrait) {}

/* tablet-large */
@media all and (min-width: 601px) and (max-width: 840px) and (orientation : portrait) {}

/* desktop-x-small-landscape */
@media all and (min-width: 0) and (max-width: 480px) and (orientation: landscape) {}

/* desktop-x-small */
@media all and (min-width: 0) and (max-width: 480px) and (max-aspect-ratio: 4/3) {}

/* desktop-small-landscape */
@media all and (min-width: 481px) and (max-width: 840px) and (orientation: landscape) {}

/* desktop-small */
@media all and (min-width: 481px) and (max-width: 840px) and (max-aspect-ratio: 4/3) {}

/* desktop-medium-landscape */
@media all and (min-width: 841px) and (max-width: 1280px) and (orientation: landscape) {}

/* desktop-medium */
@media all and (min-width: 841px) and (max-width: 1280px) and (max-aspect-ratio: 4/3) {}

/* desktop-large */
@media all and (min-width: 1281px) and (max-width: 1600px) {}

/* desktop-xlarge */
@media all and (min-width: 1601px) and (max-width: 1920px) {}

/* END OF OLD app-theme.css */
</style>
</custom-style>
`;

document.head.appendChild(documentContainer.content);
