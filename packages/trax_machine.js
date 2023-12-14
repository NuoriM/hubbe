let style = `
	#draggable-windows-container {position: absolute;top: 0;left: 0;width: 100%;height: 100%;pointer-events: none;overflow: hidden;}
`;
const trax_DOM_elem = {
	style: null,
	containers: {
		draggableWin: null,
		trax: null,
	}
}
trax_DOM_elem.style = document.querySelector('#trax_style');
if(!trax_DOM_elem.style) document.head.insertAdjacentHTML('beforeend',`<style>${style}</style>`);

trax_DOM_elem.containers.draggableWin = document.querySelector('#draggable-windows-container');
if(!trax_DOM_elem.containers.draggableWin) {
	trax_DOM_elem.containers.draggableWin = HUBBE.utils.createElement('div',
		{id:'draggable-windows-container'});
	document.body.appendChild(trax_DOM_elem.containers.draggableWin);
}

if(!trax_DOM_elem.containers.trax){
	trax_DOM_elem.containers.trax = HUBBE.utils.createElement('div',{id:'trax_machine'});

	trax_DOM_elem.containers.draggableWin.appendChild(trax_DOM_elem.containers.trax);
}