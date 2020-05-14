// Длина текста
const size = 215;
// Текст который нужно обрезать
const $textBlockText = $('');
function cropText(){
	$textBlockText.each( (ind, element) => {
		const text = element.innerHTML
		if (text.length >= size){
			$textBlockText[ind].innerHTML = text.slice(0, size) + '...'
			return;
		}
		return;
	})
}
cropText()