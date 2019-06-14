import {PolymerElement} from '@polymer/polymer/polymer-element';
import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box-light';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import {template} from './multi-select-combo-box.html';
export class MultiSelectComboBox extends PolymerElement {
    static get is() {
      return 'multi-select-combo-box';
    }
    static get properties() {
      return {
        items: {
          type: Object,
          value: () => []
        },
        selectedItems: {
          value: () => [],
          notify: true
        },
        label: String,
        comboBoxValue: Object,
        displayField: {
          type: String
        },
        valueField: {
          type: String
        }
      }
    }
    static get observers() {
      return [
        'comboBoxValueChange(comboBoxValue)'
      ]
    }
    static get template(){
        return template;
    }
    comboBoxValueChange(comboBoxValue) {
      if (comboBoxValue) {
        var selectedItem = this.items.find(item => {
          if (this.valueField != null && this.valueField !== '' && item[this.valueField] != null) {
            return item[this.valueField] == comboBoxValue;
          }
          return item == comboBoxValue;
        });
        this.push('selectedItems', selectedItem);
        this.splice('items', this.items.indexOf(selectedItem), 1);
      }
      this.comboBoxValue = '';
      setTimeout(() => {
        this.$.comboBox.$.overlay._selectedItem = '';
        this.$.textField.value = '';
      });
    }
    onTokenClick(event) {
      this.removeSelected(event.model.item);
      event.stopPropagation();
    }
    removeSelected(item) {
      this.splice('selectedItems', this.selectedItems.indexOf(item), 1);
      this.push('items', item);
    }
    onKeyDown(event) {
      if (event.keyCode === 8 && this.selectedItems.length && this.$.tf.value === '') {
        this.removeSelected(this.selectedItems[this.selectedItems.length - 1]);
      }
    }
    getItemDisplayText(item) {
      if (this.displayField != null && this.displayField !== '') {
        if (item[this.displayField] != null) {
          return item[this.displayField];
        }
      }
      return item;
    }
}
if(!customElements.get(MultiSelectComboBox.is)){
  customElements.define(MultiSelectComboBox.is, MultiSelectComboBox);
}