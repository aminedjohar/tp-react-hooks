# TP React Hooks - Application de Gestion de Produits

Ce TP a pour objectif de mettre en pratique l'utilisation des Hooks React (useState, useEffect, useContext) ainsi que la création de Hooks personnalisés.

## Installation et configuration initiale

1. Cloner le dépôt :
```bash
git clone https://github.com/pr-daaif/tp-react-hooks.git
cd tp-react-hooks
```

2. Créer votre propre dépôt sur Github et changer le remote :
```bash
# Supprimer le remote origine
git remote remove origin

# Ajouter votre nouveau remote
git remote add origin https://github.com/[votre-username]/tp-react-hooks.git

# Premier push
git push -u origin main
```

3. Installer les dépendances :
```bash
npm install
```

4. Lancer l'application :
```bash
npm start
```

## Instructions pour le TP

Pour chaque exercice :
1. Lisez attentivement l'énoncé
2. Implémentez la solution
3. Testez votre implémentation (pensez à faire des copies d'écran)
4. Mettez à jour la section correspondante dans ce README avec :
   - Une brève explication de votre solution
   - Des captures d'écran montrant le fonctionnement
   - Les difficultés rencontrées et comment vous les avez résolues
5. Commitez vos changements avec un message descriptif

### Exercice 1 : État et Effets 
#### Objectif : Implémenter une recherche en temps réel

- [x] 1.1 Modifier le composant ProductSearch pour utiliser la recherche
- [x] 1.2 Implémenter le debounce sur la recherche
- [x] 1.3 Documenter votre solution ici

_Votre réponse pour l'exercice 1 :_
```
Pour la recherche, j’ai utilisé un state `searchTerm` dans ProductSearch, passé au composant ProductList pour filtrer les produits en temps réel.  
Pour éviter de filtrer à chaque frappe, j’ai créé un hook personnalisé `useDebounce` qui retarde la mise à jour du terme de recherche de 300ms.  
Ainsi, la liste ne se met à jour que lorsque l’utilisateur a fini de taper.

Difficulté : comprendre où placer le filtrage (dans ProductList ou ProductSearch).  
Solution : j’ai choisi de filtrer dans ProductList pour garder ProductSearch simple.

[Recherche en temps réel](public/screenshots/recherche-fonctionne.png)

```

### Exercice 2 : Context et Internationalisation
#### Objectif : Gérer les préférences de langue

- [x] 2.1 Créer le LanguageContext
- [x] 2.2 Ajouter le sélecteur de langue
- [x] 2.3 Documenter votre solution ici

_Votre réponse pour l'exercice 2 :_
```
Pour la gestion de la langue, j’ai créé un `LanguageContext` qui stocke la langue courante et une fonction pour la changer.  
J’ai ajouté un sélecteur de langue dans le header, qui permet de passer du français à l’anglais.  
Tous les textes statiques de l’application (titre, placeholder de recherche, label prix, messages de chargement et d’erreur) sont traduits dynamiquement selon la langue choisie grâce à un objet `translations` centralisé dans `App.js`.

Difficulté : comprendre comment propager la langue et les traductions dans tous les composants.  
Solution : j’ai utilisé le context pour la langue et j’ai passé les traductions en props aux composants qui en ont besoin.

![Sélecteur de langue](public/screenshots/fr.png)
![Traduction en anglais](public/screenshots/en.png)
```

### Exercice 3 : Hooks Personnalisés
#### Objectif : Créer des hooks réutilisables

- [x] 3.1 Créer le hook useDebounce
- [x] 3.2 Créer le hook useLocalStorage
- [x] 3.3 Documenter votre solution ici

_Votre réponse pour l'exercice 3 :_
```
Pour cet exercice, j’ai créé deux hooks personnalisés :

- `useDebounce` : permet de retarder la mise à jour d’une valeur (déjà utilisé pour la recherche).
- `useLocalStorage` : permet de stocker et de synchroniser une valeur avec le localStorage du navigateur. Cela permet de conserver la langue ou le thème même après un rechargement de la page.

Difficulté : bien gérer la synchronisation initiale avec le localStorage et éviter les erreurs de parsing.
Solution : j’ai utilisé un try/catch et la fonction d’initialisation de useState.

```

### Exercice 4 : Gestion Asynchrone et Pagination
#### Objectif : Gérer le chargement et la pagination

- [x] 4.1 Ajouter le bouton de rechargement
- [x] 4.2 Implémenter la pagination
- [x] 4.3 Documenter votre solution ici

_Votre réponse pour l'exercice 4 :_
```
Pour la gestion asynchrone, j’ai ajouté un bouton de rechargement qui permet de refetcher les produits depuis l’API.  
Pour la pagination, j’ai limité l’affichage à 6 produits par page et ajouté des boutons “Précédent/Suivant” pour naviguer entre les pages.  
Le numéro de page et le total sont affichés, et tous les labels sont traduits selon la langue choisie.

Difficulté : bien synchroniser la pagination avec l’API et gérer le rechargement sans perdre l’état courant.
Solution : j’ai utilisé un state pour la page courante, un flag pour le rechargement, et passé toutes les fonctions nécessaires via le hook personnalisé.

![Pagination](public/screenshots/pagination.png)
![Bouton de rechargement](public/screenshots/reload.png)
```

## Rendu

- Ajoutez l'URL de votre dépôt Github dans  **Classroom** et envoyer la réponse dès le démarage de votre projet.
- Les push doivent se faire au fûr et à mesure que vous avancez dans votre projet.
- Le README.md doit être à jour avec vos réponses et captures d'écran. 
- Chaques exercice doit faire l'objet d'au moins un commit avec un message mentionnant le numéro de l'exercice.