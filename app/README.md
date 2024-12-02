
# Setup Docker Laravel 11 com PHP 8.3

### Passo a passo
Clone Repositório
```sh
git clone https://github.com/isaiasvas/teste-inicie.git app-inicie
```
```sh
cd app-inicie/app
```

Verifique se as portas 8080 8000 3600 esta sendo utilizada antes de continue

Crie o Arquivo .env
```sh
cp .env.example .env
```

Caso não altere os dados o banco sera criado com os dados padrões configurados no docker-compose.yml
```sh
DB_CONNECTION=mysql
DB_HOST=DB
DB_PORT=3306
DB_DATABASE=appinicie
DB_USERNAME=username
DB_PASSWORD=userpass
```

Suba os containers do projeto
```sh
docker-compose up -d
```

Acesse o container app
```sh
docker-compose exec app bash
```

Instale as dependências do projeto
```sh
composer install
```

Gere a key do projeto Laravel
```sh
php artisan key:generate
```

Rodar as migrations
```sh
php artisan migrate
```

Rodar as seeds
```sh
php artisan db:seed
```

Usuario padrão criado para uso do sistema
```sh
admin@example.com
123456a
```

# Rotas disponiveis


Login usuario (POST)
```json
"http://127.0.0.1:8000/api/login"
{
    {
        "status": true,
        "user": {
            "email": "admin@example.com",
            "password": "123456a"
        },
        "token": "bearer token",
        "message": "Login realizado com sucesso",
    }

}
```

Criar usuario (POST)
```json
"http://127.0.0.1:8000/api/users"
{
    {
        "status": true,
        "user": {
            "name": "name",
            "email": "email@example.com",
            "password": "password"
        },
        "message": "Usuário criado com sucesso"
    }

}
```

Listar Todas as tarefas (GET)
```json
"http://127.0.0.1:8000/api/tasks"
{
    "status": "true | false",
    "tasks": [
        {
            "id": "id",
            "title": "title",
            "status": "pendente | concluída",
            "completed_at": "null | now"
        },
        {
            "id": "id",
            "title": "title",
            "status": "pendente | concluída",
            "completed_at": "null | now"
        },
    ]
}
```

Visualizar Tarefa (POST)
```json
"http://127.0.0.1:8000/api/tasks"
{
    "status": "true | false",
    "message": "Tarefa criada com sucesso!",
    "tasks": {
        "id": "id",
        "title": "title",
        "status": "pendente | concluída",
        "completed_at": "null | now"
    }
}
```

Visualizar Tarefa (GET)
```json
"http://127.0.0.1:8000/api/tasks/{id}"
{
    "status": "true | false",
    "tasks": {
        "id": "id",
        "title": "title",
        "status": "pendente | concluída",
        "completed_at": "null | now"
    }
}
```

Atualizar Status Tarefa (PUT)
```json
"http://127.0.0.1:8000/api/tasks/{id}/status"
{
    "status": "true | false",
    "message": "Status da tarefa atualizado com sucesso!",
    "tasks": {
        "id": "id",
        "title": "title"
        "status": "pendente | concluída",
        "completed_at": "null | now"
    }
}
```

Excluir Tarefa (DELETE)
```json
"http://127.0.0.1:8000/api/tasks/{id}"
{
    "status": "true | false",
    "message": "Tarefa excluída com sucesso!"
}
```
