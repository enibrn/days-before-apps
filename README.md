# Days Before Apps

Questo progetto consiste in un inseme di progetti [Nuxt 3](https://nuxt.com/) e librerie per generare rapidamente applicazioni web e mobile.

Essenzialmente una applicazione consiste in una UI e un integrazione con un BaaS (Backend as a Service).

L'architettura sfrutta il pattern di dependency injection tramite i plugin di Nuxt per astrarre l'implementazione del BaaS e l'utilizzo di Nuxt extends per assemblare le UI in maniera ereditaria.

Tutti i progetti sono presenti in un unico repository per facilitare lo sviluppo.

## Obiettivi

- implementare due tipi di template UI
  - [Vuetify](https://vuetifyjs.com/) per le applicazioni web (desktop oriented)
  - [Ionic Vue](https://ionicframework.com/docs/vue/overview) per le progressive web app (mobile oriented)
- implementare due diversi BaaS open source
  - [Appwrite](https://appwrite.io/)
  - [Supabase](https://supabase.com/)
- creare applicazioni estendendo un template UI e specificando il tipo di backend insieme ai sui puntamenti
  - applicazioni di test
  - todo list app

## Futuro

- scorporare le cartelle in repository separate ed eventualmente pacchetti npm
- (Vuetify) utilizzare [JSON Forms Vue Vuetify](https://github.com/eclipsesource/jsonforms/blob/master/packages/vue-vuetify/README.md) per generare velocemente la gestione di entità CRUD a partire da json schema
- (Ionic) compilazione di app native Android e iOs, complete di notifiche e offline-first
