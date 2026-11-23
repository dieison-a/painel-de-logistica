const deliveries = [
  { id: "TL-2048", destination: "Florianópolis · SC", integration: "Loja virtual", status: "Em trânsito", date: "Hoje, 16h", code: "ok" },
  { id: "TL-2047", destination: "Curitiba · PR", integration: "ERP de demonstração", status: "Atenção", date: "Aguardando retorno", code: "warn" },
  { id: "TL-2046", destination: "Porto Alegre · RS", integration: "Loja virtual", status: "Entregue", date: "Ontem, 14h", code: "done" },
  { id: "TL-2045", destination: "Joinville · SC", integration: "ERP de demonstração", status: "Em trânsito", date: "Hoje, 18h", code: "ok" },
  { id: "TL-2044", destination: "São José · SC", integration: "Loja virtual", status: "Atenção", date: "Revisar endereço", code: "warn" }
];

const tableBody = document.querySelector("#orders");
const searchInput = document.querySelector("#search");
const emptyMessage = document.querySelector("#empty");
const countLabel = document.querySelector("#result-count");
const tabs = [...document.querySelectorAll(".tab")];
let selectedStatus = "all";

function renderOrders() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const visible = deliveries.filter((delivery) => {
    const matchesStatus = selectedStatus === "all" || delivery.status === selectedStatus;
    const matchesQuery = `${delivery.id} ${delivery.destination} ${delivery.integration}`.toLocaleLowerCase("pt-BR").includes(query);
    return matchesStatus && matchesQuery;
  });

  tableBody.replaceChildren();
  for (const delivery of visible) {
    const row = document.createElement("tr");
    const values = [delivery.id, delivery.destination, delivery.integration];
    for (const value of values) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    }
    const statusCell = document.createElement("td");
    const badge = document.createElement("span");
    badge.className = `status ${delivery.code}`;
    badge.textContent = delivery.status;
    statusCell.append(badge);
    row.append(statusCell);
    const dateCell = document.createElement("td");
    dateCell.textContent = delivery.date;
    row.append(dateCell);
    tableBody.append(row);
  }
  emptyMessage.hidden = visible.length > 0;
  countLabel.textContent = `${visible.length} ${visible.length === 1 ? "pedido exibido" : "pedidos exibidos"}`;
}

searchInput.addEventListener("input", renderOrders);
for (const tab of tabs) {
  tab.addEventListener("click", () => {
    selectedStatus = tab.dataset.status;
    for (const button of tabs) {
      const active = button === tab;
      button.classList.toggle("selected", active);
      button.setAttribute("aria-pressed", String(active));
    }
    renderOrders();
  });
}

renderOrders();
