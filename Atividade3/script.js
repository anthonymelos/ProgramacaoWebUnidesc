function carregar() {
  const lista = JSON.parse(localStorage.getItem("alunos")) || [];
  const div = document.getElementById("lista");
  div.innerHTML = "";

  lista.forEach(aluno => {
    div.innerHTML += `
      <div class="card">
        <p><strong>${aluno.nome}</strong></p>
        <p>Matrícula: ${aluno.matricula}</p>
        <img src="${aluno.foto}">
      </div>
    `;
  });
}

function cadastrar() {
  const nome = document.getElementById("nome").value;
  const matricula = document.getElementById("matricula").value;
  const file = document.getElementById("foto").files[0];

  if (!file) {
    alert("Selecione uma imagem!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function() {
    const fotoBase64 = reader.result;
    const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    alunos.push({ nome, matricula, foto: fotoBase64 });
    localStorage.setItem("alunos", JSON.stringify(alunos));
    carregar();
  };

  reader.readAsDataURL(file);
}

function limpar() {
  localStorage.removeItem("alunos");
  carregar();
}
carregar();