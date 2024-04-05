let botao_envia_tarefa = document.querySelector("#botao_confirma-tarefa");
let input_digita_tarefa = document.querySelector("#texto_digita-tarefa");
let filho_main = document.querySelector("#filho-main");
let contadorTarefas = 0;

botao_envia_tarefa.addEventListener("click", function() {
    let texto_input = input_digita_tarefa.value;

    if(texto_input.trim() !== '') {
        contadorTarefas++;
        // Criar elementos HTML
        let divTarefa = document.createElement('div');
        divTarefa.className = 'tarefa';

        let divSelecionaTarefa = document.createElement('div');
        divSelecionaTarefa.className = 'seleciona-tarefa';

        let inputSelecionaTarefa = document.createElement('input');
        inputSelecionaTarefa.id = 'checkbox_' + contadorTarefas; // Adicionando um prefixo para garantir que o id seja único
        inputSelecionaTarefa.type = 'checkbox';

        // Adicionar evento de escuta para os checkboxes
        inputSelecionaTarefa.addEventListener("change", function() {
            // Verificar se o checkbox está marcado
            if (this.checked) {
                // Se estiver marcado, alterar a cor de fundo da div tarefa para verde
                divTarefa.classList.add('tarefa-concluida');
                divTarefa.classList.remove('tarefa')
            } else {
                // Se não estiver marcado, voltar à cor de fundo original
                divTarefa.classList.add('tarefa');
                divTarefa.classList.remove('tarefa-concluida')
            }
        });

        let divDescricao = document.createElement('div');
        divDescricao.className = 'descricao-tarefa';

        let paragrafo = document.createElement('p');
        paragrafo.className = 'texto-descricao-tarefa';
        paragrafo.textContent = texto_input;

        let divDeleta = document.createElement('div');
        divDeleta.className = 'deleta-tarefa';

        let inputExcluir = document.createElement('input');
        inputExcluir.className = 'botao-deleta-tarefa';
        inputExcluir.type = 'button';
        inputExcluir.value = 'Excluir';

        // Adicionar elementos à hierarquia
        divSelecionaTarefa.appendChild(inputSelecionaTarefa);
        divTarefa.appendChild(divSelecionaTarefa);
        divDescricao.appendChild(paragrafo);
        divTarefa.appendChild(divDescricao);
        divTarefa.appendChild(divDeleta);
        divDeleta.appendChild(inputExcluir);

        // Adicionar a nova tarefa ao filho_main
        filho_main.appendChild(divTarefa);

        // Limpar o campo de entrada
        input_digita_tarefa.value = '';
    }
});
