// Simula o acesso a uma fonte de dados remota.
//
// Por que existe? O Firebase responderá de forma ASSÍNCRONA (com atraso e possibilidade
// de erro). Se os mocks respondessem instantaneamente, a interface nunca seria
// testada com "carregando". Aqui devolvemos uma Promise após um pequeno atraso.
//
// Este arquivo deixa de ser usado na Etapa 2, quando os services passarem a consultar o Firebase.

const LATENCIA_PADRAO_MS = 250

export function respostaMock(dados, latenciaMs = LATENCIA_PADRAO_MS) {
  return new Promise((resolve) => {
    // structuredClone entrega uma cópia, como uma resposta de rede faria,
    // evitando que a interface altere os mocks por engano.
    setTimeout(() => resolve(structuredClone(dados)), latenciaMs)
  })
}
