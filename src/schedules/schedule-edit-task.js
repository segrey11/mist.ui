import '../../node_modules/@polymer/polymer/polymer-legacy.js';
import '../../node_modules/@polymer/paper-styles/typography.js';
import '../../node_modules/@vaadin/vaadin-dialog/vaadin-dialog.js';
import '../../node_modules/@polymer/paper-button/paper-button.js';
import '../../node_modules/@polymer/paper-input/paper-input.js';
import '../../node_modules/@polymer/paper-toggle-button/paper-toggle-button.js';
import '../../node_modules/@polymer/neon-animation/animations/scale-up-animation.js';
import '../../node_modules/@polymer/neon-animation/animations/fade-out-animation.js';
import '../../node_modules/@polymer/paper-listbox/paper-listbox.js';
import moment from '../../node_modules/moment/src/moment.js';
import { CSRFToken } from '../helpers/utils.js';
import { Polymer } from '../../node_modules/@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '../../node_modules/@polymer/polymer/lib/utils/html-tag.js';

Polymer({
  _template: html`
    <style include="shared-styles dialogs forms">
      .submit-btn {
        background-color: var(--mist-blue);
        color: #fff;
      }

      .smaller {
        font-size: 0.9em;
        opacity: 0.54;
      }

      paper-dialog#editScheduleModal {
        width: 500px !important;
      }

      paper-button {
        margin: 0 0.29em !important;
      }

      .progress {
        overflow: hidden;
        margin: 0 -24px;
      }
      paper-progress {
        width: 100%;
      }
      paper-progress#progresserror ::slotted(#primaryProgress) {
        background-color: var(--red-color);
      }
      .errormsg-container {
        color: rgba(255, 255, 255, 0.54);
      }
      .errormsg-container iron-icon {
        color: var(--red-color);
        margin: 8px;
      }
      paper-radio-button[checked],
      .background {
        background-color: #eee;
      }
      .background {
        padding: 16px;
        max-height: 300px;
      }
      paper-checkbox {
        display: block;
      }
      #datetime {
        display: inline-block;
        margin-left: 8px;
      }
      #date.invalid-true {
        color: var(--red-color) !important;
      }
      #date.invalid-true iron-icon {
        fill: var(--red-color) !important;
      }
    </style>

    <vaadin-dialog id="editScheduleModal" theme="mist-dialog" with-backdrop="">
      <template>
        <h2>Edit Schedule Task</h2>
        <div class="paper-dialog-scrollable">
          <h4>Task Type</h4>
          <div>
            <paper-radio-group selected="{{taskType}}">
              <paper-radio-button name="action" tabindex="1"
                >Perform action</paper-radio-button
              >
              <paper-radio-button name="script" tabindex="1"
                >Run script</paper-radio-button
              >
            </paper-radio-group>
          </div>
          <div class="background" hidden$="[[!_computeIsAction(taskType)]]">
            <paper-dropdown-menu label="action">
              <paper-listbox
                slot="dropdown-content"
                attr-for-selected="value"
                selected="{{newSchedule.action}}"
                class="dropdown-content"
              >
                <template is="dom-repeat" items="[[actions]]" as="action">
                  <paper-item value="[[action.name]]" tabindex="1"
                    >[[action.name]]</paper-item
                  >
                </template>
              </paper-listbox>
            </paper-dropdown-menu>
          </div>
          <div class="background" hidden$="[[_computeIsAction(taskType)]]">
            <paper-dropdown-menu label="script">
              <paper-listbox
                slot="dropdown-content"
                attr-for-selected="value"
                selected="{{newSchedule.script_id}}"
                class="dropdown-content"
              >
                <template is="dom-if" if="[[!scripts.length]]">
                  <paper-item disabled="">no scripts found</paper-item>
                </template>
                <template is="dom-repeat" items="[[scripts]]" as="script">
                  <paper-item value="[[script.id]]" tabindex="1"
                    >[[script.name]]</paper-item
                  >
                </template>
              </paper-listbox>
            </paper-dropdown-menu>
            <paper-textarea
              label="parameters"
              value="{{newSchedule.params}}"
            ></paper-textarea>
          </div>

          <h4>Task Schedule</h4>
          <div>
            <paper-radio-group selected="{{newSchedule.schedule_type}}">
              <paper-radio-button name="interval" tabindex="1"
                >Interval</paper-radio-button
              >
              <paper-radio-button name="crontab" tabindex="1"
                >Crontab</paper-radio-button
              >
              <paper-radio-button name="one_off" tabindex="1"
                >One off</paper-radio-button
              >
            </paper-radio-group>
          </div>
          <div
            class="background"
            hidden$="{{!_computeIsInterval(newSchedule.schedule_type)}}"
          >
            <paper-input
              id="interval"
              value="{{newSchedule.schedule_entry.every}}"
              tabindex="1"
            ></paper-input>
            <paper-radio-group
              id="period"
              selected="{{newSchedule.schedule_entry.period}}"
            >
              <paper-radio-button name="days" tabindex="1"
                >days</paper-radio-button
              >
              <paper-radio-button name="hours" tabindex="1"
                >hours</paper-radio-button
              >
              <paper-radio-button name="minutes" tabindex="1"
                >mins</paper-radio-button
              >
            </paper-radio-group>
            <div class="smaller">eg. every 10 minutes</div>
          </div>
          <div
            class="background"
            hidden$="{{!_computeIsCrontab(newSchedule.schedule_type)}}"
          >
            <paper-input
              id="crontab"
              value="{{crontabEntry}}"
              tabindex="1"
            ></paper-input>
            <span class="smaller"
              >UTC Time only. Example */10 5 * * * . Space separated values for
              Minute, Hour, Day of the Month, Month of the Year, Day of the
              Week.</span
            >
          </div>
          <div
            class="background"
            hidden$="{{!_computeIsOneOff(newSchedule.schedule_type)}}"
          >
            <div id="date" class$="simple-button invalid-[[invalidDatetime]]">
              <iron-icon icon="schedule"></iron-icon>
              [[_displayDate(datetime)]]
              <paper-input
                id="datetime"
                type="datetime-local"
                value="{{datetime}}"
              ></paper-input>
            </div>
          </div>
          <div class="clearfix btn-group">
            <paper-button tabindex="1" on-tap="_closeEditScheduleModal"
              >Cancel</paper-button
            >
            <paper-button
              class="blue"
              on-tap="_submitForm"
              tabindex="1"
              disabled$="[[!formReady]]"
              >Save</paper-button
            >
          </div>
        </div>
      </template>
    </vaadin-dialog>

    <iron-ajax
      id="editSchedule"
      url="/api/v1/schedules/[[schedule.id]]"
      method="PATCH"
      loading="{{sendingData}}"
      on-response="_handleScheduleEditResponse"
      on-error="_handleScheduleEditError"
    ></iron-ajax>
  `,

  is: 'schedule-edit-task',

  properties: {
    schedule: {
      type: Object,
    },
    scripts: {
      type: Array,
    },
    newSchedule: {
      type: Object,
      notify: true,
    },
    formReady: {
      type: Boolean,
      value: false,
    },
    sendingData: {
      type: Boolean,
      value: false,
    },
    payload: {
      type: Object,
      value: {},
    },
    scheduleEntry: {
      type: String,
    },
    datetime: {
      type: String,
    },
    now: {
      type: String,
    },
    taskType: {
      type: String,
    },
    action: {
      type: String,
    },
    scriptId: {
      type: String,
    },
    actions: {
      type: Array,
      value: [
        {
          name: 'reboot',
          icon: 'av:replay',
          confirm: true,
          multi: true,
        },
        {
          name: 'start',
          icon: 'av:replay',
          confirm: true,
          multi: true,
        },
        {
          name: 'stop',
          icon: 'av:stop',
          confirm: true,
          multi: true,
        },
        {
          name: 'destroy',
          icon: 'delete',
          confirm: true,
          multi: true,
        },
      ],
    },
    crontabEntry: {
      type: String,
    },
  },

  observers: [
    '_computeNewSchedule(schedule.*)',
    '_crontabEntryChanged(crontabEntry)',
    '_datetimeChanged(datetime)',
    '_updatePayload(newSchedule.*)',
  ],

  listeners: {},

  _computeNewSchedule(_schedule) {
    this.set('now', moment());
    if (this.schedule) {
      const newSchedule = {
        action: this._computeAction(this.schedule.task_type),
        script_id: this._computeScript(this.schedule.task_type),
        schedule_type: this.schedule.schedule_type,
        params: this.schedule.task_type.params,
      };
      this.set('newSchedule', newSchedule);

      if (newSchedule.schedule_type === 'interval') {
        this.set('newSchedule.schedule_entry', { every: '', period: '' });
        this.set(
          'newSchedule.schedule_entry.every',
          this.schedule.schedule_entry.every
        );
        this.set(
          'newSchedule.schedule_entry.period',
          this.schedule.schedule_entry.period
        );
      } else if (newSchedule.schedule_type === 'crontab') {
        this.set(
          'crontabEntry',
          this._stringifyCrontab(this.schedule.schedule_entry)
        );
        this.set('newSchedule.schedule_entry', this.schedule.schedule_entry);
      } else if (newSchedule.schedule_type === 'one_off') {
        this.set('newSchedule.schedule_entry', { entry: '' });
        this.set(
          'newSchedule.schedule_entry.entry',
          this.schedule.schedule_entry.entry
        );
        this.set(
          'datetime',
          moment
            .utc(this.schedule.schedule_entry.entry)
            .local()
            .format('YYYY-MM-DDTHH:mm')
        );
      }

      this.taskType =
        this._computeAction(this.schedule.task_type) !== undefined
          ? 'action'
          : 'script';
    }
  },

  _computeIsInterval(scheduleType) {
    return scheduleType === 'interval';
  },

  _computeIsCrontab(scheduleType) {
    return scheduleType === 'crontab';
  },

  _computeIsOneOff(scheduleType) {
    return scheduleType === 'one_off';
  },

  _computeIsAction(taskType) {
    if (taskType && taskType === 'action') {
      return true;
    }
    return false;
  },

  _computeAction(task) {
    if (task && task.action) {
      return task.action;
    }
    return '';
  },

  _computeScript(task) {
    if (task && task.script_id) {
      return task.script_id;
    }
    return '';
  },

  _stringifyCrontab(entry) {
    let scheduleEntry = '';
    if (
      this.newSchedule.schedule_type === 'crontab' &&
      entry &&
      typeof entry === 'object'
    ) {
      scheduleEntry = `${entry.minute} ${entry.hour} ${entry.day_of_month} ${entry.month_of_year} ${entry.day_of_week}`;
      return scheduleEntry;
    }
    if (entry && typeof entry === 'string') {
      return entry;
    }

    return '';
  },

  _openEditScheduleModal(_e) {
    this.$.editScheduleModal.opened = true;
  },

  _closeEditScheduleModal(_e) {
    this.$.editScheduleModal.opened = false;
    this._formReset();
  },

  _submitForm(_e) {
    this.$.editSchedule.body = this.payload;
    this.$.editSchedule.headers['Content-Type'] = 'application/json';
    this.$.editSchedule.headers['Csrf-Token'] = CSRFToken.value;
    console.log('payload', this.payload);
    this.$.editSchedule.generateRequest();
  },
  /* eslint-disable no-param-reassign */
  _formReset() {
    // reset form dropdown menus
    const menus = this.shadowRoot.querySelectorAll('paper-listbox');
    Array.prototype.forEach.call(menus, m => {
      m.selected = -1;
    });

    this.set('payload', {});
    this._computeNewSchedule(this.schedule);
  },
  /* eslint-enable no-param-reassign */
  _modalClosed(e) {
    if (e.target === this.$.editScheduleModal) this._formReset();
  },

  _handleScheduleEditResponse(_e) {
    this._closeEditScheduleModal();
  },

  _handleScheduleEditError(e) {
    let message = e.detail.error;
    if (e.detail.request.statusText)
      message += ` ${e.detail.request.statusText}`;

    this.dispatchEvent(
      new CustomEvent('toast', {
        bubbles: true,
        composed: true,
        detail: { msg: message, duration: 5000 },
      })
    );
  },

  _updatePayload(_e) {
    const pl = {};
    if (this.schedule && this.newSchedule) {
      // check if task changed
      if (
        this.taskType === 'action' &&
        this._computeAction(this.schedule.task_type) !== this.newSchedule.action
      ) {
        pl.action = this.newSchedule.action;
      } else if (
        this.taskType === 'script' &&
        (this.schedule.task_type.script_id !== this.newSchedule.script_id ||
          this.schedule.task_type.params !== this.newSchedule.params)
      ) {
        pl.script_id = this.newSchedule.script_id;
        pl.params = this.newSchedule.params;
      }
      // check if entry changed
      if (this.schedule.schedule_type !== this.newSchedule.schedule_type) {
        pl.schedule_type = this.newSchedule.schedule_type;
        // clear max run count when editing form one_off to other type
        if (
          pl.schedule_type !== 'one_off' &&
          this.schedule.schedule_type === 'one_off'
        )
          pl.max_run_count = '';
        else delete pl.max_run_count;
      }
      if (
        this.schedule.schedule_entry &&
        this.newSchedule.schedule_entry &&
        this.newSchedule.schedule_type &&
        JSON.stringify(this.schedule.schedule_entry) !==
          JSON.stringify(
            this._computePayloadEntry(this.newSchedule.schedule_entry)
          )
      ) {
        pl.schedule_entry = this._computePayloadEntry(
          this.newSchedule.schedule_entry,
          this.newSchedule.schedule_type,
          this.datetime
        );
      }
      this.set('payload', pl);
    }
    this._updateformReady(this.sendingData);
  },

  _computePayloadEntry(_entry, _type, _datetime) {
    if (this.newSchedule.schedule_type === 'interval') {
      return {
        every: this.newSchedule.schedule_entry.every,
        period: this.newSchedule.schedule_entry.period,
      };
    }
    if (this.newSchedule.schedule_type === 'crontab') {
      return this._processCrontab(this.crontabEntry);
    }
    if (this.newSchedule.schedule_type === 'one_off') {
      return moment(this.datetime).utc().format('YYYY-MM-DD HH:mm:ss');
    }
    return null;
  },

  _processCrontab(entry) {
    const chunchs = entry.split(' ');
    for (let i = 0; i < 5; i++) {
      if (!chunchs[i]) chunchs[i] = '*';
    }
    const diff = moment().utcOffset() / 60;
    const construct = {
      minute: chunchs[0],
      hour: chunchs[1],
      day_of_month: chunchs[2],
      month_of_year: chunchs[3],
      day_of_week: chunchs[4],
    };
    if (construct.hour !== '*' && parseInt(chunchs[1], 10) && diff) {
      construct.hour = ((parseInt(chunchs[1], 10) - diff) % 24).toString();
    }
    return construct;
  },

  _updateformReady(_sendingData) {
    console.log('_updateformReady');
    // not sending data && payload has at least one property
    if (!this.sendingData && JSON.stringify(this.payload) !== '{}') {
      // check valid values if needed
      if (
        ((this.newSchedule.schedule_type === 'interval' ||
          this.payload.schedule_type === 'interval') &&
          this.payload.schedule_entry &&
          !this._isValidInterval(this.payload.schedule_entry)) ||
        ((this.newSchedule.schedule_type === 'crontab' ||
          this.payload.schedule_type === 'crontab') &&
          this.payload.schedule_entry &&
          !this._isValidCrontab(this.payload.schedule_entry))
      ) {
        this.set('formReady', false);
      } else {
        this.set('formReady', true);
      }
    } else {
      this.set('formReady', false);
    }
  },

  _isValidInterval(entry) {
    return entry && parseInt(entry.every, 10) && entry.period;
  },

  _isValidCrontab(entry) {
    let string = '';
    string = `${entry.minute}${entry.hour}${entry.day_of_week}${entry.day_of_month}${entry.month_of_year}`;
    return (
      entry &&
      string.trim() !== '' &&
      string.trim() !== '*****' &&
      string.indexOf('undefined') === -1
    );
  },

  _displayDate(date) {
    if (!date || date.trim() === '') {
      return 'never';
    }
    if (!moment(date).isValid()) {
      return 'Invalid date';
    }
    const a = moment.utc(this.schedule.schedule_entry.entry).local();
    return a.fromNow();
  },

  _datetimeChanged(datetime) {
    this._validate(datetime);
  },

  _validate(date) {
    let invalid = true;
    const now = moment();
    if (
      !date ||
      !moment(date).isValid() ||
      moment.utc(date).local().isBefore(now)
    ) {
      invalid = true;
    } else {
      invalid = false;
    }
    this.set('invalidDatetime', invalid);
    this._updatePayload();
  },

  _crontabEntryChanged(crontab) {
    if (
      this.schedule &&
      this._computeIsCrontab(this.newSchedule.schedule_type) &&
      crontab.value
    ) {
      this.set(
        'newSchedule.schedule_entry',
        this._processCrontab(crontab.value)
      );
    }
  },
});
