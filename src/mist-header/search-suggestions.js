import '../../node_modules/@polymer/polymer/polymer-legacy.js';
import '../../node_modules/@polymer/paper-styles/typography.js';
import { Polymer } from '../../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../node_modules/@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style include="shared-styles">
      :host {
        display: none;
        background-color: #fff;
        /*min-width: 320px;
            max-width: 800px;*/
        position: absolute;
        height: auto;
        max-height: calc(100vh - 90px);
        top: 100%;
        @apply --shadow-elevation-4dp;
        color: rgba(0, 0, 0, 0.87);
        padding: 8px 16px 16px 16px;
        overflow-x: hidden;
        overflow-y: auto;
        z-index: 99;
      }

      :host([visible]) {
        display: block;
      }

      h2,
      p {
        line-height: 1.5em;
        margin-bottom: 8px;
        margin-top: 8px;
        font-size: 16px;
      }

      h2 {
        font-weight: bold;
      }

      a {
        font-size: 16px;
      }

      .truncate {
        width: inherit;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 6px 0;
      }

      .section {
        padding-left: 2rem;
        padding-right: 2rem;
      }

      .section ul {
        padding: 0;
        margin: 8px 0;
      }

      a.more {
        color: var(--blue-color);
        margin-top: 4px;
        display: inline-block;
      }

      li iron-icon {
        width: 16px !important;
        height: 16px !important;
        opacity: 0.32;
      }
    </style>
    <div class="sections grid-row">
      <div class="section xs12" hidden$="[[resultsExist]]">
        <h2>0 results found for this search.</h2>
      </div>
      <div class="section xs6" hidden$="[[!results.cloudsArray.length]]">
        <h2>Clouds</h2>
        <ul>
          <template is="dom-repeat" items="[[results.cloudsArray]]">
            <li class="truncate">
              <iron-icon icon="cloud"></iron-icon>
              <a href="/clouds/[[item.id]]" on-tap="closeSuggestions"
                >[[item.title]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/clouds">
            [[_displayViewResultsText(results.cloudsArrayFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.machines.length]]">
        <h2>Machines</h2>
        <ul>
          <template is="dom-repeat" items="[[results.machines]]">
            <li class="truncate">
              <iron-icon icon="hardware:computer"></iron-icon>
              <a href="/machines/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/machines">
            [[_displayViewResultsText(results.machinesFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.imagesArray.length]]">
        <h2>Images</h2>
        <ul>
          <template is="dom-repeat" items="[[results.imagesArray]]">
            <li class="truncate">
              <iron-icon icon="image:photo"></iron-icon>
              <a href="/images/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/images">
            [[_displayViewResultsText(results.imagesArrayFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.keysArray.length]]">
        <h2>Keys</h2>
        <ul>
          <template is="dom-repeat" items="[[results.keysArray]]">
            <li class="truncate">
              <iron-icon icon="communication:vpn-key"></iron-icon>
              <a href="/keys/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/keys">
            [[_displayViewResultsText(results.keysArrayFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.networks.length]]">
        <h2>Networks</h2>
        <ul>
          <template is="dom-repeat" items="[[results.networks]]">
            <li class="truncate">
              <iron-icon icon="hardware:device-hub"></iron-icon>
              <a href="/networks/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/networks">
            [[_displayViewResultsText(results.networksFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.tunnelsArray.length]]">
        <h2>Tunnels</h2>
        <ul>
          <template is="dom-repeat" items="[[results.tunnelsArray]]">
            <li class="truncate">
              <iron-icon icon="editor:merge-type"></iron-icon>
              <a href="/tunnels/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/tunnels">
            [[_displayViewResultsText(results.tunnelsArrayFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.scriptsArray.length]]">
        <h2>Scripts</h2>
        <ul>
          <template is="dom-repeat" items="[[results.scriptsArray]]">
            <li class="truncate">
              <iron-icon icon="image:movie-creation"></iron-icon>
              <a href="/scripts/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/scripts">
            [[_displayViewResultsText(results.scriptsArrayFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.schedulesArray.length]]">
        <h2>Schedules</h2>
        <ul>
          <template is="dom-repeat" items="[[results.schedulesArray]]">
            <li class="truncate">
              <iron-icon icon="schedule"></iron-icon>
              <a href="/schedules/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/schedules">
            [[_displayViewResultsText(results.schedulesArrayFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.templatesArray.length]]">
        <h2>Templates</h2>
        <ul>
          <template is="dom-repeat" items="[[results.templatesArray]]">
            <li class="truncate">
              <iron-icon icon="av:art-track"></iron-icon>
              <a href="/templates/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/templates">
            [[_displayViewResultsText(results.templatesArrayFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.stacksArray.length]]">
        <h2>Stacks</h2>
        <ul>
          <template is="dom-repeat" items="[[results.stacksArray]]">
            <li class="truncate">
              <iron-icon icon="maps:layers"></iron-icon>
              <a href="/stacks/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/stacks">
            [[_displayViewResultsText(results.stacksArrayFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.teamsArray.length]]">
        <h2>Teams</h2>
        <ul>
          <template is="dom-repeat" items="[[results.teamsArray]]">
            <li class="truncate">
              <iron-icon icon="social:people"></iron-icon>
              <a href="/teams/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
          <a class="more" on-tap="goToResultsList" href="/teams">
            [[_displayViewResultsText(results.teamsArrayFullLength)]]
          </a>
        </ul>
      </div>
      <div class="section xs6" hidden$="[[!results.membersArray.length]]">
        <h2>Members</h2>
        <ul>
          <template is="dom-repeat" items="[[results.membersArray]]">
            <li class="truncate">
              <iron-icon icon="social:person"></iron-icon>
              <a href="/members/[[item.id]]" on-tap="closeSuggestions"
                >[[item.name]]</a
              >
            </li>
          </template>
        </ul>
      </div>
    </div>
  `,

  is: 'search-suggestions',

  properties: {
    query: {
      type: String,
    },
    model: {
      type: Object,
    },
    results: {
      type: Object,
    },
    visible: {
      type: Boolean,
      reflectToAttribute: true,
      value: false,
      notify: true,
    },
    resultsExist: {
      type: Boolean,
      value: false,
    },
    hide: {
      type: Boolean,
    },
    width: {
      type: Number,
    },
  },

  observers: [
    'queryChanged(query)',
    'resultsChanged(results)',
    'viewingListsChanged(hide)',
    'widthChanged(width)',
  ],

  listeners: {
    tap: 'closeIfClickedElsewhere',
  },

  attached() {
    this.style.width = '100%';
  },

  widthChanged(w) {
    this.style.width = `${w}px`;
  },

  queryChanged(_query) {
    if (this.query && this.query.length > 2) {
      const results = {};
      if (this.model) {
        for (const prop of Object.keys(this.model)) {
          let result = '';
          if (
            prop.endsWith('Array') &&
            this.model[prop].constructor === Array
          ) {
            result = this.filterItems(this.model[prop]);
          } else if (['machines', 'networks', 'volumes'].indexOf(prop) > -1) {
            result = this.filterItems(Object.values(this.model[prop]));
          }
          if (result) {
            results[`${prop}FullLength`] = result.length;
            results[prop] = result.splice(0, 3);
          }
        }
      }
      this.set('results', results);
      if (!this.hide) this.set('visible', true);
    } else {
      this.set('results', {});
    }
  },

  resultsChanged(_results) {
    if (!this.query || this.query === undefined || this.query.length <= 2) {
      this.set('visible', false);
      this.set('resultsExist', false);
    } else {
      let rlen = 0;
      if (this.results) {
        Object.keys(this.results).forEach(prop => {
          if (this.results[prop].length > 0) {
            rlen += this.results[prop].length;
          }
        });
      }
      this.set('resultsExist', rlen > 0);
      if (!this.hide) this.set('visible', true);
    }
  },

  filterItems(items) {
    if (items && items.filter && this.query && this.query.length > 0)
      return items.filter(this.filterItem.bind(this));
    return false;
  },

  filterItem(item, _index) {
    let q = this.query || '';
    const filterOwner = q.indexOf('owner:') > -1;
    const ownerRegex = /owner:(\S*)\s?/;
    const owner = ownerRegex.exec(q) && ownerRegex.exec(q)[1];
    let str;

    if (filterOwner && owner && owner.length) {
      q = q.replace('owner:', '').replace(`${owner}`, '');

      if (owner === '$me') {
        if (!item || !item.owned_by || item.owned_by !== this.model.user.id)
          return false;
      } else {
        const ownerObj =
          this.model &&
          this.model.membersArray &&
          this.model.membersArray.find(m => {
            return [m.name, m.email, m.username, m.id].indexOf(owner) > -1;
          });
        if (!ownerObj || !item.owned_by || item.owned_by !== ownerObj.id)
          return false;
      }
    }

    const queryTerms = q.split(' ');
    str = JSON.stringify(item);
    if (
      this.model &&
      this.model.clouds &&
      item &&
      item.cloud &&
      this.model.clouds[item.cloud]
    ) {
      str += `${this.model.clouds[item.cloud].provider}${
        this.model.clouds[item.cloud].title
      }`;
    }

    if (q && q.trim().length > 0) {
      // Check if all terms exist in stringified item
      for (let i = 0; i < queryTerms.length; i++) {
        if (
          queryTerms[i] &&
          queryTerms[i].length &&
          str.toLowerCase().indexOf(queryTerms[i].toLowerCase()) < 0
        ) {
          return false;
        }
      }
    }
    return true;
  },

  goToResultsList(_e) {
    this.set('visible', false);
    const that = this;
    this.async(() => {
      that.fire('search', that.query);
    }, 500);
  },

  viewingListsChanged(_hide) {
    if (this.hide) {
      this.set('visible', false);
    }
  },

  closeSuggestions(_e) {
    this.set('visible', false);
    this.dispatchEvent(
      new CustomEvent('clear-search', { composed: true, bubbles: true })
    );
  },

  _displayViewResultsText(num) {
    return num === 1 ? 'view 1 result' : `view all ${num} results`;
  },
});
