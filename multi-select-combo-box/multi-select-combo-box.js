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


/**
 * @class Class to use for the "multi-select-combo-box" Web Component
 */
export class MultiSelectComboBox extends LitElement {
  constructor() {
    super();
    this.items = [];
    this.selectedItems = [];
    this.label = '';
    this.displayField = '';
    this.valueField = '';
  }

  /**
   * Retrieves the web component tag name
   * @returns {String} Web component tag name
   */
  static get is() {
    return 'multi-select-combo-box';
  }

  /**
   * Retrieves an object containing the Web Component properties, their types and their attributes name
   * @returns {Object} Class properties
   */
  static get properties() {
    return {
      /**
       * Combo Box items
       */
      items: {
        type: Array
      },

      /**
       * Selected items
       */
      selectedItems: {
        type: Array
      },

      /**
       * Field label
       */
      label: {
        type: String
      },

      /**
       * Name of the property of the items to display to identify it
       */
      displayField: {
        type: String,
        attribute: 'display-field'
      },

      /**
       * Name of the property of the item to use as value
       */
      valueField: {
        type: String,
        attribute: 'value-field'
      }
    }
  }

  /**
   * Retrieves the list of selected values of the combo box
   * @returns {Object[]} Array with the selected items on it, if the "valueField" property is declared
   * each element in this array fill be declared to that specific property from the actual selected item,
   * otherwise each element in this array fill be the selected item itself
   */
  get value() {
    return this.valueField ? this.selectedItems.map(si => si[this.valueField]) : this.selectedItems;
  }

  /**
   * @private
   * Retrieves the internal Vaadin combo box light element
   * @returns {ComboBoxLightElement} Vaadin combo box light element
   */
  get comboBox() {
    return this.shadowRoot.getElementById('comboBox');
  }

  /**
   * @private
   * Retrieves the internal Vaadin text field element
   * @returns {TextFieldElement} Vaadin text field element
   */
  get textField() {
    return this.shadowRoot.getElementById('textField');
  }

  /**
   * @private
   * Sets the value to the internal Vaadin combo box light element
   * @param {String} value Value to set
   */
  set comboBoxValue(value) {
    this.comboBox.value = value;
  }

  /**
   * @private
   * Retrieves the value of the internal Vaadin combo box light element
   * @returns {String} Value of the internal Vaadin combo box light element
   */
  get comboBoxValue() {
    return this.comboBox.value;
  }

  /**
   * Retrieves WebComponent template
   * @returns {HTMLTemplateElement} WebComponent template
   */
  render() {
    this.items = [...this.items.sort((a, b) => this.getItemDisplayField(a).localeCompare(this.getItemDisplayField(b)))];
    return template(this);
  }

  /**
   * Handles the internal Vaadin combo box light element changed event
   * @param {Event} event Change event
   */
  comboBoxValueChanged({
    detail: {
      value: comboBoxValue
    }
  }) {
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

  /**
   * Handles the click event from the tokens "x" button
   * @param {Event} event Click event
   */
  onTokenClick({
    target: {
      item
    }
  }) {
    this.removeSelected(item);
  }

  /**
   * Handles the key down events for removing the last token when the "remove" key is pressed
   * @param {Event} event Keyboard event
   */
  onKeyDown(event) {
    if (event.keyCode === 8 && this.selectedItems.length && this.textField.value === '') {
      this.removeSelected(this.selectedItems[this.selectedItems.length - 1]);
    }
  }

  /**
   * Removes the selected item from the list of suggestions of the combo box
   * @param {Object} item 
   */
  removeSelected(item) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.selectedItems = [...this.selectedItems];
    this.items = [...this.items, item];
  }

  /**
   * Retrieves the item display field
   * @param {Object} item 
   * @returns {String} The item display field
   */
  getItemDisplayField(item) {
    return this.displayField ? item[this.displayField] : item;
  }
}

if (!customElements.get(MultiSelectComboBox.is)) {
  customElements.define(MultiSelectComboBox.is, MultiSelectComboBox);
}