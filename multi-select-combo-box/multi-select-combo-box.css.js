import { html } from "@polymer/polymer";

export const styles = html`
<style>
    :host {
        display: block;
        width: 400px;
    }

    vaadin-combo-box-light {
        display: block;
        width: 100%;
    }

    vaadin-text-field {
        width: 100%;
    }

    #tokens {
        display: flex;
        max-width: 100%;
        overflow: hidden;
    }

    .token {
        font-size: .875rem;
        display: flex;
        padding: 0.25rem;
        border-radius: 0.125em;
        background-color: hsla(214, 53%, 23%, 0.16);
        margin-right: 0.25rem;
        cursor: pointer;
        white-space: nowrap;
    }

    iron-icon {
        --iron-icon-width: .875rem;
        --iron-icon-height: .875rem;
    }
</style>
`;