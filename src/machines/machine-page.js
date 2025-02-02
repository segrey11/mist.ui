import '@polymer/paper-material/paper-material.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@mistio/mist-list/mist-list.js';
import '../helpers/dialog-element.js';
import { mistLoadingBehavior } from '../helpers/mist-loading-behavior.js';
import '../element-for-in/element-for-in.js';
import '../mist-rules/mist-rules.js';
import '../mist-monitoring.js';
import './machine-expiration-edit.js';
import './machine-actions.js';
import './machine-r12ns.js';
import moment from 'moment/src/moment.js';
import { ratedCost, itemUid, CSRFToken } from '../helpers/utils.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style include="shared-styles tags-and-labels info-table-style single-page">
      a:hover {
        cursor: pointer;
      }

      machine-actions {
        width: 50%;
      }

      .columns {
        display: flex;
        flex: 1 100%;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }

      .columns paper-material > .break {
        word-break: break-all;
      }

      .left {
        line-height: 1.6em;
      }

      .left,
      .right {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        flex: 1 50%;
        font-size: 0.9em;
      }

      .left h3,
      .right h3 {
        margin-bottom: 0;
      }

      .flex-horizontal-with-ratios {
        @apply --layout-horizontal;
        align-content: stretch;
        flex: 100%;
      }

      .flexchild {
        @apply --layout-flex;
      }

      .machine-ip {
        margin: 0;
      }

      paper-material {
        padding: 24px;
        box-sizing: border-box;
        width: 100%;
      }

      paper-material.info-card {
        padding: 0;
      }

      paper-material > h2 {
        line-height: initial !important;
        margin-bottom: 0;
        cursor: pointer;
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

      .label {
        padding: 2px !important;
      }

      #machine_actions paper-button {
        text-align: left !important;
      }

      .machine-state-icon {
        background-color: #fff !important;
      }

      .machine-state-icon.running {
        color: var(--green-color) !important;
      }

      .machine-state-icon.terminated {
        color: var(--mist-dark-color) !important;
      }

      .machine-state-icon.stopped {
        color: var(--orange-color) !important;
      }

      .machine-state-icon.error,
      .packetloss {
        color: var(--red-color) !important;
      }

      .machine-state-icon.unknown,
      .machine-state-icon.pending {
        color: #ccc !important;
      }

      paper-material .smallcaps {
        margin-top: 0;
      }

      .cost,
      paper-material .tags-head {
        margin-bottom: 16px;
      }

      .tags {
        margin-bottom: 8px;
      }

      .cost {
        margin-bottom: 0;
        font-size: 23px;
        color: rgba(0, 0, 0, 0.87);
        padding: 8px;
        display: inline-block;
      }

      .cost-head {
        display: inline !important;
      }

      :host .tag {
        display: inline-block !important;
        padding: 2px 4px;
        margin-right: 1px;
      }

      polyana-dashboard ::slotted(h3) {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 500;
        line-height: 36px;
      }

      polyana-dashboard {
        display: block;
        height: auto;
        overflow: hidden;
      }

      paper-button[disabled] {
        opacity: 0.54;
      }

      paper-button.left-icon iron-icon {
        margin: 0 4px 0 0;
      }

      paper-button.right-icon iron-icon {
        margin: 0 0 0 4px;
      }

      .machine-key {
        line-height: 24px;
        display: inline-block;
        vertical-align: top;
      }

      .machine-key iron-icon,
      .machine-volume iron-icon,
      .expiration iron-icon {
        margin-right: 8px;
        opacity: 0.32;
        cursor: pointer;
        width: 16px;
        height: 16px;
        color: initial;
      }

      iron-icon.delete {
        margin-right: 16px;
        margin-left: 8px;
      }

      iron-icon.edit {
        margin-left: 8px;
      }

      .expiration iron-icon.delete,
      .machine-key:hover iron-icon.delete,
      .machine-volume:hover iron-icon.delete {
        opacity: 0.32;
      }

      #pendingKeyrequest paper-spinner {
        width: 24px !important;
        height: 24px !important;
        vertical-align: middle !important;
      }

      span[class*='dc-'] {
        padding-top: 16px;
        display: none;
      }

      .dc-true {
        display: inline-block;
        color: #f57f17;
      }

      .dc-true iron-icon {
        display: inline-block;
        color: inherit;
      }

      .dc-false {
        display: inline-block;
        color: var(--green-color);
        font-size: 0.9em;
        font-weight: 500;
      }

      .probe-df {
        height: 240px;
        overflow-y: scroll;
        max-width: 500px;
      }

      .probe-data {
        position: relative;
      }

      .probe-data.hasprobe {
        overflow: visible;
      }

      .probe-data.hasprobe {
        height: 8px;
        width: 4px;
        display: inline-block;
        margin: 2px 8px;
      }
      /* midterm */

      .midlow {
        background: #42a5f5;
        /*cyan*/
      }

      .midmedium {
        background: #ffca28;
        /*orange*/
      }

      .midhigh {
        background: #ef5350;
        /*red*/
      }

      .mideco {
        background: #69b46c;
        /*green*/
      }
      /* shortlow + long */

      .shortlow.longlow {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #42a5f5, -1px 0 0 #fff,
          -4px 0 0 #42a5f5;
        /*cyan cyan*/
      }

      .shortlow.longmedium {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #42a5f5, -1px 0 0 #fff,
          -4px 0 0 #ffca28;
        /*cyan orange*/
      }

      .shortlow.longhigh {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #42a5f5, -1px 0 0 #fff,
          -4px 0 0 #ef5350;
        /*cyan red*/
      }

      .shortlow.longeco {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #42a5f5, -1px 0 0 #fff,
          -4px 0 0 #69b46c;
        /*cyan green*/
      }
      /* shortmedium + long */

      .shortmedium.longlow {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #ffca28, -1px 0 0 #fff,
          -4px 0 0 #42a5f5;
        /*orange cyan*/
      }

      .shortmedium.longmedium {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #ffca28, -1px 0 0 #fff,
          -4px 0 0 #ffca28;
        /*orange orange*/
      }

      .shortmedium.longhigh {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #ffca28, -1px 0 0 #fff,
          -4px 0 0 #ef5350;
        /*orange red*/
      }

      .shortmedium.longeco {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #ffca28, -1px 0 0 #fff,
          -4px 0 0 #69b46c;
        /*cyan green*/
      }
      /* shorthigh + long */

      .shorthigh.longlow {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #ef5350, -1px 0 0 #fff,
          -4px 0 0 #42a5f5;
        /*red cyan*/
      }

      .shorthigh.longmedium {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #ef5350, -1px 0 0 #fff,
          -4px 0 0 #ffca28;
        /*red orange*/
      }

      .shorthigh.longhigh {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #ef5350, -1px 0 0 #fff,
          -4px 0 0 #ef5350;
        /*red red*/
      }

      .shorthigh.longeco {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #ef5350, -1px 0 0 #fff,
          -4px 0 0 #69b46c;
        /*red green*/
      }
      /* shorteco + long */

      .shorteco.longlow {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #69b46c, -1px 0 0 #fff,
          -4px 0 0 #42a5f5;
        /*green cyan*/
      }

      .shorteco.longmedium {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #69b46c, -1px 0 0 #fff,
          -4px 0 0 #ffca28;
        /*green orange*/
      }

      .shorteco.longhigh {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #69b46c, -1px 0 0 #fff,
          -4px 0 0 #ef5350;
        /*green red*/
      }

      .shorteco.longeco {
        box-shadow: 1px 0 0 #fff, 4px 0 0 #69b46c, -1px 0 0 #fff,
          -4px 0 0 #69b46c;
        /*green green*/
      }

      @media (max-width: 1024px) {
        .machine-key,
        .machine-volume {
          display: block;
        }
        .tag {
          display: inline-block !important;
        }
      }

      .m-info-head {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.8em;
        display: inline-block;
        width: 80px;
        opacity: 0.54;
      }

      #rightcolumn .m-info-head {
        width: 100%;
      }

      .probe-button > * {
        vertical-align: middle;
      }

      #probeButton {
        background-color: transparent;
        font-weight: 400;
        font-size: 0.9em;
        color: #2196f3;
        display: inline-block;
        padding: 0;
      }

      #probeSpinner {
        display: inline-block;
        padding: 8px;
      }
      #pageLoadSpinner {
        display: block;
        padding-top: 15px;
        margin: auto;
      }
      @media screen and (max-width: 900px) {
        table.info-table {
          table-layout: fixed;
        }
        table.info-table tr.change-dir > td.change-dir {
          width: 200%;
          box-sizing: border-box;
          display: block;
          overflow: scroll;
          display: block;
        }
      }

      @media screen and (max-width: 450px) {
        paper-menu-button[vertical-align='top']
          ::slotted(.dropdown-content.paper-menu-button) {
          max-height: 200px !important;
        }
      }

      iron-icon.icon {
        padding: 3px;
        box-sizing: border-box;
      }

      paper-material.machine-logs {
        padding: 0;
        overflow: visible;
      }

      mist-list {
        width: 100%;
        padding: 0;
        margin: 0;
        height: 600px;
        font-size: 75%;
        --row-height: 48px;
      }

      .smaller {
        font-size: 0.8em;
        /*font-family: monospace;*/
      }

      .machine-page-head {
        @apply --machine-page-head-mixin;
      }

      .table {
        display: table;
      }

      .row {
        display: table-row;
      }

      .cell {
        display: table-cell;
        font-size: 0.9em;
      }

      .cell h4 {
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.8em;
        display: inline-block;
        width: 90px;
        opacity: 0.54;
        margin: 0;
      }

      paper-material.info {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      }

      .resource-info {
        padding-right: 8px;
        vertical-align: top;
      }
    </style>
    <div id="content">
      <machine-expiration-edit
        id="expirationdialog"
        machine="[[machine]]"
        model="[[model]]"
      ></machine-expiration-edit>
      <paper-material class="single-head layout horizontal machine-page-head">
        <span class="icon">
          <iron-icon
            class$="machine-state-icon [[machineState]]"
            icon="[[section.icon]]"
          ></iron-icon>
        </span>
        <div class="title flex">
          <h2>[[machineName]]</h2>
          <div class="subtitle">
            <span>[[machineState]]</span>
            <span class="desc" hidden$="[[_hasExtraStatus(machine)]]"
              >[[_computeExtraStatus(machine, machine.*,
              model.machines.*)]]</span
            >
          </div>
        </div>
        <machine-actions
          id="actions_machine"
          items="[[itemArray]]"
          model="[[model]]"
          in-single-page=""
        ></machine-actions>
      </paper-material>
      <paper-material hidden$="[[!isLoading]]">
        <div class="loading">Loading machine...</div>
        <paper-spinner
          id="pageLoadSpinner"
          active$="[[isLoading]]"
          hidden$="[[!isLoading]]"
        ></paper-spinner>
      </paper-material>
      <paper-material hidden$="[[!isMissing]]">
        <div class="missing">Machine not found.</div>
      </paper-material>
      <div class="columns">
        <paper-material id="leftcolumn" class="left resource-description">
          <div class="resource-info">
            <div class="table">
              <div class="row" hidden$="[[!machine.cloud]]">
                <div class="cell">
                  <h4>Cloud</h4>
                </div>
                <div class="cell">
                  <iron-icon
                    class="cloud icon"
                    src$="[[_computeCloudIcon(cloud.provider)]]"
                  ></iron-icon>
                  <span>[[cloud.title]]</span>
                </div>
              </div>
              <div class="row" hidden$="[[!cloud.tenant]]">
                <div class="cell">
                  <h4>Tenant</h4>
                </div>
                <div class="cell">[[cloud.tenant]]</div>
              </div>
              <div class="row" hidden$="[[!_existsImage(machine.extra)]]">
                <div class="cell">
                  <h4>Image</h4>
                </div>
                <div class="cell">
                  <a href$="/images/[[machine.image]]">
                    <iron-icon
                      class="image icon"
                      src$="[[_computeImageIcon(machine)]]"
                      hidden$="[[!_computeImageIcon(machine)]]"
                    ></iron-icon>
                    <span>[[_computeMachineImage(machine,model.images)]]</span>
                  </a>
                </div>
              </div>
              <div class="row" hidden$="[[!machineSize]]">
                <div class="cell">
                  <h4>Size</h4>
                </div>
                <div class="cell">
                  <span>[[machineSize]]</span>
                </div>
              </div>
              <div class="row" hidden$="[[!_getLocationName(machine,cloud)]]">
                <div class="cell">
                  <h4>Location</h4>
                </div>
                <div class="cell">
                  <span hidden$="[[_canLinkToNetwork(machine.network)]]"
                    >[[machine.network]]</span
                  >
                  <span hidden$="[[!_canLinkToNetwork(machine.network)]]">
                    <a
                      class="blue-link regular"
                      href$="/networks/[[machine.network]]"
                    >
                      [[_getNetworkName(machine)]]
                    </a>
                  </span>
                </div>
              </div>
              <br hidden$="[[!_getNetworkName(machine)]]" />
              <div class="row" hidden$="[[!_getNetworkName(machine)]]">
                <div class="cell">
                  <h4>Network</h4>
                </div>
                <div class="cell">
                  <span>[[_getNetworkName(machine,cloud)]]</span>
                </div>
              </div>
              <br hidden$="[[!machine.probe.ssh.updated_at]]" />
              <div class="row" hidden$="[[!machine.probe.ssh.updated_at]]">
                <div class="cell" hidden$="[[!machine.probe.ssh.loadavg]]">
                  <h4>Load</h4>
                </div>
                <div class="cell">
                  <span class$="probe-data [[itemProbeClasses(machine)]]">
                  </span>
                  <span
                    class="smaller"
                    hidden$="[[!machine.probe.ssh.loadavg]]"
                  >
                    [[_listToString(machine.probe.ssh.loadavg)]] -
                    [[machine.probe.ssh.cores]] vcpu cores</span
                  >
                </div>
              </div>
              <div class="row" hidden$="[[!machine.probe.ping.updated_at]]">
                <div class="cell">
                  <h4>RTT</h4>
                </div>
                <div class="cell">
                  <span
                    class="smaller"
                    hidden$="[[!machine.probe.ping.rtt_avg]]"
                    >min/avg/max/std =
                    [[machine.probe.ping.rtt_min]]/[[machine.probe.ping.rtt_avg]]/[[machine.probe.ping.rtt_max]]/[[machine.probe.ping.rtt_std]]
                    ms
                  </span>
                  <span
                    class="smaller packetloss"
                    hidden$="[[!machine.probe.ping.packets_loss]]"
                    >--
                    [[_computePacketLossPercent(machine.probe.ping.packets_loss)]]%
                    packet loss --</span
                  >
                </div>
              </div>
              <div class="row" hidden$="[[!_canShowProbed(machine)]]">
                <div class="cell">
                  <h4>Probed:</h4>
                </div>
                <div class="cell">
                  <span class="smaller">
                    [[_computeProbeString(machine.probe.ssh.updated_at,
                    machine.probe.ping.updated_at)]]</span
                  >
                  <br hidden$="[[!_hasProbeInfo(machine.probe)]]" />
                  <paper-button
                    id="probeButton"
                    class="blue-link"
                    on-tap="_probeMachine"
                    disabled="{{probeLoading}}"
                    hidden$="[[!machine.key_associations.length]]"
                    >probe now</paper-button
                  >
                  <paper-spinner
                    id="probeSpinner"
                    active="{{probeLoading}}"
                  ></paper-spinner>
                </div>
              </div>
              <div class="row" hidden$="[[!kernelInfo]]">
                <div class="row">
                  <div class="cell">[[kernelInfo]]</div>
                </div>
              </div>
            </div>
          </div>
        </paper-material>
        <paper-material id="rightcolumn" class="right resource-description">
          <div hidden$="[[!machine.cost.monthly]]">
            <div class="m-info-head cost-head">Monthly Cost</div>
            <div class="cost">
              [[currency.sign]][[_ratedCost(machine.cost.monthly,
              currency.rate)]]
            </div>
          </div>
          <div class="row" hidden$="[[!machine.owned_by.length]]">
            <div class="cell">
              <h4>Owner:</h4>
            </div>
            <div class="cell">
              <a class="blue-link" href$="/members/[[machine.owned_by]]"
                >[[_displayUser(machine.owned_by,model.members)]]</a
              >
            </div>
          </div>
          <div class="row" hidden$="[[!machine.created]]">
            <div class="cell">
              <h4>Created:</h4>
            </div>
            <div class="cell" hidden$="[[!machine]]">
              [[_fromNow(machine.created)]]
              <span hidden$="[[!machine.created_by]]">
                by
                <a class="blue-link" href$="/members/[[machine.created_by]]"
                  >[[_displayUser(machine.created_by,model.members)]]</a
                >
              </span>
            </div>
            <br />
          </div>
          <div class="row">
            <div class="cell">
              <h4>Expires</h4>
            </div>
            <div class="cell expiration" hidden$="[[!machine]]">
              [[_fromNow(machine.expiration.date, machine.*, model.machines.*)]]
              <template is="dom-if" if="[[canEditMachine]]" restamp="">
                <iron-icon
                  icon="editor:mode-edit"
                  on-tap="editExpiration"
                  class="edit"
                ></iron-icon>
              </template>
              <span hidden$="[[!machineExpiration]]">
                <template is="dom-if" if="[[canDeleteExpiration]]" restamp="">
                  <iron-icon
                    icon="icons:clear"
                    on-tap="deleteExpiration"
                  ></iron-icon>
                </template>
              </span>
              <div class="machine-key" id="pendingExpRequest">
                <paper-spinner
                  active="[[isPendingExpirationRequest]]"
                  hidden$="[[!isPendingExpirationRequest]]"
                ></paper-spinner>
              </div>
            </div>
            <br />
          </div>
          <div hidden$="[[!machine.key_associations.length]]">
            <div class="m-info-head">Associated Keys</div>
            <div class="associatedKeys">
              <template
                is="dom-repeat"
                items="{{machineKeys}}"
                as="association"
                id="machineKeysDomRepeat"
              >
                <div
                  class="machine-key"
                  hidden$="[[!_visibleKey(model,association)]]"
                >
                  <a
                    class="regular blue-link flexchild"
                    href$="/keys/[[association.key]]"
                  >
                    <iron-icon icon="communication:vpn-key"></iron-icon>
                    [[_computeKeyName(association.key, model.keys)]]</a
                  >
                  <iron-icon
                    icon="icons:clear"
                    on-tap="disassociateKey"
                    class="delete"
                  ></iron-icon>
                </div>
              </template>
              <div class="machine-key" id="pendingKeyRequest">
                <paper-spinner
                  active=""
                  hidden$="[[!isPendingKeyRequest]]"
                ></paper-spinner>
              </div>
            </div>
            <br />
          </div>
          <div hidden$="[[!volumes.length]]">
            <div class="m-info-head">Attached Volumes</div>
            <div class="associatedVolumes">
              <template is="dom-repeat" items="{{volumes}}" as="volumeId">
                <div class="machine-volume">
                  <a
                    class="regular blue-link flexchild"
                    href$="/volumes/[[volumeId]]"
                  >
                    <iron-icon icon="device:storage"></iron-icon
                    >[[_computeVolumeName(volumeId)]]
                  </a>
                  <template
                    is="dom-if"
                    if="[[_computeCanDetachVolume(volumeId)]]"
                    restamp=""
                  >
                    <iron-icon
                      icon="icons:clear"
                      class="delete"
                      on-tap="detachVolume"
                    ></iron-icon>
                  </template>
                </div>
              </template>
              <div class="machine-volume" id="pendingVolumeRequest">
                <paper-spinner
                  active=""
                  hidden$="[[!isPendingVolumeRequest]]"
                ></paper-spinner>
              </div>
            </div>
            <br />
          </div>
          <div hidden$="[[!vnfs.length]]">
            <div class="m-info-head">Virtual Functions</div>
            <div class="vnfs">
              <template is="dom-repeat" items="{{vnfs}}" as="vf">
                <div class="virtual-function">
                  <code>[[_computeVF(vf)]]</code>
                </div>
              </template>
            </div>
          </div>
          <div hidden$="[[!machineTags.length]]">
            <div class="m-info-head tags">TAGS:</div>
            <template id="tagRepeater" is="dom-repeat" items="[[machineTags]]">
              <span class="tag"
                >[[item.key]]<span hidden$="[[!item.value]]">=</span
                >[[item.value]]</span
              >
            </template>
          </div>
        </paper-material>
      </div>
      <paper-material
        id="r12nsBlock"
        class="info-card"
        hidden$="[[!r12ns.length]]"
      >
        <machine-r12ns
          r12ns="[[r12ns]]"
          can-resize="[[machine.actions.resize]]"
        ></machine-r12ns>
      </paper-material>
      <template is="dom-if" if="[[monitoring]]">
        <paper-material id="monitoringBlock" class="info-card">
          <mist-monitoring
            id="mistMonitoring"
            resource="[[machine]]"
            state="[[machineState]]"
            monitoring="[[model.monitoring]]"
            section="[[section]]"
            datasources="[[datasources]]"
            hidden$="[[hidden]]"
            machine-keys="[[machineKeys]]"
            incidents="[[_filterMachinesIncidents(model.incidentsArray, model.incidentsArray.length, model.incidents.*)]]"
            portal-name="[[portalName]]"
          ></mist-monitoring>
        </paper-material>
      </template>
      <paper-material id="rulesBlock" class="info-card">
        <mist-rules
          id="monitoringRules"
          cloud="[[machine.cloud]]"
          builtin-metrics="[[model.monitoring.builtin_metrics]]"
          custom-metrics="[[model.monitoring.custom_metrics]]"
          incidents="[[model.incidentsArray]]"
          rules="[[_rulesApplyOnMachine(model.rules, machine.id, machineTags.*)]]"
          teams="[[model.teamsArray]]"
          users="[[model.membersArray]]"
          resource="[[machine]]"
          resource-type="machine"
          model="[[model]]"
          collapsible=""
        ></mist-rules>
      </paper-material>
      <paper-material class="info-card">
        <h2 class="machine-page-head">Basic Info</h2>
        <div class="card-content">
          <table class="info-table">
            <template is="dom-if" if="[[machine.public_ips]]">
              <tr>
                <td>Machine ID ([[portalName]] unique id)</td>
                <td>[[machine.id]]</td>
              </tr>
              <tr>
                <td>Machine ID given by the provider</td>
                <td>[[machine.machine_id]]</td>
              </tr>
              <tr>
                <td>Public IPs</td>
                <td>[[_renderArray(machine.public_ips)]]</td>
              </tr>
              <tr>
                <td>Private IPs</td>
                <td>[[_renderArray(machine.private_ips)]]</td>
              </tr>
              <tr hidden$="[[!machine.probe.ssh.users]]">
                <td>Users</td>
                <td>[[machine.probe.ssh.users]]</td>
              </tr>
              <tr hidden$="[[!machine.probe.ssh.uptime]]">
                <td>Uptime</td>
                <td>[[machine.probe.ssh.uptime]]</td>
              </tr>
              <tr class="change-dir" hidden$="[[!machine.probe.ssh.df]]">
                <td class="change-dir">Filesystem Info</td>
                <td class="change-dir">
                  <div class="probe-df">
                    <pre><code>[[machine.probe.ssh.df]]</code></pre>
                  </div>
                </td>
              </tr>
            </template>
          </table>
        </div>
      </paper-material>
      <paper-material class="info-card" hidden$="[[!_hasPowerInfo(machine)]]">
        <h2 class="machine-page-head">Power Info</h2>
        <div class="card-content">
          <element-for-in
            content="[[machine.extra.power_supply_info.Status]]"
          ></element-for-in>
          <element-for-in
            content="[[machine.extra.power_control_info]]"
          ></element-for-in>
          <element-for-in
            content="[[machine.extra.power_supply_info]]"
          ></element-for-in>
        </div>
      </paper-material>
      <paper-material class="info-card" hidden$="[[!_hasExtra(machine)]]">
        <h2 class="machine-page-head">More Info</h2>
        <div class="card-content">
          <element-for-in
            content="[[machine.extra]]"
            ignore="power_"
          ></element-for-in>
        </div>
      </paper-material>
      <paper-material class="machine-logs" hidden$="[[!count]]">
        <template is="dom-if" if="[[machine.id]]" restamp="">
          <mist-list
            id="machineLogs"
            timeseries=""
            expands=""
            column-menu=""
            searchable=""
            streaming=""
            infinite=""
            toolbar=""
            auto-hide=""
            rest=""
            apiurl="/api/v1/logs"
            name="machine logs"
            frozen="[[_getFrozenLogColumn()]]"
            visible="[[_getVisibleColumns()]]"
            renderers="[[_getRenderers(model.members)]]"
            primary-field-name="time"
            base-filter="machine_id:[[machine.id]]"
          ></mist-list>
        </template>
      </paper-material>
    </div>
    <dialog-element id="machinedialog" btn-class="smaller"></dialog-element>
    <iron-ajax
      id="deleteExpirationDate"
      url="/api/v1/machines/[[machine.id]]"
      method="PUT"
      on-response="_handleMachineDeleteAjaxResponse"
      on-error="_handleMachineDeleteAjaxError"
    ></iron-ajax>
    <iron-ajax
      id="machineDeleteAjaxRequest"
      url="/api/v1/machines/[[machine.id]]"
      method="DELETE"
      on-response="_handleMachineDeleteAjaxResponse"
      on-error="_handleMachineDeleteAjaxError"
    ></iron-ajax>
    <iron-ajax
      id="disassociateKeyRequest"
      url="/api/v1/machines/[[machine.id]]/keys/[[disassociateKeyId]]"
      method="DELETE"
      on-response="_disassociateKeyResponse"
      on-error="_disassociateKeyError"
      on-request="_disassociateKeyRequest"
      handle-as="xml"
    ></iron-ajax>
    <iron-ajax
      id="detachVolumeRequest"
      url="/api/v1/clouds/[[machine.cloud]]/volumes/[[dettachVolumeId]]"
      method="PUT"
      on-response="_detachVolumeResponse"
      loading="{{isPendingVolumeRequest}}"
      on-error="_detachVolumeError"
      handle-as="xml"
    ></iron-ajax>
    <iron-ajax
      id="probeMachine"
      url="/api/v1/machines/[[machine.id]]/probe"
      method="POST"
      loading="{{probeLoading}}"
      on-error="_probeError"
      handle-as="xml"
    ></iron-ajax>
    <paper-toast></paper-toast>
  `,

  is: 'machine-page',

  behaviors: [mistLoadingBehavior, window.rbac],

  properties: {
    model: {
      type: Object,
    },
    path: {
      type: String,
    },
    user: {
      type: String,
    },
    router: {
      type: Object,
    },
    machine: {
      type: Object,
    },
    cloud: {
      type: Object,
      value: {},
    },
    volumes: {
      type: Array,
      computed: '_getMachineVolumes(model.volumes.*, machine)',
    },
    sections: {
      type: Array,
    },
    section: {
      type: Object,
    },
    tag: {
      type: String,
      value: '',
    },
    isMonitored: {
      type: Boolean,
      value: false,
    },
    isActivated: {
      type: Boolean,
      value: false,
      computed:
        '_computeIsActivated(machine, model.monitoring.monitored_machines.*)',
    },
    machineName: {
      type: String,
      computed: '_computeMachineName(machine.*, model.machines.*)',
    },
    machineState: {
      type: String,
      computed: '_computeMachineState(machine.state, model.machines.*)',
    },
    machineSize: {
      type: String,
      computed:
        '_computeMachineSize(machine, machine.*, model.machines.*, cloud.*)',
    },
    machineExpiration: {
      type: String,
      computed:
        '_computeMachineExpiration(machine.expiration, machine.*, model.machines.*)',
    },
    machineTags: {
      type: Array,
      value() {
        return [];
      },
    },
    dashboard: {
      type: Object,
    },
    isLoading: {
      type: Boolean,
      computed: '_computeIsloading(machine, isMissing)',
      value: true,
    },
    newKeyId: {
      type: String,
      value: '',
    },
    machineIp: {
      type: String,
      computed: 'computeMachineIp(machine, machine.public_ips)',
    },
    disassociateKeyId: {
      type: String,
    },
    detachVolumeId: {
      type: String,
    },
    isPendingKeyRequest: {
      type: Boolean,
    },
    isPendingVolumeRequest: {
      type: Boolean,
      value: false,
    },
    isPendingExpirationRequest: {
      type: Boolean,
      value: false,
    },
    hideAssociatedKeys: {
      type: Boolean,
    },
    machineKeys: {
      type: Array,
      computed:
        '_computeAssociatedKeys(machine, machine.key_associations, machine.key_associations.length, machine.*, model.machines.*, model.keys.*)',
      value() {
        return [];
      },
    },
    itemUid: {
      type: Array,
      computed: '_computeThisItemUid(machine)',
    },
    vnfs: {
      type: Array,
      computed: '_computeVNFs(machine)',
      value() {
        return [];
      },
    },
    hidden: {
      type: Boolean,
      value: false,
    },
    machineLogFilter: {
      type: Object,
      computed: '_computeMachineLogFilter(machine)',
    },
    monitoring: {
      type: Boolean,
      value: false,
    },
    itemArray: {
      type: Array,
    },
    r12ns: {
      type: Array,
      value() {
        return [];
      },
      computed:
        '_computeMachineR12ns(machine, model.notificationsArray.length)',
    },
    portalName: {
      type: String,
      value: 'Mist.io',
    },
    currency: {
      type: Object,
      value() {
        return { sign: '$', rate: 1 };
      },
    },
    canEditMachine: {
      type: Boolean,
      value: true,
      computed: '_computeCanEditMachine(machine.id,model)',
    },
    canDeleteExpiration: {
      type: Boolean,
      value: true,
      computed: '_computeCanDeleteExpiration(machine.id,model)',
    },
  },

  observers: [
    '_isMonitored(machine.monitoring.hasmonitoring)',
    '_machineChanged(machine.*, model.machines.*)',
    '_getMachineCloud(model.clouds.*, machine.cloud)',
    '_renderMachineKeys(machineKeys.length)',
  ],

  listeners: {
    confirmation: '_machineActionConfirmation',
    'pending-key-request': '_updateKeyLoader',
    'pending-expiration-request': '_updateExpirationLoader',
    'select-action': 'selectAction',
  },

  ready() {
    this.set('hideAssociatedKeys', true);
    this.set('isPendingKeyRequest', false);
    if (this.path.endsWith('expiration')) {
      this.editExpiration();
    }
  },

  _canShowProbed(machine) {
    if (!machine) return false;
    return (
      this.machine.key_associations.length || this._hasProbeInfo(machine.probe)
    );
  },

  _hasProbeInfo(probe) {
    if (!probe) return false;
    return this._hasInfo(probe.ssh) && this._hasInfo(probe.ping);
  },

  _hasInfo(data) {
    if (!data) return false;
    for (const p of Object.keys(data || {})) {
      if (data[p]) return true;
    }
    return false;
  },

  _computeCanEditMachine(machineId, _model) {
    const perm = this.checkPerm('edit', 'machine', machineId);
    return perm !== false;
  },

  _computeCanDeleteExpiration(machineId, _model) {
    const perm = this.checkPerm('edit', 'machine', machineId);
    return (
      perm === true ||
      !perm.expiration ||
      (perm.expiration && !perm.expiration.max)
    );
  },
  _computeCanDetachVolume(id) {
    const model = this.model.volumes[id];
    return model && model.actions && model.actions.detach;
  },
  _renderMachineKeys() {
    this.$.machineKeysDomRepeat.render();
  },
  _rulesApplyOnMachine(rules, machineId, _machineTags) {
    const machineRules = {};
    let check;
    if (rules && machineId) {
      Object.keys(rules || {}).forEach(p => {
        const noData =
          rules[p].actions.find(a => {
            return a.type === 'no_data';
          }) !== undefined;
        // applies on all machines
        if (!rules[p].selectors || !rules[p].selectors.length || noData) {
          check = true;
        } else if (
          rules[p].data_type === 'logs' &&
          rules[p].queries.find(q => {
            return q.target.indexOf(`machine_id:${machineId}`) > -1;
          }) !== undefined
        ) {
          check = true;
        } else if (rules[p].selectors && rules[p].selectors.length > 0) {
          for (let i = 0; i < rules[p].selectors.length; i++) {
            const selector = rules[p].selectors[i];
            // applies on specific machines
            if (selector.type === 'machines') {
              if (selector.ids.indexOf(machineId) > -1) check = true;
              else check = false;
            } else if (selector.type === 'tags') {
              // applies on tags
              if (!this.machineTags.length) check = false;
              // machine has no tags
              else {
                for (const q of Object.keys(selector.include || {})) {
                  const mtag = this.machineTags.find(t => {
                    return t.key === q;
                  });
                  if (!mtag) {
                    // machine has no such tag
                    check = false;
                  } else if (!selector.include[q]) {
                    check = mtag.value === ''; // if tag value is null machine tag value must be empty string
                  } else if (selector.include[q]) {
                    check = selector.include[q] === mtag.value; // if tag value is !null machine tag value must be equal
                  }
                }
              }
            }
          }
        }
        if (check === true) {
          machineRules[p] = rules[p];
        }
      });
    }
    return machineRules;
  },

  _getMachineCloud(clouds, id) {
    if (this.model && this.model.clouds && this.machine && this.machine.cloud) {
      this.set('cloud', this.model.clouds[id]);
    }
  },

  _getMachineVolumes(_volumes, _machine) {
    const that = this;
    if (this.machine) {
      return Object.keys(that.model.volumes).filter(k => {
        return (
          that.model.volumes[k] &&
          that.model.volumes[k].attached_to.indexOf(that.machine.id) > -1
        );
      });
    }
    return [];
  },

  _displayUser(id, _members) {
    return this.model && id && this.model.members && this.model.members[id]
      ? this.model.members[id].name ||
          this.model.members[id].email ||
          this.model.members[id].username
      : '';
  },

  _showRecommendationDialog() {
    this.dispatchEvent(
      new CustomEvent('open-recommendation-dialog', {
        bubbles: true,
        composed: true,
        detail: {
          'item-type': 'machines',
          item: this.machine,
          caller: 'machine_page',
        },
      })
    );
  },

  _machineChanged(_machine) {
    if (this.machine) {
      this.set('itemArray', [this.machine]);
      // Check if tags changed, update if they did
      if (
        this._transformTagsToArray(this.machine.tags).join(',') !==
        this.machineTags.join(',')
      )
        this._machineTagsChanged(this.machine, this.machine.tags);
    }
  },

  _visibleKey(model, association) {
    return this.model && this.model.keys && this.model.keys[association.key];
  },

  _computeKeyName(keyid) {
    if (this.model.keys && this.model.keys[keyid])
      return this.model.keys[keyid].name || 'not found';
    return 'not found';
  },

  _computeVolumeName(id) {
    if (this.model.volumes[id])
      return (
        (this.model.volumes[id] &&
          (this.model.volumes[id].name ||
            this.model.volumes[id].external_id)) ||
        'not found'
      );
    return 'not found';
  },

  _computeThisItemUid(_machine) {
    const itemUidInArray = [];
    itemUidInArray.push(itemUid(this.machine, this.model.sections.machines));
    return itemUidInArray;
  },

  _computeAssociatedKeys(_machine, _keys, _keyLength, _machineChangeRecord) {
    this.async(() => {
      this._renderMachineKeys();
    }, 500);
    return this.machine && this.machine.key_associations
      ? this.machine.key_associations
      : [];
  },

  _computeVNFs(_machine) {
    return (
      (this.machine && this.machine.extra && this.machine.extra.vnfs) || []
    );
  },

  _computeVF(vf) {
    try {
      const bus = vf.split(':')[1];
      const slotf = vf.split(':')[2];
      const slot = slotf.split('.')[0];
      const f = slotf.split('.')[1];
      return `${vf} - enp${parseInt(bus, 16)}s${parseInt(slot, 16)}f${parseInt(
        f,
        16
      )}`;
    } catch (e) {
      return vf;
    }
  },

  _renderArray(array) {
    if (array && array.length) return array.join(', ');
    return '';
  },

  computeMachineIp(_machineips) {
    return this.machine && this.machine.public_ips
      ? this.machine.public_ips[0]
      : '';
  },

  _isEqual(a, b) {
    return a === b;
  },

  _isMonitored(machineIsMonitored) {
    return machineIsMonitored;
  },

  _computeIsActivated(machine, _monitoring) {
    if (
      !this.machine ||
      !this.model.monitoring ||
      !this.model.monitoring.monitored_machines ||
      !this.model.monitoring.monitored_machines[machine.id] ||
      !this.model.monitoring.monitored_machines[machine.id].installation_status
        .activated_at
    ) {
      console.warn('machine monitoring is not activated');
      return false;
    }
    if (
      this.model &&
      this.model.monitoring &&
      this.model.monitoring.monitored_machines &&
      this.model.monitoring.monitored_machines[machine.id] &&
      this.model.monitoring.monitored_machines[machine.id].installation_status
    ) {
      console.warn(
        'machine monitoring is activated at: ',
        this.model.monitoring.monitored_machines[machine.id].installation_status
          .activated_at
      );
      return this.model.monitoring.monitored_machines[machine.id]
        .installation_status.activated_at;
    }
    return '';
  },

  _computeMachineName(_machine) {
    return (this.machine && this.machine.name) || '';
  },

  _computeMachineState(_machine) {
    return (this.machine && this.machine.state) || '';
  },

  _machineTagsChanged(_machine, _tags) {
    if (this.machine) {
      this.set('machineTags', this._transformTagsToArray(this.machine.tags));
    }
  },

  _transformTagsToArray(obj) {
    return Object.entries(obj).map(([key, value]) => ({ key, value }));
  },

  confirmAction(action) {
    this._showDialog({
      title: `${action} Machine?`,
      body: `You are about to ${action} machine '${this.machine.name}'.`,
      danger: false,
      reason: `machine.${action}`,
      action,
    });
  },

  _showDialog(info) {
    const dialog = this.shadowRoot.querySelector(
      'dialog-element#machinedialog'
    );
    if (info) {
      Object.keys(info || {}).forEach(i => {
        dialog[i] = info[i];
      });
    }
    dialog._openDialog();
  },

  _showToast(msg) {
    const toast = this.shadowRoot.querySelector('paper-toast');
    toast.text = msg;
    toast.show();
  },

  _hasExtraStatus(machine) {
    if (machine && machine.state && machine.extra.status)
      return machine.state.toLowerCase() === machine.extra.status.toLowerCase();
    return false;
  },

  _computeExtraStatus(machine) {
    return (
      machine &&
      machine.extra &&
      machine.extra.status &&
      machine.extra.status.toLowerCase()
    );
  },

  _computeIsloading(_machine, _isMissing) {
    return !this.machine && !this.isMissing;
  },

  disassociateKey(e) {
    const keyId = e.model.association.key;
    const keyName = this._computeKeyName(e.model.association.key);

    this.set('disassociateKeyId', keyId);

    this._showDialog({
      title: 'Disassociate key',
      body: `Disassociating key '${keyName}' from machine, will remove the key from the machine.`,
      danger: false,
      reason: 'disassociate.key',
      action: 'disassociate',
      key: keyId,
    });
  },

  _disassociateKeyRequest(_e) {
    this.set('isPendingKeyRequest', true);
  },

  _disassociateKeyResponse(_e) {
    this.set('isPendingKeyRequest', false);
    this.dispatchEvent(
      new CustomEvent('toast', {
        bubbles: true,
        composed: true,
        detail: {
          msg: 'Key was removed from machine',
          duration: 3000,
        },
      })
    );
  },

  _disassociateKeyError(e) {
    this.set('isPendingKeyRequest', false);
    this.dispatchEvent(
      new CustomEvent('toast', {
        bubbles: true,
        composed: true,
        detail: {
          msg: e.detail.request.xhr.responseText,
          duration: 3000,
        },
      })
    );
  },

  detachVolume(e) {
    const { volumeId } = e.model;
    const volumeName = this._computeVolumeName(volumeId);

    this.set('dettachVolumeId', this.model.volumes[volumeId].external_id);

    this._showDialog({
      title: 'Detach volume',
      body: `Detaching volume '${volumeName}' from machine.`,
      danger: true,
      reason: 'detach.volume',
      action: 'detach',
      volume: volumeId,
    });
  },

  _detachVolumeResponse(_e) {
    this.set('isPendingVolumeRequest', false);
    this.dispatchEvent(
      new CustomEvent('toast', {
        bubbles: true,
        composed: true,
        detail: {
          msg: 'Volume was detached from machine',
          duration: 3000,
        },
      })
    );
  },

  _detachVolumeError(e) {
    this.dispatchEvent(
      new CustomEvent('toast', {
        bubbles: true,
        composed: true,
        detail: {
          msg: e.detail.request.xhr.responseText,
          duration: 3000,
        },
      })
    );
  },

  _machineActionConfirmation(e) {
    if (
      e.detail.response === 'confirm' &&
      e.detail.reason === 'machine.expiration_delete'
    ) {
      this.set('isPendingExpirationRequest', true);
      const emptyExpDate = { expiration: { date: false } };
      this.shadowRoot.querySelector('#deleteExpirationDate').headers[
        'Csrf-Token'
      ] = CSRFToken.value;
      this.shadowRoot.querySelector('#deleteExpirationDate').headers[
        'Content-Type'
      ] = 'application/json';
      this.shadowRoot.querySelector(
        '#deleteExpirationDate'
      ).body = emptyExpDate;
      this.shadowRoot.querySelector('#deleteExpirationDate').generateRequest();
    } else if (
      e.detail.response === 'confirm' &&
      e.detail.reason === 'disassociate.key'
    ) {
      this.shadowRoot.querySelector('#disassociateKeyRequest').headers[
        'Csrf-Token'
      ] = CSRFToken.value;
      this.shadowRoot
        .querySelector('#disassociateKeyRequest')
        .generateRequest();
    } else if (
      e.detail.response === 'confirm' &&
      e.detail.reason === 'detach.volume'
    ) {
      this.shadowRoot.querySelector('#detachVolumeRequest').headers[
        'Csrf-Token'
      ] = CSRFToken.value;
      this.shadowRoot.querySelector('#detachVolumeRequest').headers[
        'Content-Type'
      ] = 'application/json';
      this.shadowRoot.querySelector('#detachVolumeRequest').body = {
        action: 'detach',
        machine: this.machine.id,
      };
      this.shadowRoot.querySelector('#detachVolumeRequest').generateRequest();
    } else if (
      e.detail.response === 'confirm' &&
      e.detail.reason === 'detach.volume'
    ) {
      // did the modulizer eat the statement?
    }
  },

  _updateKeyLoader(e) {
    if (e.detail.request) {
      this.set('isPendingKeyRequest', true);
    } else if (e.detail.response) {
      this.set('isPendingKeyRequest', false);
    } else if (e.detail.error) {
      this.set('isPendingKeyRequest', false);
      this.dispatchEvent(
        new CustomEvent('toast', {
          bubbles: true,
          composed: true,
          detail: {
            msg: e.detail.errormsg,
            duration: 3000,
          },
        })
      );
    }
  },

  _updateExpirationLoader(_e) {
    this.set('isPendingExpirationRequest', true);
  },

  _feedbackOnScript(e) {
    if (e.detail.response) {
      this.dispatchEvent(
        new CustomEvent('toast', {
          bubbles: true,
          composed: true,
          detail: {
            msg: `Script run request succeded. Script ${
              this.model.scripts[e.detail.scriptId].name
            } has been queued for execution`,
            duration: 5000,
          },
        })
      );
    }
    if (e.detail.error) {
      this.dispatchEvent(
        new CustomEvent('toast', {
          bubbles: true,
          composed: true,
          detail: {
            msg: e.detail.errormsg,
            duration: 3000,
          },
        })
      );
    }
  },

  _feedbackOnRename(e) {
    if (e.detail.request) {
      this.dispatchEvent(
        new CustomEvent('toast', {
          bubbles: true,
          composed: true,
          detail: {
            msg: 'Rename request sent. Waiting for machine to respond',
            duration: 3000,
          },
        })
      );
    }
    if (e.detail.response) {
      this.dispatchEvent(
        new CustomEvent('toast', {
          bubbles: true,
          composed: true,
          detail: {
            msg: 'Renaming was successful.',
            duration: 3000,
          },
        })
      );
    }
    if (e.detail.error) {
      this.dispatchEvent(
        new CustomEvent('toast', {
          bubbles: true,
          composed: true,
          detail: {
            msg: e.detail.errormsg,
            duration: 3000,
          },
        })
      );
    }
  },

  _fromNow(time) {
    return time && moment(time).isValid()
      ? moment.utc(time).fromNow()
      : 'never';
  },

  itemProbeClasses(machine) {
    if (!machine || !machine.probe) {
      return false;
    }
    if (!machine.probe.ssh || !machine.probe.ssh.loadavg) {
      return false;
    }
    const probe = machine.probe.ssh.loadavg;
    const cores = parseInt(machine.probe.ssh.cores, 10);
    let classes = '';

    classes += this.loadToColor(parseFloat(probe[0] / cores), 'short');
    classes += this.loadToColor(parseFloat(probe[1] / cores), 'mid');
    classes += this.loadToColor(parseFloat(probe[2] / cores), 'long');

    // has probe data
    if (classes !== '') classes += 'hasprobe ';

    return classes;
  },

  loadToColor(load, prefix) {
    if (load > 1.2) return `${prefix}high `;
    if (load > 0.8) return `${prefix}medium `;
    if (load > 0.6) return `${prefix}eco `;
    if (load > 0.2) return `${prefix}low `;
    return `${prefix}low `;
  },

  readableUptime(str) {
    if (str) {
      const a = str.split(' ')[0];
      const b = str.split(' ')[1];
      return `Up ${a}. Idle:${b}`;
    }
    return '';
  },

  _computeMachineImage(_machine, _cloud) {
    const item = this.machine;
    if (!item) return null;
    if (item && item.extra.image && typeof item.extra.image === 'string') {
      return item.extra.image;
    }
    if (item && item.image && typeof item.image !== 'object') {
      if (this.model.images && this.model.images[item.image]) {
        return this.model.images[item.image].name;
      }
      return item.image;
    }
    if (
      item &&
      item.extra.image &&
      item.extra.image.distribution &&
      item.extra.image.name
    ) {
      return `${item.extra.image.distribution} ${item.extra.image.name}`;
    }
    if (
      item &&
      item.extra &&
      item.image_id &&
      this.model.images[item.image_id]
    ) {
      return this.model.images[item.image_id].name;
    }
    if (
      item &&
      item.extra &&
      (item.extra.image_id || item.imageId || item.image_id || item.extra.image)
    ) {
      return (
        item.extra.image_id ||
        item.imageId ||
        item.image_id ||
        item.extra.image.slug ||
        item.extra.image.name
      );
    }
    if (item && item.image && typeof item.image !== 'object') {
      return this.model.images[item.image].name || item.image;
    }
    return 'not found';
  },

  _computeMachineSize(item, _itemChangeRecord, _machines, _clouds) {
    // field could be in the 'extra' section, but should not be an object
    if (item) {
      const itemSize = item.size;

      if (itemSize && typeof itemSize !== 'object')
        return this._getSizeName(item, itemSize);
      if (
        !itemSize &&
        item.extra &&
        item.extra.size &&
        typeof item.extra.size !== 'object'
      )
        return item.extra.size;
      if (item.extra && item.extra.size && item.extra.size.vcpus)
        return `${item.extra.size.vcpus}vcpu, ${item.extra.size.memory}M ram`;
      if (item.extra && item.extra.size && typeof item.extra.size === 'string')
        return item.extra.size;
      if (item.extra && item.extra.instance_type)
        return item.extra.instance_type;
      if (item.extra && item.extra.instance_size)
        return item.extra.instance_size;
      if (item.extra && item.extra.maxCpu && item.extra.maxMemory)
        return `${item.extra.maxCpu}cpu, ${item.extra.maxMemory}M ram`;
      if (item.extra && item.extra.cpu && item.extra.memory)
        return `${item.extra.cpu}cpu, ${item.extra.memory}M ram`;
      if (item.extra && item.extra.PLANID) {
        const cloud = this.model.clouds[item.cloud.id];
        return cloud && cloud.sizes && cloud.sizes[item.extra.PLANID]
          ? `${cloud.sizes[item.extra.PLANID].name}: ${
              cloud.sizes[item.extra.PLANID].ram
            } ram, ${cloud.sizes[item.extra.PLANID].disk} disk, ${
              cloud.sizes[item.extra.PLANID].bandwidth
            } bandwidth`
          : item.extra.PLANID;
      }
      if (item.extra && item.extra.service_type) return item.extra.service_type;
    }
    return '';
  },

  _getSizeName(machine, ret) {
    return this.model.clouds[machine.cloud] &&
      this.model.clouds[machine.cloud].sizes &&
      this.model.clouds[machine.cloud].sizes[ret] &&
      this.model.clouds[machine.cloud].sizes[ret].name
      ? this.model.clouds[machine.cloud].sizes[ret].name
      : ret;
  },

  _getLocationName(machine, cloud) {
    if (!machine || !cloud || !this.model.clouds[machine.cloud]) return '';
    if (this.machine) {
      return this.model.clouds[machine.cloud].locations &&
        this.model.clouds[machine.cloud].locations[machine.location] &&
        this.model.clouds[machine.cloud].locations[machine.location].name !==
          undefined
        ? this.model.clouds[machine.cloud].locations[machine.location].name
        : machine.location;
    }
    return '';
  },

  _getNetworkName(machine) {
    if (!machine) return '';
    if (this.machine) {
      return this.model &&
        this.model.networks &&
        this.model.networks[machine.network] &&
        this.model.networks[machine.network].name !== undefined
        ? this.model.networks[machine.network].name
        : machine.network;
    }
    return '';
  },

  _canLinkToNetwork(network) {
    if (network) {
      return !!(
        this.model &&
        this.model.networks &&
        this.model.networks[this.machine.network]
      );
    }
    return false;
  },

  _probeMachine(_e) {
    const payload = {
      key: this.machineKeys[0].key,
    };
    this.$.probeMachine.headers['Csrf-Token'] = CSRFToken.value;
    this.$.probeMachine.params = payload;
    this.$.probeMachine.generateRequest();
    this.async(() => {
      this.notifyPath('machine.probe.ssh');
    }, 5000);
  },

  _probeError(e) {
    this.dispatchEvent(
      new CustomEvent('toast', {
        bubbles: true,
        composed: true,
        detail: {
          msg: `Error probing machine ${e.detail.request.xhr.responseText}`,
          duration: 3000,
        },
      })
    );
  },

  _computeMachineLogFilter(machine) {
    if (machine)
      return {
        cloud_id: machine.cloud,
        machine_id: machine.machine_id,
      };
    return {};
  },

  _existsImage(extra) {
    if (extra) return extra.image || extra.image_id || extra.imageId;
    return false;
  },

  _computeCloudIcon(cloud) {
    if (!cloud) {
      return '';
    }
    // console.log('cloud', cloud);
    return `./assets/providers/provider-${cloud.replace(/_/g, '')}.png`;
  },

  _computeImageIcon(machine, _probe) {
    if (!machine) {
      return false;
    }
    let image =
      machine.extra.image_id ||
      machine.extra.software_name ||
      machine.operating_system ||
      machine.operating_system_distro ||
      machine.imageId ||
      machine.os_type;
    let imageIcon = '';
    image = image.toLowerCase();

    if (
      machine.probe &&
      machine.probe.ssh &&
      machine.probe.ssh.distro &&
      machine.probe.ssh.distro.toLowerCase().indexOf('clearos') !== -1
    ) {
      imageIcon = 'clearos';
      this.enableWebconfig();
    } else if (image.indexOf('ubuntu') !== -1) imageIcon = 'ubuntu';
    else if (image.indexOf('netbsd') !== -1) imageIcon = 'netbsd';
    else if (image.indexOf('freebsd') !== -1) imageIcon = 'freebsd';
    else if (image.indexOf('openbsd') !== -1) imageIcon = 'openbsd';
    else if (image.indexOf('alpine') !== -1) imageIcon = 'alpine';
    else if (image.indexOf('red hat') !== -1) imageIcon = 'red-hat';
    else if (image.indexOf('gentoo') !== -1) imageIcon = 'gentoo';
    else if (image.indexOf('arch') !== -1) imageIcon = 'arch';
    else if (image.indexOf('coreos') !== -1) imageIcon = 'coreos';
    else if (image.indexOf('mongo') !== -1) imageIcon = 'mongo';
    else if (image.indexOf('clearos') !== -1) {
      imageIcon = 'clearos';
      this.enableWebconfig();
    } else if (image.indexOf('ami-') !== -1) imageIcon = 'aws';
    else if (image.indexOf('centos') !== -1) imageIcon = 'centos';
    else if (image.indexOf('debian') !== -1) imageIcon = 'debian';
    else if (image.indexOf('fedora') !== -1) imageIcon = 'fedora';
    else if (image.indexOf('suse') !== -1) imageIcon = 'suse';
    else if (image.indexOf('linux') !== -1) imageIcon = 'linux';
    else if (image.indexOf('windows') !== -1) imageIcon = 'windows';

    if (imageIcon.length) return `./assets/image-icons/${imageIcon}.svg`;
    return false;
  },

  enableWebconfig() {
    this.set('machine.actions.webconfig', true);
  },

  _getVisibleColumns() {
    return ['type', 'action', 'user_id'];
  },

  _getFrozenLogColumn() {
    return ['time'];
  },

  _getRenderers() {
    const _this = this;
    return {
      time: {
        body: (item, row) => {
          let ret = `<span title="${moment(item * 1000).format()}">${moment(
            item * 1000
          ).fromNow()}</span>`;
          if (row.error)
            ret += '<iron-icon icon="error" style="float: right"></iron-icon>';
          return ret;
        },
      },
      user_id: {
        title: () => {
          return 'user';
        },
        body: item => {
          if (
            _this.model &&
            _this.model.members &&
            item in _this.model.members &&
            _this.model.members[item] &&
            _this.model.members[item].name &&
            _this.model.members[item].name !== undefined
          ) {
            const displayUser =
              _this.model.members[item].name ||
              _this.model.members[item].email ||
              _this.model.members[item].username;
            return `<a href="/members/${item}">${displayUser}</a>`;
          }
          console.log(item);
          return item || '';
        },
      },
    };
  },

  _ratedCost(cost, rate) {
    return ratedCost(cost, rate);
  },

  _hasExtra(_machine) {
    if (this.machine && this.machine.extra)
      return Object.keys(this.machine.extra).length;
    return false;
  },

  _hasPowerInfo(machine) {
    return (
      this._hasExtra(machine) &&
      (this.machine.extra.power_control_info ||
        this.machine.extra.power_supply_info)
    );
  },

  _filterMachinesIncidents(_incarray) {
    if (this.model && this.model.incidentsArray)
      return this.model.incidentsArray.filter(inc => {
        return this._isMachinesIncident(inc);
      });
    return [];
  },

  _isMachinesIncident(inc) {
    if (this.machine) return this.machine.id === inc.machine_id;
    return false;
  },

  // redirect events
  selectAction(e) {
    e.stopImmediatePropagation();
    if (this.shadowRoot.querySelector('#machinesList')) {
      this.shadowRoot
        .querySelector('#machinesList')
        .shadowRoot.querySelector('#actions')
        .selectAction(e);
    }
  },

  _computeMachineR12ns() {
    const ret = [];
    const _this = this;
    if (this.machine && this.model.notificationsArray.length) {
      this.model.notificationsArray.forEach(i => {
        if (
          i.machine &&
          i.machine._ref.$id === _this.machine.id &&
          i.machine._ref.$ref === 'machines' &&
          i._cls === 'Notification.InAppNotification.InAppRecommendation'
        ) {
          ret.push(i);
        }
      });
    }

    return ret;
  },

  _listToString(l) {
    return (l && l.length && l.join(' ')) || '';
  },

  _computePacketLossPercent() {
    if (!this.machine || !this.machine.probe || !this.machine.probe.ping)
      return 0;
    return this.machine.probe.ping.packets_loss;
  },

  _computeProbeString() {
    let sshFrom = '';
    let icmpFrom = '';
    if (!this.machine || !this.machine.probe) return null;
    const sshLastUpdate =
      this.machine.probe.ssh && this.machine.probe.ssh.updated_at;
    const icmpLastUpdate =
      this.machine.probe.ping && this.machine.probe.ping.updated_at;
    sshFrom = (sshLastUpdate && moment.utc(sshLastUpdate).fromNow()) || '';
    icmpFrom = (icmpLastUpdate && moment.utc(icmpLastUpdate).fromNow()) || '';
    if (!sshFrom && !icmpFrom) return '';
    if (sshFrom === icmpFrom) return `${sshFrom} over ssh & icmp`;
    if (sshFrom && icmpFrom)
      return `${sshFrom} over ssh, ${icmpFrom} over icmp`;
    if (sshFrom) return `${sshFrom} over ssh`;
    if (icmpFrom) return `${icmpFrom} over icmp`;
    return '';
  },

  _expirationVerb(time, action) {
    if (moment().isBefore(time)) {
      return action === 'stop' ? 'Will stop' : 'Will be destroyed';
    }
    return action === 'stop' ? 'Stopped' : 'Destroyed';
  },

  _isPast(time) {
    return time && moment(time).isValid() ? !moment().isBefore(time) : true;
  },

  _expirationNotify(secs) {
    if (secs) {
      const seconds = moment.duration(secs, 'seconds');
      if (seconds < 60) return moment.duration(seconds, 'seconds').humanize();
      if (seconds < 3600) return moment.duration(seconds, 'minutes').humanize();
      if (seconds <= 3600 * 24)
        return moment.duration(seconds, 'hours').humanize();
      if (seconds <= 3600 * 24 * 7)
        return moment.duration(seconds, 'days').humanize();
      if (seconds <= 3600 * 24 * 7 * 31)
        return moment.duration(seconds, 'weeks').humanize();
      return moment.duration(seconds, 'months').humanize();
    }
    return '';
  },

  _isEmptyExpiration(_machine) {
    return !this.machine.expiration;
  },

  _computeMachineExpiration(_machine) {
    if (this.isPendingExpirationRequest) {
      this.set('isPendingExpirationRequest', false);
    }
    return (
      this.machine && this.machine.expiration && this.machine.expiration.date
    );
  },

  deleteExpiration() {
    this._showDialog({
      title: 'Delete expiration of machine?',
      body: 'You can always add an expiration date later on.',
      danger: false,
      reason: 'machine.expiration_delete',
      action: 'delete',
    });
  },

  editExpiration() {
    this.$.expirationdialog._openDialog();
  },
});
