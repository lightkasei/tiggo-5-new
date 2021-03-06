$(document).ready(function() {
	$('.model-color').on('click', function() {
		var	itemImg = $('.model-photo img'),
			imgPath = $(this).attr('data-path');

		itemImg.fadeOut(200, function() {
			$(this).attr('src', imgPath).fadeIn(200);
		});
	});

	var itemSpecsHolder = $('.item-specs');
	var	itemPriceHolder = $('.item-price_rur');
	var itemPriceHolderUSD = $('.item-price_usd');
	var	itemSpecs = '';
	var	itemPrice = 0;

	function numberWithSpaces(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
	}

	function calculatePrice() {
		itemPrice = parseInt($('input[name=engine]:checked').val());
		itemPrice +=  parseInt($('input[name=transmission]:checked').val());
		itemPrice +=  parseInt($('input[name=package]:checked').val());

		itemPriceHolder.text(numberWithSpaces(itemPrice) + ' руб.');
	};

	function compileSpecs() {
		modelSpecs = $('input[name=engine]:checked + label').text();
		modelSpecs += ', ' + $('input[name=transmission]:checked + label').text();
		modelSpecs += ', ' + $('input[name=package]:checked + label').text() + '.';

		itemSpecsHolder.text(modelSpecs);
	};

	$('.b-1 input').on('change', function() {
		compileSpecs();
		calculatePrice();
		calculateUSD();
	});

	compileSpecs();
	calculatePrice();
	calculateUSD();

	var currencyUrl = 'https://currate.ru/api/?get=rates&pairs=USDRUB&key=87f5a2842ac6090aecb9d0edb58179cb';

	var rurUsdRate = 0;

	$.ajax({
		url: currencyUrl,
		dataType: 'json',
		success: function(data) {
			console.log(data.data.USDRUB);

			rurUsdRate = data.data.USDRUB;

			calculateUSD();
		}
	});

	function calculateUSD() {
		var itemPriceUSD = itemPrice / rurUsdRate;

		itemPriceHolderUSD.text( '$ ' + numberWithSpaces( itemPriceUSD.toFixed(0) ) );
	};
});