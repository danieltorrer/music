var _separacion = 40
var _numNotes = 0
var _paper
var _notes = new Array()
var _notesText = ""
var _tempNota = new Object();
var _isMoved = false

var set

//var _selectedNote = "nota2"
//var _noteWidth = 30

//var _spaceWidth = 0

//var _noteName


$(document).ready(function(){
	//update tempnote

	_paper = Raphael("canvas", 940, 320)

	set = _paper.set();

	_tempNota.selectedNote = "nota2"
	_tempNota.noteWidth = 30
	_tempNota.nombre = ""
	_tempNota.imageWidht = 28
	_tempNota.circle  = null

	drawPentragram()

	$("#masterBackground").mousemove( mouseBackground )
	$(".note").click(notaClick)
	$("#borrar").click(borrarNota)

})

function mouseBackground(event){
	var posx = event.pageX - $(document).scrollLeft() - $('#canvas').offset().left
	var posy = event.pageY - $(document).scrollTop() - $('#canvas').offset().top
	//console.log(posx +", " + posy)
	drawNote(posx, posy)
}

function drawNote(posx, posy){
	noteX = 190 + (_numNotes * 55) + _tempNota.noteWidth

	if (posy < 270 && posy > 20) { //limites
		noteY = Math.floor(posy / (_separacion/2) ) * (_separacion / 2) + 5 //offset
		if (_isMoved)
			_tempNota.circle.remove()

		_isMoved = true

		_tempNota.nombre = getNoteName(noteY)

		//console.log( $("#notas").val() )

		$("#notas").val(  _notesText + _tempNota.nombre  + " - ")

		_tempNota.circle = _paper.circle(noteX, noteY, 13)
		_tempNota.circle.attr({fill: "rgba(0,0,0,0.5)", stroke: "rgba(0,0,0,0.5)", "stroke-width" : 1})
		_tempNota.circle.click(function () {

			/*switch(_selectedNote){

				case "nota4" :
				_spaceWidth = _spaceWidth + 7
				break;

			}
			*/
			var tempImagen

			tempImagen = _paper.image("img/" + _tempNota.selectedNote + ".png", noteX - 14 , noteY - 80, _tempNota.imageWidht, 97)
			tempImagen.attr({fill: "rgb(0,0,0)", stroke: "rgb(0,0,0)", "stroke-width" : 1})
			tempImagen.data("i", "nota"+_numNotes)

			_notes[_numNotes] = _tempNota

			set.push(tempImagen)

			_numNotes++

			_notesText = _notesText + _tempNota.nombre + "-"
			$("#notas").text( _notesText )
		})
	}

}

function drawPentragram(){
	var xi = 50
	var yi = 65
	var xf = 920
	var yf = 250

	var masterBackground = _paper.rect(10,10,930, 300).attr({fill: "#fff"})
	masterBackground.node.id = "masterBackground"

	//pentagrama
	for (var i = 0; i < 5; i++) {
		_paper.path("M" +xi+ "," + (yi + i * _separacion) + "L" + xf + "," + ( yi + i * _separacion )).attr({fill: "#000", stroke: "#000", "stroke-width" : 3})
	}

	_paper.path("M52," +(yi - 3)+ "L"+52+",228").attr({fill: "#000", stroke: "#000", "stroke-width" : 8})

}

function notaClick(){
	$(".note").removeClass("non-opacity")
	$(this).addClass("non-opacity")

	_selectedNote = $(this).attr("id")
	_noteWidth = $(this).attr("data-width")
}

function borrarNota(){
	if (_numNotes > 1) {
		//_spaceWidth = _spaceWidth - 7
		//console.log(_spaceWidth)
		var texto = $("#notas").val()
		_notesText = texto.substring(1, texto.length -3 )
		$("#notas").val( _notesText	)
	}

	if (_numNotes>0) {
		_notes.pop()
		set[_numNotes-1].remove()
		set.pop()
		//_notes[_numNotes-1].remove()
		_numNotes--
	}
	
}

function getNoteName(y){
	var numero = Math.floor(y / ( _separacion/2 ) )
	//console.log(numero)

	switch(numero){

		case 1:
		return "La"
		break;
		case 2:
		return "Sol"
		break;
		case 3:
		return "Fa"
		break;
		case 4:
		return "Mi"
		break;
		case 5:
		return "Re"
		break;
		case 6:
		return "Do"
		break;
		case 7:
		return "Si"
		break;
		case 8:
		return "La"
		break;		
		case 9:
		return "Sol"
		break;
		case 10:
		return "Fa"
		break;
		case 11:
		return "Mi"
		break;
		case 12:
		return "Re"
		break;
		case 13:
		return "Do"
		break;
		case 14:
		return "Si"
		break;

	}
}