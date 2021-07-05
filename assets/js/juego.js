const miModulo = (() =>{
    'use strict'

    let mazo = [];
    const palos = ['C', 'H', 'D', 'S'],
          especiales = ['J', 'Q', 'K', 'A'];

    let puntosJugadores = [];

    //Referencias HTML

const   btnPedir      = document.querySelector('#PC'),
        btnDetener    = document.querySelector('#D'),
        btnNuevoJuego = document.querySelector('#NJ');
        
const   divCartasJugadores = document.querySelectorAll('.divCartas'), 
        puntosHtml = document.querySelectorAll('small');


//////////Esta funcion inicia el juego
    const iniciarJuego = (numJugadores = 2) =>{
        mazo = crearMazo();
        puntosJugadores = [];
        for(let i = 0; numJugadores > i; i++){
            puntosJugadores.push(0);
            //return puntosJugadores;
        }

        puntosHtml.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    const crearMazo = () => {
        mazo = [];
        for(let i = 2; i<= 10; i++){
            for(let palo of palos){
                mazo.push(i + palo);
            }
        }
        for(let palo of palos){
            for(let especia of especiales){
                mazo.push(especia + palo);
            }
        }
    return _.shuffle(mazo); 
    }
///Esta funcion permite tomar una carta
    const pedirCarta = () =>{
        if(mazo.length === 0){
            throw 'No hay cartas en el mazo';
            }   
        return mazo.pop();
    }

    const valorCarta = (carta) =>{
    
        const valor = carta.substring(0, carta.length - 1);
        return ( isNaN(valor) ) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }
//Turno 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) =>{
        puntosJugadores[turno]  = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
        
    }

    const crearCarta = (carta, turno) =>{
        const imagenCarta = document.createElement('img');
        imagenCarta.src  =`assets/cartas/${ carta }.png`;
        imagenCarta.classList.add('cartas')
        divCartasJugadores[turno].append(imagenCarta);
    }

    const determinarGanador = () =>{
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        
        setTimeout(() =>{
        
            if( puntosComputadora === puntosMinimos ) {
                alert('Empate');
            } else if ( puntosMinimos > 21 ) {
                alert('Computadora gana')
            } else if( puntosComputadora > 21 ) {
                alert('Jugador Gana');
            } else {
                alert('Computadora Gana')
            }
        }, 100 );
    }

//Turno Computadora

    const turnoComputadora = ( puntosMinimos ) =>{
        let puntosCompu = 0;
        do{
            const carta = pedirCarta();
            puntosCompu = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length -1);
            
        }while( (puntosCompu < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }

//Eventos

    btnPedir.addEventListener ('click', ()=>{

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0)
        crearCarta(carta, 0);
        

        if (puntosJugador > 21){
        
            console.warn('Perdiste')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
    
        }else if (puntosJugador === 21) {

            console.warn('21-Genial!');
            btnPedir.disabled = true
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
        
    });

    btnDetener.addEventListener ('click', () =>{

        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugadores[0] );
    });

    btnNuevoJuego.addEventListener('click', () =>{
        console.clear();
        iniciarJuego();    
    });

    return{
        nuevoJuego :iniciarJuego
    };
})();






