
const editor = grapesjs.init({
// Indicate where to init the editor. You can also pass an HTMLElement
container: '#gjs',
// Get the content for the canvas directly from the element
// As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
fromElement: true,
// Size of the editor
height: '500px',
width: 'auto',
// Disable the storage manager for the moment
storageManager: { type: null },
// Avoid any default panel
allowScripts: 1,
canvas: {
    scripts: ['https://unpkg.com/arweave/bundles/web.bundle.js']
  },

panels: { defaults: [] },
plugins: ['gjs-preset-webpage'],
pluginsOpts: {
        'gjs-preset-webpage': {
          // options
			
			
			
			
			
		},
},
	

	
	
	
blockManager: {
  appendTo: '#blocks',
  blocks: [
    {
      id: 'section', // id is mandatory
      label: '<b>Section</b>', // You can use HTML/SVG inside labels
      attributes: { class:'gjs-block-section' },
      content: `<section>
        <h1>This is a simple title</h1>
        <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
      </section>`,
    }, {
      id: 'text',
      label: 'Text',
      content: '<div data-gjs-type="text">Insert your text here</div>',
    }, {
      id: 'image',
      label: 'Image',
      // Select the component once it's dropped
      select: true,
      // You can pass components as a JSON instead of a simple HTML string,
      // in this case we also use a defined component type `image`
      content: { type: 'image' },
      // This triggers `active` event on dropped components and the `image`
      // reacts by opening the AssetManager
      activate: true,
    }
  ]
},
});
/*editor.Panels.addPanel({
  id: 'panel-top',
  el: '.panel__top',
});
editor.Panels.addPanel({
  id: 'basic-actions',
  el: '.panel__basic-actions',
  buttons: [
    {
      id: 'visibility',
      active: true, // active by default
      className: 'btn-toggle-borders',
      label: '<u>B</u>',
      command: 'sw-visibility', // Built-in command
    }, {
      id: 'export',
      className: 'btn-open-export',
      label: 'Exp',
      command: 'export-template',
      context: 'export-template', // For grouping context of buttons from the same panel
    }, {
      id: 'show-json',
      className: 'btn-show-json',
      label: 'JSON',
      context: 'show-json',
      command(editor) {
        editor.Modal.setTitle('Components JSON')
          .setContent(`<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`)
          .open();
      }, 
    }, {
		id: "save",
		className: "fa fa-floppy-o icon-blank",
		command: 'open-assets',
		attributes: { title: 'Save Template' }
	}
  ],
});
*/
editor.on('run:export-template:before', opts => {
  console.log('Before the command run');
  if (0 /* some condition */) {
    opts.abort = 1;
  }
});
editor.on('run:export-template', () => console.log('After the command run'));
editor.on('abort:export-template', () => console.log('Command aborted'));





//Let;'s do this

const blockManager = editor.BlockManager;
blockManager.add("RightPanel", {
	label: `<div>
      <img src="https://picsum.photos/70/70"/>
      <div class="my-label-block">GetBalance</div>
    </div>`,
	content: {
		script: function scriptfunc() {
			
			var getwallet = prompt("whats your wallet mate");
				var script = document.createElement('script');
				script.onload = function () {
					let arweave = Arweave.init({
        host: 'arweave.net',
        port: '80',
		protocol: 'https'
});
			arweave.wallets.getBalance(getwallet).then((balance) => {
    let winston = balance;
    let ar = arweave.ar.winstonToAr(balance);

    console.log(winston);
    console.log(ar);
				
}); };
				script.src = 'https://unpkg.com/arweave/bundles/web.bundle.js';
				document.body.appendChild(script);
  },
		traits: [
          // strings are automatically converted to text types
          'Wallet',
          {
            type: 'select',
            label: 'ARorWINSTON',
            name: 'ARorWINSTON',
            options: [
              {value: 'Ar', name: 'AR'},
              {value: 'Winston', name: 'WINSTON'},
            ]
          },
          ],
		components: [
			{
        tagName: 'div',
				name: "test",
        components: console.log("fuck this api bruh"),
      }
		]
	},
	style: {
		width: "100px",
		height: "100px",
		'background-color': "red",
	},
	category: 'Arweave (WORK IN PROGRESS)',
	attributes: {
    title: 'Insert h1 block'
	}
});

