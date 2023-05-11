// ==UserScript==
// @name         40_pytan_lidki_odp
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Odpalasz se pytania, jedziesz na dół i klikasz sprawdź odpowiedzi. Gratulacje, masz 6.
// @author       onhq11, Szurag
// @match        https://egzamin-informatyk.pl/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=egzamin-informatyk.pl
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let ile_ma_byc_blednych = 3
    let ile_jest_pytan = 40

    function makeWrong(num) {
        let maxDivs = document.getElementsByClassName('rezultatY').length;

        for(let i = 0; i < num; i++) {
            let random = Math.floor(Math.random() * maxDivs )
            let temp = document.getElementsByClassName('rezultatY')[random]
            temp.classList.add('rezultatN')
            temp.classList.remove('rezultatY')
            temp.innerHTML = "Pomyłka! Poprawna odpowiedź to B (twoja odpowiedź: A)"

            let odpa = document.getElementById('odpa'+(random+1))
            let odpb = document.getElementById('odpb'+(random+1))
            let odpc = document.getElementById('odpc'+(random+1))
            let odpd = document.getElementById('odpd'+(random+1))

            let working = false
            if(odpa.classList.value.includes('odpbad') && !working) {
                odpa.classList.add('odpwrong')
                odpa.classList.remove('odpbad')
                working = true
            } else if(odpb.classList.value.includes('odpbad') && !working) {
                odpb.classList.add('odpwrong')
                odpb.classList.remove('odpbad')
                working = true
            } else if(odpc.classList.value.includes('odpbad') && !working) {
                odpc.classList.add('odpwrong')
                odpc.classList.remove('odpbad')
                working = true
            } else if(odpd.classList.value.includes('odpbad') && !working) {
                odpd.classList.add('odpwrong')
                odpd.classList.remove('odpbad')
                working = true
            }
        }

    }

    const divsRezultatB = document.getElementsByClassName('rezultatB');
    const divsRezultatBArray = Array.from(divsRezultatB);
    divsRezultatBArray.forEach(div => {
        div.classList.add('rezultatY');
        div.classList.remove('rezultatB');
    });

    const divsRezultatY = document.getElementsByClassName('rezultatY');
    const divsRezultatYArray = Array.from(divsRezultatY);
    divsRezultatYArray.forEach(div => {
        div.textContent = "Tak jest, Twoja odpowiedź jest poprawna!";
    });

    let span_out = `Uzyskany wynik: ${(((ile_jest_pytan - ile_ma_byc_blednych) / ile_jest_pytan) * 100).toFixed(1)}% (${ile_jest_pytan - ile_ma_byc_blednych}/${ile_jest_pytan})`

    document.getElementById('zegar1').getElementsByTagName('span')[0].innerHTML = span_out
    document.getElementsByClassName('wynikbottom')[0].getElementsByTagName('span')[0].innerHTML = span_out

    makeWrong(ile_ma_byc_blednych)

})();
