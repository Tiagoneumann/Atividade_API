const formulario = document.getElementById('pesquisa');
const pesquisa = document.getElementById('barra_de_pesquisa')

const informacoes = document.getElementById('aba_informacoes');
const nomePersonagem = document.getElementById('nome_personagem');
const foto = document.getElementById('foto');

function sortearPersonagem(){
    const min = 1;
    const max = 826;


    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function carregarInicio(){
    const numeroSorteado = sortearPersonagem();


    carregarPersonagem(
        `https://rickandmortyapi.com/api/character/${numeroSorteado}`
    )
}

async function carregarPersonagem(url){
    try{
        const resposta = await fetch(url);


        if(!resposta.ok){
            throw new Error('Personagem não encontrado!');
        }
   
    const resultado = await resposta.json();


    const personagem = resultado.results
        ? resultado.results[0]
        : resultado;


    foto.src = personagem.image;

    nomePersonagem.innerText = personagem.name;

    informacoes.innerHTML = `
        <li>ID: ${personagem.id}</li>
        <li>Nome: ${personagem.name}</li>
        <li>Status: ${personagem.status}</li>
        <li>Espécie: ${personagem.species}</li>
        <li>Tipo: ${personagem.type}</li>
        <li>Gênero: ${personagem.gender}</li>
        <li>Origem: ${personagem.origin.name}</li>
        <li>Local: ${personagem.location.name}</li>
        <li>Episódios: ${personagem.episode.length}</li>
        <li>Criado: ${personagem.created}</li>
    `;
    } catch (erro) {
        foto.src = '';
        informacoes.innerHTML = `
            <li>Personagem não encontrado!</li>
        `
    }
}

formulario.addEventListener('submit', function(event) {
    event.preventDefault();


    const nome = pesquisa.value.trim();


    if(nome === ""){
        carregarInicio();
        return;
    }


    carregarPersonagem(
        `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(nome)}`
    )
})

carregarInicio();