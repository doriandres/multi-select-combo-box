import '@vaadin/vaadin-text-field/vaadin-text-field';
import '@vaadin/vaadin-combo-box/vaadin-combo-box-light';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-icons/iron-icons';
import {
  template
} from './multi-select-combo-box.html';
import {
  LitElement
} from 'lit-element';
export class MultiSelectComboBox extends LitElement {
  static get is() {
    return 'multi-select-combo-box';
  }
  static get properties() {
    return {
      items: {
        type: Array
      },
      selectedItems: {
        type: Array
      },
      label: {
        type: String
      },
      displayField: {
        type: String,
        attribute: 'display-field'
      },
      valueField: {
        type: String,
        attribute: 'value-field'
      }
    }
  }
  constructor() {
    super();
    this.items = [];
    this.selectedItems = [];
    this.label = '';
    this.displayField = '';
    this.valueField = '';
  }
  get value(){    
    return this.valueField ? this.selectedItems.map(si => si[this.valueField]) : this.selectedItems;
  }
  render() {
    this.items = [...this.items.sort((a, b)=> this.getItemDisplayText(a).localeCompare(this.getItemDisplayText(b)))];
    return template(this);
  }
  get comboBox() {
    return this.shadowRoot.getElementById('comboBox');
  }
  get textField() {
    return this.shadowRoot.getElementById('textField');
  }
  set comboBoxValue(value) {
    this.comboBox.value = value;
  }
  get comboBoxValue() {
    return this.comboBox.value;
  }
  comboBoxValueChanged({detail : {value : comboBoxValue}}) {
    if (!comboBoxValue) {
      return;
    }

    let selectedItem = this.items.find(item => {
      if (this.valueField != null && this.valueField !== '' && item[this.valueField] != null) {
        return item[this.valueField] == comboBoxValue;
      } else {
        return item == comboBoxValue;
      }
    });

    this.selectedItems = [...this.selectedItems, selectedItem];    
    this.items.splice(this.items.indexOf(selectedItem), 1)
    this.items = [...this.items];    
    this.comboBoxValue = '';
  }
  onTokenClick({target : {item}}) {    
    this.removeSelected(item);    
  }
  removeSelected(item) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.selectedItems = [...this.selectedItems];
    this.items = [...this.items, item];
  }
  onKeyDown(event) {
    if (event.keyCode === 8 && this.selectedItems.length && this.textField.value === '') {
      this.removeSelected(this.selectedItems[this.selectedItems.length - 1]);
    }
  }
  getItemDisplayText(item) {
    return this.displayField ? item[this.displayField] : item;    
  }
}
if (!customElements.get(MultiSelectComboBox.is)) {
  customElements.define(MultiSelectComboBox.is, MultiSelectComboBox);
}