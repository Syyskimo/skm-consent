# skm-consent

This is a webcomponent thingybob done with [Svelte](https://svelte.dev). It (tries) to make cookie-consent box via webcomponent. 


*Note that you will need to have [Node.js](https://nodejs.org) installed.*

*Except, if you don't want to. You can just get wicked pre-build javascript*


## Get started with development

Install the dependencies...

```bash
cd skm-cookie
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000), or whatever the node-monster tells you to. There will be found some examples on how to use 

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`. But then again. Why would you?

If you're using [Visual Studio Code](https://code.visualstudio.com/) ~~we~~ the Svelte-guys, from whom I copied the base for readme, recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

And if you're using webstorm etc JetBrains stack, try to navigate to "plugins" and search for "svelte". Isn't really that hard.


## How to use
1. Just import the public/build/bundle.js to any webpage/service/store/whatever
2. Add <skm-consent> with needed params and <skm-cookie>s
3. Listen for "skmcookieconsent" or read from cookie (see "consentcookie" -parameter) to know that consent is given. And then do the hussle and serve only the right cookies.


## What is/are... 

### ... Happening when consent is given
Well, then we set the given cookies (the cookie-names) in the cookie. And also fire an event "skmcookieconsent"

### ...The parameters for consents-component
    debug="true", if wanted debug. Omit if not wanted
    consentcookie="somecookiename", the name of cookie used (auto-save cookie with that name)
    texttogglemore="text for toggle more info -button"
    texttoggleless="text for toggle less info -button"
    textrequired="Text to accept only the necessary"
    textdefault="Text to accept the recommended"
    textoptional="Text to accept everything"
    textchosen = "Text to accept the chosen ones"

### ... The css-variables used

These are some examples

    --skm-cookie-checked-color: green;
    --skm-cookie-unchecked-color: red;
    --skm-consent-border: 10px dashed red;
    --skm-consent-max-width: 1200px;
    --skm-consent-bg: rgba(255,255,255,0.8);
    --skm-font: 16px/30px 'comic sans', cursive;
    --skm-color: 'red';


## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

... But really. All you need is the build .js (by default found in public/build/bundle.js). Just drop that to _anywhere_. Like really. Start by trying on static html-page and after that you can go to some heavier stuff. Or if you're being lazy, you could just navigate on your filesystem to public/index.html and it should work. Even without any magical node-server etc.


## Deploying to the web

Just copy the damn file (the js). But of course you probably want to add "npm run custom-utra-build" in your docker-monster and million other production tools. But who knows. Who am I to blame anyone? 

