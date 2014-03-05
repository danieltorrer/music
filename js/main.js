var _separacion = 30 //Separacion entre lineas
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
var isSharp = false

//Posicion en x de notas
var noteX = 180
var ancho

$(document).ready(function(){
	//update tempnote
	ancho = $(window).width()
	_paper = Raphael("canvas", ancho-30, 400)
	set = _paper.set();
	drawPentragram()

	$("#masterBackground").mousemove( mouseBackground )
	$(".note").click(notaClick)
	$("#borrar").click(borrarNota)

	$("#sharp").click(activateSharp)

	$("#nota4").trigger("click")

})

function mouseBackground(event){
	var posx = event.pageX - $(document).scrollLeft() - $('#canvas').offset().left
	var posy = event.pageY - $(document).scrollTop() - $('#canvas').offset().top
	drawNote(posx, posy)
}

function drawNote(posx, posy){

	if (posy < 300 && posy > 40) { //limites
		noteY = Math.floor(posy / (_separacion/2) ) * (_separacion / 2) + 5 //offset
		if (_isMoved)
			circle.remove()

		_isMoved = true

		var nombreTemp = getNoteName(noteY)

		if (nombreTemp != "B" && nombreTemp != "E") {
			nombreTemp = isSharp? nombreTemp+"#" : nombreTemp+""
		}


		$("#notas").val(  _notesText + nombreTemp  + "-")

		circle = _paper.circle(noteX, noteY, 10)
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

function activateSharp(){
	$("#sharp").toggleClass("non-opacity")
	isSharp = !isSharp
	console.log(isSharp)
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
	var yi = 110
	var xf = 920
	var yf = 300

	var masterBackground = _paper.rect(0,0, ancho - 50 , 350).attr({fill: "#fff"})
	masterBackground.node.id = "masterBackground"

	//pentagrama
	for (var i = 0; i < 5; i++) {
		_paper.path("M" +xi+ "," + (yi + i * _separacion) + "L" + xf + "," + ( yi + i * _separacion )).attr({fill: "#000", stroke: "#000", "stroke-width" : 3})
	}

	_paper.path("M52," +(yi - 3)+ "L"+52+","+ parseInt( yi + _separacion * 4) ) .attr({fill: "#000", stroke: "#000", "stroke-width" : 8})
	//_paper.path("M"+50*7+"," +(yi - 3)+ "L"+50*7+",228").attr({fill: "#000", stroke: "#000", "stroke-width" : 5})
	_paper.path("M"+50*10+"," +(yi - 3)+ "L"+50*10+",228").attr({fill: "#000", stroke: "#000", "stroke-width" : 5})

}

function getNoteName(y){
	var numero = Math.floor(y / ( _separacion/2 ) )



	switch(numero){

		case 1:
		return "A"
		break;
		case 2:
		return "G"
		break;
		case 3:
		return "F"
		break;
		case 4:
		return "E"
		break;
		case 5:
		return "D"
		break;
		case 6:
		return "C"
		break;
		case 7:
		return "B"
		break;
		case 8:
		return "A"
		break;		
		case 9:
		return "G"
		break;
		case 10:
		return "F"
		break;
		case 11:
		return "E"
		break;
		case 12:
		return "D"
		break;
		case 13:
		return "C"
		break;
		case 14:
		return "B"
		break;

	}
}