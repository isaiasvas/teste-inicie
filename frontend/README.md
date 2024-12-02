# Setup Angular 19

### Passo a passo

Este projeto é gerado pelo [Angular CLI](https://github.com/angular/angular-cli) Versão 19.0.2.

Abra a pasta do frontend
```bash
cd app-inicie/frontend
```

O Angular depende do Node.js, então a primeira coisa é instalá-lo.
```bash
sudo apt update
sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
```

Agora instale o angular/cli
```bash
npm install -g @angular/cli
```
Em seguida instale as dependencias
```bash
npm install
```

Para iniciar o projeto localmente, execute o comando:
```bash
ng serve
```

Depois que o servidor estiver rodando, abra o seu navegador e acesse http://localhost:4200/. A aplicação será recarregada automaticamente sempre que você modificar algum dos arquivos de origem.

# Usuario Padrão para uso
```bash
admin@example.com
123456a
```


(OPCIONAL) Para construir o projeto, execute

```bash
ng build
```

