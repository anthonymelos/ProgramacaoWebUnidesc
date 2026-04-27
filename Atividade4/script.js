function carregarDocs() {
  const lista = JSON.parse(localStorage.getItem("docs")) || [];
  const div = document.getElementById("docs");
  div.innerHTML = "";

  lista.forEach(doc => {
    let preview = "";

    if (doc.tipo.includes("image")) {
      preview = `<img src="${doc.arquivo}" width="200">`;
    } else if (doc.tipo.includes("pdf")) {
      preview = `<iframe src="${doc.arquivo}" width="300" height="200"></iframe>`;
    }

    div.innerHTML += `
      <div style="border:1px solid #ccc; margin-top:10px; padding:10px;">
        <h4>${doc.titulo}</h4>
        <p>${doc.descricao}</p>
        ${preview}
      </div>
    `;
  });
}

function salvar() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const file = document.getElementById("arquivo").files[0];

  if (!file) {
    alert("Selecione um arquivo!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function() {
    const base64 = reader.result;
    const docs = JSON.parse(localStorage.getItem("docs")) || [];
    docs.push({
      titulo,
      descricao,
      arquivo: base64,
      tipo: file.type
    });

    localStorage.setItem("docs", JSON.stringify(docs));
    carregarDocs();
  };

  reader.readAsDataURL(file);
}
carregarDocs();