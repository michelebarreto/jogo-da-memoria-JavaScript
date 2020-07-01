//aqui foi criada uma função anonima
(function(){
	var matches=0;// variavel para contabilizar os acertos
	// aqui é para aparecer as imagens 
	var images= [];
	//-->array que armazena as cartas viradas
	var flippedCards =[]; // esse array é para configurar que vai abrir somente 2 cartas 
	var modalGameOver = document.querySelector('#modalGameOver');
	var imgMatchSign = document.querySelector('imgMatchSign')



	for(var i=0; i< 16; i++){
		//aqui esta criando um objeto, um caminho que aponta para a pasta das imagens
		var img = {
			src:"img/" + i +".jpg",
			id: i % 8
		};
		images.push(img);//inserer o objeto criado no array
	}
	//chama a função de inicialização do jogo
	startGame();

	//função de inicialização do jogo
	function startGame(){
		flippedCards = [];
		//aqui esta embaralhando as imagens que esta dentro do array
		images = randomSort(images);//função para embaralhar as cartas

		var frontFaces = document.getElementsByClassName("front");
		//posicionamento das cartas
		for(var i = 0; i < 16; i++){
            var card = document.querySelector("#card" + i);
            // aqui é a distribuição das cartas ou seja as cartas do id de 0 e 8 teram 5 px de distancia da margem do container e as demais em função do indice
            // o operador mod % retorna o resto da divisão de um valor pelo outro, ou seja a sobra da divisão de i por 8
            card.style.left = (i % 8 === 0) ? 5 + "px" : (i % 8) * 165 + 5 + "px";
			card.style.top = i < 8 ? 5 + "px" : 250 + "px";
			// aqui vamos criar o efeito ao clicar na carta de virar, o false é para garantir que o evento so vai acontecer se clicar na carta
			card.addEventListener("click",flipCard, false);

			frontFaces[i].style.background = "url('" + images[i].src + "')";
			frontFaces[i].setAttribute("id",images[i].id);
		}
		modalGameOver.style.zIndex = -2;// e aqui volta a imagem do game over novamente para tras das cartas
		modalGameOver.removeEventListener('click',startGame,false);// aqui remove o evento

	}
	function randomSort(oldArray){// dados para embaralhar as cartas
	// o Math gera numeros aleatorios entre 0 e 9, e o Math.floor é para arredondar o numero para baixo
		//(Math.floor(Math.random()* 11));	
		var newArray =[];// aqui vai ser criado um array vazio, vai avaliar os elementos do array e criar um indice de array embaralhado
        while(newArray.length !== oldArray.length){
			// enquanto o array novo não tiver o mesmo numero de elementos antigos ele vai criando um numero aleatorio de 0 a 16
			var i = Math.floor(Math.random()*16);

			//verifica se o elemento indicado pelo índice i já existe no novo array
			if(newArray.indexOf(oldArray[i])< 0){
				newArray.push(oldArray[i]);//caso o elemento não exista, ele é inserido
			}

		}
       return newArray;

	}
	// esta função é para girar a carta ao ser clicada
	function flipCard(){
		console.log(flippedCards)
	 if(flippedCards.length < 2){// essa parte é responsavel por verificar se tem menos de 2 cartas no array ja virada, caso ja tenha 2 cartas viradas, ele vai desvirar
		 
	 //aqui esta pegando a classe front e firando a 180°
	 //this esta chamando a atenção ao clicar na carta
	 // o getElementsByClassName esta pegando a lista de elementos que tem a classe face	
	 var faces = this.getElementsByClassName("face");
	 //-->confere se a carta já está virada, verificando a quantidade de classes da face. O que imprede que a mesma carta seja virada duas vezes
	 if(faces[0].classList.length > 2){
		return;
	}

	 faces[0].classList.toggle("flipped");// o toggle é para varrer a lista de classe em busca de uma determinada classe, se ele encontrar ele remove da lista, se não achar ele inseri na lista, ele aqui esta procurando a classe flipped.
	 faces[1].classList.toggle("flipped");
	 flippedCards.push(this);// chamando a carta que foi clicada
      
      if(flippedCards.length === 2){
		  // este comando é para verificar e sinalizar quando os pares de cartas combinarem
		  if(flippedCards[0].childNodes[4].id === flippedCards[1].childNodes[4].id){
			flippedCards[0].childNodes[1].classList.toggle("match");
			flippedCards[0].childNodes[4].classList.toggle("match");
			flippedCards[1].childNodes[1].classList.toggle("match");
			flippedCards[1].childNodes[4].classList.toggle("match");
			
			matchCardSing();

			matches++; //aqui é o contador da função marche
			flippedCards = [];
            // esse comando é para quando as 8 cartas forem viradas chamar a função game over
			if(matches === 8){
				gameOver();
			}
		  }
	  }

	 }else{// aqui esta criando card do indice 0 e remove o card flipped do indice 3
		 
		flippedCards[0].childNodes[1].classList.toggle("flipped");
		flippedCards[0].childNodes[4].classList.toggle("flipped");
		flippedCards[1].childNodes[1].classList.toggle("flipped");
		flippedCards[1].childNodes[4].classList.toggle("flipped");
		flippedCards =[];
	 }
		
	}
	
	function gameOver(){
		modalGameOver.style.zIndex = 10;// aqui é a função para trazer a imagem do game over a frente depois que todas as imagens forem viradas
		modalGameOver.addEventListener('click', startGame,false);// aqui ele chama a função de reiniciar o jogo apos clicar no game over
	}

  function matchCardSing(){// está funcao é para aparecer a imagem de Match, sempre que acertarem os pares
	  imgMatchSign.style.zIndex = 1;
	  imgMatchSign.style.top = 150 + "px";
	  imgMatchSign.style.opacity = 0;

	  setTimeout(function(){// aqui é para retornar para as cartas, apos aparecer a imagem do match com o tempo de 1 minuto e meio
		imgMatchSign.style.zIndex = -1;
		imgMatchSign.style.top = 250 + "px";
		imgMatchSign.style.opacity = 1;

	  },1500);

  }



}());
