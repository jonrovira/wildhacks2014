/* Functions */
var setDimensions = function() {
	var hWindow = $(window).height();
	var hHeader = $('header').height();
	var hFooter = $('footer').height();
	
	var hMain   = hWindow - hHeader - hFooter;
	$('main').height(hMain);
};





/* On document load */
$(document).ready(function() {

	setDimensions();

});