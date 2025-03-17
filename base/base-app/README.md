# Base App

Questo progetto rappresenta l'app base che gestisce il workflow di login e signin. È concepita per fornire una struttura di partenza per applicazioni che richiedono autenticazione utente.

## Caratteristiche

- **Workflow di autenticazione**: Implementazione di base per la gestione dell'autenticazione.
- **Mock dell'UI**: Il focus è sulla logica di autenticazione; l'interfaccia utente deve essere sviluppata separatamente. Contiene componenti non stilizzati.
- **Architettura modulare**: Progettato per essere esteso e integrato in progetti più complessi.
- **Agnostico rispetto al backend**

## Convenzioni

- seguire le convenzioni di nuxt 3 e vue 3
  - cartelle chiamate come i valori di default di nuxt
  - composable del tipo useAuth.ts (dentro di essi un solo export es export function useAuth)
  - viste in pages camelCase
  - componenti in components PascalCase

## Riutilizzabilità

- base-app è possibile eseguirla stand alone, in conformità con il pattern dei microfrontend, ma in realtà non dovrebbe mai essere estesa direttamente da un app reale
- ha un css minimale ([https://simplecss.org/](SimpleCss)) referenziato direttamente da app.vue, così non verrà utilizzato dalle app che estenderanno base-app
