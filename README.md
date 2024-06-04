# teste-back-end-node-COMEIA

# Como instalar o projeto e usar
- Para instalar os pacotes do projeto e so usar um dos comandos abaixo. Porém preferencialmente foi utilizado o PNPM, só que você não terá problemas em usar o NPM ou qualquer outro
  
### Instalar pacotes

```bash
# npm
npm install

# pnpm
pnpm install (Preferencialmente usado no projeto)

# yarn
yarn install
```
### Swagger
#### Rota para verificar o swagger
```- http://localhost:3333/docs/```
### Configurações de ambiente
#### primeiro renomeie o arquivo (.env.example) para (.env) e adicionei essas configurações
- Atenção e importante adicionar o nome da database (pois ela será criada automaticamente)

```bash
port=3333
mongodb=mongodb://localhost:27017/
database=db_avaliacao
secret_key=Vjq0D5XZKi
```

- Para essa questão do banco de dados do Mongo fiz um codigo que cria tudo automatico já logo na iniciação do projeto com  ``` npm run dev ```, segue o local onde chamo a função de criação

```bash
//inicia o serviço do mongo para criar as collections
(async () => {
  createDBA();
  await createCollection("avaliacao");
  await createCollection("user");
})();
```
- Ele cria essas duas coleção para o projeto, e claro, caso já exista nao irá criar novamente! por isso eu lanço no  ``` console.log ``` a mensagem ``` já existe uma collection com esse nome ```

#### Bibiliotecas Usadas
  - bcrypt
  - express
  - jsonwebtoken
  - mongodb
  - swagger-ui-express

# Etapas

•  Avalição: -> ✅
  - cadastrar, editar, excluir e listar; -> ✅

•  Usuario: -> ✅
  - cadastrar, editar, excluir e listar; -> ✅

•  Autenticação -> ✅

•  Estrutura tabela MongoDB -> ✅
  - id: ID da avaliação. -> ✅
  - userId: ID do usuário que fez a avaliação. -> ✅
  - rating: Nota da avaliação (1 a 5). -> ✅
  - comment: Comentário da avaliação. -> ✅

Requisitos
- Banco de Dados: MongoDB; -> ✅
- Documentação da API: Swagger; -> ✅
- Validação dos dados de entrada; -> ✅
- Tratamento de erros; -> ✅
- Rotas protegidas: Padrão Bearer Authentication; -> ✅
- Testes unitários: Jest. -> ✅
- Testes de integração: Supertest. -> ✅
