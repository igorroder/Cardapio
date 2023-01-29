//pegar os dados do arquivo json atraves do ajax

/*
fetch("https://raw.githubusercontent.com/HenriqueEstanislau/Paladare/main/Paladare/Cardapio/produtos.json").then((res) => {
    console.log(res.json())
})*/

var ajax = new XMLHttpRequest();
const url = "https://raw.githubusercontent.com/HenriqueEstanislau/Paladare/main/Paladare/Cardapio/produtos.json"
ajax.open("GET", url, true);
ajax.responseType = "json";
ajax.send();
ajax.addEventListener("readystatechange", function () {
    if (ajax.readyState === 4 && ajax.status === 200) {
        console.log(ajax);

        var resposta = ajax.response;

        //depois de pegar os dados agora é hora de mapealos montando o card dos produtos
        var containerCardsPedidos = document.getElementById('card-pedidos');

        resposta.map((valor) => {
            containerCardsPedidos.innerHTML += `
            <div class="card">
                <div class="img"><img src="${valor.imagem}" alt=""></div>
                <div class="content">
                    <div class="product-name">${valor.titulo}</div>
                    <div style="clear:both"></div>
                    <div class="product-description">${valor.descricao}</div>
                    <div class="price">${parseFloat(valor.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>

                      <div class="btn">
                          <button value="${valor.id}" id="adicionar">+</button>
                      </div>

                </div>
            </div>
            `;
        })

        // Preparando os dados e colocando em um Objeto para salvalos no sessionStorage

        const btns = document.querySelectorAll('#adicionar');

        btns.forEach((btn) =>
            btn.addEventListener('click', (event) => {
                console.log(btn.value);
                console.log(resposta[btn.value].titulo);


                // Pegando os valores dos campos name e qtd
                const id = resposta[btn.value].id;
                const name = resposta[btn.value].titulo;
                const qtd = 1;
                const preco = resposta[btn.value].preco;

                // Criando objeto com dados dos inputs
                const dataObj = { id, name, qtd, preco };


                // If para verificar se a quantidade esta correta
                if (!isNaN(qtd) && (qtd != "")) {
                    if ((qtd >= 1) && (qtd <= 15) && !(parseInt(qtd) != parseFloat(qtd))) {

                        /* 
                        Todo valor do sessionStorage é null no inicio (antes de adicionarmos algum valor nele),
                        Por isso checamos se é null, ou seja, se será o primeiro item a ser adicionado.
                        */

                        if (sessionStorage.getItem('items') === null) {

                            // Adicionando um array com um objeto no sessionStorage
                            sessionStorage.setItem('items', JSON.stringify([dataObj]));

                        } else {

                            // Copiando o array existente no sessionStorage e adicionando o novo objeto ao final.
                            sessionStorage.setItem(
                                'items',
                                // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
                                JSON.stringify([
                                    ...JSON.parse(sessionStorage.getItem('items')),
                                    dataObj
                                ])
                            );

                        }

                        // ----------- Efeito splash -----------
                        const splash = document.querySelector('.splash');
                        console.log("entrou")

                        setTimeout(() => {
                            splash.classList.add('effect')
                        }, 200)
                        console.log("entrou")
                        setTimeout(() => {
                            splash.classList.add('display-none')
                        }, 2000)
                        setTimeout(() => {
                            splash.classList.remove('display-none')
                        }, 0)


                        //----------- atualiza qtde carrinho -----------
                        atualizaQtdeCart();

                    } else {
                        const erro = document.getElementById("error");
                        erro.innerHTML = `* Você não pode adicionar ${qtd} itens`
                    }
                } else {
                    const erro = document.getElementById("error");
                    erro.innerHTML = `* Adicione uma quantidade`
                }
            })
        );

        // Mostra a quantidade de itens do carrinho
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

    }
});

