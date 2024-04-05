let botao_envia_tarefa = document.querySelector("#botao_confirma-tarefa");
let input_digita_tarefa = document.querySelector("#texto_digita-tarefa");
let filho_main = document.querySelector("#filho-main");
let contadorTarefas = 0;

botao_envia_tarefa.addEventListener("click", function() {
    let texto_input = input_digita_tarefa.value;

    if(texto_input.trim() !== '') {
        contadorTarefas++;
        let divTarefa = document.createElement('div');
        divTarefa.className = 'tarefa';

        let divSelecionaTarefa = document.createElement('div');
        divSelecionaTarefa.className = 'seleciona-tarefa';

        let inputSelecionaTarefa = document.createElement('input');
        inputSelecionaTarefa.id = 'checkbox_' + contadorTarefas; // Adicionando um prefixo para garantir que o id seja único
        inputSelecionaTarefa.type = 'checkbox';

        inputSelecionaTarefa.addEventListener("change", function() {
            if (this.checked) {
                divTarefa.classList.add('tarefa-concluida');
                divTarefa.classList.remove('tarefa')
            } else {
                divTarefa.classList.add('tarefa');
                divTarefa.classList.remove('tarefa-concluida')
            }
        });

        let divDescricao = document.createElement('div');
        divDescricao.className = 'descricao-tarefa';

        let paragrafo = document.createElement('p');
        paragrafo.className = 'texto-descricao-tarefa';
        paragrafo.textContent = texto_input;

        paragrafo.addEventListener("dblclick", function() {
            let paragrafoModificado = prompt("Insira a modificação da tarefa:");
            paragrafo.textContent = paragrafoModificado;
        })

        let divDeleta = document.createElement('div');
        divDeleta.className = 'deleta-tarefa';

        let inputExcluir = document.createElement('input');
        inputExcluir.className = 'botao-deleta-tarefa';
        inputExcluir.type = 'button';
        inputExcluir.value = 'Excluir';

        inputExcluir.addEventListener("click", function() {
            divTarefa.remove();
        });

        divSelecionaTarefa.appendChild(inputSelecionaTarefa);
        divTarefa.appendChild(divSelecionaTarefa);
        divDescricao.appendChild(paragrafo);
        divTarefa.appendChild(divDescricao);
        divTarefa.appendChild(divDeleta);
        divDeleta.appendChild(inputExcluir);
        filho_main.appendChild(divTarefa);

        input_digita_tarefa.value = '';
    }
});