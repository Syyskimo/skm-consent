<svelte:options tag="skm-cookie" />
<script>
    export let title = 'My cookie';
    export let name = 'anonymous';
    // required | default | optional
    export let type = 'required';
    const allowedTypes = ['required', 'default', 'optional'];

    let el;

    let cookieChecked = type != 'optional';

    function dispatchState(isChecked) {
        type = (allowedTypes.includes(type) ? type : 'optional');
        let event = new CustomEvent('skmcookie', {
            detail: {'cookie': name, 'val': cookieChecked, 'type': type},
            bubbles: true,
            composed: true, // needed for the event to traverse beyond shadow dom
        })
        dispatchEvent(event);
    }
    // bound on change
    $: {
        dispatchState(cookieChecked);
    }

</script>

<div class="main" bind:this={el}>
    <div class="option">
        <div class="title {type}">{title}</div>
        <label class="switch">
            <input type="checkbox" bind:checked={cookieChecked} disabled={type == 'required'}>
            <span class="slider round"></span>
        </label>
    </div>
</div>

<style>
    .main {
        box-sizing: border-box;
        margin-bottom: 8px;
        font-family: var(--cookie-font, Verdana, sans-serif);
    }

    .option {
        display: flex;
        line-height: 34px;
    }
    .option:hover {
        background-color: rgba(0,0,0,0.1);
    }
    .title {
        font-size: 24px;
        flex-grow: 1;
    }
    .title.required:after {
        color: var(--cookie-checked-color, #2196F3);;
        content: ' *';
        display:inline;
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--cookie-unchecked-color, #ccc);
        -webkit-transition: .25s;
        transition: .25s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .25s;
        transition: .25s;
    }

    input:checked + .slider {
        background-color: var(--cookie-checked-color, #2196F3);
    }

    input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }
</style>