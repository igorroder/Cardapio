$(document).ready(function () {
	$(window).scroll(function () {
		// sticky navbar on scroll script
		if (this.scrollY > 20) {
			$('.navbar').addClass("sticky");
		} else {
			$('.navbar').removeClass("sticky");
		}

		// scroll-up button show/hide script
		if (this.scrollY > 100) {
			$('.scroll-up-btn').addClass("show");
		} else {
			$('.scroll-up-btn').removeClass("show");
		}
	});

	// slide-up script
	$('.scroll-up-btn').click(function () {
		$('html').animate({ scrollTop: 0 });
		// removing smooth scroll on slide-up button click
		$('html').css("scrollBehavior", "auto");
	});

	$('.navbar .menu li a').click(function () {
		// applying again smooth scroll on menu items click
		$('html').css("scrollBehavior", "smooth");
	});

	// toggle menu/navbar script
	$('.menu-btn').click(function () {
		$('.navbar .menu').toggleClass("active");
		$('.menu-btn .fas.fa-bars').toggleClass("active");
	});
});
//----------------------------------



// Mostra a quantidade de itens do carrinho da barra de navegacao
function atualizaQtdeCart() {
	let exibeQtdeCart = document.getElementById("cont-cart");
	let item = JSON.parse(sessionStorage.getItem('items'));
	let qtde = []
	if (item != null) {
		item.forEach((item) => {
			qtde.push(parseInt(item.qtd));
		});
		let total = qtde.reduce((total, qtde) => total + qtde, 0);
		exibeQtdeCart.innerHTML = `${total}`
	} else {
		exibeQtdeCart.innerHTML = `0`
	}
}
atualizaQtdeCart();

//---------------------------------
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var Inname = $("#Inname")
var Innunmber = $("#Innumber")
var Inend = $("#Inend")
var InendS = $("#InendS")
var lib;

function InendFunc(){
	console.log(InendS.val())
	if(InendS.val() == "Retirada"){
		Inend.attr("hidden","");
		lib = true
	}else {
		lib = false
		Inend.removeAttr("hidden");
	}
	
}

$(".next_name").click(function () {
	if (Inname.val() !== "") {
		if (animating) return false;
		animating = true;
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		verificar()
	}
});
$(".next_number").click(function () {
	if (Innunmber.val() !== "") {
		if (animating) return false;
		animating = true;
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		verificar()
	}
});
$(".next_end").click(function () {
	if (Inend.val() !== "" || lib == true) {
		if (animating) return false;
		animating = true;
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();
		verificar()
	}
});


function verificar() {
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	next_fs.show();
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			scale = 1 - (1 - now) * 0.2;
			left = (now * 50) + "%";
			opacity = 1 - now;
			current_fs.css({ 'transform': 'scale(' + scale + ')' });
			next_fs.css({ 'left': left, 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		easing: 'easeInOutBack'
	});
}

$(".previous").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1 - now) * 50) + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({ 'left': left });
			previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function () {
	return false;
})




