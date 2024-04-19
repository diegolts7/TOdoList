// variaveis
let botao_envia_tarefa = document.querySelector("#botao_confirma-tarefa");
let input_digita_tarefa = document.querySelector("#texto_digita-tarefa");
let filho_main = document.querySelector("#filho-main");
const textModal = document.querySelector(".textModificado");
const modal = document.querySelector(".modal");

let contadorTarefas = 0;

// eventos 

if(localStorage.getItem("tamanho") !== null){
    let tam = Number(localStorage.getItem("tamanho"));
    contadorTarefas = tam + 1;
    for(let i = 0; i<=tam;i++){
        LerlocalStorage(i);
    }
}

botao_envia_tarefa.addEventListener("click", addTarefa);




//  funções

function addTarefa() {
    let texto_input = input_digita_tarefa.value;

    if(texto_input.trim() !== '') {
        let divTarefa = document.createElement('div');
        divTarefa.className = 'tarefa';
        divTarefa.id = `${contadorTarefas}`;

        let divSelecionaTarefa = document.createElement('div');
        divSelecionaTarefa.className = 'seleciona-tarefa';

        let inputSelecionaTarefa = document.createElement('input');
        inputSelecionaTarefa.className = 'checkbox'; // Adicionando um prefixo para garantir que o id seja único
        inputSelecionaTarefa.type = 'checkbox';

        inputSelecionaTarefa.addEventListener("change", confirmaTarefa);

        let divDescricao = document.createElement('div');
        divDescricao.className = 'descricao-tarefa';

        let paragrafo = document.createElement('p');
        paragrafo.className = 'texto-descricao-tarefa';
        paragrafo.textContent = texto_input;

        

        paragrafo.addEventListener("dblclick", ModalModificaText);
        modal.addEventListener("click", fechaModal);

        let divDeleta = document.createElement('div');
        divDeleta.className = 'deleta-tarefa';

        let inputExcluir = document.createElement('input');
        inputExcluir.className = 'botao-deleta-tarefa';
        inputExcluir.type = 'button';
        inputExcluir.value = 'Excluir';

        inputExcluir.addEventListener("click", removerTarefa);

        divSelecionaTarefa.appendChild(inputSelecionaTarefa);
        divTarefa.appendChild(divSelecionaTarefa);
        divDescricao.appendChild(paragrafo);
        divTarefa.appendChild(divDescricao);
        divTarefa.appendChild(divDeleta);
        divDeleta.appendChild(inputExcluir);
        filho_main.appendChild(divTarefa);

        salvarStorege(divTarefa.id,texto_input);
        input_digita_tarefa.value = '';
        contadorTarefas++;
    }
}
function removerTarefa(event) {

    let divPai = event.target.parentNode;
    let idPaiDivPai = divPai.parentNode.id;
    let ultimoLista = localStorage.getItem("tamanho");

    if((Number(idPaiDivPai)) < (Number(ultimoLista))){

        let conteudo_idPaiDivPai = localStorage.getItem(`div${idPaiDivPai}`);
        let conteudo_Ultimo = localStorage.getItem(`div${ultimoLista}`);
        
        localStorage.setItem(`div${ultimoLista}`, conteudo_idPaiDivPai);
        localStorage.setItem(`div${idPaiDivPai}`, conteudo_Ultimo);
        localStorage.removeItem(`div${ultimoLista}`);
        localStorage.setItem("tamanho", `${(Number(ultimoLista)) - 1}`);
        contadorTarefas--;
        divPai.parentNode.remove();
    }else{

        localStorage.removeItem(`div${idPaiDivPai}`);
        localStorage.setItem("tamanho", `${(Number(ultimoLista)) - 1}`);
        contadorTarefas--;
        divPai.parentNode.remove();

    }
    
}
function confirmaTarefa(event) {
    let divPai = event.target.parentNode;
    if (this.checked) {
        divPai.parentNode.classList.add('tarefa-concluida');
        divPai.parentNode.classList.remove('tarefa');
    } else {
        divPai.parentNode.classList.add('tarefa');
        divPai.parentNode.classList.remove('tarefa-concluida');
    }
}
function ModalModificaText(event) {
    let divPai = event.target;
    modal.style.display ="flex";
    textModal.addEventListener("keypress", (event) => {
        if(event.key === "Enter"){
            if(textModal.value.trim() !== ""){
                divPai.textContent = textModal.value;
                modal.style.display ="none";
                textModal.value = "";
            }
        }
    });
    
    
}
function fechaModal(event) {
    if(event.target === modal){
        modal.style.display ="none";
        textModal.value = "";
    }
}
function salvarStorege(id,text){
    localStorage.setItem(`div${id}`, text);
    localStorage.setItem("tamanho", id);

}
function LerlocalStorage(i) {

    let divTarefa = document.createElement('div');
    divTarefa.className = 'tarefa';
    divTarefa.id = `${i}`;

    let divSelecionaTarefa = document.createElement('div');
    divSelecionaTarefa.className = 'seleciona-tarefa';

    let inputSelecionaTarefa = document.createElement('input');
    inputSelecionaTarefa.className = 'checkbox'; // Adicionando um prefixo para garantir que o id seja único
    inputSelecionaTarefa.type = 'checkbox';

    inputSelecionaTarefa.addEventListener("change", confirmaTarefa);

    let divDescricao = document.createElement('div');
    divDescricao.className = 'descricao-tarefa';

    let paragrafo = document.createElement('p');
    paragrafo.className = 'texto-descricao-tarefa';
    paragrafo.textContent = localStorage.getItem(`div${i}`);

            

    paragrafo.addEventListener("dblclick", ModalModificaText);
    modal.addEventListener("click", fechaModal);

    let divDeleta = document.createElement('div');
    divDeleta.className = 'deleta-tarefa';

    let inputExcluir = document.createElement('input');
    inputExcluir.className = 'botao-deleta-tarefa';
    inputExcluir.type = 'button';
    inputExcluir.value = 'Excluir';

    inputExcluir.addEventListener("click", removerTarefa);

    divSelecionaTarefa.appendChild(inputSelecionaTarefa);
    divTarefa.appendChild(divSelecionaTarefa);
    divDescricao.appendChild(paragrafo);
    divTarefa.appendChild(divDescricao);
    divTarefa.appendChild(divDeleta);
    divDeleta.appendChild(inputExcluir);
    filho_main.appendChild(divTarefa);
}