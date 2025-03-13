$(document).ready(function () {
    
    let music = document.getElementById("music");
    music.play();
   
    $('.car2').hide();
    $(".car3").hide();

    const movimento = 70;
    const $carro1 = $("#car1");
    const $pista = $("#pista");
    const $carro2 = $(".car2");
    const $carro3 = $(".car3");
    let contador = 0;
    let intervalo;

    function placar() {
        intervalo = setInterval(function () {
            contador++;
            $('#contador').text(contador);
        }, 1000);
    }

    function checarColisao(car1, car2) {
        const car1Rect = car1[0].getBoundingClientRect();
        const car2Rect = car2[0].getBoundingClientRect();
        
        console.log(car2Rect)
        return !(car1Rect.right < car2Rect.left ||
            car1Rect.left > car2Rect.right ||
            car1Rect.bottom < car2Rect.top ||
            car1Rect.top > car2Rect.bottom);
    }

    function gerarPosicaoAleatoria(car, pista){
        let posX = Math.floor(Math.random() * $(pista).width() - car.width());
        posX = Math.max(0, Math.min(posX, pista.width() - car.width()));

        return posX;
    }

    function pararJogo(car){
        
        music.pause();

        let gameOver = document.getElementById("gameOver");
        gameOver.play();
        
        alert("Colisão detectada!");
        clearInterval(intervalo);
        intervalo = null;
        contador = 0;
        placar();

        location.reload();
    }

    $(document).keydown(function (event) {

        const posicaoAtual = $carro1.position();
        let esquerda = posicaoAtual.left;

        switch (event.key) {
            case 'ArrowLeft':
                esquerda -= movimento;
                break;
            case 'ArrowRight':
                esquerda += movimento;
                break;
        }

        esquerda = Math.max(0, Math.min(esquerda, $pista.width() - $carro1.width()));

        $carro1.css({ left: esquerda + 'px' });

    });

    placar();
    
    function animacao() {

        $("#pista").append($carro2);

        let posX = gerarPosicaoAleatoria($carro1, $pista);
        
        $(".car2").show();
        $(".car2").animate({
            top: $pista.height()

        }, 1000, function () {
            if (checarColisao($carro1, $carro2)) {
                pararJogo($carro2);
            }
            $(this).css("top", "0px");
            $(".car2").hide()
        });

        $carro2.css({
            "position": "absolute",
            "left": posX + "px",
            "top": "0px"
        });
    }

    function animacao2() {

        $("#pista").append($carro2);

        let posX2 = gerarPosicaoAleatoria($carro3, $pista);
        
        $(".car3").show();
        $(".car3").animate({
            top: $pista.height()

        }, 1000, function () {
            if (checarColisao($carro1, $carro3)) {
                pararJogo($carro3);
            }

            $(this).css("top", "0px");
            $(".car3").hide()
        });

        $carro3.css({
            "position": "absolute",
            "left": posX2 + "px",
            "top": "0px"
        });
    }

    setInterval(animacao, 3000);

    setInterval(animacao2, 5000);
    

});
