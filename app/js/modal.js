$(document).ready(function() { 
	$('#add_new_item').click( function(event){
		event.preventDefault(); 
		$('#new-project-popup') 
			.css('display', 'block') 
				
	});
	$('.button_close').click( function(){ 		
		$('#new-project-popup').css('display', 'none'); 
	});
});