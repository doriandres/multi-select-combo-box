import {html} from 'lit-element';
import {styles} from './multi-select-combo-box.css';
export const template = function (instance) { return (function () {
    return html `
        ${styles}
        <vaadin-combo-box-light id="comboBox" .items=${this.items} item-value-path=${this.valueField} item-label-path=${this.displayField} @value-changed=${this.comboBoxValueChanged}>
            <vaadin-text-field id="textField" @keydown=${this.onKeyDown} label=${this.label}>
                <div id="tokens" slot="prefix">
                    ${
                        this.selectedItems.map(item => html`
                            <div class="token">
                                ${this.getItemDisplayField(item)}
                                <iron-icon icon="icons:close" .item=${item} @click=${this.onTokenClick}></iron-icon>
                            </div>
                        `)
                    }
                </div>
            </vaadin-text-field>
        </vaadin-combo-box-light>
    `;
}).bind(instance)();}