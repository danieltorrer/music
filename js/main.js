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

var cont = 0

var _hover = true

var _notesJava = new Array()
var _midiNote = 0

//Posicion en x de notas
var noteX = 210
var ancho

$(document).ready(function(){
	//update tempnote
	ancho = $(window).width()
	_paper = Raphael("canvas", ancho-30, 370)
	set = _paper.set();
	drawPentragram()

	$("#masterBackground").mousemove( mouseBackground )
	$(".note").click(notaClick)
	$("#borrar").click(borrarNota)

	$("#sharp").click(activateSharp)

	$("#nota4").trigger("click")

	$("#hoverc").click(function(){
		_hover = !_hover
	})

	$("#enviar").click(enviarNotas)

	document.addEventListener('keydown', function(event) {8
		if(event.keyCode == 8 || event.keyCode == 83 || event.keyCode == 72 || event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52){
			event.preventDefault()
		}
	})

	document.addEventListener('keyup', function(event) {

		switch(event.keyCode){
			case 83:
			$("#sharp").trigger("click")
			break;

			case 72:
			$("#hoverc").trigger("click")
			break;

			case 8:
			$("#borrar").trigger("click")
			break;

			case 49 :
			$("#nota1").trigger("click")
			break;

			case 50 :
			$("#nota2").trigger("click")
			break;

			case 51 :
			$("#nota4").trigger("click")
			break;

			case 52 :
			$("#nota8").trigger("click")
			break;


		}

	});



	MIDI.loadPlugin({
		soundfontUrl: "./soundfont/",
		instrument: "acoustic_grand_piano"
	})

})

function mouseBackground(event){
	var posx = event.pageX - $(document).scrollLeft() - $('#canvas').offset().left
	var posy = event.pageY - $(document).scrollTop() - $('#canvas').offset().top
	drawNote(posx, posy)
}

function drawNote(posx, posy){

	if (posy < 270 && posy > 80) { //limites
		noteY = Math.floor(posy / (_separacion/2) ) * (_separacion / 2) + 5 //offset
		if (_isMoved)
			circle.remove()

		_isMoved = true

		var nombreTemp = getNoteName(noteY)

		if (nombreTemp != "B" && nombreTemp != "E") {
			nombreTemp = isSharp? nombreTemp+"#" : nombreTemp+""
		}


		if (_hover) {
			var delay = 0; // play one note every quarter second
			var note = _midiNote; // the MIDI note
			var velocity = 127; // how hard the note hits
			
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.75);
		}
		
		$("#notas").val(  _notesText + nombreTemp  + "-")

		circle = _paper.circle(noteX, noteY, 10)
		circle.attr({fill: "rgba(0,0,0,0.5)", stroke: "rgba(0,0,0,0.5)", "stroke-width" : 1})
		circle.click(function () {

			var delay = 0; // play one note every quarter second
			var note = _midiNote; // the MIDI note
			var velocity = 127; // how hard the note hits
			
			// play the note
			MIDI.setVolume(0, 127);
			MIDI.noteOn(0, note, velocity, delay);
			MIDI.noteOff(0, note, delay + 0.75);


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

			_notesJava[cont] = _midiNote

			cont++

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
	var xf = 1220
	var yf = 300

	var masterBackground = _paper.rect(0,0, ancho - 50 , 350).attr({fill: "#fff"})
	masterBackground.node.id = "masterBackground"

	//pentagrama
	for (var i = 0; i < 5; i++) {
		_paper.path("M" +xi+ "," + (yi + i * _separacion) + "L" + xf + "," + ( yi + i * _separacion )).attr({fill: "#000", stroke: "#000", "stroke-width" : 3})
	}

	_paper.path("M52," +(yi - 3)+ "L"+52+","+ parseInt( yi + _separacion * 4) ) .attr({fill: "#000", stroke: "#000", "stroke-width" : 8})
	//_paper.path("M"+50*7+"," +(yi - 3)+ "L"+50*7+",228").attr({fill: "#000", stroke: "#000", "stroke-width" : 5})
	_paper.path("M"+ (50 + 537) +"," +(yi - 3)+ "L"+(50 + 537)+",228").attr({fill: "#000", stroke: "#000", "stroke-width" : 5})

}

function getNoteName(y){
	var numero = Math.floor(y / ( _separacion/2 ) )

	switch(numero){
		
		case 5:
		_midiNote = isSharp? 82 : 81
		return "A"
		break;
		
		case 6:
		_midiNote = isSharp? 80 : 79
		return "G"
		break;
		
		case 7:
		_midiNote = isSharp? 78 : 77
		return "F"
		break;
		
		case 8:
		_midiNote = 76
		return "E"
		break;
		
		case 9:
		_midiNote = isSharp? 75 : 74
		return "D"
		break;
		
		case 10:
		_midiNote = isSharp? 73 : 72
		return "C"
		break;
		
		case 11:
		_midiNote = 71
		return "B"
		break;
		
		case 12:
		_midiNote = isSharp? 70 : 69
		return "A"
		break;		
		
		case 13:
		_midiNote = isSharp? 68 : 67
		return "G"
		break;
		
		case 14:
		_midiNote = isSharp? 66 : 65
		return "F"
		break;
		
		case 15:
		_midiNote = 64
		return "E"
		break;
		
		case 16:
		_midiNote = isSharp? 63 : 62
		return "D"
		break;
		
		case 17:
		_midiNote = isSharp? 61 : 60
		return "C"
		break;
		
		case 18:
		_midiNote = 59
		return "B"
		break;
		
		case 19:
		_midiNote = isSharp? 58 : 57
		return "A"
		break;
		
		case 20:
		_midiNote = isSharp? 56 : 55
		return "G"
		break;

	}
}

function enviarNotas(){

	$.ajax({
		type: "POST",
		url: "class/evaluar.php",
		data : {
			"notas": _notesText
		},
		dataType: "json",
		success: showMusic,
		error: showerror
	});
}