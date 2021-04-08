<svelte:options tag="skm-consent" />
<script>
	import { fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import fix from './transfix.js'
	import {setCookie, getCookie, isBlank} from './cookie_utlis';

	/* Name of the cookie, that's used check and save to choises */
	export let consentcookie = 'skm-cookie';

	/* Texts used in component */
	export let textrequired = 'Agree required';
	export let textdefault = 'Agree preferred';
	export let textoptional = 'Agree all';
	export let texttogglemore = '';
	export let texttoggleless = 'Hide details';
	export let textchosen = 'Agree on chosen';

	/* Debug (show some debug info in console, if in use */
	export let debug = false;

	// texts and types could be wrapped in object/arrays
	// but then again it makes code somewhat not-easy-to-read
	// and might have issues with Svelte's value-checking (or might not, don't want to test :D)
	// so let's go with this ugly way (may differ in future)

	// which options are available
	// checked in mount ("constructor")
	let optionRequired = false;
	let optionOptional = false;
	let optionDefault = false;

	// toggle for showing the extra-info
	let showExtra = false;
	// Is the whole cookie consent show at all
	let shown = false;

	// the cookies within
	// populated when cookies inform about themselves
	const cookies = {};


	function toggle()
	{
		showExtra = !showExtra;
	}

	function handleCookie(event)
	{
		event.stopPropagation();
		cookies[event.detail.cookie] = {name: event.detail.cookie, value: event.detail.val, type: event.detail.type};
		checkState();
	}

	function consent(method)
	{
		const agreed = [];
		for (const cookieKey in cookies)
		{
			const cookie = cookies[cookieKey];
			if (method == 'chosen' && cookie.value) agreed.push(cookie.name);
			else if (method == 'required' && cookie.type == 'required') agreed.push(cookie.name);
			else if (method == 'default' && (cookie.type == 'required' || cookie.type == 'default')) agreed.push(cookie.name);
			else if (method == 'optional') agreed.push(cookie.name);
		}
		setCookie(consentcookie, agreed.join('|'), 1);

		let event = new CustomEvent('skmcookieconsent', {
			detail: {'agreed': agreed, 'allCookies': cookies},
			bubbles: true,
			composed: true,
		});

		dispatchEvent(event);
		if (debug) {
			console.log("Consent got to:");
			console.log(agreed);
			console.log('Dispatched event:');
			console.log(event);
		}

		shown = false;
	}

	function checkState()
	{
		for (const cookie in cookies)
		{
			switch (cookies[cookie].type) {
				case 'required':
					optionRequired = true;
					break;
				case 'default':
					optionDefault = true;
					break;
				case 'optional':
					optionOptional = true;
					break;
			}
		}
	}

	onMount(async () => {
		await tick();
		shown = isBlank(getCookie(consentcookie));
		if (!shown && debug) {
			console.log('Debug cookie-clear enabled, refresh page to see cookie-consent');
			setCookie(consentcookie, "");
		}
	});
</script>
<svelte:window on:skmcookie={handleCookie}/>

<div class="wrap" class:hidden={!shown}>
	<slot name="title"></slot>
	<div class="basic" >
		<slot class="shortdesc" name="shortdesc"></slot>
	</div>
{#if showExtra}
	<div class="extra" transition:fix(fade)>
		<slot class="longdesc" name="longdesc"></slot>
		<slot id="cookies" name="cookies"></slot>
	</div>
{/if}
	<div class="actionbar">
		<div class="wrapstart" class:hidden={!texttogglemore}>
			<div class="button toggle" on:click={toggle}>{showExtra ? texttoggleless : texttogglemore}</div>
		</div>
		<div class="button chosen" on:click={() => consent("chosen")} class:hidden={!showExtra} >{textchosen}</div>
		<div class="button required" on:click={() => consent("required")} class:hidden={showExtra || !optionRequired}>{textrequired}</div>
		<div class="button default" on:click={() => consent("default")} class:hidden={showExtra || !optionDefault}>{textdefault}</div>
		<div class="button optional" on:click={() => consent("optional")} class:hidden={showExtra || !optionOptional}>{textoptional}</div>
	</div>
</div>


<style>
	* {
		box-sizing: border-box;
		font-family: var(--cookie-font, Verdana, sans-serif);
		font: var(--skm-font, 16px);
		color: var(--skm-color, black);
	}
	.actionbar {
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		flex-wrap: wrap;
		margin-top: 5px;
	}
	.button {
		display:inline-block;
		padding: 0.35em 1.2em;
		border: 0.1em solid #FFFFFF;
		background-color:#000000;
		margin:0 0.3em 0.3em 0;
		border-radius:0.12em;
		box-sizing: border-box;
		text-decoration:none;
		font-weight:300;
		color:#FFFFFF;
		text-align:center;
		transition: all 0.2s;
	}
	.button.toggle {
		align-self: flex-start;
	}
	.button:hover{
		cursor: pointer;
		color:#000000;
		background-color:#FFFFFF;
	}
	.wrapstart {
		flex-grow: 1;
		justify-content: flex-start;
	}


	@media all and (max-width:30em){
		.button{
			display:block;
			margin:0.4em auto;
		}
	}


	.wrap {
		position: fixed;
		bottom: 20px;
		display: block;
		left: 50%;
		transform: translateX(-50%);
		width: var(--skm-consent-max-width, 800px);
		max-width: 100%;
		padding: 20px;
		max-height: calc(100% - 40px);
		overflow-y: auto;
		overflow-x: hidden;

		background: var(--skm-consent-bg, white);
		border: var(--skm-consent-border, 4px solid grey);

	}
	.wrap.shown {
		display: block ;
	}
	.hidden {
		display: none !important;
		flex-grow: 0;
	}
</style>