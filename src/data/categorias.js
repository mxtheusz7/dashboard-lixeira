// Catálogo de categorias de resíduos (DADOS FICTÍCIOS / PROVISÓRIO).
// As categorias reais serão definidas pelo grupo (modelo de IA).
// O campo "id" é o que será gravado em cada descarte; "nome" e "cor" são apresentação.

export const grupos = [
  { id: 'reciclavel', nome: 'Reciclável' },
  { id: 'organico', nome: 'Orgânico' },
  { id: 'nao_reciclavel', nome: 'Não reciclável' },
]

export const categorias = [
  { id: 'plastico', nome: 'Plástico', grupo: 'reciclavel', cor: 'var(--color-cat-plastico)' },
  { id: 'papel', nome: 'Papel', grupo: 'reciclavel', cor: 'var(--color-cat-papel)' },
  { id: 'metal', nome: 'Metal', grupo: 'reciclavel', cor: 'var(--color-cat-metal)' },
  { id: 'vidro', nome: 'Vidro', grupo: 'reciclavel', cor: 'var(--color-cat-vidro)' },
  { id: 'organico', nome: 'Orgânico', grupo: 'organico', cor: 'var(--color-cat-organico)' },
  { id: 'rejeito', nome: 'Rejeito', grupo: 'nao_reciclavel', cor: 'var(--color-cat-rejeito)' },
]
