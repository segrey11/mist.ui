import '../../node_modules/@polymer/polymer/polymer-legacy.js';
import '../../node_modules/@polymer/app-layout/app-layout.js';
import '../../node_modules/@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../node_modules/@polymer/paper-styles/typography.js';
import '../../node_modules/@polymer/paper-icon-button/paper-icon-button.js';
import '../../node_modules/@polymer/iron-image/iron-image.js';
import '../../node_modules/@polymer/iron-media-query/iron-media-query.js';
import '../app-user-menu/app-user-menu.js';
import '../notifications/notifications-indicator.js';
import './top-search.js';
import { Polymer } from '../../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../node_modules/@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style include="shared-styles">
      :host {
        position: relative;
      }

      app-toolbar ::slotted(.title) {
        pointer-events: all !important;
      }

      app-toolbar.dark {
        background-color: inherit;
        --paper-toolbar-background: inherit;
        /* color: #fff; */
        width: 100%;
      }

      #header {
        color: var(--header-color);
        /*overflow: hidden;*/
      }

      .logo-and-title {
        padding: 6px 0;
        line-height: 36px;
      }

      app-toolbar::slotted(.title) {
        pointer-events: all !important;
      }

      app-toolbar.dark {
        --paper-toolbar-background: inherit;
        /* color: #fff; */
      }

      paper-icon-button::slotted(iron-icon) {
        color: inherit;
      }

      paper-icon-button[icon='menu'] {
        min-width: 36px;
        margin-right: 16px;
      }

      #header {
        /* color: #fff; */
      }

      .logo-and-title {
        padding: 6px 0;
        line-height: 36px;
      }

      a#logo-link {
        line-height: 56px;
        display: flex;
        width: 80px;
        margin-right: 24px;
      }

      .logo {
        cursor: pointer;
      }

      .logo:focus {
        outline: none;
      }

      .page-title a {
        color: inherit;
      }

      .page-title {
        overflow: hidden;
        font-weight: 500;
        font-size: 20px;
        text-overflow: ellipsis;
        border-left: 1px solid rgba(255, 255, 255, 0.13);
        padding-left: 24px;
        margin-left: 24px;
        white-space: nowrap;
        width: 100px;
        text-transform: capitalize;
        margin: auto;
      }

      .container {
        position: relative;
        margin-left: 32px;
      }

      .container > paper-badge {
        --paper-badge-margin-left: -40px;
        --paper-badge-margin-bottom: -16px;
      }

      iron-image.logo {
        width: 80px;
        height: 36px;
        margin: auto;
      }

      .search {
        margin-right: 48px;
        margin-left: 56px;
        display: flex;
        flex: 1;
      }

      notifications-indicator,
      app-user-menu {
        flex: none;
      }

      @media screen and (max-width: 800px) {
        .search {
          margin-right: 0;
          margin-left: 0;
          flex: 0;
        }
        .logo-and-title {
          flex: 1;
        }
        .page-title {
          flex: 1;
        }
      }

      /* iphone 6 plus*/

      @media screen and (max-width: 450px) {
        a#logo-link {
          display: none;
        }

        .page-title {
          border-left: 0 none;
          padding-left: 0;
          margin-left: 0;
          padding-right: 8px;
        }

        paper-icon-button[icon='menu'] {
          margin-right: 8px !important;
        }

        .logo-and-title {
          flex: 1;
        }
        .page-title {
          flex: 1;
        }
      }

      #logo-link.show-default-logo {
        background-image: var(--logo-image);
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
      }

      :host {
        background-color: var(--base-section-color);
      }

      :host([color='dashboard-section-color']) {
        background-color: var(
          --dashboard-section-color,
          var(--base-section-color)
        );
      }

      :host([color='clouds-section-color']) {
        background-color: var(
          --clouds-section-color,
          var(--base-section-color)
        );
      }

      :host([color='machines-section-color']) {
        background-color: var(
          --machines-section-color,
          var(--base-section-color)
        );
      }

      :host([color='scripts-section-color']) {
        background-color: var(
          --scripts-section-color,
          var(--base-section-color)
        );
      }

      :host([color='keys-section-color']) {
        background-color: var(--keys-section-color, var(--base-section-color));
      }

      :host([color='stacks-section-color']) {
        background-color: var(
          --stacks-section-color,
          var(--base-section-color)
        );
      }

      :host([color='networks-section-color']) {
        background-color: var(
          --networks-section-color,
          var(--base-section-color)
        );
      }

      :host([color='volumes-section-color']) {
        background-color: var(
          --volumes-section-color,
          var(--base-section-color)
        );
      }

      :host([color='tunnels-section-color']) {
        background-color: var(
          --tunnels-section-color,
          var(--base-section-color)
        );
      }

      :host([color='zones-section-color']) {
        background-color: var(--zones-section-color, var(--base-section-color));
      }

      :host([color='images-section-color']) {
        background-color: var(
          --images-section-color,
          var(--base-section-color)
        );
      }

      :host([color='templates-section-color']) {
        background-color: var(
          --templates-section-color,
          var(--base-section-color)
        );
      }

      :host([color='schedules-section-color']) {
        background-color: var(
          --schedules-section-color,
          var(--base-section-color)
        );
      }

      :host([color='teams-section-color']) {
        background-color: var(--teams-section-color, var(--base-section-color));
      }

      :host([color='insights-section-color']) {
        background-color: var(
          --insights-section-color,
          var(--base-section-color)
        );
      }

      :host([color='members-section-color']) {
        background-color: var(
          --members-section-color,
          var(--base-section-color)
        );
      }

      :host([color='incidents-section-color']) {
        background-color: var(
          --incidents-section-color,
          var(--base-section-color)
        );
      }

      :host([color='my-account-section-color']) {
        background-color: var(
          --account-section-color,
          var(--base-section-color)
        );
      }
    </style>
    <app-toolbar id="header" class="dark">
      <paper-icon-button
        icon="menu"
        paper-drawer-toggle=""
        on-tap="toggleSidebar"
        tabindex="0"
      ></paper-icon-button>
      <div class="logo-and-title layout horizontal">
        <a
          id="logo-link"
          class$="[[_showDefaultLogoClass(model.org,model.org.avatar)]] regular"
          href="/"
          on-tap="clearSearch"
        >
          <iron-image
            class="logo"
            src$="[[_computeLogo(model.org)]]"
            sizing="contain"
            fade=""
            alt$="[[portal_name]] Logo"
            tabindex="0"
            hidden$="[[!_computeLogo(model.org)]]"
          ></iron-image>
        </a>
        <span class="page-title">
          <a href$="[[_computeHref(title)]]" class="regular">
            [[count]] [[titleText]]</a
          >
        </span>
      </div>
      <div class="search layout horizontal">
        <top-search
          model="[[model]]"
          tabindex="3"
          viewing-list="[[viewingList]]"
          user-filter="{{query}}"
          ownership="[[ownership]]"
          visible-suggestions="{{visibleSuggestions}}"
          title="[[title]]"
          display-name="{{filterDisplayName}}"
        ></top-search>
      </div>
      <notifications-indicator
        id="mist-notifications"
        notifications="[[model.notificationsArray]]"
        tabindex="5"
      ></notifications-indicator>
      <app-user-menu
        user="[[model.user]]"
        org="[[model.org]]"
        teams="[[_computeUserTeams(model.user, model.teamsArray)]]"
        tabindex="6"
        opened="{{userMenuOpened}}"
      ></app-user-menu>
    </app-toolbar>
    <iron-media-query
      query="(max-width: 800px)"
      query-matches="{{mediaQuerySmall}}"
    ></iron-media-query>
  `,

  is: 'mist-header',

  properties: {
    title: {
      type: String,
      value: '',
    },
    model: {
      type: Object,
    },
    ownership: {
      type: Boolean,
    },
    color: {
      type: String,
      value: 'dashboard',
      reflectToAttribute: true,
    },
    query: {
      type: String,
    },
    viewingList: {
      type: Boolean,
    },
    titleText: {
      type: String,
      computed: '_titleText(title, filterDisplayName, mediaQuerySmall)',
    },
    count: {
      type: Number,
    },
    userMenuOpened: {
      type: Boolean,
      notify: true,
    },
    visibleSuggestions: {
      type: Boolean,
      value: false,
      notify: true,
    },
    filterDisplayName: {
      type: String,
    },
    mediaQuerySmall: {
      type: Boolean,
    },
  },

  observers: ['_pageChanged(title)'],

  _showDefaultLogoClass(org, _avatar) {
    if (!org || !org.avatar || !org.avatar.length) return 'show-default-logo';
    return '';
  },

  _pageChanged(page) {
    console.log('_pageChanged', page);
    this.set('color', `${page}-section-color`);
  },

  _titleText(title, filterDisplayName, mediaQuerySmall) {
    return mediaQuerySmall && filterDisplayName && filterDisplayName.length
      ? filterDisplayName
      : title.replace('my', '').replace('-', ' ');
  },

  toggleSidebar() {
    this.dispatchEvent(
      new CustomEvent('mist-sidebar-toggle', { bubbles: true, composed: true })
    );
  },

  _computeUserTeams(user, teams) {
    if (!user || !teams || !teams.length) {
      return [];
    }
    return teams.filter(t => {
      if (t.members.indexOf(user.id) === -1) return false;
      return true;
    });
  },

  _computeLogo(org) {
    if (!this.model || !this.model.org || !this.model.org.avatar) {
      return false;
    }
    return `/api/v1/avatars/${org.avatar}`;
  },

  clearSearch(_e) {
    this.dispatchEvent(new CustomEvent('clear-search-on-nav'));
  },

  _computeHref(title) {
    console.log('_computeHref', title);
    return title === 'dashboard' ? '/' : `/${title}`;
  },
});
