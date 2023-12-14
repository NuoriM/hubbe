let images = {
	traxBg: 'https://i.imgur.com/V6BRfe8.png',
}
let style = `
	#draggable-windows-container {position: absolute;top: 0;left: 0;width: 100%;height: 100%;pointer-events: none;overflow: hidden;}
	#trax_machine{width: 591px;height: 397px;padding: 31px 16px;background-image:url(${images.traxBg});margin: 0 auto;pointer-events: all;}
	.draggable_window{display: inline-block;visibility: hidden;pointer-events: all;}
	.position-absolute{position:absolute;}
`;
const trax_DOM = {
	style: null,
	containers: {
		draggableWin: null,
		trax: null,
	}
}

// Validação estilo da trax
if(trax_DOM.style) trax_DOM.style.remove();
trax_DOM.style = document.querySelector('#trax_style');
if(!trax_DOM.style){
	document.head.insertAdjacentHTML('beforeend',`<style id="trax_style">${style}</style>`);
}

// Validação da janela onde os elementos podem ser arrastados
trax_DOM.containers.draggableWin = document.querySelector('#draggable-windows-container');
if(!trax_DOM.containers.draggableWin) {
	trax_DOM.containers.draggableWin = HUBBE.utils.createElement('div',
		{id:'draggable-windows-container'});
	document.body.appendChild(trax_DOM.containers.draggableWin);
}

if(trax_DOM.containers.trax) trax_DOM.containers.trax.remove();
if(!trax_DOM.containers.trax){
	// Criação da trax
	trax_DOM.containers.trax = HUBBE.utils.createElement('div',{
		class:'position-absolute draggable-window',
		style:'z-index: 401; top: calc(50vh - 160px); left: calc(50vw - 264px); transform: translate(-169px, 13px); visibility: visible;',
		elements:[
			HUBBE.utils.createElement('div',{id:'trax_machine'})
		]
	});

	trax_DOM.containers.draggableWin.appendChild(trax_DOM.containers.trax);
}


// draggable-windows.js

// function startDrag(evt) {

//     var diffX = evt.clientX - this.offsetLeft,
//         diffY = evt.clientY - this.offsetTop,
//         that = this;

//     function moveAlong(evt) {
//         that.style.left = (evt.clientX - diffX) + 'px';
//         that.style.top = (evt.clientY - diffY) + 'px';
//     }

//     function stopDrag() {
//         document.removeEventListener('mousemove', moveAlong);
//         document.removeEventListener('mouseup', stopDrag);
//     }

//     document.addEventListener('mouseup', stopDrag);
//     document.addEventListener('mousemove', moveAlong);
// }

// function startDragIfDraggable(evt) {
//     if (evt.target.classList.contains('draggable-window')) startDrag.call(evt.target, evt);
// }

// document.body.addEventListener('mousedown', startDragIfDraggable);