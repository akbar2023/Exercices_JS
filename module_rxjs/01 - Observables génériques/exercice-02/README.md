# Exercice 02 Utiliser la "classe" `ReplaySubject` et `BehaviorSubject`

---

## Présentation

Vous allez travailler avec la "classe" `ReplaySubject` de RxJS [documentée ici](https://rxjs-dev.firebaseapp.com/api/index/class/ReplaySubject).

La "classe" `ReplaySubject` peut prendre en entrée des paramètres. Par défaut, si aucun paramètre n'est fourni, elle créé un objet de type `Observable` qui transmet à tous ses nouveaux "abonnés" toutes les valeurs qui ont déjà été transmises aux précédents "abonnés".

Puis vous utiliserez, par la suite, la "classe" `BehaviorSubjet` de `RxJS` [documentée ici](https://rxjs-dev.firebaseapp.com/api/index/class/BehaviorSubject).

La "classe" `BehaviorSubject` __DOIT__ impérativement prendre en entrée une __valeur__ initiale. Elle créé un objet de type Observable qui transmet à tous ses nouveaux "abonnés" la dernière valeur qui à été transmise aux précédents "abonnés". *C'est pourquoi la valeur initiale est requise, c'est celle qui sera transmise au premier abonné.*

---

## Objectif

Il s'agit ici de reprendre le même comportement que celui proposé par l'exercice précèdent. Mais, en plus, lorsque l'utilisateur clique sur la souris, la séquence de touche qu'il a saisi doit être réaffichée sur le document HTML puis uniquement la dernière saisie.

---

## Enoncé

### Partie 1 :

* Importez la "classe" `ReplaySubject` de `RxJS`.
* Réécrivez le programme de l'exercice précèdent de telle sorte que lorsque l'utilisateur clique sur la souris, la séquence touche saisie se réaffiche à la suite de la séquence précédente.

### Partie 2 :

* Importez la "classe" `BehaviorSubject` de `RxJS`.
* Réécrivez le programme de l'exercice précèdent de telle sorte que lorsque l'utilisateur clique sur la souris, la dernière touche saisie se réaffiche à la suite de la séquence qui précède.

---

VirtuoWorks® - tous droits réservés©