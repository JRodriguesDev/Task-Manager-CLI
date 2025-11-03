# Task-Manager-CLI

## Descrição

Um gerenciador de tarefas simples em CLI (Command Line Interface), desenvolvido em TypeScript para fins de aprendizado. O projeto serve como um aquecimento para reaprender conceitos de JavaScript/TypeScript, com foco em modularidade, interfaces, classes e persistência básica em arquivos JSON.

Funcionalidades principais:
- Registro e login de usuários (com senhas hashed para segurança).
- Criação, visualização, edição e exclusão de tarefas.
- Status de tarefas: pending, progress ou complete.
- Persistência em arquivos JSON na pasta `/db`.

É um projeto básico, sem banco de dados real ou features avançadas, ideal para praticar TS em um app de terminal.

## Tecnologias Usadas

- **TypeScript**: Para tipagem e estrutura.
- **Node.js**: Runtime.
- **Inquirer**: Para prompts interativos no terminal.
- **Bcryptjs**: Para hash de senhas.
- **fs.promises**: Para manipulação de arquivos assíncrona.


Ao iniciar, você verá um menu inicial:
- **Register**: Crie um novo usuário (nome e senha).
- **Login**: Entre com credenciais existentes.
- **Credits**: Veja créditos (simples).
- **Exit**: Saia do app.

Após login:
- Gerencie tarefas: Crie novas, edite status/descrição, delete.
- Opção para deletar o usuário.

Exemplo de fluxo:
1. Registre um usuário.
2. Logue.
3. Selecione "Tasks" para criar/listar tarefas.

**Notas**:
- Dados são salvos em `/db` (ignorada no .gitignore para evitar commits).
- Se `/db` não existir, o app cria automaticamente.

