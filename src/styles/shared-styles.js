const documentContainer = document.createElement('template');

documentContainer.innerHTML = `<dom-module id="shared-styles">
    <template>
        <custom-style>
        <style>
        [hidden] {
            display: none !important;
        }

/* OLD grid.css */
.fluid {
  margin-right: auto;
  margin-left: auto;
  padding-right: 2rem;
  padding-left: 2rem;
}

.grid {
  max-width: 100%;
}

.grid-row {
  box-sizing: border-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -webkit-flex: 0 1 auto;
  -ms-flex: 0 1 auto;
  -webkit-box-flex: 0;
  flex: 0 1 auto;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  flex-direction: row;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -1rem;
  margin-left: -1rem;
}

.grid-row.reverse {
  -webkit-flex-direction: row-reverse;
  -ms-flex-direction: row-reverse;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: reverse;
  flex-direction: row-reverse;
}

.grid-col.reverse {
  -webkit-flex-direction: column-reverse;
  -ms-flex-direction: column-reverse;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  flex-direction: column-reverse;
}

.xs,
.xs1,
.xs2,
.xs3,
.xs4,
.xs5,
.xs6,
.xs7,
.xs8,
.xs9,
.xs10,
.xs11,
.xs12 {
  box-sizing: border-box;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  padding-right: 1rem;
  padding-left: 1rem;
}

.xs {
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  -webkit-box-flex: 1;
  flex-grow: 1;
  -ms-flex-preferred-size: 0;
  -webkit-flex-basis: 0;
  flex-basis: 0;
  max-width: 100%;
}

.xs1 {
  -ms-flex-preferred-size: 8.333%;
  -webkit-flex-basis: 8.333%;
  flex-basis: 8.333%;
  max-width: 8.333%;
}

.xs2 {
  -ms-flex-preferred-size: 16.667%;
  -webkit-flex-basis: 16.667%;
  flex-basis: 16.667%;
  max-width: 16.667%;
}

.xs3 {
  -ms-flex-preferred-size: 25%;
  -webkit-flex-basis: 25%;
  flex-basis: 25%;
  max-width: 25%;
}

.xs4 {
  -ms-flex-preferred-size: 33.333%;
  -webkit-flex-basis: 33.333%;
  flex-basis: 33.333%;
  max-width: 33.333%;
}

.xs5 {
  -ms-flex-preferred-size: 41.667%;
  -webkit-flex-basis: 41.667%;
  flex-basis: 41.667%;
  max-width: 41.667%;
}

.xs6 {
  -ms-flex-preferred-size: 50%;
  -webkit-flex-basis: 50%;
  flex-basis: 50%;
  max-width: 50%;
}

.xs7 {
  -ms-flex-preferred-size: 58.333%;
  -webkit-flex-basis: 58.333%;
  flex-basis: 58.333%;
  max-width: 58.333%;
}

.xs8 {
  -ms-flex-preferred-size: 66.667%;
  -webkit-flex-basis: 66.667%;
  flex-basis: 66.667%;
  max-width: 66.667%;
}

.xs9 {
  -ms-flex-preferred-size: 75%;
  -webkit-flex-basis: 75%;
  flex-basis: 75%;
  max-width: 75%;
}

.xs10 {
  -ms-flex-preferred-size: 83.333%;
  -webkit-flex-basis: 83.333%;
  flex-basis: 83.333%;
  max-width: 83.333%;
}

.xs11 {
  -ms-flex-preferred-size: 91.667%;
  -webkit-flex-basis: 91.667%;
  flex-basis: 91.667%;
  max-width: 91.667%;
}

.xs12 {
  -ms-flex-preferred-size: 100%;
  -webkit-flex-basis: 100%;
  flex-basis: 100%;
  max-width: 100%;
}

@media only screen and (min-width: 48em) {
  .grid {
    width: 46rem;
  }

  .s,
  .s1,
  .s2,
  .s3,
  .s4,
  .s5,
  .s6,
  .s7,
  .s8,
  .s9,
  .s10,
  .s11,
  .s12 {
    box-sizing: border-box;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    -webkit-box-flex: 0;
    flex: 0 0 auto;
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .s {
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    -webkit-box-flex: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    -webkit-flex-basis: 0;
    flex-basis: 0;
    max-width: 100%;
  }

  .s1 {
    -ms-flex-preferred-size: 8.333%;
    -webkit-flex-basis: 8.333%;
    flex-basis: 8.333%;
    max-width: 8.333%;
  }

  .s2 {
    -ms-flex-preferred-size: 16.667%;
    -webkit-flex-basis: 16.667%;
    flex-basis: 16.667%;
    max-width: 16.667%;
  }

  .s3 {
    -ms-flex-preferred-size: 25%;
    -webkit-flex-basis: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }

  .s4 {
    -ms-flex-preferred-size: 33.333%;
    -webkit-flex-basis: 33.333%;
    flex-basis: 33.333%;
    max-width: 33.333%;
  }

  .s5 {
    -ms-flex-preferred-size: 41.667%;
    -webkit-flex-basis: 41.667%;
    flex-basis: 41.667%;
    max-width: 41.667%;
  }

  .s6 {
    -ms-flex-preferred-size: 50%;
    -webkit-flex-basis: 50%;
    flex-basis: 50%;
    max-width: 50%;
  }

  .s7 {
    -ms-flex-preferred-size: 58.333%;
    -webkit-flex-basis: 58.333%;
    flex-basis: 58.333%;
    max-width: 58.333%;
  }

  .s8 {
    -ms-flex-preferred-size: 66.667%;
    -webkit-flex-basis: 66.667%;
    flex-basis: 66.667%;
    max-width: 66.667%;
  }

  .s9 {
    -ms-flex-preferred-size: 75%;
    -webkit-flex-basis: 75%;
    flex-basis: 75%;
    max-width: 75%;
  }

  .s10 {
    -ms-flex-preferred-size: 83.333%;
    -webkit-flex-basis: 83.333%;
    flex-basis: 83.333%;
    max-width: 83.333%;
  }

  .s11 {
    -ms-flex-preferred-size: 91.667%;
    -webkit-flex-basis: 91.667%;
    flex-basis: 91.667%;
    max-width: 91.667%;
  }

  .s12 {
    -ms-flex-preferred-size: 100%;
    -webkit-flex-basis: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }
}

@media only screen and (min-width: 62em) {
  .grid {
    width: 61rem;
  }

  .m,
  .m1,
  .m2,
  .m3,
  .m4,
  .m5,
  .m6,
  .m7,
  .m8,
  .m9,
  .m10,
  .m11,
  .m12 {
    box-sizing: border-box;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    -webkit-box-flex: 0;
    flex: 0 0 auto;
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .m {
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    -webkit-box-flex: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    -webkit-flex-basis: 0;
    flex-basis: 0;
    max-width: 100%;
  }

  .m1 {
    -ms-flex-preferred-size: 8.333%;
    -webkit-flex-basis: 8.333%;
    flex-basis: 8.333%;
    max-width: 8.333%;
  }

  .m2 {
    -ms-flex-preferred-size: 16.667%;
    -webkit-flex-basis: 16.667%;
    flex-basis: 16.667%;
    max-width: 16.667%;
  }

  .m3 {
    -ms-flex-preferred-size: 25%;
    -webkit-flex-basis: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }

  .m4 {
    -ms-flex-preferred-size: 33.333%;
    -webkit-flex-basis: 33.333%;
    flex-basis: 33.333%;
    max-width: 33.333%;
  }

  .m5 {
    -ms-flex-preferred-size: 41.667%;
    -webkit-flex-basis: 41.667%;
    flex-basis: 41.667%;
    max-width: 41.667%;
  }

  .m6 {
    -ms-flex-preferred-size: 50%;
    -webkit-flex-basis: 50%;
    flex-basis: 50%;
    max-width: 50%;
  }

  .m7 {
    -ms-flex-preferred-size: 58.333%;
    -webkit-flex-basis: 58.333%;
    flex-basis: 58.333%;
    max-width: 58.333%;
  }

  .m8 {
    -ms-flex-preferred-size: 66.667%;
    -webkit-flex-basis: 66.667%;
    flex-basis: 66.667%;
    max-width: 66.667%;
  }

  .m9 {
    -ms-flex-preferred-size: 75%;
    -webkit-flex-basis: 75%;
    flex-basis: 75%;
    max-width: 75%;
  }

  .m10 {
    -ms-flex-preferred-size: 83.333%;
    -webkit-flex-basis: 83.333%;
    flex-basis: 83.333%;
    max-width: 83.333%;
  }

  .m11 {
    -ms-flex-preferred-size: 91.667%;
    -webkit-flex-basis: 91.667%;
    flex-basis: 91.667%;
    max-width: 91.667%;
  }

  .m12 {
    -ms-flex-preferred-size: 100%;
    -webkit-flex-basis: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }
}

@media only screen and (min-width: 75em) {
  .grid {
    width: 71rem;
  }

  .l,
  .l1,
  .l2,
  .l3,
  .l4,
  .l5,
  .l6,
  .l7,
  .l8,
  .l9,
  .l10,
  .l11,
  .l12 {
    box-sizing: border-box;
    -webkit-flex: 0 0 auto;
    -ms-flex: 0 0 auto;
    -webkit-box-flex: 0;
    flex: 0 0 auto;
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .l {
    -webkit-flex-grow: 1;
    -ms-flex-positive: 1;
    -webkit-box-flex: 1;
    flex-grow: 1;
    -ms-flex-preferred-size: 0;
    -webkit-flex-basis: 0;
    flex-basis: 0;
    max-width: 100%;
  }

  .l1 {
    -ms-flex-preferred-size: 8.333%;
    -webkit-flex-basis: 8.333%;
    flex-basis: 8.333%;
    max-width: 8.333%;
  }

  .l2 {
    -ms-flex-preferred-size: 16.667%;
    -webkit-flex-basis: 16.667%;
    flex-basis: 16.667%;
    max-width: 16.667%;
  }

  .l3 {
    -ms-flex-preferred-size: 25%;
    -webkit-flex-basis: 25%;
    flex-basis: 25%;
    max-width: 25%;
  }

  .l4 {
    -ms-flex-preferred-size: 33.333%;
    -webkit-flex-basis: 33.333%;
    flex-basis: 33.333%;
    max-width: 33.333%;
  }

  .l5 {
    -ms-flex-preferred-size: 41.667%;
    -webkit-flex-basis: 41.667%;
    flex-basis: 41.667%;
    max-width: 41.667%;
  }

  .l6 {
    -ms-flex-preferred-size: 50%;
    -webkit-flex-basis: 50%;
    flex-basis: 50%;
    max-width: 50%;
  }

  .l7 {
    -ms-flex-preferred-size: 58.333%;
    -webkit-flex-basis: 58.333%;
    flex-basis: 58.333%;
    max-width: 58.333%;
  }

  .l8 {
    -ms-flex-preferred-size: 66.667%;
    -webkit-flex-basis: 66.667%;
    flex-basis: 66.667%;
    max-width: 66.667%;
  }

  .l9 {
    -ms-flex-preferred-size: 75%;
    -webkit-flex-basis: 75%;
    flex-basis: 75%;
    max-width: 75%;
  }

  .l10 {
    -ms-flex-preferred-size: 83.333%;
    -webkit-flex-basis: 83.333%;
    flex-basis: 83.333%;
    max-width: 83.333%;
  }

  .l11 {
    -ms-flex-preferred-size: 91.667%;
    -webkit-flex-basis: 91.667%;
    flex-basis: 91.667%;
    max-width: 91.667%;
  }

  .l12 {
    -ms-flex-preferred-size: 100%;
    -webkit-flex-basis: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }
}
/* END OF OLD grid.css */
/* OLD main.css */


iron-overlay-backdrop[opened] {
    opacity: 0.6 !important;
}

body, a {
    color: #424242;
}
a, a:visited, a:active, a:focus {
    outline: none;
    text-decoration: none;
}

pre,
code {
    font-family: Inconsolata, monospace;
}

pre {
    overflow-x: auto;
}

h1,
h2,
h3,
h4,
h5,
h6,
a {
    text-rendering: optimizeLegibility;
    text-decoration: none;
    letter-spacing: 0;
}

p {
    font-size: 16px;
    line-height: 22px;
}

h1 {
    font-size: 45px;
    font-weight: 400;
    /*letter-spacing: -.018em;*/
    line-height: 48px;
}

h2 {
    font-weight: 400;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 48px;
    margin: 8px 0;
}

h3 {
    font-size: 24px;
    font-weight: 400;
    /* letter-spacing: -.012em;*/
    line-height: 32px;
}

h4 {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
}

h5,
h6 {
    font-size: 13px;
    line-height: 20px;
}

::-webkit-scrollbar {
    /*z-index: 99999;*/
}

catalog-app {
    overflow: hidden;
}

.logdetailswrapper {
    -webkit-touch-callout: all;
    /* iOS Safari */
    -webkit-user-select: all;
    /* Chrome/Safari/Opera */
    -khtml-user-select: all;
    /* Konqueror */
    -moz-user-select: all;
    /* Firefox */
    -ms-user-select: all;
    /* Internet Explorer/Edge */
    user-select: all;
}

.logdetailswrapper table {
    background-color: #f5f5f5;
    word-break: break-all;
    white-space: normal;
    table-layout: fixed;
}

.logdetailswrapper table td {
    padding: 8px;
    vertical-align: top;
    cursor: auto;
    border-bottom: 1px solid #ddd;
}

.logdetailswrapper table td:first-child {
    font-weight: 500;
    width: 190px;
    text-transform: capitalize;
    padding-left: 24px;
}

.logdetailswrapper table tr:last-child td {
    border-bottom: 0 none;
}

@media (max-width: 400px) {
    .logdetailswrapper table td {
        display: block;
    }
    .logdetailswrapper table td:first-child {
        border-top: 1px solid #ccc;
        text-align: left;
        padding-bottom: 0;
        width: 100%;
    }
}

.menu-icon {
    display: block;
    width: 24px;
    padding-top: 3px;
    cursor: pointer;
    box-sizing: border-box;
    -webkit-user-select: none;
}

.menu-bar {
    display: block;
    width: 18px;
    height: 2px;
    margin: 0 auto;
    margin-bottom: 3px;
    background: #333;
    -webkit-transform-origin: center;
    transition: all 300ms cubic-bezier(0.55, 0, 0.1, 1);
}

.menu-icon[active] .menu-bar {
    opacity: 0;
}

.menu-icon[active] .menu-bar:first-child {
    -webkit-transform: rotate(45deg) translate(2px, 2px);
    margin-top: 4px;
    opacity: 1;
}

.menu-icon[active] .menu-bar:last-child {
    -webkit-transform: rotate(-45deg) translate(5px, -5px);
    opacity: 1;
}

.absolute-bottom-right {
    position: fixed;
    right: 16px;
    bottom: 16px;
    z-index: 10;
}

.fab-top-right {
    position: absolute;
    right: 32px;
    bottom: -28px;
    z-index: 10;
}

iron-icon {
    color: inherit;
}

.gold iron-icon,
.gold {
    color: goldenrod;
}

p a {
    text-transform: none;
    font-weight: normal;
    color: #2196F3;
}

li p {
    margin: 0;
}

aside {
    margin: 40px;
    padding: 20px 40px;
    background-color: #fafafa;
    border: 1px solid #e5e5e5;
}

mist-list {
    --mist-list-error-color: var(--error-color);
    --mist-list-red-color: var(--red-color);
    --mist-list-orange-color: var(--orange-color);
    --mist-list-green-color: var(--green-color);
    --mist-list-link-color: var(--mist-blue);
    --mist-list-tag-mixin: {
        display: inline-block;
        background-color: #888;
        color: #fff;
        font-size: 14px;
        padding: 0 0.5em;
        margin: 0 1px;
        border-radius: 2px;
        letter-spacing: .4px;
        font-weight: 500 !important;
        word-break: break-all;
        max-width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    };
}

mist-list-actions {
    fill: var(--mist-list-actions-fill-color);
}

paper-material {
    background-color: #fff;
}

paper-button.blue {
    background-color: #2196F3;
    color: #fff;
    font-weight: 400;
}

paper-button.blue>* {
    color: #fff;
}

paper-button[disabled] {
    background: #eaeaea;
    color: #a8a8a8;
}

paper-button.blue[disabled]>*,
paper-button[disabled]>* {
    color: #a8a8a8;
}

paper-button.blue>* {
    color: #fff;
}

paper-button.blue-link {
    background-color: transparent;
    color: #039BE5;
    font-weight: 500;
}

paper-button>iron-icon,
paper-icon-button>iron-icon {
    color: inherit;
}

iron-dropdown paper-material {
    width: 191px;
    top: 57px !important;
}

.focused-line.paper-input-container {
    background-color: #0099cc !important;
    /*var(--mist-blue);*/
}

.input-content.label-is-floating.paper-input-container label {
    color: #0099cc !important;
    /*var(--mist-blue);*/
}

.info-teble table {
    table-layout: fixed;
}

.info-table tr td {
    width: 50%;
    padding: 16px;
    border-bottom: 1px solid #eeedeb;
    font-size: 14px;
    overflow: hidden !important;
    word-break: break-all !important;
    word-wrap: break-word !important;
    white-space: normal !important;
    min-width: 150px;
}



/* Info Card */

.info-card {
    display: block;
    margin-bottom: 20px;
}

.info-card h2 {
    padding: 16px;
}

.info-card .title-text {
    color: #474747 !important;
    background: #eeedeb;
    background: -moz-linear-gradient(top, #eeedeb 0%, #d4d4d4 100%);
    background: -webkit-linear-gradient(top, #eeedeb 0%, #d4d4d4 100%);
    background: linear-gradient(to bottom, #eeedeb 0%, #d4d4d4 100%);
    border-bottom: 2px solid #7f7f7f;
    font-size: 18px !important;
    text-transform: uppercase;
}

.info-card .card-content {
    padding: 0;
}



/* Info Table */

.info-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}

.info-table .info-table-divider {
    background-color: #eeedeb;
}

.info-table tr td {
    width: 50%;
    padding: 16px;
    border-bottom: 1px solid #eeedeb;
    font-size: 14px;
}

.info-table tr td:first-child {
    font-weight: 500;
}

.info-table tr:nth-of-type(2n) {
    background-color: #f2f2f2;
}

.info-table tr:last-child td {
    border: none;
}
/* END OF main.css */
        [hidden] {
            display: none !important;
        }

        .wrap {
            flex-wrap: wrap;
        }

        .flex,
        .layout.horizontal {
            display: flex;
            flex-direction: row;
        }

        .flex-1 {
            display: flex;
            flex: 1 100%;
        }

        .layout.horizontal.center {
            align-items: center;
        }

        .green {
            background-color: var(--green-color);
            color: #fff;
        }

        .red {
            background-color: var(--red-color);
            color: #fff;
        }

        .red[disabled] {
            background-color: #eaeaea;
            color: #a8a8a8;
        }

        .orange {
            background-color: var(--orange-color);
            color: #444;
        }

        .blue {
            background-color: var(--mist-blue);
            color: #fff;
        }

        .blue[disabled] {
            background-color: #eaeaea;
            color: #a8a8a8;
        }

        .on-dark.blue[disabled] {
            background-color: rgba(255, 255, 255, 0.15);
        }

        .mist-dark {
            background-color: var(--mist-dark-color);
            color: #fff;
        }

        .mist-light {
            background-color: var(--mist-light-color);
            color: #444;
        }

        .mist-lighter {
            background-color: var(--mist-lighter-color);
            color: #444;
        }

        .mist-blue {
            background-color: var(--mist-blue);
            color: #fff;
        }

        .gray-dark {
            background-color: var(--gray-dark-color);
            color: #444;
        }

        .gray-light {
            background-color: var(--gray-light-color);
            color: #444;
        }

        .page-title {
            @apply --paper-font-display2;
        }

        paper-listbox a>*,
        paper-listbox paper-item>*,
        paper-listbox paper-icon-item>* {
            pointer-events: none;
        }

        paper-dialog paper-button {
            margin-top: 0;
        }

        paper-card {
            display: block;
        }

        paper-material,
        paper-card {
            padding-bottom: 8px;
        }

        paper-material>h2,
        paper-material>p,
        paper-card>h2,
        paper-card>p {
            padding: 16px;
            font-weight: 400;
        }

        paper-material.form {
            max-width: 940px;
            margin-left: auto;
            margin-right: auto;
        }

        paper-material.form>h2 {
            padding: 0 0 16px 0;
        }

        .top-actions {
            position: absolute;
            top: 16px;
            right: 16px;
        }

        .bottom-actions {
            padding-bottom: 16px;
            margin-top: 16px;
        }

        paper-dialog {
            padding: 0;
        }

        paper-button.blue[disabled] {
            margin: 0;
            padding: 12px 22px;
        }

        paper-card paper-button:not([disabled]),
        paper-material paper-button:not([disabled]),
        paper-button.blue:not([disabled]) {
            background-color: var(--mist-blue);
            font-weight: 500;
            color: var(--paper-button-text, #fff);
            margin: 0;
            padding: 12px 22px;
        }

        paper-button.blue:not([disabled]) {
            flex: none;
            line-height: 1.4em;
        }

        paper-button.smaller {
            font-size: .9em;
            padding: 8px 12px;
        }

        paper-button.blue-link {
            background-color: transparent !important;
            font-weight: 400;
            color: var(--mist-blue) !important;
        }

        paper-material paper-button.simple {
            color: inherit;
            background-color: transparent;
            vertical-align: baseline;
        }

        paper-material paper-button.simple.white {
            color: inherit;
            background-color: #fff;
            padding-left: 24px;
            padding-right: 24px;
            margin-left: 8px;
        }

        paper-radio-button {
            --paper-radio-button-checked-color: var(--mist-blue);
            --paper-radio-button-checked-ink-color: var(--mist-blue);
            --paper-radio-button-unchecked-ink-color: var(--mist-blue);
        }

        .notifications>* {
            color: #fff;
            padding: 8px;
            margin: 16px 0;
        }

         :host>::slotted(.focused-line.paper-input-container) {
            background-color: var(--mist-blue);
        }

         :host>::slotted(.input-content.label-is-floating.paper-input-container label) {
            /*color: rgba(0, 0, 0, 0.54);*/
            text-transform: uppercase;
        }

        /* Courrier font */

        .monospace {
            font-family: monospace;
        }

        .page {
            display: block;
        }

        .page-block {
            width: 100%;
            padding-right: 24px;
        }

        .smallcaps {
            text-transform: uppercase;
            font-size: 14px;
            opacity: 0.54;
            line-height: inherit;
        }

        .inline {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            align-self: center;
        }

        .no-pad {
            padding: 0;
        }

        .pad-left {
            padding-left: 8px;
        }

        .pad-right {
            padding-right: 8px;
        }

        .pad1 {
            padding-right: 8px;
            padding-left: 8px;
        }

        .pad2 {
            padding-right: 16px;
            padding-left: 16px;
        }

        .pad-left2 {
            padding-left: 16px;
        }

        .pad-right2 {
            padding-right: 16px;
        }

        .blue-link {
            color: var(--mist-blue);
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .opaque54,
        .micon {
            opacity: 0.54;
        }

        .micon {
            float: left;
        }

        .micon-wrap {
            display: inline;
            vertical-align: baseline;
        }

        paper-fab {
            background: var(--mist-blue);
            color: var(--paper-fab-color, #fff);
        }
        /* Paper progress */

        paper-progress {
            --paper-progress-active-color: var(--mist-blue);
        }
        /* paper header */

        .paper-header [paper-drawer-toggle] {
            margin-left: 10px;
        }

        .paper-header {
            /*@apply --layout-horizontal;
            @apply --layout-center;*/
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .paper-header h2 {
            margin-left: 20px;
            /*@apply --layout-flex;*/
            display: flex;
            text-transform: capitalize;
        }

        .paper-header .toggleViewButton {
            --paper-icon-button-ink-color: transparent;
        }

        .paper-header .cartButton {
            margin-right: 10px;
        }

        .is-loading {
            top: 70px;
            left: 200px;
            position: fixed;
            right: 0;
            bottom: 0;
            display: block;
            height: 100vh;
            background-color: #eee;
        }

        .is-loading paper-spinner {
            width: 80px;
            height: 80px;
            margin: 10% auto;
            display: block;
        }

        paper-material.resource-description {
            line-height: 1.7em;
            font-size: .9em
        }

        @media (max-width: 600px) {
            #content {
                --single-pages-content-padding: 0;
            }
        }

        </style>
    </custom-style>
    </template>
</dom-module><dom-module id="tags-and-labels">
    <template>
        <style>
        .label>span {
            padding-right: 10px;
            color: #fff;
            font-size: 14px;
        }

        .label:not(.reverse) {
            padding-left: 16px;
        }

        .label:not(.reverse)>span {
            padding: 0.3em 0.57em;
            border-radius: 2px;
            font-weight: 700;
            cursor: inherit;
        }

        .label:not(.reverse) .unknown {
            background-color: var(--gray-light-color);
            color: rgba(0, 0, 0, 0.82);
        }

        .label:not(.reverse) .running {
            background-color: var(--green-color);
        }

        .label:not(.reverse) .terminated {
            background-color: var(--mist-dark-color);
        }

        .label:not(.reverse) .stopped {
            background-color: var(--orange-color);
        }

        .label:not(.reverse) .error {
            background-color: var(--red-color);
        }

        .label.reverse .unknown,
        {
            color: var(--mist-light-color);
            background-color: transparent;
        }

        .label.reverse .running,
        .running {
            color: var(--green-color);
            background-color: transparent;
        }

        .label.reverse .terminated,
        .terminated {
            color: var(--mist-dark-color);
            background-color: transparent;
        }

        .label.reverse .stopped,
        .stopped {
            color: var(--orange-color);
            background-color: transparent;
        }

        .label.reverse .error,
        .error {
            color: var(--red-color);
            background-color: transparent;
        }

        .tag {
            display: inline-block;
            background-color: #888;
            color: #fff;
            font-size: 14px;
            padding: 0 0.5em;
            margin: 0 1px;
            border-radius: 2px;
            letter-spacing: .4px;
            font-weight: 500 !important;
            word-break: break-all;
            max-width: 250px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        </style>
    </template>
</dom-module><dom-module id="headings">
    <template>
        <style>
        .app-title {
            color: #fff;
            text-transform: uppercase;
            text-align: center;
            background-color: var(--mist-dark-color);
            border-bottom: 4px solid #37474F;
            text-align: center;
            padding-top: 4px;
            margin: 0;
            font-weight: 400;
            letter-spacing: 1px;
        }

        .app-title-light {
            color: var(--mist-dark-color);
            background-color: var(--mist-light-color);
            padding: 2px 16px 0 16px;
            border-bottom: 4px solid #90A4AE;
        }

        .app-title-lighter {
            color: var(--mist-dark-color);
            background-color: var(--mist-very-light-color);
            padding: 2px 16px 0 16px;
            border-bottom: 4px solid #CFD8DC;
        }
        </style>
    </template>
</dom-module><dom-module id="lists">
    <template>
        <style>
        .check {
            border: 1px solid #ddd;
        }
        /* none of the two below works */

        paper-input>::slotted(div[pseudo="-webkit-search-cancel-button"]) {
            opacity: 0 !important;
            display: none !important;
        }

        key-item-element::slotted(.paper-item:focus:before) {
            background-color: none !important;
            opacity: 0 !important;
        }

        .list-head {
            box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06), 0 2px 0 rgba(0, 0, 0, 0.075), 0 3px 0 rgba(0, 0, 0, 0.05), 0 4px 0 rgba(0, 0, 0, 0.015);
            background-color: #f2f2f2;
            border-bottom: 1px solid #e5e5e5;
            padding: 0 16px;
            font-weight: 400;
            font-size: 0.9em;
            color: inherit;
            position: relative;
            z-index: 2;
        }

        .list-head>* {
            padding: 8px 0;
            line-height: 43px;
        }

         ::slotted(paper-item) {
            padding: 8px 16px;
            border-bottom: 1px solid #ddd;
            min-height: inherit;
            cursor: pointer;
            font-size: 15px;
        }

         ::slotted(paper-item .name) {
            font-weight: 500;
        }

         ::slotted(paper-item paper-checkbox[disabled]~.name) {
            opacity: 0.54;
            font-weight: 400;
        }

        .row:nth-child(2n+1):hover,
        .row:hover {
            background-color: #eee;
        }

        .list {
            position: relative;
            padding-bottom: 120px;
        }

        .title-text {
            padding: 16px 16px 0 16px;
        }

        .list-options {
            background-color: #dedede;
            /*border-bottom: 1px solid #e5e5e5;*/
            display: flex;
            align-items: baseline;
            position: relative;
        }

        .list-options>.search {
            padding: 8px 8px 8px 16px;
            margin-right: 0;
            background-color: #fff;
            transition: all 200ms;
            background-color: #dedede;
        }

        .list-options>.search.true {
            margin-right: 16px;
            background-color: #fff;
        }

        .list-options paper-icon-button {
            vertical-align: top;
        }

        -webkit-search-cancel-button {
            display: none !important;
        }

        .list-title {
            margin: 0;
            color: #90A4AE;
            font-size: 0.9em;
            font-weight: 500;
            line-height: 40px;
            text-transform: uppercase;
            transition: 200ms color;
        }

        .list-head {
            text-transform: uppercase;
        }

        paper-tooltip {
            text-transform: none;
            font-size: 16px;
        }

        .search {
            display: inline-block;
        }

        .list-options paper-icon-button>::sloted(iron-icon:hover) {
            color: var(--mist-blue);
        }

        .row {
            overflow: hidden;
            background-color: #fff;
        }

        .row-actions {
            position: absolute;
            top: 8px;
            right: 8px;
            z-index: 3;
            display: none;
            transition: 200ms color;
            height: inherit;
        }

        .row:hover .row-actions {
            display: block;
        }
        /* tablet-large */

        @media all and (max-width: 840px) {
            .row .row-actions {
                display: block;
                opacity: 0.32;
            }
        }

        .row .row-actions paper-icon-button:hover {
            color: var(--mist-blue);
        }

        .list-options .label {
            font-size: 0.8em;
            color: inherit;
            padding: 8px 8px 0 0;
            line-height: 25px;
            display: inline-block;
            text-transform: uppercase;
        }

        .list-options paper-input[type='search'] {
            width: 400px;
        }

         ::slotted(iron-collapse.sub-items) {
            border-bottom: 2px solid #ccc;
            background-color: #f6f6f6;
        }

         ::slotted(iron-collapse.sub-items .info-item) {
            padding: 16px 0 16px 46px;
            border-bottom: 1px solid #ccc;
            min-height: inherit;
            opacity: 0.54;
            font-size: 0.9em;
        }

         ::slotted(.active-true) {
            color: #999;
        }

         ::slotted(.session-active) {
            color: #000;
        }

         ::slotted(.revoke) {
            background-color: var(--red-color);
            color: #fff;
            padding: 2px 6px;
        }

        @media screen and (max-width: 425px) {
            #outputs .smallcaps {
                padding: 0 14px
            }
        }
        </style>
    </template>
</dom-module><dom-module id="single-page">
    <template>
        <style>
        /*loadingResource or missingResource*/
         :host([class$="Resource"]) h2,
         :host([class$="Resource"]) h2 iron-icon,
         :host([class$="Resource"]) iron-icon,
         :host([class$="Resource"]) h3,
         :host([class$="Resource"]) h4,
         :host([class$="Resource"]) a,
         :host([class$="Resource"]) .m-info-head,
         :host([class$="Resource"]) .n-info-head,
         :host([class$="Resource"]) .smaller,
         :host([class$="Resource"]) .cost,
         :host([class$="Resource"]) .cell > *,
         :host([class$="Resource"]) .subtitle,
         :host([class$="Resource"]) .resource-description>div,
         :host([class$="Resource"]) .info-item {
            color: transparent !important;
            font-size: 16px;
        }

         :host([class$="Resource"]) h2,
         :host([class$="Resource"]) h3,
         :host([class$="Resource"]) .subtitle>span {
            background-color: rgba(255, 255, 255, 0.5);
            min-height: 1em;
            width: 100%;
        }

         :host([class$="Resource"]) h4,
         :host([class$="Resource"]) .m-info-head,
         :host([class$="Resource"]) .n-info-head,
         :host([class$="Resource"]) .smaller,
         :host([class$="Resource"]) .cell > * {
            background-color: rgba(0, 0, 0, 0.1);
            height: 20px;
            vertical-align: middle;
            margin-right: 4px;
        }

         :host([class$="Resource"]) paper-button,
         :host([class$="Resource"]) paper-toggle-button,
         :host([class$="Resource"]) schedule-date,
         :host([class$="Resource"]) team-policy,
         :host([class$="Resource"]) .flex > span,
         :host([class$="Resource"]) .sub,
         :host([class$="Resource"]) .page-block {
            display: none !important;
        }

        :host .missing,
        :host .loading {
            padding: 5px 0;
            color: #fff;
            font-weight: 500;
            text-align: center;
            width: 100%;
        }

        :host .missing {
            background-color: var(--red-color);
        }

        :host .loading {
            background-color: var(--green-color);
        }

        #content {
            -webkit-overflow-scrolling: touch;
            max-width: 1500px;
            margin: 0px auto;
            overflow: visible;
            padding: var(--single-pages-content-padding);
            background-color: var(--base-background-color);
        }

        .paper-toolbar .title {
            pointer-events: all;
        }

        .info-head>* {
            font-weight: 700;
            padding: 16px 0;
        }

        .info-head {
            border-bottom: 1px solid #7f7f7f;
        }

        paper-material.single-head,
        .single-head {
            min-height: 108px;
            padding: 24px;
            box-align: center;
            align-items: center;
            border-radius: 4px 4px 0 0;
            box-sizing: border-box;
            display: flex !important;
        }

        .single-head .icon {
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 0.018em;
            line-height: 24px;
        }

        .single-head .icon iron-icon {
            border-radius: 50%;
            box-sizing: border-box;
            margin-top: 0;
            position: relative;
            flex: 0 0 auto;
            height: 60px;
            width: 60px;
            background-color: var(--single-page-header-icon-background-color);
            padding: 8px;
        }

        .single-head iron-icon {
            color: #fff;
        }

        .single-head .title {
            flex-wrap: wrap;
            text-align: left;
            margin-left: 24px;
            overflow: visible;
            flex: 1;
            color: var(--header-color);
        }

        .single-head .title h2 {
            font-size: 1.5em;
            line-height: initial;
        }

        .single-head .subtitle {
            flex: 1 100%;
        }

        .subtitle .sub {
            padding-right: 16px;
        }

        .subtitle .desc {
            opacity: 0.54;
            font-size: 0.9em;
        }

        .subtitle a {
            color: inherit;
        }

        .single-head .item-actions {
            display: inline-block;
            flex: 0 0 auto;
            color: #fff;
        }

        .item-actions>* {
            vertical-align: middle;
        }

        .item-actions>paper-button.left-icon iron-icon {
            padding-right: 8px;
        }

        .item-actions>paper-button.right-icon iron-icon {
            padding-left: 8px;
        }

        .single-head .item-actions ::slotted(iron-icon) {
            color: #fff;
            /*display: inline-block;*/
            vertical-align: bottom;
        }

        .subhead {
            background-color: #dedede;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            align-items: baseline;
            padding: 16px 24px;
            line-height: 20px;
            font-size: 13px;
            position: relative;
        }

        .subhead h5 {
            margin-top: 0;
            margin-bottom: 0;
        }

        .info-body .info-item {
            border-bottom: 1px solid #d4d4d4;
            padding: 16px 0;
            min-height: inherit;
        }

        .info-body .sub-items .info-item {
            color: #7f7f7f;
        }

        .info-body .info-item iron-icon {
            margin-right: 10px;
        }

        .info-body .info-item.even {
            background-color: #f2f2f2;
        }

        .info-body .info-item.last {
            border: none;
        }
        /* Table Basic Styling */

        .info-table .info-item .flexchild:first-of-type {
            font-weight: 700;
        }

        .info-table .info-group .info-item:nth-of-type(2n) {
            background-color: #f2f2f2;
        }

        .info-table .info-group .info-item:last-of-type {
            border: none;
        }

        .info-group .info-item .flexchild:first-of-type {
            font-weight: 700;
        }

        .info-group .info-item:nth-of-type(2n) {
            background-color: #f2f2f2;
        }

        .info-group .info-item:last-of-type {
            border: none;
        }

        .info-group .info-item {
            border-bottom: 1px solid #d4d4d4;
            padding: 16px 8px;
            min-height: inherit;
        }

        mist-list {
            width: 100%;
            padding: 0;
            margin: 0;
            height: 600px;
            font-size: 75%;
            --row-height: 48px;
        }

        @media screen and (max-width: 600px) {
            paper-material.single-head,
            .single-head {
                padding: 16px
            }
        }
        </style>
    </template>
</dom-module><dom-module id="forms">
    <template>
        <style>
         :host {
        }

         :host([focused]) {
            outline: none;
        }

        paper-material.form {
            background-color: #fff;
            padding: 24px;
        }

         :host::slotted(form paper-button) {
            background-color: var(--mist-blue);
            color: #fff;
            margin: 0;
            /*@apply --layout-flex;*/
            display: flex;
        }

         ::slotted(paper-button) {
            font-weight: 400;
            padding: 0.8em 1.57em 0.7em 1.57em;
        }

         ::slotted(form paper-listbox>paper-button) {
            margin: 8px;
        }

         ::slotted(form paper-button>*) {
            color: #fff;
        }

         :host paper-button[disabled] {
            background-color: #eaeaea;
            color: #a8a8a8;
            cursor: not-allowed;
            margin-left: 0;
        }

         :host paper-button.simple-button[disabled] {
            background-color: inherit;
            color: inherit;
            opacity: 0.54;
            cursor: not-allowed;
        }

        :host paper-button.simple-button {
            margin: 0;
            padding: 0;
        }

         hr,
         ::slotted(hr) {
            height: 0;
            border-bottom: 1px solid #eee;
            background: transparent;
            border-width: 0 0 1px 0;
            margin: 32px 0 8px 0;
        }

         hr.appform,
         ::slotted(hr.appform) {
            margin: 0;
            opacity: 0.3;
        }

        paper-material>h2 {
            margin: 0;
            height: 36px;
            line-height: 36px;
            padding-left: 0;
        }

         ::slotted(paper-item:hover) {
            background-color: var(--mist-lighter-color);
        }

        paper-dropdown-menu::slotted(paper-item:last-of-type) {
            border-bottom: 0 none;
        }

        paper-dropdown-menu[no-label-float]::slotted(.dropdown-content) {
            top: 0 !important;
        }

        paper-textarea.like-editor>::slotted(textarea) {
            color: #fff !important;
            padding: 2px !important;
            padding: 4px 8px !important;
            font-size: 0.9em !important;
            font-family: monospace !important;
        }

        paper-textarea.like-editor>::slotted(iron-autogrow-textarea) {
            background-color: var(--mist-dark-color);
        }

        .field-helptext {
            font-size: 14px;
            align-self: center;
            color: rgba(0, 0, 0, 0.54);
        }

        [focused]+.field-helptext {
            font-size: 14px;
            align-self: center;
            color: rgba(0, 0, 0, 0.87);
        }

        hr.hr-equal {
            margin: 32px 0;
        }
        </style>
    </template>
</dom-module><dom-module id="dialogs">
    <template>
        <style>
        paper-listbox,
        paper-dropdown-menu {
            width: 100%;
        }

        paper-dialog {
            width: 300px;
        }

        paper-dialog-scrollable {
          margin: 0;
        }

        paper-dialog-scrollable p {
            margin: 0;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.54);
        }

        paper-dialog paper-icon-button.close {
            position: absolute;
            margin: 0;
            top: 15px;
            right: 16px;
        }

        paper-button {
            margin-left: 0;
        }

        .btn-group {
            display: flex;
            justify-content: flex-end;
            margin: 16px 0;
        }

        </style>
    </template>
</dom-module><dom-module id="info-table-style">
    <template>
        <style>
        /* Info Card */

        .info-card {
            display: block;
        }

        .info-card .title-text {
            border-bottom: 2px solid #7f7f7f;
            font-size: 18px !important;
            text-transform: uppercase;
        }

        .info-card .card-content {
            padding: 0;
        }
        /* Info Table */

        .info-table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
        }

        .info-table .info-table-divider {
            background-color: #eeedeb;
        }

        .info-teble table {
            table-layout: fixed;
        }

        .info-table tr td {
            width: 50%;
            padding: 16px;
            border-bottom: 1px solid #eeedeb;
            font-size: 14px;
            overflow: hidden !important;
            word-break: break-all !important;
            word-wrap: break-word !important;
            white-space: normal !important;
        }

        .info-table tr td:first-child {
            font-weight: 500;
        }

        .info-table tr:nth-of-type(2n) {
            background-color: #f2f2f2;
        }

        .info-table tr:last-child td {
            border: none;
        }
        </style>
    </template>
</dom-module><dom-module id="mist-dialog" theme-for="vaadin-dialog-overlay">
    <template>
        <style include="shared-styles">
            :host [part~="backdrop"]{
                background-color: rgba(0,0,0,0.6);
            }
            :host [part~="overlay"] {
                border-radius: 0;
                font-family: 'Roboto', 'Noto', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
            :host [part~="content"] {
                padding: 1px 25px;
                max-width: 450px;
            }
        </style>
    </template>
</dom-module>`;

document.head.appendChild(documentContainer.content);

/* shared styles for all elements and index.html */
/* vaadin-dialog style */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
