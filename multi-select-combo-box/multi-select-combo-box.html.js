import { html } from "@polymer/polymer";
import { styles } from './multi-select-combo-box.css';
export const template = html`
${styles}
<vaadin-combo-box-light id="comboBox" items="[[items]]" value="{{comboBoxValue}}" item-value-path="[[valueField]]" item-label-path="[[displayField]]">
    <template>[[getItemDisplayText(item)]]</template>
    <vaadin-text-field on-keydown="onKeyDown" label="[[label]]" id="textField">
        <div slot="prefix" id="tokens">
            <template is="dom-repeat" items="[[selectedItems]]">
                <div class="token" on-click="onTokenClick">[[getItemDisplayText(item)]]
                    <iron-icon icon="icons:close"></iron-icon>
                </div>
            </template>
        </div>
    </vaadin-text-field>
</vaadin-combo-box-light>
`;