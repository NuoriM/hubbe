let images = {
	traxBg: 'https://i.imgur.com/V6BRfe8.png',
}
let style = `
	#draggable-windows-container {position: absolute;top: 0;left: 0;width: 100%;height: 100%;pointer-events: none;overflow: hidden;}
	#trax_machine{width: 559px;height: 335px;padding: 31px 16px;background-image: url(${images.traxBg});margin: 0 auto;}
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
trax_DOM.style = document.querySelector('#trax_style');
if(!trax_DOM.style) document.head.insertAdjacentHTML('beforeend',`<style>${style}</style>`);

trax_DOM.containers.draggableWin = document.querySelector('#draggable-windows-container');
if(!trax_DOM.containers.draggableWin) {
	trax_DOM.containers.draggableWin = HUBBE.utils.createElement('div',
		{id:'draggable-windows-container'});
	document.body.appendChild(trax_DOM.containers.draggableWin);
}

if(!trax_DOM.containers.trax){
	// Criação da trax
	trax_DOM.containers.trax = HUBBE.utils.createElement('div',{id:'trax_machine',
		class:'position-absolute draggable-window'});

	trax_DOM.containers.draggableWin.appendChild(trax_DOM.containers.trax);
}


// draggable-windows.js

function makeDraggable(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        element.addEventListener("mousedown", (event) => {
            isDragging = true;
            offset = {
                x: event.clientX - element.getBoundingClientRect().left,
                y: event.clientY - element.getBoundingClientRect().top,
            };
        });

        document.addEventListener("mousemove", (event) => {
            if (isDragging) {
                element.style.left = event.clientX - offset.x + "px";
                element.style.top = event.clientY - offset.y + "px";
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    makeDraggable(".draggable-window");
});