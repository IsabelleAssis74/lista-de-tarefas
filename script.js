const campo = document.getElementById("nova-tarefa");
const botaoAdicionar = document.getElementById("adicionar");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function mostrar() {
  lista.innerHTML = "";

  tarefas.forEach(function (tarefa, indice) {
    const item = document.createElement("li");
    if (tarefa.feita) {
      item.classList.add("feita");
    }

    const texto = document.createElement("span");
    texto.textContent = tarefa.texto;
    texto.addEventListener("click", function () {
      tarefas[indice].feita = !tarefas[indice].feita;
      salvar();
      mostrar();
    });

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";
    botaoRemover.addEventListener("click", function () {
      tarefas.splice(indice, 1);
      salvar();
      mostrar();
    });

    item.appendChild(texto);
    item.appendChild(botaoRemover);
    lista.appendChild(item);
  });

  const pendentes = tarefas.filter(function (t) {
    return !t.feita;
  }).length;
  contador.textContent = pendentes + " tarefa(s) pendente(s)";
}

function adicionar() {
  const texto = campo.value.trim();
  if (texto === "") {
    return;
  }

  tarefas.push({ texto: texto, feita: false });
  campo.value = "";
  salvar();
  mostrar();
}

botaoAdicionar.addEventListener("click", adicionar);
campo.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    adicionar();
  }
});

mostrar();
