const API_URL = "http://localhost:8080/vagas";

let ultimaResposta = "";
let vagasData = null;

const searchInput = document.getElementById("search-vaga");

function extrairEstado(estadoBruto) {
  let estado = estadoBruto;

  if (typeof estadoBruto === "string") {
    const texto = estadoBruto.trim();
    if ((texto.startsWith("{") && texto.endsWith("}")) || (texto.startsWith("[") && texto.endsWith("]"))) {
      try {
        const parsed = JSON.parse(texto);
        if (parsed && typeof parsed === "object") {
          estado = parsed;
        }
      } catch {
        // permanece string simples se não for JSON válido
      }
    }
  }

  if (estado && typeof estado === "object" && "status" in estado) {
    return estado.status;
  }

  return estado;
}


function isOcupada(statusValor) {
  const valor = String(statusValor).trim().toLowerCase();
  return ["ocupada", "ocupado", "true", "1", "sim"].includes(valor) || statusValor === true;
}

function renderVagas() {
  const container = document.getElementById("container-vagas");
  const status = document.getElementById("status");
  const query = searchInput?.value.trim().toLowerCase() || "";

  if (!vagasData) {
    container.innerHTML = "";
    status.textContent = "Carregando vagas...";
    return;
  }

  const todasVagas = Object.keys(vagasData);
  const vagasFiltradas = todasVagas.filter(vaga => {
    const nomeVaga = vaga.toLowerCase();
    const estadoBruto = vagasData[vaga];
    const statusValor = extrairEstado(estadoBruto);
    const textoStatus = String(statusValor).trim().toLowerCase();

    return nomeVaga.includes(query) || textoStatus.includes(query);
  });

  let livres = 0;
  let ocupadas = 0;

  container.innerHTML = "";

  if (vagasFiltradas.length === 0) {
    container.innerHTML = `<div class="sem-resultados">Nenhuma vaga encontrada para "<strong>${query}</strong>".</div>`;
  } else {
    vagasFiltradas.forEach(vaga => {
      const estadoBruto = vagasData[vaga];
      const statusValor = extrairEstado(estadoBruto);
      const estaOcupada = isOcupada(statusValor);
      const statusLabel = estaOcupada ? "OCUPADA" : "LIVRE";
      const statusEmoji = estaOcupada ? "🚗" : "🟢";

      const div = document.createElement("div");
      div.classList.add("vaga");
      div.classList.add(estaOcupada ? "ocupada" : "livre");
      div.innerHTML = `<div>${vaga}</div><div>${statusEmoji} ${statusLabel}</div>`;

      if (estaOcupada) {
        ocupadas++;
      } else {
        livres++;
      }

      container.appendChild(div);
    });
  }

  status.innerHTML = `🟢 Livres: ${livres} | 🔴 Ocupadas: ${ocupadas}`;
  if (query) {
    status.innerHTML += ` | Mostrando ${vagasFiltradas.length} de ${todasVagas.length}`;
  }
}

async function carregarVagas() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data && typeof data === "object") {
      data["Vaga Fictícia"] = "livre";
    }

    const jsonAtual = JSON.stringify(data);
    if (jsonAtual === ultimaResposta) {
      renderVagas();
      return;
    }

    ultimaResposta = jsonAtual;
    vagasData = data;
    renderVagas();
  } catch (error) {
    console.error("Erro ao carregar vagas:", error);
  }
}

searchInput?.addEventListener("input", renderVagas);

setInterval(carregarVagas, 1000);

carregarVagas();
