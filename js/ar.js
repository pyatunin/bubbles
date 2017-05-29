window.onload = function () {
	document.getElementById('start').addEventListener('click', start, false);

	document.getElementById('raw').onkeyup = document.getElementById('raw').onkeydown = function (event) {
		var key = window.event ? event.keyCode : event.which;

		return event.keyCode == 8 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39
			|| event.keyCode == 32 || (key >= 48 && key <= 57);
	};

	document.getElementById('raw').oncut = document.getElementById('raw').oncopy = document.getElementById('raw').onpaste = function() {
		return false;
	};

	document.getElementById('raw').oninput = function () {
		drawArray(createArray());
	};

	document.getElementById('start').disabled = true;
};

function createArray() {
	return document.getElementById('raw').value.split(" ").filter(Number);
}

function drawArray(array) {
	document.getElementById('bubbles').innerHTML = "";
	var cells = "";

	for(var i = 0; i < array.length; i++)
		cells += "<div class='bubble'>" + array[i] + "</div>";

	document.getElementById('bubbles').innerHTML = cells;

	if (array.length <= 1) {
		document.getElementById('start').disabled = true;
	} else {
		document.getElementById('start').disabled = false;
	}
}

function start() {
		doSort();
		document.getElementById('start').disabled = true;
		document.getElementById('raw').readOnly = true;
	}

function restart() {
		document.getElementById('result').innerText = "";
		drawArray(createArray());
		doSort();
		document.getElementById('start').disabled = true;
		document.getElementById('raw').readOnly = true;
}

function doSort() {
	var bubbles = document.getElementsByClassName('bubble');
	var index = 0;
	var intervalCount = 0;

	bubbles[index].classList.add('current');
	var interval = setInterval(function () {
		if ((bubbles[index].innerHTML - bubbles[index + 1].innerHTML) > 0) {
			var temp = bubbles[index].innerHTML;
			bubbles[index].innerHTML = bubbles[index + 1].innerHTML;
			bubbles[index].classList.remove('current');
			bubbles[index + 1].innerHTML = temp;
			bubbles[index + 1].classList.add('current')
		} else {
			bubbles[index].classList.remove('current');
			bubbles[index + 1].classList.add('current');
		}
		index++;

		if (index == bubbles.length - intervalCount - 1) {
			bubbles[index].classList.add('sorted');
			bubbles[index].classList.remove('current');
			intervalCount++;
			index = 0;
			bubbles[index].classList.add('current');
		}
		if (intervalCount >= bubbles.length - 1) {
			bubbles[index].classList.add('sorted');
			document.getElementById('raw').readOnly = false;
			document.getElementById('start').disabled = false;
			document.getElementById('start').addEventListener('click', restart, false);
			document.getElementById('result').innerText = "Массив успешно отсортирован.";
			clearInterval(interval);
		}
	}, 500);
}




