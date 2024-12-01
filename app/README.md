
# Setup Docker Laravel 11 com PHP 8.3

### Passo a passo
Clone Repositório
```sh
git clone https://github.com/especializati/setup-docker-laravel.git app-inicie
```
```sh
cd app-inicie
```

Verifique se as portas 8080 8000 3600 esta sendo utilizada antes de continue

Crie o Arquivo .env
```sh
cp .env.example .env
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

Rodar as migrations
```sh
php artisan db:seed
```

Acesse o projeto
[http://localhost:8000](http://localhost:8000)
