# GestioneTickets
App per la gestione dei ticket

## Deploy su GitHub Pages
Il frontend viene pubblicato automaticamente all'aggiornamento del branch `main` tramite GitHub Actions.
Il workflow `deploy-pages.yml` avvia MySQL, compila il backend e costruisce il progetto in `frontend/` quindi pubblica la cartella `dist` sul branch `gh-pages` tramite l'action `peaceiris/actions-gh-pages`.
