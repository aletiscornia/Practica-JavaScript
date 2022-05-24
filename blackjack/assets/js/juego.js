
(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugador = 0,
        puntosComputadora = 0;


    //Referencias html
    const btnNuevo = document.querySelector('#btnNuevo'),
          btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener');

    const divCartasJugador = document.querySelector('#jugador-cartas'),
          divCartasComputadora = document.querySelector('#computadora-cartas'),
          puntosHTML = document.querySelectorAll('small');

     //Esta funcio inicializa el juego.     
    const inicializarJuego = () =>{
            deck = crearDeck();
        };
          
    //funcion para crear un nuevo deck
    const crearDeck = () => {
         deck = [];
        for(let i =2; i <= 10; i++){
            for(let tipo of tipos){
                deck.push(i + tipo);
            }
        }
        for(let tipo of tipos){
            for(let esp of especiales){
                deck.push(esp + tipo);
            }
        }

         return _.shuffle( deck ); //el shuffle es un una funcion de una libreria para mezclar el deck.
        

    }

    //Funcion para tomar una carta

    const pedirCarta = () => {

        if( deck.length  === 0 ){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
        
    }



    const valorCarta = ( carta ) =>{
        
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN( valor )) ? 
                ( valor === 'A' ) ? 11 : 10
                : valor * 1;
    }

    //turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        do {
            const carta = pedirCarta();
        
            puntosComputadora += valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;


            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${ carta }.png`;
            imgCarta.classList.add( 'carta' );
            divCartasComputadora.append( imgCarta );

            if( puntosMinimos > 21 ) {
                break;
            }
            
        } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) );

        setTimeout(() => {
            if( puntosComputadora === 21 && puntosMinimos === 21 ){
                alert('EMPATE');
            }else if( puntosMinimos > 21 ){
                alert('PERDISTE')
            }else if( puntosComputadora > 21 ){
                alert('GANASTE');
            }else{
                alert('PERDISTE REY');
            } 
        }, 10);
        


    }




    //Eventos
    btnPedir.addEventListener('click', ()=>{

        const carta = pedirCarta();
        
        puntosJugador += valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;


        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add( 'carta' );
        divCartasJugador.append( imgCarta );

        if( puntosJugador > 21 ){
            console.warn( 'Perdiste PA' );
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        }else if ( puntosJugador === 21 ){
            console.warn('21, Genial');
            btnDetener.disabled = true;
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );
        }

    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    })

    btnNuevo.addEventListener('click', () =>{
        inicializarJuego();
        window.location.reload(true); //metodo para recargar la pagina
    }); 


    
})();




