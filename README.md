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

Navigate to [localhost:5000](http://localhost:5000), or whatever the node-monster tells you to. What you got there is just static html-file that uses the skm-cookie-consent 

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`. But then again. Why would you?

If you're using [Visual Studio Code](https://code.visualstudio.com/) ~~we~~ the Svelte-guys, from whom I copied the base for readme, recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

And if you're using webstorm etc JetBrains stack, try to navigate to "plugins" and search for "svelte". Isn't really that hard.


## What to do after that?

1. Just import the public/build/bundle.js to any webpage/service/store/whatever
2. Add <skm-consent> with needed params and <skm-cookie>:s
3. Come back here, for you don't know what they are
4. See the public/index.html for example.
5. Wait for me finish the product so you can get better documentation
6. ...
7. No profit

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

... But really. All you need is the build .js (by default found in public/build/bundle.js). Just drop that to _anywhere_. Like really. Start by trying on static html-page and after that you can go to some heavier stuff. Or if you're being lazy, you could just navigate on your filesystem to public/index.html and it should work. Even without any magical node-server etc.


## Deploying to the web

Just copy the damn file (the js). But of course you probably want to add "npm run custom-utra-build" in your docker-monster and million other production tools. But who knows. Who am I to blame anyone? 

