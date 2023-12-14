let container = document.querySelector('#draggable-windows-container');
if(!document.querySelector('#trax_machine')){
	let trax = HUBBE.utils.createElement('div',{id:'trax_machine'});

	container.appendChild(trax);
}