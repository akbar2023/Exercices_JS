import {Observable, fromEvent, from, of, merge, interval } from "rxjs";
import { min } from "rxjs/operators";

// Observable : fonction constructeur / "classe" :
// On créé un "Observable" qui peut émettre des valeurs
const obs = Observable.create((observer) => {
  observer.next("Message emis par l'observable");
  observer.next("Pierre");
  observer.next("Paul");
  observer.next("Jack");
});

// On créé  un "Observer" (une fonction) qui "sourscrit"  à l'observable
obs.subscribe((message) => {
  // Cet "Observer" reçoit la valeur "émise" par l'Observable
  debugger
  console.log(message);  // "Message emis par l'observable"
});

// fromEvent est une fonction qui retourne un Observable :
// - s'appelle Opérateur (== une fonction)
// - ici fromEvent est un opérateur de création (créé un nouvel Observable)
// - On a aussi des Opérateur de "transformation" qui modifient les valeurs
//   émises par un Observable.
const obs2 = fromEvent(window, "click");

obs2.subscribe((evtSouris) => {
  evtSouris.target; // window
  window.alert("Coucou");
});

// from est une fonction qui retourne un Observable à partir d'un Itérable
const obs3 = from([
  "Pierre",
  "Paul",
  "Jack"
]);

obs3.subscribe(function(prenom){
  console.log(`from : Je m'appelle ${prenom}`);
});

// of est une fonction qui retourne un Observable à partir de plusieurs arguments
// fournis
const obs4 = of("Pierre", "Paul", "Jack")

obs4.subscribe(function(prenom){
  console.log(`of : Je m'appelle ${prenom}`);
});

// interval est une fonction qui retourne un Observalbe qui produite des valeurs
// en séquence à intervalle de temps régulier
/*
const obs5 = interval(1000);

obs5.subscribe(function(sequence){
  console.log(sequence); // d'abord 0, puis 1000ms après, 1, puis 1000ms après, 2, ...
});
*/

// Opérateur de jointure : merge

const obs6 = Observable.create((observer) => {
  observer.next("Message qui provient de obs6");
});

const obs7 = Observable.create((observer) => {
  observer.next("Message qui provient de obs7");
});

const obs8 = merge(
  obs6,
  obs7
);

obs8.subscribe(function(messageQuiProvientDeObs6PuisObs7){
  console.log(messageQuiProvientDeObs6PuisObs7);
  // d'abord "Message qui provient de obs6";
  // puis "Message qui provient de obs7".
});


/**
 * Marble diagram : diagramme qui illustre l'emission des valeurs
 * par les observable dans le temps.
 * Par exemple pour le merge qui précéde :
 */

// Obs6 : ------------------"Message qui provient de obs6"------------------temps
// Obs7 : ------------------"Message qui provient de obs7"------------------temps
// Obs8 : -"Message qui provient de obs6"--"Message qui provient de obs7"---temps

/**
 * "Pipeable" opérator (effectuent des transformation sur les valeurs émises) :
 */
const obs9 = from([7,42,23]);

const obs10 = obs9.pipe(
  min()
);

obs10.subscribe(function(valeur){
  console.log(`La  valeur reçue : ${valeur} est la plus petite`);
});
