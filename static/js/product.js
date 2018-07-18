// Get the modal
var modal1 = document.getElementById('myModal');
var modal2 = document.getElementById('myModal1');

// Get the button that opens the modal
var btn1 = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn1");
var btn3 = document.getElementById("myBtn2");
var addbtn=document.getElementById("addrow");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span1= document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal 
btn1.onclick = function() {
		modal1.style.display = "block";
}

btn2.onclick = function() {
		modal2.style.display = "block";
		modal1.style.display = "none";
}

btn3.onclick = function() {
		modal2.style.display = "block";
		modal1.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
		modal1.style.display = "none";
}
span1.onclick = function() {
		modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
		if (event.target == modal1) {
				modal1.style.display = "none";
		}
}

window.onclick = function(event) {
		if (event.target == modal2) {
				modal2.style.display = "none";
		}
}

function addrow(){
	var table=document.getElementById("invertorytable");
	var row=table.insertRow(-1);
	var  cell1=row.insertCell(0);
	var  cell2=row.insertCell(1);
	var  cell3=row.insertCell(2);
	var  cell4=row.insertCell(3);



	cell1.innerHTML='<td><span contenteditable>Item Name</span></td>';
	cell2.innerHTML='<td><span data-prefix>₹</span><span contenteditable>0.00</span></td>';
	cell3.innerHTML='<td><span contenteditable>0</span></td>';
	cell4.innerHTML='<td><span data-prefix>₹</span><span>0.00</span></td>';

}

function parseFloatHTML(element) {
	return parseFloat(element.innerHTML.replace(/[^\d\.\-]+/g, '')) || 0;
}

function parsePrice(number) {
	return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
}


function updateNumber(event) {
	document.getElementById("demo")="***"
	var
	activeElement = document.activeElement,
	value = parseFloat(activeElement.innerHTML),
	wasPrice = activeElement.innerHTML == parsePrice(parseFloatHTML(activeElement));

	if (!isNaN(value) && (e.keyCode == 38 || e.keyCode == 40 || e.wheelDeltaY)) {
		e.preventDefault();

		value += e.keyCode == 38 ? 1 : e.keyCode == 40 ? -1 : Math.round(e.wheelDelta * 0.025);
		value = Math.max(value, 0);

		activeElement.innerHTML = wasPrice ? parsePrice(value) : value;
	}
	updateInvoice();

}



function updateInvoice() {
	var total = 0;
	var cells, price, total, a, i;

	// update inventory cells
	// ======================

	for (var a = document.querySelectorAll('table.inventory tbody tr'), i = 0; a[i]; ++i) {
		// get inventory row cells
		cells = a[i].querySelectorAll('span:last-child');

		// set price as cell[2] * cell[3]
		price = parseFloatHTML(cells[1]) * parseFloatHTML(cells[2]);

		// add price to total
		total += price;

		// set row total
		cells[3].innerHTML = price;
	}

	// update balance cells
	// ====================

	// get balance cells
	cells = document.querySelectorAll('table.balance td:last-child span:last-child');

	// set total
	cells[0].innerHTML = total;

	// set balance and meta balance
	cells[2].innerHTML = total;

	// update prefix formatting
	// ========================

	//var prefix = document.querySelector('#prefix').innerHTML;
	//for (a = document.querySelectorAll('[data-prefix]'), i = 0; a[i]; ++i) a[i].innerHTML = prefix;

	// update price formatting
	// =======================

	//for (a = document.querySelectorAll('span[data-prefix] + span'), i = 0; a[i]; ++i) if (document.activeElement != a[i]) a[i].innerHTML = parsePrice(parseFloatHTML(a[i]));
}

function onContentLoad() {
	updateInvoice();

	var
	input = document.querySelector('input'),
	image = document.querySelector('img');

	function onClick(e) {
		var element = e.target.querySelector('[contenteditable]'), row;

		element && e.target != document.documentElement && e.target != document.body && element.focus();

		if (e.target.matchesSelector('.add')) {
			document.querySelector('table.inventory tbody').appendChild(generateTableRow());
		}
		else if (e.target.className == 'cut') {
			row = e.target.ancestorQuerySelector('tr');

			row.parentNode.removeChild(row);
		}

		updateInvoice();
	}

	function onEnterCancel(e) {
		e.preventDefault();

		image.classList.add('hover');
	}

	function onLeaveCancel(e) {
		e.preventDefault();

		image.classList.remove('hover');
	}

	function onFileInput(e) {
		image.classList.remove('hover');

		var
		reader = new FileReader(),
		files = e.dataTransfer ? e.dataTransfer.files : e.target.files,
		i = 0;

		reader.onload = onFileLoad;

		while (files[i]) reader.readAsDataURL(files[i++]);
	}

	function onFileLoad(e) {
		var data = e.target.result;

		image.src = data;
	}

	if (window.addEventListener) {
		document.addEventListener('click', onClick);

		document.addEventListener('mousewheel', updateNumber);
		document.addEventListener('keydown', updateNumber);

		document.addEventListener('keydown', updateInvoice);
		document.addEventListener('keyup', updateInvoice);

		input.addEventListener('focus', onEnterCancel);
		input.addEventListener('mouseover', onEnterCancel);
		input.addEventListener('dragover', onEnterCancel);
		input.addEventListener('dragenter', onEnterCancel);

		input.addEventListener('blur', onLeaveCancel);
		input.addEventListener('dragleave', onLeaveCancel);
		input.addEventListener('mouseout', onLeaveCancel);

		input.addEventListener('drop', onFileInput);
		input.addEventListener('change', onFileInput);
	}
}


window.addEventListener && document.addEventListener('DOMContentLoaded', onContentLoad);