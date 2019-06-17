import '@webcomponents/webcomponentsjs/webcomponents-loader'
import '@polymer/iron-demo-helpers/demo-pages-shared-styles'
import './multi-select-combo-box/multi-select-combo-box'
import {
    LitElement, html
} from 'lit-element';



class MyComponent extends LitElement {
    static get is(){
        return 'my-component';
    }
    get multiSelectComboBox() {
        return this.shadowRoot.querySelector('multi-select-combo-box');
    }
    get items() {
        return [{
            "id": 1,
            "name": "Name1"
        }, {
            "id": 2,
            "name": "Name2"
        }, {
            "id": 3,
            "name": "Name3"
        }, {
            "id": 4,
            "name": "Name4"
        }, {
            "id": 5,
            "name": "Name5"
        }];
    }
    render() {
        return html `
            <multi-select-combo-box .items=${this.items} @change=${this.onChange} value-field="id" display-field="name">
            </multi-select-combo-box>
        `;
    }
    onChange(event) {
        console.dir(event);
        console.dir(this.multiSelectComboBox.value);
    }
}

customElements.define(MyComponent.is, MyComponent);