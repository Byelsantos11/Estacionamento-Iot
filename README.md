# 🚗 EstacioneIoT

## 📌 Sobre o Projeto

O **EstacioneIoT** é um sistema de monitoramento inteligente de vagas de estacionamento utilizando Internet das Coisas (IoT). O objetivo do projeto é detectar automaticamente a ocupação das vagas por meio de sensores de movimento, permitindo que usuários visualizem em tempo real quais vagas estão livres ou ocupadas.

O sistema integra dispositivos IoT com uma aplicação web, fornecendo informações atualizadas sobre o estado do estacionamento de forma simples e eficiente.

---

## 🎯 Tema Escolhido

**Monitoramento Inteligente de Estacionamento utilizando IoT**

---

## ❗ Problema Resolvido

Em estacionamentos convencionais, os motoristas frequentemente enfrentam dificuldades para encontrar vagas disponíveis, gerando perda de tempo e congestionamento interno.

O EstacioneIoT resolve esse problema monitorando automaticamente cada vaga e informando seu status em tempo real, melhorando a experiência dos usuários e a gestão do estacionamento.

---

## 🏗️ Tecnologias Utilizadas

### Backend

* Java
* Spring Boot
* Arquitetura MVC
* Maven

### Frontend

* HTML5
* CSS3
* JavaScript

### IoT

* ESP32
* Sensor de Movimento PIR HC-SR501
* MQTT para comunicação dos dispositivos

---

## 📂 Entidades Implementadas

### Vaga

Representa uma vaga de estacionamento.

Atributos:

* id
* numero
* status (LIVRE ou OCUPADA)

### Sensor

Representa o sensor responsável pelo monitoramento.

Atributos:

* id
* identificador
* ultimaLeitura

### Evento de Ocupação

Registra alterações de status das vagas.

Atributos:

* id
* vagaId
* dataHora
* status

---

## 🚀 Instruções para Execução

### Backend

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
```

2. Entre na pasta do projeto:

```bash
cd backend
```

3. Execute a aplicação:

```bash
./mvnw spring-boot:run
```

ou

```bash
mvn spring-boot:run
```

4. O backend ficará disponível em:

```text
http://localhost:8080
```

---

### Frontend

1. Abra a pasta do frontend.

2. Execute um servidor local ou utilize a extensão Live Server do VS Code.

3. Acesse:

```text
http://localhost:5500
```

---

## ⚙️ Variáveis de Ambiente

Configure as seguintes propriedades no arquivo `application.properties`:

```properties
server.port=8080

mqtt.broker=tcp://localhost:1883
mqtt.client.id=estacioneiot-backend
mqtt.topic=estacionamento/vagas
```

---

## 👤 Usuários para Teste

Atualmente o sistema não possui autenticação de usuários.

A visualização das vagas pode ser realizada diretamente pela interface web.

---

## 📋 Funcionamento

1. O sensor PIR detecta movimento próximo à vaga.
2. O ESP32 envia os dados para o broker MQTT.
3. O backend Spring Boot recebe as mensagens.
4. O status da vaga é atualizado.
5. O frontend exibe em tempo real se a vaga está:

   * 🟢 Livre
   * 🔴 Ocupada

---

## 👨‍💻 Divisão de Responsabilidades

### Gabryel Rodrigues

* Desenvolvimento do Backend
* Implementação da arquitetura MVC
* Integração MQTT
* APIs REST

### Flavio Dias

* Montagem do circuito IoT
* Configuração do ESP32
* Integração dos sensores PIR

### Deivid Santos

* Desenvolvimento do Frontend
* Interface do usuário
* Consumo das APIs
* Atualização visual das vagas

---

## 📚 Objetivo Acadêmico

Este projeto foi desenvolvido com fins acadêmicos para demonstrar a aplicação prática de Internet das Coisas (IoT), integração de hardware e software, comunicação em tempo real e desenvolvimento web utilizando tecnologias modernas.
