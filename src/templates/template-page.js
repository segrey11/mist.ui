import '../../node_modules/@polymer/paper-material/paper-material.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-styles/typography.js';
import '../../node_modules/@polymer/paper-progress/paper-progress.js';
import '../../node_modules/@polymer/paper-spinner/paper-spinner.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import '../mist-rules/mist-rules.js';
import { mistRulesBehavior } from '../helpers/mist-rules-behavior.js';
import { mistLogsBehavior } from '../helpers/mist-logs-behavior.js';
import '../helpers/dialog-element.js';
import { mistLoadingBehavior } from '../helpers/mist-loading-behavior.js';
import '../app-togglable/app-togglable-list.js';
import '../tags/tags-list.js';
import './template-stack-item.js';
import './template-actions.js';
import moment from '../../node_modules/moment/src/moment.js';
import { Polymer } from '../../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../node_modules/@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style include="shared-styles lists single-page tags-and-labels">
      paper-material {
        display: block;
        padding: 24px;
      }

      paper-material.no-pad {
        padding: 0;
      }

      paper-menu-button paper-button {
        display: block;
      }

      .flex-horizontal-with-ratios {
        @apply --layout-horizontal;
        align-content: stretch;
      }

      .flexchild {
        @apply --layout-flex;
      }

      .command-container {
        background-color: #444;
        color: #fff;
        font-family: monospace;
        padding: 10px;
      }

      a {
        color: black;
        text-decoration: none;
      }

      #container {
        background: #fafafa;
      }

      .paper-header [paper-drawer-toggle] {
        margin-left: 10px;
      }

      .paper-header {
        @apply --layout-horizontal;
      }

      .paper-header {
        height: 60px;
        font-size: 24px;
        line-height: 60px;
        padding: 0 10px;
        color: white;
        transition: height 0.2s;
        transition: font-size 0.2s;
      }

      .paper-header.tall {
        height: 320px;
        font-size: 16px;
      }

      .paper-header h2 {
        margin-left: 20px;
        @apply --layout-flex;
        text-transform: capitalize;
      }

      .paper-header .toggleViewButton {
        --paper-icon-button-ink-color: transparent;
      }

      .paper-header .cartButton {
        margin-right: 10px;
      }

      #content {
        -webkit-overflow-scrolling: touch;
      }

      paper-icon-button {
        transition: all 200ms;
      }

      [size='xs'] > * {
        display: none;
      }

      [size='xs'] mist-sidebar {
        min-width: 100%;
        height: auto;
      }

      paper-icon-bottom.bottom {
        padding-right: 8px;
      }

      .subhead {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        left: 0;
        height: 57px;
        bottom: -57px;
        right: 0;
        z-index: 9;
        color: rgba(0, 0, 0, 0.87);
      }

      .parsing-loader {
        text-align: center;
        padding: 36px;
      }

      .parsing-loader paper-progress {
        width: 100%;
      }

      .parsing-loader.error paper-progress::slotted(#primaryProgress) {
        background-color: var(--red-color);
      }

      .section {
        margin-top: 24px;
        margin-bottom: 24px;
      }

      .red {
        color: var(--red-color);
        background-color: transparent;
      }

      .required {
        font-size: 0.9em;
      }

      .resource-head {
        font-weight: 500;
        padding: 8px 16px;
        opacity: 0.87;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        margin-bottom: 0;
      }

      .width100 {
        width: 100%;
      }
      .is-loading {
        top: 15px;
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
      @media screen and (max-width: 425px) {
        .section > .smallcaps,
        .section > p {
          padding: 0 14px;
        }
      }
      .tag {
        padding: 0.5em;
        display: inline;
      }
      .single-head {
        @apply --template-page-head-mixin;
      }
      template-actions {
        width: 50%;
      }
    </style>

    <div id="content">
      <paper-material class="single-head layout horizontal">
        <span class="icon"
          ><iron-icon icon="[[section.icon]]"></iron-icon
        ></span>
        <div class="title flex">
          <h2>[[template.name]]</h2>
          <div class="subtitle">
            <span hidden$="[[!isInline]]">Inline Template</span>
            <span hidden$="[[isInline]]">
              Script source
              <a href$="[[template.template]]" target="_blank" class="regular"
                ><iron-icon icon="icons:link"></iron-icon
              ></a>
            </span>
          </div>
        </div>
        <template-actions
          id="templateActions"
          org="[[model.org]]"
          items="[[itemArray]]"
          actions="{{actions}}"
          user="[[model.user.id]]"
          members="[[model.membersArray]]"
          in-single-view=""
        ></template-actions>
      </paper-material>
      <paper-material class="parsing-loader" hidden$="[[hideprogress]]">
        <h3>Parsing template [[template.name]]</h3>
        <paper-progress id="progress" value="30"></paper-progress>
        <h4>Fetching template metadata may take a while.</h4>
        <a href="/add-template" class="regular blue-link">Cancel Task</a>
      </paper-material>

      <paper-material class="flex-horizontal-with-ratios">
        <div class="missing" hidden$="[[!isMissing]]">Template not found.</div>
        <div class="page-block" hidden$="[[!template.description.length]]">
          <h3 class="smallcaps">Description</h3>
          <p>[[template.description]]</p>
        </div>
        <div class="page-block" hidden$="[[!template.created_at]]">
          <h3 class="smallcaps">Created</h3>
          <p>
            [[_computeReadableDate(template.created_at)]]
            <!-- <a href="/members/[[template.user]]" class="regular blue-link">[[template.user]]</a> -->
          </p>
        </div>
        <div class="page-block" hidden$="[[!template.owned_by.length]]">
          <h3 class="smallcaps">Owner</h3>
          <p>
            <a href$="/members/[[template.owned_by]]"
              >[[_displayUser(template.owned_by,model.members)]]</a
            >
          </p>
        </div>
        <div class="page-block" hidden$="[[!template.created_by.length]]">
          <h3 class="smallcaps">Created by</h3>
          <p>
            <a href$="/members/[[template.created_by]]"
              >[[_displayUser(template.created_by,model.members)]]</a
            >
          </p>
        </div>
        <div class="page-block" hidden$="[[!templateTags.length]]">
          <h3 class="smallcaps">
            Tags
            <template is="dom-if" if="[[templateTags]]">
              <span class="id">([[templateTags.length]])</span>
            </template>
            <template is="dom-if" if="[[!templateTags]]">
              <span class="id">(0)</span>
            </template>
          </h3>
          <template is="dom-if" if="[[templateTags]]">
            <template is="dom-repeat" items="[[templateTags]]">
              <span class="id tag"
                >[[item.key]]<span hidden$="[[!item.value]]"
                  >=[[item.value]]</span
                ></span
              >
            </template>
          </template>
        </div>
      </paper-material>
      <div class="section">
        <div class="flex-horizontal-with-ratios">
          <div class="width100">
            <template is="dom-if" if="[[stacks.length]]">
              <paper-material class="no-pad">
                <h3 class="smallcaps resource-head">
                  stacks created from this template
                </h3>
                <template is="dom-repeat" items="[[stacks]]">
                  <template-stack-item
                    model="[[model]]"
                    stack="[[item]]"
                  ></template-stack-item>
                </template>
              </paper-material>
            </template>
          </div>
        </div>
      </div>
      <template is="dom-if" if="[[isInline]]">
        <div class="page">
          <div class="section">
            <h3 class="smallcaps">Inline Template</h3>
            <div class="command-container">
              <pre><code>
[[template.template]]
                        </code></pre>
            </div>
          </div>
        </div>
      </template>
      <div class="page section">
        <template is="dom-if" if="[[template.workflows.length]]">
          <div class="page section">
            <h3 class="smallcaps">Available Workflows</h3>
            <p>This template offers the following workflows.</p>
            <paper-material class="no-pad">
              <table class="info-table">
                <template
                  is="dom-repeat"
                  items="[[template.workflows]]"
                  as="[[item]]"
                >
                  <tr>
                    <td>[[item.name]]</td>
                    <td>[[item.description]]</td>
                  </tr>
                </template>
              </table>
            </paper-material>
          </div>
        </template>
        <template is="dom-if" if="[[template.inputs.length]]">
          <div class="page">
            <div class="section">
              <h3 class="smallcaps">Template Inputs</h3>
              <p>
                The template will require you to insert the following inputs to
                create a stack.
              </p>
              <p class="required"><span class="red">*</span> required fields</p>
              <paper-material class="no-pad">
                <table class="info-table">
                  <template is="dom-repeat" items="[[template.inputs]]">
                    <tr>
                      <td>
                        [[item.name]]
                        <span
                          id="required"
                          class="red"
                          hidden$="[[!item.required]]"
                          >*</span
                        >
                      </td>
                      <td>[[item.description]]</td>
                    </tr>
                  </template>
                </table>
              </paper-material>
            </div>
          </div>
        </template>
        <h3 class="smallcaps">Metadata</h3>
        <paper-material>
          <div class="info-table">
            <div class="info-body info-group">
              <template is="dom-if" if="[[template.description]]">
                <div class="info-item flex-horizontal-with-ratios">
                  <div hidden$="[[!template.description]]" class="flexchild">
                    Description
                  </div>
                  <div class="flexchild">[[template.description]]</div>
                </div>
              </template>
              <div class="info-item flex-horizontal-with-ratios">
                <div class="flexchild">Run as Owner</div>
                <div class="flexchild">[[template.setuid]]</div>
              </div>
              <template is="dom-if" if="[[template.created_at]]">
                <div class="info-item flex-horizontal-with-ratios">
                  <div class="flexchild">Created at</div>
                  <div class="flexchild">[[template.created_at]]</div>
                </div>
              </template>
              <div class="info-item flex-horizontal-with-ratios">
                <div class="flexchild">Type</div>
                <div class="flexchild">[[template.exec_type]]</div>
              </div>
              <template is="dom-if" if="[[template.location_type]]">
                <div class="info-item flex-horizontal-with-ratios">
                  <div class="flexchild">Location</div>
                  <div class="flexchild">[[template.location_type]]</div>
                </div>
              </template>
              <template is="dom-if" if="[[template.template]]">
                <div
                  class="info-item flex-horizontal-with-ratios"
                  hidden$="[[isInline]]"
                >
                  <div class="flexchild">Template</div>
                  <div class="flexchild">
                    <a
                      href="[[template.template]]"
                      class="blue-link regular"
                      target="_blank"
                    >
                      [[template.template]]
                    </a>
                  </div>
                </div>
              </template>
              <template is="dom-if" if="[[template.entrypoint]]">
                <div class="info-item flex-horizontal-with-ratios">
                  <div class="flexchild">Entrypoint</div>
                  <div class="flexchild">[[template.entrypoint]]</div>
                </div>
              </template>
            </div>
          </div>
        </paper-material>
      </div>
    </div>
    <div class="absolute-bottom-right">
      <paper-fab icon="av:play-arrow" on-tap="_createStack"></paper-fab>
    </div>
    <dialog-element></dialog-element>
    <tags-list model="[[model]]"></tags-list>
  `,

  is: 'template-page',

  behaviors: [mistLoadingBehavior, mistLogsBehavior, mistRulesBehavior],

  properties: {
    sections: {
      type: Object,
    },
    section: {
      type: Object,
    },
    params: {
      type: Object,
    },
    model: {
      type: Object,
    },
    templateId: {
      type: String,
    },
    template: {
      type: Object,
      computed: '_computeTemplate(templateId, model.templates)',
    },
    templateTags: {
      type: Array,
      computed:
        '_computeTemplateTags(template, template.tags, template.tags.*, model.templates.*)',
    },
    stacks: {
      type: Array,
      value() {
        return [];
      },
    },
    isInline: {
      type: Boolean,
      computed: '_computeIsInline(template.location_type)',
    },
    class: {
      type: String,
      computed: '_class(isInline)',
    },
    hidden: {
      type: Boolean,
      value: true,
    },
    hideprogress: {
      type: Boolean,
      value: true,
    },
    isLoading: {
      type: Boolean,
      computed: '_computeIsloading(template)',
      value: true,
    },
    vpHeight: String,
    itemArray: Array,
  },

  observers: ['_changed(template)', '_activated(hidden)'],

  ready() {
    const wh = window.innerHeight;
    this.vpHeight = `height:${wh}px; overflow: auto;`;
  },

  _activated() {
    this.$.templateActions.fire('update');
  },

  _computeTemplate(id) {
    if (this.model.templates) return this.model.templates[id];
    return null;
  },

  _displayUser(id) {
    return this.model && id && this.model.members && this.model.members[id]
      ? this.model.members[id].name || this.model.members[id].email
      : '';
  },

  _computeReadableDate(date) {
    return moment.utc(date).fromNow();
  },

  _computeHasStacks() {
    if (this.stacks) {
      return this.stacks.length > 0;
    }
    return false;
  },

  _computeIsInline(source) {
    return source === 'inline';
  },

  _computeTemplateTags() {
    if (this.template) {
      return Object.entries(this.template.tags).map(([key, value]) => ({
        key,
        value,
      }));
    }
    return [];
  },

  _class(isinline) {
    return isinline ? 'command-container' : '';
  },

  _createStack(e) {
    e.stopImmediatePropagation();
    this.dispatchEvent(
      new CustomEvent('go-to', {
        bubbles: true,
        composed: true,
        detail: {
          url: '/stacks/+create',
          params: { template: this.template._id },
        },
      })
    );
  },

  _handleResponse() {
    // console.log('response',e);
    this.dispatchEvent(
      new CustomEvent('go-to', {
        bubbles: true,
        composed: true,
        detail: { url: '/templates' },
      })
    );
  },

  _handleError(e) {
    console.log('error', e);
  },

  _showDialog(info) {
    const dialog = this.shadowRoot.querySelector('dialog-element');
    Object.keys(info).forEach(i => {
      dialog[i] = info[i];
    });
    dialog._openDialog();
  },

  _goBack() {
    window.history.back();
  },
  /* eslint-disable no-param-reassign */
  toggleAll() {
    const els = this.shadowRoot.querySelectorAll('app-togglable');
    [].forEach.call(els, el => {
      el.open = true;
    });
  },
  /* eslint-enable no-param-reassign */

  _computeIsloading() {
    return !this.template;
  },

  _changed() {
    if (this.template) this.set('itemArray', [this.template]);
  },
});
