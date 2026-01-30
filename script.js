// Vamos utilizar a GSAP para fazer a rolagem suave (smooth scroll) na página, mas podemos usar a Lenis também
// FAREMOS COM GSAP -> SCROLL SUAVE -> ANIMAÇÃO DE ROLAGEM E ANIMAÇÃO DE ELEMENTOS

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Criar o ScrollSmoother
ScrollSmoother.create({
    smooth: 1.5, // Velocidade de suavização
    effects: true // Ativar o efeito de suavização
});

function animarPagina() {
    // Animação de elementos ao rolar a página

    // O FROM define o estado inicial do elemento e o TO define o estado final do elemento
    gsap.from(".hero", {
        opacity: 0,
        duration: 1.2,
    })

    gsap.from("picture:nth-child(2)", {
        y: 60,
        duration: 1.2,
    })

    gsap.from("picture:nth-child(1)", {
        y: -60,
        duration: 1.2,
    })


    // Animação cards
    gsap.from(".card", {
        opacity: 0,
        stagger: 0.3, // Animação em cascata, tem um atraso entre cada animação
        filter: "blur(10px)",
        scrollTrigger: {
            trigger: ".cards", // Elemento que dispara a animação
            start: "top 75%", // Iniciar a animação quando o topo do elemento atingir 80% da altura da viewport
            markers: false, // Mostrar marcadores para debug, padrão é false
            scrub: true, // Sincronizar a animação com a rolagem
            end: "100% 70%", // Terminar a animação quando o topo do elemento atingir 50% da altura da viewport
        }
    })

    // Animação seção cidade
    gsap.from(".thanks-section  ul li", {
        opacity: 0,
        x: 40,
        duration: 1,
        scrollTrigger: {
            trigger: ".thanks-section ul",
            markers: false,
            start: "top 80%",
            end: "bottom 40%",
            scrub: true,
        },
        stagger: 0.2,
    })

    // Animações footer

    ScrollTrigger.refresh();

    gsap.from("footer", {
        y: -200,
        immediateRender: false,
        scrollTrigger: {
            trigger: "footer",
            scrub: true,
            start: "top 100%",
            end: "top 80%",
            markers: false,
            invalidateOnRefresh: true,
        }
    })

    // Animação Caracteres, selecionando todos os ELementos que tenham Texto Split

    const grupoTexto = document.querySelectorAll(".texto_Split");

    // Animar cada Elemento
    grupoTexto.forEach((textoUnicoSplit) => {
        const textoSplit = SplitText.create(textoUnicoSplit, {
            type: "lines,words, chars",
            mask: "lines"
        })

        gsap.from(textoSplit.chars, {
            y: 40,
            duration: 0.3,
            stagger: 0.02,
            scrub: true,
            scrollTrigger: {
                trigger: textoUnicoSplit,
            }
        });
    })

}

// Animar Preloader

const tl = gsap.timeline({
    onComplete: () => {
        animarPagina();
        gsap.to("#preLoader", {
            opacity: 0,
            duration: 0.5,
            pointerEvents: "none",
            display: "none",
        })
    }
});



tl.to("#preLoader path", {
    strokeDashoffset: 0,
    duration: 1,
    ease: "power1.inOut",
});

tl.to("#preLoader path", {
    strokeDashoffset: 0,
    fill: "rgb(168, 19, 19)",
    duration: 0.5,
});



