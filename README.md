## Quasar Project
### Instalation de dependence
```
yarn
```

### mode dev
```
quasar dev
```
### build
```
quasar build
```
# pouchORM
## Fonctionnalités
Les fonctionanaliter de base sont le même que pouchDB, mais il apporte une simplicité de manipulation de donner pour se focaliser sur le donner que sur la base de donner.

## Point fort:
- L'introduction du concept de Collections dans pouchdb:
    - Plusieurs collections dans une seule base de données
    - Plusieurs collections dans plusieurs bases de données
- Suport de Typescript
- Il a aussi la validation de classe avec class-validation comme pouchDB
-  On peut toujours accéder à l'objet PouchDB natif et exécuter des opérations de synchronisation. Ou d'utiliser celle propose par pouchORM
-  On peut également annuler la synchronisation en temps réel

## Point faible:
- Il n'y a pas trop de documentation à part celle dans la documentation
- Il est maintenu par une seule personne 

## Difficulté:
L'intégration avec quasar qui tourne avec Vite est un peu compliquer pour le moment