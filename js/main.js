var _separacion = 40 //Separacion entre lineas
var _numNotes = 0    //Numero de notas
var _paper			 //Cavas

var _notesText = ""  //Texto generado
var _isMoved = false //Bandera

var set 			 //Conjunto de notas

//Propiedades de nota actual
var _selectedNote 
var _noteWidth 
var _nombre = ""
var _imageWidht
var _imageHeight
var circle = null

//Posicion en x de notas
var noteX = 190


$(document).ready(function(){
	//update tempnote

	_paper = Raphael("canvas", 940, 320)
	set = _paper.set();
	drawPentragram()

	$("#masterBackground").mousemove( mouseBackground )
	$(".note").click(notaClick)
	$("#borrar").click(borrarNota)

	$("#nota4").trigger("click")

})

function mouseBackground(event){
	var posx = event.pageX - $(document).scrollLeft() - $('#canvas').offset().left
	var posy = event.pageY - $(document).scrollTop() - $('#canvas').offset().top
	drawNote(posx, posy)
}

function drawNote(posx, posy){

	if (posy < 270 && posy > 50) { //limites
		noteY = Math.floor(posy / (_separacion/2) ) * (_separacion / 2) + 5 //offset
		if (_isMoved)
			circle.remove()

		_isMoved = true

		var nombreTemp = getNoteName(noteY)

		$("#notas").val(  _notesText + nombreTemp  + "-")

		circle = _paper.circle(noteX, noteY, 14)
		circle.attr({fill: "rgba(0,0,0,0.5)", stroke: "rgba(0,0,0,0.5)", "stroke-width" : 1})
		circle.click(function () {

			var tempImagen = _paper.image("img/" + _selectedNote + ".png", noteX - (_noteWidth/2) , noteY - _imageHeight + 10, _imageWidht, _imageHeight)
			tempImagen.attr({fill: "rgb(0,0,0)", stroke: "rgb(0,0,0)", "stroke-width" : 1})

			tempImagen.data("i", "nota"+_numNotes)
			tempImagen.data("selectedNote", _selectedNote)
			tempImagen.data("_noteWidth", _noteWidth)
			tempImagen.data("_imageWidht", _imageWidht)
			tempImagen.data("_imageHeight", _imageHeight)
			tempImagen.data("_nombre", nombreTemp+"")

			set.push(tempImagen)
			_numNotes++

			noteX = noteX + _noteWidth // + 20
			_notesText = _notesText + tempImagen.data("_nombre") + "-"
			$("#notas").text( _notesText )

		})
	}

}

function notaClick(){
	$(".note").removeClass("non-opacity")
	$(this).addClass("non-opacity")

	_imageHeight = parseInt( $(this).attr("data-imageh") )
	_selectedNote = $(this).attr("id")
	_noteWidth = parseInt( $(this).attr("data-width") )
	_imageWidht = parseInt( $(this).attr("data-imagew") )

	console.log(_selectedNote)
}

function borrarNota(){
	
	if (_numNotes>0) {
		
		var nombre = set[_numNotes - 1].data("_nombre")
		
		//Quitamos texto y espacio
		
		noteX = noteX - set[_numNotes - 1].data("_noteWidth")
		_notesText = _notesText.substring(0, _notesText.length - ( nombre.length + 1 ) )
		
		//Quitamos figura y eliminamos
		set[_numNotes - 1].remove()
		set.pop()

		_numNotes--
		$("#notas").val( _notesText )
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

function getNoteName(y){
	var numero = Math.floor(y / ( _separacion/2 ) )


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