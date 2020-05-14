
/*===========================================*/
/*===========================================*/
const $burger = $('.header-menu-burger');
const $headerMenu = $('.header-menu');
const $body = $('body')
$burger.on('click', openMenuBurger)
function openMenuBurger(){
	$body.toggleClass('lock')
	$burger.toggleClass('active')
	$headerMenu.toggleClass('active')
}
/*===========================================*/
/*===========================================*/