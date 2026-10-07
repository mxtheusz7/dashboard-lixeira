// Hook personalizado: chama uma função de service e acompanha o resultado.
// Devolve { data, loading, error }, os três estados que toda tela precisa tratar.
//
// IMPORTANTE: "buscar" deve ser uma função estável (declarada fora do componente,
// como as funções dos services). Passar uma função criada a cada renderização
// faria o hook buscar os dados em loop.

import { useEffect, useState } from 'react'

export function useServiceData(buscar) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ativo = true // evita atualizar o estado se o componente já foi desmontado

    buscar()
      .then((resultado) => {
        if (ativo) setData(resultado)
      })
      .catch((erro) => {
        if (ativo) setError(erro)
      })
      .finally(() => {
        if (ativo) setLoading(false)
      })

    return () => {
      ativo = false
    }
  }, [buscar])

  return { data, loading, error }
}
