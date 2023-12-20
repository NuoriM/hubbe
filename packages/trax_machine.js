let images = {
	traxBg: 'https://i.imgur.com/V6BRfe8.png',
	caixaPalheta: 'https://i.imgur.com/g48Ik5D.png',
	listraPalhetas: 'https://i.imgur.com/yJe8Hor.png',
}
let style = `
	#draggable-windows-container {position: absolute;top: 0;left: 0;width: 100%;height: 100%;pointer-events: none;overflow: hidden;}
	#trax_machine{width: 591px;height: 397px;padding: 31px 16px;background-image:url(${images.traxBg});margin: 0 auto;pointer-events: none;}
	#cartuchos_list{width:139px;height:125px;}
	#pager{align-self: center;padding: 2px 8px 6px 8px;}
	.palhetas{flex: 1 0 auto;align-self: center;justify-content: center;background-image: url(${images.listraPalhetas});}
	.palheta{width: 97px;height: 113px;background-image:url(${images.caixaPalheta});}
	.picker{margin: 7px auto;}
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
trax_DOM.style = document.querySelector('#trax_style');
if(!trax_DOM.style){
	document.head.insertAdjacentHTML('beforeend',`<style id="trax_style">${style}</style>`);
}else{
	document.querySelector('#trax_style').remove();
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
					HUBBE.utils.createElement('div',{id:'cartuchos', class:'d-flex flex-column', elements:[
						HUBBE.utils.createElement('div',{id:'cartuchos_list'}),
						HUBBE.utils.createElement('div',{id:'pager'}),
					]}),
					HUBBE.utils.createElement('div',{id:'palhetas', class:'d-flex', elements:[
						HUBBE.utils.createElement('div',{class:'palheta',elements:[
							HUBBE.utils.createElement('div',{"traxModuleColor":"1"}),
							HUBBE.utils.createElement("div",{class:'picker'}),
						]}),
						HUBBE.utils.createElement('div',{class:'palheta',elements:[
							HUBBE.utils.createElement('div',{"traxModuleColor":"2"}),
							HUBBE.utils.createElement("div",{class:'picker'}),
						]}),
						HUBBE.utils.createElement('div',{class:'palheta',elements:[
							HUBBE.utils.createElement('div',{"traxModuleColor":"3"}),
							HUBBE.utils.createElement("div",{class:'picker'}),
						]}),
						HUBBE.utils.createElement('div',{class:'palheta',elements:[
							HUBBE.utils.createElement('div',{"traxModuleColor":"4"}),
							HUBBE.utils.createElement("div",{class:'picker'}),
						]}),
					]})
				]}),
				HUBBE.utils.createElement('div',{class:'d-flex flex-column flex-fill', elements:[
					HUBBE.utils.createElement('div',{id:'player', class:'d-flex flex-fill'}),
					HUBBE.utils.createElement('div',{id:'export-music'}),
				]})
			]})
	]
});

validarTrax();
function validarTrax(){
	let traxWindow = document.querySelector('#trax_machine');
	if(traxWindow){
		traxWindow.parentElement.remove();
	}
	trax_DOM.containers.draggableWin.appendChild(trax_DOM.containers.trax);
}

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