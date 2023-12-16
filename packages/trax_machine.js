let images = {
	traxBg: 'https://i.imgur.com/V6BRfe8.png',
}
let style = `
	#draggable-windows-container {position: absolute;top: 0;left: 0;width: 100%;height: 100%;pointer-events: none;overflow: hidden;}
	#trax_machine{width: 591px;height: 397px;padding: 31px 16px;background-image:url(${images.traxBg});margin: 0 auto;pointer-events: none;}
	.palheta{width: 97px;height: 113px;}
	.draggable_window{display: inline-block;visibility: hidden;pointer-events: all;}
`;
const trax_DOM = {
	style: null,
	containers: {
		draggableWin: null,
		trax: null,
	}
}

// Validação estilo da trax
if(trax_DOM.style) document.querySelector('#trax_style').remove();
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



trax_DOM.containers.trax = HUBBE.utils.createElement('div',{
	class:'position-absolute draggable-window',
	style:'z-index: 401; top: calc(50vh - 160px); left: calc(50vw - 264px); transform: translate(-169px, 13px); visibility: visible;',
	elements:[
		HUBBE.utils.createElement('div',{id:'trax_machine',
			class:'d-flex flex-column overflow-hidden position-relative flex-column',elements:[
				HUBBE.utils.createElement('div',{class:'d-flex', elements:[
					HUBBE.utils.createElement('div',{id:'cartuchos', elements:[

					]}),
					HUBBE.utils.createElement('div',{id:'palhetas', elements:[
						HUBBE.utils.createElement('div',{class:'palheta'}),
						HUBBE.utils.createElement('div',{class:'palheta'}),
						HUBBE.utils.createElement('div',{class:'palheta'}),
						HUBBE.utils.createElement('div',{class:'palheta'}),
					]})
				]})
			]})
	]
});

validarTrax();
function validarTrax(){
	if(trax_DOM.containers.trax){
		console.log("Encontrado, removendo...", trax_DOM.containers.trax);
		document.querySelector('#trax_machine').parentElement.remove();
		//trax_DOM.containers.trax.remove();
	}
	trax_DOM.containers.draggableWin.appendChild(trax_DOM.containers.trax);
}
// if(trax_DOM.containers.trax){
// 	trax_DOM.containers.trax.remove();
// }
// if(!trax_DOM.containers.trax) trax_DOM.containers.draggableWin.appendChild(trax_DOM.containers.trax);

/*HUBBE.utils.createElement('div',{class:'d-flex position-relative flex-column gap-2 align-items-center justify-content-center drag-handler container-fluid nitro-card-header'}),
				HUBBE.utils.createElement('div',{
					class:'d-flex position-relative flex-column gap-2 align-items-center justify-content-center drag-handler container-fluid nitro-card-header', elements:[
					HUBBE.utils.createElement('div',{
						class:'d-flex w-100 align-items-center justify-content-center',elements:[
							HUBBE.utils.createElement('span',{class:'nitro-card-header-text', innerText:'Trax'})
						]})
				]})*/


// draggable-windows.js

function startDrag(evt) {

    var diffX = evt.clientX - this.offsetLeft,
        diffY = evt.clientY - this.offsetTop,
        that = this;

    function moveAlong(evt) {
        that.style.left = (evt.clientX - diffX) + 'px';
        that.style.top = (evt.clientY - diffY) + 'px';
    }

    function stopDrag() {
        document.removeEventListener('mousemove', moveAlong);
        document.removeEventListener('mouseup', stopDrag);
    }

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('mousemove', moveAlong);
}

function startDragIfDraggable(evt) {
    if (evt.target.classList.contains('draggable-window')) startDrag.call(evt.target, evt);
}

document.body.addEventListener('mousedown', startDragIfDraggable);