let style = `
	#draggable-windows-container {position: absolute;top: 0;left: 0;width: 100%;height: 100%;pointer-events: none;overflow: hidden;}
`;
let traxStyle = document.querySelector('#trax_style');
if(!traxStyle) document.head.insertAdjacentHTML('beforeend',`<style>${style}</style>`);

let container = document.querySelector('#draggable-windows-container');
if(!container) {
	let draggableWindowsContainer = HUBBE.utils.createElement('div',
		{id:'draggable-windows-container'});
	document.body.appendChild(draggableWindowsContainer);
}

if(!document.querySelector('#trax_machine')){
	let trax = HUBBE.utils.createElement('div',{id:'trax_machine'});

	container.appendChild(trax);
}