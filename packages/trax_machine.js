let images = {
	traxBg: 'https://i.imgur.com/V6BRfe8.png',
	caixaPalheta: 'https://i.imgur.com/g48Ik5D.png',
	listraPalhetas: 'https://i.imgur.com/yJe8Hor.png',
	listaCartuchos: 'https://i.imgur.com/BG0WUBL.png',
	moduleColorImage: 'https://i.imgur.com/FE6AmXZ.png',
	timeline: 'https://i.imgur.com/5BmnJmF.png',
	playBtn: 'https://i.imgur.com/PXXuHyW.png',
}
let style = `
	#draggable-windows-container {position: absolute;top: 0;left: 0;width: 100%;height: 100%;pointer-events: none;overflow: hidden;}
	#trax_machine{width: 591px;height: 397px;padding: 31px 20px;background-image:url(${images.traxBg});margin: 0 auto;pointer-events: none;}
	#cartuchos_list{width:139px;height:125px;background-image:url(${images.listaCartuchos});}
	#pager{align-self: center;padding: 2px 8px 6px 8px;}
	#palhetas{flex: 1 0 auto;gap:6px;justify-content: end;background-image: url(${images.listraPalhetas});}
	.palheta{width: 97px;height: 113px;background-image:url(${images.caixaPalheta});}
	.moduleC{background-image: url(${images.moduleColorImage});height:24px;}
	.picker{margin: 7px auto;}
	#controls{gap: 5px;}
	#playPause{background-image: url(${images.playBtn});}
	.bigBtn{width: 56px;height: 23px;padding: 0;margin: 0;border: 0;background-color: transparent;}
	.smallBtn{width: 36px;height: 23px;padding: 0;margin: 0;border: 0;background-color: transparent;}
	.tinyBtn{width: 19px;height: 23px;padding: 0;margin: 0;border: 0;background-color: transparent;}
	#timeline{background-image:url(${images.timeline});}
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
							HUBBE.utils.createElement('div',{"traxModuleColor":"1", class:'moduleC'}),
							HUBBE.utils.createElement("div",{class:'picker'}),
						]}),
						HUBBE.utils.createElement('div',{class:'palheta',elements:[
							HUBBE.utils.createElement('div',{"traxModuleColor":"2", class:'moduleC'}),
							HUBBE.utils.createElement("div",{class:'picker'}),
						]}),
						HUBBE.utils.createElement('div',{class:'palheta',elements:[
							HUBBE.utils.createElement('div',{"traxModuleColor":"3", class:'moduleC'}),
							HUBBE.utils.createElement("div",{class:'picker'}),
						]}),
						HUBBE.utils.createElement('div',{class:'palheta',elements:[
							HUBBE.utils.createElement('div',{"traxModuleColor":"4", class:'moduleC'}),
							HUBBE.utils.createElement("div",{class:'picker'}),
						]}),
					]})
				]}),
				HUBBE.utils.createElement('div',{class:'d-flex flex-column flex-fill', elements:[
					HUBBE.utils.createElement('div',{id:'player', class:'d-flex flex-column flex-fill',elements:[
						HUBBE.utils.createElement('div',{id:'controls', class:'d-flex justify-content-end',elements:[
							HUBBE.utils.createElement('input',{id:'playPause',class:'bigBtn',type:'button',isDisabled:true}),
							HUBBE.utils.createElement('input',{id:'stop',class:'bigBtn',type:'button',isDisabled:true}),
							HUBBE.utils.createElement('input',{id:'save',class:'bigBtn',type:'button',isDisabled:true}),
							HUBBE.utils.createElement('input',{id:'open',class:'bigBtn',type:'button'}),
							HUBBE.utils.createElement('input',{id:'clear',class:'smallBtn',type:'button',isDisabled:true}),
							HUBBE.utils.createElement('input',{id:'moveLeft',class:'tinyBtn',type:'button',isDisabled:true}),
							HUBBE.utils.createElement('input',{id:'moveRight',class:'tinyBtn',type:'button',isDisabled:true}),
						]}),
						HUBBE.utils.createElement('div',{id:'timeline',elements:[
							//TODO: Loop
						]})
					]}),
					HUBBE.utils.createElement('div',{id:'export-music',elements:[
						HUBBE.utils.createElement('h2',{innerText:'Música no formato do Hubbe'}),
						HUBBE.utils.createElement('div',{"dataCopied":"Copiado!",elements:[
							HUBBE.utils.createElement('span',{}),
						]})
					]}),
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