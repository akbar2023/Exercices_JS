# Exercice 01 : Utiliser la "classe" `Observable` et `Subject`

---

## Présentation

Vous allez travailler avec la "classe" `Observable` de RxJS [documentée ici](https://rxjs-dev.firebaseapp.com/api/index/class/Observable).

La "classe" `Observable` nécessite une fonction qui sera initialement exécutée lors de la première souscription d'un "abonné" (voir l'[exemple](../../00%20-%20Exemples/exemple-00/README.md)).

Puis vous utiliserez, par la suite, la "classe" `Subjet` de RxJS [documentée ici](hhttps://rxjs-dev.firebaseapp.com/api/index/class/Subject).

La "classe" `Subjet` ne nécessite *PAS* de fonction qui sera initialement exécutée lors de la première souscription d'un "abonné". En revanche, les *Observables* de type `Subject` peuvent émettre des valeurs à leurs "abonnés" à tout moment à l'aide des méthodes `.next()`, `.complete` ou `.error()`.

Par exemple :
```
const baby = new Subject();

baby.subscribe(function(pleurs){
  console.log(pleurs);
});

baby.next("Ouin !");
```
---

## Objectif

Il s'agit ici de faire en sorte que lorsque l'utilisateur appuie sur la touche :

* *haut*, le symbole correspondant s'affiche à la suite sur le document HTML
* ou *droite*, le symbole correspondant s'affiche à la suite sur le document HTML
* ou *bas*, le symbole correspondant s'affiche à la suite sur le document HTML
* ou *gauche*, le symbole correspondant s'affiche à la suite sur le document HTML

Vous retrouverez les codes pour les symboles *haut*, *droite*, *bas* et *gauche* sur la [page suivante](https://www.toptal.com/designers/htmlarrows/).

Enfin, lorsque l'utilisateur appuie sur la touche *Entrée*, l'affichage des symboles de direction doit cesser d'être affiché.

---

## Enoncé :

### Partie 1 :

* Vous devez importer la "classe" `Observable` à partir de RxJS;
* Au chargement du document, vous devez créer un `Observable` qui contient le code qui permet de gérer l'évènement `keydown`. Si l'utilisateur appuie sur *Entrée* l'`Observable` cesse d'émettre des valeurs sinon l'`Observable` transmet à ses "abonnés" le code de touche qui été pressée.
* Vous devez créer un abonné à l'`Observable` qui utilise le code de touche pour afficher dans le document HTML le symbole correspondant au code de touche.

### Partie 2 :

* Réécrivez le même programme mais en utilisant la "class" `Subject` de RxJS.

---

VirtuoWorks® - tous droits réservés©