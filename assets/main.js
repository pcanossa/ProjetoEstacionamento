(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    /*Só executa qdo clica em cadastrar */
    /*HTMLInputElement mostra as opções de input no click */
    /* Função para cálculo do tempo que o veículo ficou no estacionamento */
    function calculaTempo(mil) {
        const minuto = Math.floor(mil / 60000);
        const segundo = Math.floor((mil % 60000) / 1000);
        return `${minuto}m e ${segundo}s`;
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : []; /*O parse faz ser reconhecido como objeto */
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
            /*Como local storage trabalha com string tenho que parsear e tranformar em string */
            /*Verificaremos os carros que já existem e salvar os novos que estão chegando */
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            const row = document.createElement("tr");
            row.innerHTML = `
                  <td>${veiculo.nome}</td>
                  <td>${veiculo.placa}</td>
                  <td>${veiculo.entrada}</td>
                  <td>
                      <button class="delete" data-placa="${veiculo.placa}">X</button>
                  </td>               
              `;
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
                /* Function para pegar o elemento delete pelo this */
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            /*Após adicionar, necessário salvar esses dados */
            if (salva)
                salvar([...ler(), veiculo]);
        }
        function remover(placa) {
            const { entrada, nome } = ler().find((veiculo) => veiculo.placa === placa);
            const tempo = calculaTempo(new Date().getTime() - new Date(entrada).getTime());
            if (!confirm(`O veículo ${nome} permaneceu por ${tempo}. Deseja encerrar? `))
                return;
            salvar(ler().filter((veiculo) => veiculo.placa !== placa));
            render(); /*Para renderizar no html tabela  */
        }
        function render() {
            $("#patio").innerHTML = "";
            const patio = ler();
            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
                /*Se passou de mais de um valor vou renderizar */
            }
        }
        return { ler, adicionar, remover, salvar, render };
    }
    patio().render();
    (_a = $("#cadastrar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!nome || !placa) { /*Este if fará a verificação de o veículo e placa contêm dados, campos obrigatórios */
            alert("Veículo e placa são obrigatórios!!");
            return;
        }
        patio().adicionar({ nome, placa, entrada: new Date().toISOString() }, true);
        /* True para que ele vá para o if e salve os dados */
        /*ISOToString para deixar o formato de hora em string e formato ISO */
    });
})();
