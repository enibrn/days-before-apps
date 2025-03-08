# Progetto Base UI Backend-Agnostic

Questo progetto contiene le interfacce e le implementazioni pensate per rendere l'interfaccia utente (UI) indipendente dai BaaS (*Backend as a Service*). L'obiettivo è separare la logica di presentazione dalle implementazioni specifiche di servizio, consentendo una maggiore flessibilità e facilità di manutenzione.

## Caratteristiche principali

- Definizione chiara delle interfacce per la comunicazione tra frontend e backend.
- Implementazioni modulari che astraggono i dettagli dei vari BaaS.
- Possibilità di integrare facilmente nuovi servizi adattando le implementazioni esistenti.

## Convenzioni

- nomi delle cartelle in minuscolo
- nomi dei file in maiuscolo, pascal case
  - Anche per i composable vue (compromesso per non aver differenze)
- I maiuscola come prefisso delle interfacce es.: IAuth
- File di tipo diverso nella stessa cartella, per evitare dispersione
- Cartelle per dominio, es auth
