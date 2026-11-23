const entregas = [
  { codigo: "TL-2048", destino: "Florianópolis · SC", integracao: "Loja virtual", situacao: "Em trânsito", filtro: "em-transito", previsao: "Hoje, 16h", classeSituacao: "estavel" },
  { codigo: "TL-2047", destino: "Curitiba · PR", integracao: "Sistema de gestão fictício", situacao: "Atenção", filtro: "atencao", previsao: "Aguardando retorno", classeSituacao: "alerta" },
  { codigo: "TL-2046", destino: "Porto Alegre · RS", integracao: "Loja virtual", situacao: "Entregue", filtro: "entregue", previsao: "Ontem, 14h", classeSituacao: "concluido" },
  { codigo: "TL-2045", destino: "Joinville · SC", integracao: "Sistema de gestão fictício", situacao: "Em trânsito", filtro: "em-transito", previsao: "Hoje, 18h", classeSituacao: "estavel" },
  { codigo: "TL-2044", destino: "São José · SC", integracao: "Loja virtual", situacao: "Atenção", filtro: "atencao", previsao: "Revisar endereço", classeSituacao: "alerta" }
];

const corpoTabela = document.querySelector("#pedidos");
const campoBusca = document.querySelector("#busca");
const mensagemVazia = document.querySelector("#vazio");
const rotuloQuantidade = document.querySelector("#total-resultados");
const abas = [...document.querySelectorAll(".aba")];
let situacaoSelecionada = "todos";

function desenharPedidos() {
  const consulta = campoBusca.value.trim().toLocaleLowerCase("pt-BR");
  const visiveis = entregas.filter((entrega) => {
    const correspondeSituacao = situacaoSelecionada === "todos" || entrega.filtro === situacaoSelecionada;
    const correspondeBusca = `${entrega.codigo} ${entrega.destino} ${entrega.integracao}`.toLocaleLowerCase("pt-BR").includes(consulta);
    return correspondeSituacao && correspondeBusca;
  });

  corpoTabela.replaceChildren();
  for (const entrega of visiveis) {
    const linha = document.createElement("tr");
    const valores = [entrega.codigo, entrega.destino, entrega.integracao];
    for (const valor of valores) {
      const celula = document.createElement("td");
      celula.textContent = valor;
      linha.append(celula);
    }
    const celulaSituacao = document.createElement("td");
    const seloSituacao = document.createElement("span");
    seloSituacao.className = `situacao ${entrega.classeSituacao}`;
    seloSituacao.textContent = entrega.situacao;
    celulaSituacao.append(seloSituacao);
    linha.append(celulaSituacao);
    const celulaPrevisao = document.createElement("td");
    celulaPrevisao.textContent = entrega.previsao;
    linha.append(celulaPrevisao);
    corpoTabela.append(linha);
  }
  mensagemVazia.hidden = visiveis.length > 0;
  rotuloQuantidade.textContent = `${visiveis.length} ${visiveis.length === 1 ? "pedido exibido" : "pedidos exibidos"}`;
}

campoBusca.addEventListener("input", desenharPedidos);
for (const aba of abas) {
  aba.addEventListener("click", () => {
    situacaoSelecionada = aba.dataset.situacao;
    for (const botao of abas) {
      const ativo = botao === aba;
      botao.classList.toggle("selecionado", ativo);
      botao.setAttribute("aria-pressed", String(ativo));
    }
    desenharPedidos();
  });
}

desenharPedidos();

