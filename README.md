# 📦 Brev.ly - Encurtador de URLs

Este repositório contém a minha solução para o desafio prático da minha pós-graduação: o projeto **Brev.ly**, um encurtador de URLs que permite cadastrar, listar, remover e redirecionar links, além de gerar relatórios de acessos.

---

## 📌 Sobre a Solução

<!-- Print de quando a aplicacao ficar pronta -->

A aplicação foi desenvolvida seguindo boas práticas de organização e separação de responsabilidades, dividindo o código em duas subpastas (`web` e `server`) para facilitar a manutenção e a escalabilidade.

---

## 🗂 Estrutura do Repositório

### 1. `web` - Frontend

A pasta `web` contém a interface do usuário, desenvolvida em **React** com **TypeScript**, utilizando **Vite** como bundler.

---

### 2. `server` - Backend e DevOps

A pasta `server` concentra a API, a lógica de negócio e as configurações de DevOps.  
Foi implementada em **Fastify** com **TypeScript**, utilizando **Drizzle ORM** para integração com **PostgreSQL**.

---

## 🏆 Funcionalidades Implementadas

- Cadastro de URLs encurtadas com validação de dados.
- Listagem das URLs cadastradas.
- Remoção de URLs.
- Redirecionamento rápido e seguro para o link original.
- Relatórios com o número de acessos por URL.
