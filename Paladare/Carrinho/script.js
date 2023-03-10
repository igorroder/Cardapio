$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 100){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn .fas.fa-bars').toggleClass("active");
    });
});
//----------------------------------

function renderItem(item, idPosicao) {
    
    // Adicionando uma div com o item e a quantidade na div .items
    var carrinhoExibir = document.getElementById("carrinho-produtos");
    
    carrinhoExibir.innerHTML +=  `
    <div class="products">
        <div class="name">${item.name}</div><br>
        <div class="subtotal">${parseFloat(item.qtd * item.preco).toLocaleString('pt-BR', {style: 'currency', currency:
            'BRL'})} </div>
        <div style="clear:both"></div>
        <div class="qty">
            <div class="qtde">
                <a id="lixo_${idPosicao}" onclick='removeProd(${idPosicao})'><i class="bi bi-trash3-fill"></i></a>
                <a hidden onclick='removeQtde(${idPosicao},${item.qtd})' id="remove_${idPosicao}">-</a>
                <div value="" class="itemQuantity" id="qtd">${item.qtd}</div>
                <a onclick='addQtde(${idPosicao},${item.qtd})' id="add">+</a>
            </div>
        </div>
        
        <div>
            <label id="Observacaolb" for="Observacao"><i class="bi bi-chat-left-text-fill"></i>Alguma Observa????o?</label> <br>
            <textarea type="text" placeholder="Ex: Tirar a cebola, maionese ?? parte, etc." id="Observacao" cols="30" rows="1"></textarea>
        </div>
    </div>`
}

/*let removeEL = document.getElementById('remove')
        removeEL.removeAttribute("hidden")*/ 

function addQtde(idPosicao,quantidade){

   if(quantidade >= 15){
       
        console.log("tentou colocar um valor inv??lido");

    }else{

    let item = JSON.parse(sessionStorage.getItem('items'));
    
    // Soma +1 na quantidade e salva os dados no sessionStorage
    item[idPosicao].qtd = `${quantidade + 1}`;
    sessionStorage.setItem("items", JSON.stringify(item));
    console.log(item)
    // atualiza os dados na tela
    getItems();

    if(item[idPosicao].qtd > 1){
    
        let removeEL = document.getElementById(`remove_${idPosicao}`)
        let lixoEL = document.getElementById(`lixo_${idPosicao}` )
        lixoEL.setAttribute("hidden", "")
        removeEL.removeAttribute("hidden")
    }
    }
}

function removeQtde(idPosicao,quantidade){
    
    if(quantidade == 1){
       
        console.log("tentou colocar um valor inv??lido");

    }else{
    
        let item = JSON.parse(sessionStorage.getItem('items'));
    
    // Subtrai -1 na quantidade e salva os dados no sessionStorage
    item[idPosicao].qtd = `${quantidade - 1}`;
    sessionStorage.setItem("items", JSON.stringify(item));

    // atualiza os dados na tela
    getItems();
    if(item[idPosicao].qtd > 1){

        let removeEL = document.getElementById(`remove_${idPosicao}`)
        let lixoEL = document.getElementById(`lixo_${idPosicao}` )
        lixoEL.setAttribute("hidden", "")
        removeEL.removeAttribute("hidden")
    }
    }
    
}

// Se o carrinho estiver vazio mostra uma mensagem na tela para o usu??rio olhar o card??pio
function carrinhoVazio(){
    let items = JSON.parse(sessionStorage.getItem('items'));
    
    console.log("Chamou o CARREGA DADOS");

    if (items === null) {
        var carrinhoExibir = document.getElementById("cart-content");
        carrinhoExibir.innerHTML = "";
        var carrinhoExibir = document.getElementById("cart-null");
        carrinhoExibir.innerHTML = `
        <div class="noProduct">
            <div class="small-title">Seu carrinho do Paladare est?? vazio</div>
            <div class="small-subtitle">D?? uma olhada no nosso card??pio<div>
            <a href="../Cardapio/index.html">Ver Card??pio</a>
            
        </div>
        `
    }
}

function getItems() {

    // Pegando o array do sessionStorage e chamando a fun????o carrinhoVazio por padr??o
    let items = JSON.parse(sessionStorage.getItem('items'));
    carrinhoVazio();

    //verificando se o items existe no sessionStorage
    if(sessionStorage.getItem('items')){
        if(items.length == 0){
            sessionStorage.removeItem('items');

            // Limpa a tela e exibe a mensagem na tela que o carrinho est?? vazio
            carrinhoVazio();
            atualizaQtdeCart();

        }else{
            
            // Limpando o html
            var carrinhoExibir = document.getElementById("carrinho-produtos");
            carrinhoExibir.innerHTML="";

            // Para cada item do array, ?? renderizado no html
            items.forEach((item, indexid) => {renderItem(item,indexid)});

            // Atualizando a mensagem do whatsapp e o total
            mensagem();
            totalFunc()
            atualizaQtdeCart();
        }
     }
    
}

function removeProd(id){

    // pego os dados da sessionStrorage e excluo o posi????o que o usu??rio clicou    
    let item = JSON.parse(sessionStorage.getItem('items'));
    item.splice(id, 1);
    sessionStorage.setItem("items", JSON.stringify(item));

    // atualiza os dados na tela
    getItems();    
}

function totalFunc(){
    
    var totalFinal = [];
    var totalExibir = document.getElementById("total");
    let item = JSON.parse(sessionStorage.getItem('items'));

    // Adicionando os itens no total
    item.forEach((item, indexid) => {
        totalFinal.push(parseFloat(item.qtd * item.preco));  
    });

    // Soma tudo e joga no total
    totalFinal = totalFinal.reduce((totalFinal, currentElement) => totalFinal + currentElement);
    console.log("o totalFinal ?? de: " + totalFinal);

    //Exibe o total
    totalExibir.innerHTML = `Total: ${totalFinal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}`
}

// Fun????o do bot??o para mandar o pedido com os itens no whatsapp
function mensagem(){
    var buttonWhatsApp = document.getElementById("buttonWhatsapp");
    /*
    var mensagemWhats = 'https://api.whatsapp.com/send?l=pt_BR&phone=5533999290239&text=Boa%20noite%20pessoal,%20gostaria%20de%20pedir:';
    
    let item = JSON.parse(sessionStorage.getItem('items'));

    // Adicionando os itens na mensagem
    item.forEach((item, indexid) => {
        mensagemWhats += `%0A${(item.qtd).toString()} - ${(item.name).toString()};`;
    });*/
    
    // Adicionando a mensagem do WhatsApp no bot??o
    buttonWhatsApp.innerHTML =`<a href="../Cliente/index.html"><i class="fab fa-whatsapp"></i> Fazer pedido</a>`
}

// Mostra a quantidade de itens do carrinho da barra de navegacao
function atualizaQtdeCart(){
    let exibeQtdeCart = document.getElementById("cont-cart");
    let item = JSON.parse(sessionStorage.getItem('items'));
    let qtde = []
    if(item != null){
        item.forEach((item) => {
            qtde.push(parseInt(item.qtd));  
        });
        let total = qtde.reduce((total, qtde) => total + qtde, 0);
        exibeQtdeCart.innerHTML = `${total}`
    }else{
        exibeQtdeCart.innerHTML = `0`
    }
}

atualizaQtdeCart();
getItems();
totalFunc();
