$(document).ready(function(){

	if ($('.popup').length) {
		Popups.init()
	}

	$("input, textarea").on("input", function(){

		console.log($(this).parents('form'));

		validateThis($(this).parents('form'));

	});

	$('#login').on('submit', function(e){
		e.preventDefault();

		var
			$this = $(this);

		if (validateThis($this)) {

			postFormData($this, function(data){
				var
					reqPopup = data.status ? '#success' : '#error';

				Popups.open(reqPopup);
			});
		}
	});

}); // - > ready_end;

var Popups = (function() {

    var
	    popups = $('.popup');

	function _close(){
		popups.hide();
	}

    return {
	    
	    init : function(){
		    $('.popup_close, .popup_overlay').on('click', function(e){
			    e.preventDefault();

			    _close();
		    });
	    },

	    open: function(id) {
		    var
			    reqPopup = popups.filter(id);

		    _close();

		    reqPopup.fadeIn(300);
	    }
    }
}());

function postFormData(form, successCallback) {
	var
		host        = form.attr('action'),
		reqFields   = form.find('[name]'),
		dataObject  = {};

	if (!host) {
		console.log('set action attribute');
	}

	reqFields.each(function(){
		var
			$this = $(this),
			value = $this.val(),
			name  = $this.attr('name');

		dataObject[name] = value;
	});

	$.post(host, dataObject, successCallback);
}

function validateThis(form) {

	var
		loginType = form.find("[data-validation='login']"),
		mailType = form.find("[data-validation='mail']"),
		nameType = form.find("[data-validation='name']"),
		textType = form.find("[data-validation='text']"),
		projectType = form.find("[data-validation='project']"),
		fileType = form.find("[data-validation='file']"),
		linkType = form.find("[data-validation='link']"),
		aboutType = form.find("[data-validation='about']"),
		passwordType = form.find("[data-validation='password']"),
		isValid = false;

	loginType.each(function(){

		var
			$this = $(this),
			notEmptyField  = !!$this.val()

			if (notEmptyField) {
				$this.removeClass("invalid");
			isValid = true;
			} else {
				$this.addClass("invalid");
			$this.tooltip({
				content: 'Введите логин',
				position: 'left'

			});

			isValid = false;
		}
	});
	projectType.each(function(){

		var
			$this = $(this),
			notEmptyField  = !!$this.val()

			if (notEmptyField) {
				$this.removeClass("invalid");
			isValid = true;
			} else {
				$this.addClass("invalid");
			$this.tooltip({
				content: 'Введите название проекта',
				position: 'left'

			});

			isValid = false;
		}
	});
	fileType.each(function(){

		var
			$this = $(this),
			notEmptyField  = !!$this.val()

			if (notEmptyField) {
				$this.removeClass("invalid");
			isValid = true;
			} else {
				$this.addClass("invalid");
			$this.tooltip({
				content: 'Ввыберите файл',
				position: 'left'

			});

			isValid = false;
		}
	});	
	linkType.each(function(){

		var
			$this = $(this),
			notEmptyField  = !!$this.val()

			if (notEmptyField) {
				$this.removeClass("invalid");
			isValid = true;
			} else {
				$this.addClass("invalid");
			$this.tooltip({
				content: 'Укажите ссылку',
				position: 'left'

			});

			isValid = false;
		}
	});	
	aboutType.each(function(){

		var
			$this = $(this),
			notEmptyField  = !!$this.val()

			if (notEmptyField) {
				$this.removeClass("invalid");
			isValid = true;
			} else {
				$this.addClass("invalid");
			$this.tooltip({
				content: 'Добавьте описание',
				position: 'left'

			});

			isValid = false;
		}
	});
		textType.each(function(){

		var
			$this = $(this),
			notEmptyField  = !!$this.val()

			if (notEmptyField) {
				$this.removeClass("invalid");
			isValid = true;
			} else {
				$this.addClass("invalid");
			$this.tooltip({
				content: 'Введите свое сообщение',
				position: 'left'



			});

			isValid = false;
		}
	});

			nameType.each(function(){

		var
			$this = $(this),
			notEmptyField  = !!$this.val()

			if (notEmptyField) {
				$this.removeClass("invalid");
			isValid = true;
			} else {
				$this.addClass("invalid");
			$this.tooltip({
				content: 'Введите имя',
				position: 'left'



			});

			isValid = false;
		}
	});

	passwordType.each(function(){

			var
				$this = $(this),
				notEmptyField  = !!$this.val()

				if (notEmptyField) {
					$this.removeClass("invalid");
				isValid = true;
				} else {
					$this.addClass("invalid");
				$this.tooltip({
					content: 'Введите пароль',
					position: 'left'
				});

				isValid = false;
			}
	});

	mailType.each(function(){
			var
				$this = $(this),
				regExp = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/,
				isMail = regExp.test($this.val());

			if (isMail) {
				$this.removeClass("invalid");
				isValid = true;
			} else {
				$this.addClass("invalid");
				$this.tooltip({
					content : 'Неверный e-mail',
					position : 'right'
				});
				isValid = false;
			}
	});

	return isValid
}


$.fn.tooltip = function(options){

	options = {
		position : options.position || 'right',
		content  : options.content || 'uuuuuuuuu'
	};

	var
		markup = '<div class="tooltip tooltip_' + options.position + '"> \
					<div class="tooltip_text">' + options.content + '</div> \
					</div>';
	var
		$this = this,
		body = $('body');

	$this
		.addClass('tooltipstered')
		.attr('data-tooltip-position', options.position);

	body.append(markup); 

	_positionIt($this, body.find('.tooltip').last(), options.position);

	$(document).on('click', function(){
		$('.tooltip').remove();
	});

	$(window).on('resize', function(){

		var
			tooltips = $('.tooltip');

		var
			tooltipsArray = [];

		tooltips.each(function(){
			tooltipsArray.push($(this));
		});

		$('.tooltipstered').each(function(index){
			var
				position = $(this).data('tooltip-position');

			_positionIt($(this), tooltipsArray[index], position);
		});

	});
		function _positionIt(elem, tooltip, position) {

		var
			elemWidth   = elem.outerWidth(true),
			elemHeight  = elem.outerHeight(true),
			topEdge     = elem.offset().top,
			bottomEdge  = topEdge + elemHeight,
			leftEdge    = elem.offset().left,
			rightEdge   = leftEdge + elemWidth;

		
		var
			tooltipWidth    = tooltip.outerWidth(true),
			tooltipHeight   = tooltip.outerHeight(true),
			leftCentered    = (elemWidth / 2) - (tooltipWidth / 2),
			topCentered     = (elemHeight / 2) - (tooltipHeight / 2);

		  var positions = {};

		  switch (position) {
		  		case 'right' :
		  			positions = {
		  				left : rightEdge,
		  				top : topEdge + topCentered
		  			};
		  			break;
		  		case 'left' :
		  			positions = {
		  				left : leftEdge - tooltipWidth,
		  				top : topEdge + topCentered
		  			};
		  			break;
		  }

	tooltip
		.offset(positions)
		.css('opacity', '1');


	}
};
