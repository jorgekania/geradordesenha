document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("senhaForm");
  const letrasOpcoes = document.getElementById("letrasOpcoes");
  const mensagemErroDiv = document.getElementById("mensagemErro");
  const copyText = document.getElementById("copyMe");
  const showText = document.getElementById("showText");

  const quantidadeCaracteresInput = document.getElementById(
    "quantidadeCaracteres"
  );
  const quantidadeSelecionadaSpan = document.getElementById(
    "quantidadeselecionada"
  );

  // Atualiza a quantidade de caracteres exibida
  quantidadeCaracteresInput.addEventListener("input", function () {
    quantidadeSelecionadaSpan.textContent = this.value;
  });

  // Inicializa a quantidade de caracteres exibida
  quantidadeSelecionadaSpan.textContent = quantidadeCaracteresInput.value;

  // Função para mostrar/ocultar opções de letras com base na seleção de incluir letras
  function toggleLetrasOptions() {
    letrasOpcoes.style.display = document.getElementById("incluirLetras")
      .checked
      ? "block"
      : "none";
  }

  toggleLetrasOptions();

  // Atualiza as opções de letras quando a seleção é alterada
  document
    .getElementById("incluirLetras")
    .addEventListener("change", toggleLetrasOptions);

  // Função para gerar senha
  function gerarSenha(
    quantidade,
    incluirLetras,
    incluirNumeros,
    incluirEspeciais,
    letrasMaiusculas,
    letrasMinusculas
  ) {
    const letrasMaiusculasSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const letrasMinusculasSet = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const especiais = "@#$%&*";

    let caracteres = "";

    if (incluirLetras) {
      if (letrasMaiusculas && letrasMinusculas) {
        caracteres += letrasMaiusculasSet + letrasMinusculasSet;
      } else if (letrasMaiusculas) {
        caracteres += letrasMaiusculasSet;
      } else if (letrasMinusculas) {
        caracteres += letrasMinusculasSet;
      }
    }

    if (incluirNumeros) {
      caracteres += numeros;
    }

    if (incluirEspeciais) {
      caracteres += especiais;
    }

    if (caracteres === "") {
      return "Selecione pelo menos um conjunto de caracteres.";
    }

    let senha = "";

    for (let i = 0; i < quantidade; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      senha += caracteres[randomIndex];
    }

    return senha;
  }

  // Função para exibir mensagens de erro
  function exibirErro(mensagem) {
    mensagemErroDiv.textContent = mensagem;
  }

  // Manipula o envio do formulário
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const quantidade = parseInt(quantidadeCaracteresInput.value);
    const incluirLetras = document.getElementById("incluirLetras").checked;
    const incluirNumeros = document.getElementById("incluirNumeros").checked;
    const incluirEspeciais =
      document.getElementById("incluirEspeciais").checked;
    const letrasMaiusculas =
      document.getElementById("letrasMaiusculas").checked;
    const letrasMinusculas =
      document.getElementById("letrasMinusculas").checked;

    // Validações
    if (!incluirLetras && !incluirNumeros && !incluirEspeciais) {
      exibirErro("Selecione pelo menos um conjunto de caracteres.");
      return;
    }

    if (incluirLetras && !letrasMaiusculas && !letrasMinusculas) {
      exibirErro("Selecione pelo menos um tipo de letras.");
      return;
    }

    mensagemErroDiv.textContent = "";

    // Gere a senha
    const senhaGerada = gerarSenha(
      quantidade,
      incluirLetras,
      incluirNumeros,
      incluirEspeciais,
      letrasMaiusculas,
      letrasMinusculas
    );
    copyText.value = senhaGerada;
  });

  // Função para copiar senha para a área de transferência
  function copiarSenha() {
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Para dispositivos móveis
    document.execCommand("copy");
    showText.innerHTML = `<div class="mt-5 text-center">A senha <span class="font-bold underline">${copyText.value}</span> foi copiada</div>`;
    setTimeout(() => {
      showText.innerHTML = "";
    }, 5000);
  }

  // Atrela a função de cópia ao botão de cópia
  document
    .getElementById("copyMeOnClipboard")
    .addEventListener("click", copiarSenha);
});
