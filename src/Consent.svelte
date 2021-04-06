<svelte:options tag="skm-consent" />
<script>
	import { fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import fix from './transfix.js'
	import {setCookie, getCookie, isBlank} from './cookie_utlis';

	export let title = 'awesome cookie handler!';
	export let consentcookie = 'skm-cookie';
	export let textrequired = 'Agree required';
	export let textdefault = 'Agree preferred';
	export let textoptional = 'Agree all';
	export let texttoggle = '';
	export let textchosen = 'Agree on chosen';
	export let debug = false;

	// texts and types could be wrapped in object/arrays
	// but then again it makes code somewhat not-easy-to-read
	// so let's go with this ugly way (may differ in future)

	let optionRequired = false;
	let optionOptional = false;
	let optionDefault = false;
	let showExtra = false;
	let shown = false;

	const cookies = {};


	function toggle()
	{
		showExtra = !showExtra;
	}

	function handleCookie(event)
	{
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
			composed: true, // needed for the event to traverse beyond shadow dom
		})
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
		if (debug) {
			console.log('Debug cookie-clear enabled, refresh page to see cookie-consent');
			setCookie(consentcookie, "");
		}
	});
</script>
<svelte:window on:skmcookie={handleCookie}/>

<div class="wrap" class:hidden={!shown}>
	<h2 >{title}</h2>
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
		<div class="wrapstart" class:hidden={!texttoggle}>
			<div class="button toggle" on:click={toggle}>{texttoggle}</div>
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
	}
	.actionbar {
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
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
		width: var(--cookie-width, 800px);
		max-width: 100%;
		padding: 20px;

		background-color: var(--cookie-bg-color, white);
		border: 4px solid;
		border-color: var(--cookie-border-color, grey);

	}
	.wrap.shown {
		display: block ;
	}
	.hidden {
		display: none !important;
		flex-grow: 0;
	}
</style>