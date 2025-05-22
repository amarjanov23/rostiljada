const sportsData = {
        "Dan 1": {
          "Stolni tenis": {
            maxClanovi: 2,
            maxTimovi: 16,
            voditelj: "Ivančica Suhić",
            opis: "1-na-1 turnir u eliminacijskom formatu. Brze i napete partije do konačnog pobjednika.",
            lokacija: "(Stari) Studentski dom – dvorište",
            vrijeme: "17:00h"
          },
          "Turnir u beli": {
            maxClanovi: 2,
            maxTimovi: 32,
            voditelj: "Lorna Zbodulja",
            opis: "Igra se u parovima, dva puta do 501. Eliminacijski sistem.",
            lokacija: "Studentski dom – terase/kuhinje/tribine",
            vrijeme: "17:00h"
          },
          "Turnir u trešeti": {
            maxClanovi: 2,
            maxTimovi: 12,
            voditelj: "Ivan Račan",
            opis: "Igra u parovima. Klasični turnirski format s eliminacijom.",
            lokacija: "Studentski dom – terase/kuhinje/tribine",
            vrijeme: "17:00h"
          },
          "Alias": {
            maxClanovi: 2,
            maxTimovi: 8,
            voditelj: "Lorna Zbodulja",
            opis: "Tim protiv tima u igri asocijacija. Brzina i kreativnost odlučuju pobjednika.",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "15:00h"
          },
          "Bench Press": {
            maxClanovi: 1,
            maxTimovi: 20,
            voditelj: "Niko Rastija, Matea Kucljak",
            opis: "Natjecanje u maksimalnom broju ponavljanja s unaprijed određenim opterećenjem.",
            lokacija: "Studentski dom – Teretana/vani",
            vrijeme: "18:00h"
          },
          "Biceps curl": {
            maxClanovi: 1,
            maxTimovi: 20,
            voditelj: "Niko Rastija, Matea Kucljak",
            opis: "Tko može podići više u biceps pregibu? Natjecanje snage i forme.",
            lokacija: "Studentski dom – Teretana/vani",
            vrijeme: "18:00h"
          },
          "Alka": {
            maxClanovi: 2,
            maxTimovi: 20,
            voditelj: "Adam Marjanović",
            opis: "Natjecanje u preciznosti. Igrači u tačkama pokušavaju pogoditi alku kopljem.",
            lokacija: "Studentski dom – između tribina",
            vrijeme: "20:00"
          },
          "Košarka": {
            maxClanovi: 4,
            maxTimovi: 12,
            voditelj: "Nimaj Dupanović",
            opis: "3+1 format. Igra se 3-na-3 na jedan koš. Dinamična utakmica s brzim izmjenama.",
            lokacija: "Studentski dom – Košarkaško igralište",
            vrijeme: "15:00-17:00h"
          },
          "Beer pong": {
            maxClanovi: 2,
            maxTimovi: 8,
            voditelj: "Larija Jukić",
            opis: `Turnir se igra po klasičnim pravilima beerponga. Sudjeluje 8 timova, svaki sastavljen od 2 igrača. 
      Igra se na ispadanje, a svaka runda traje maksimalno 15 minuta. Cilj igre je pogoditi sve protivničke čaše lopticama. 
      Tim koji prvi pogodi sve protivničke čaše – pobjeđuje. Ako nijedan tim ne isprazni sve čaše u roku od 15 minuta, 
      pobjednik je onaj koji je pogodio više protivničkih čaša. U slučaju izjednačenja, igra se jedan odlučujući hitac po igraču ("shootout"). 
      Molimo sve sudionike da se pridržavaju fair play-a i osnovnih pravila ponašanja. Prijavom na turnir prihvaćate navedena pravila.`,
            lokacija: "Studentski dom – dvorište",
            vrijeme: "16:00h"
          },
          "Cageball": {
            maxClanovi: 5,
            maxTimovi: 12,
            voditelj: "Elizabeta Rengel",
            opis: "Brza verzija malog nogometa u ograđenom prostoru gdje lopta ne izlazi iz igre.",
            lokacija: "Studentski dom – Cageball teren",
            vrijeme: "18:00h"
          },
          "Teqball": {
            maxClanovi: 2,
            maxTimovi: 9,
            voditelj: "Matej Gurdon-Beta",
            opis: "Inovativna kombinacija nogometa i stolnog tenisa. Igra se na zakrivljenom stolu u 1-na-1 ili 2-na-2 formatu.",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "17:00h"
          },
          "Vukodlaci": {
            maxClanovi: 6,
            maxTimovi: 10,
            voditelj: "Elizabeta Rengel",
            opis: "Tko je vukodlak među nama? Igrači pokušavaju logikom i zapažanjem otkriti ubojicu prije nego bude prekasno.",
            lokacija: "Studentski dom – Klub",
            vrijeme: "17:00h"
          }
        },

    "Dan 2": {
        "Odbojka": {
            maxClanovi: 4,
            maxTimovi: 7,
            voditelj: "Manuel Mathis",
            opis: `Sastav: 3 + 1 zamjena (min. jedna cura na terenu cijelo vrijeme). Igra se kup-sustavom (jednostruka eliminacija). 
            Setovi: Rane faze – do 15 poena (3. set do 8); kasnije – do 21 poen (3. set do 15). Primjenjuju se standardna FIVB pravila.`,
            lokacija: "Gradsko kupalište – Pješčani teren",
            vrijeme: "16:00h"
        },
        "Disk golf": {
            maxClanovi: 1,
            maxTimovi: 10,
            voditelj: "??",
            opis: "Igrači gađaju niz ciljeva diskovima (frisbee) s ciljem da ih pogode u što manje bacanja.",
            lokacija: "Gradsko kupalište",
            vrijeme: "15:00h"
        },
        "Povlačenje užeta": {
            maxClanovi: 3,
            maxTimovi: 12,
            voditelj: "Luka Krznarić",
            opis: "Klasična ekipna snaga vs. snaga disciplina. Tko prvi povuče – pobjeđuje!",
            lokacija: "Gradsko kupalište ",
            vrijeme: "18:00h"
        },
        "Gađanje limenki s vodenim balonima": {
            maxClanovi: 1,
            maxTimovi: 8,
            voditelj: "??",
            opis: "Preciznost i eksplozija! Pokušaj pogoditi što više limenki koristeći vodene balone.",
            lokacija: "Gradsko kupališe",
            vrijeme: "16:00h"
        },
        "Obaranje ruku": {
            maxClanovi: 1,
            maxTimovi: 10,
            voditelj: "Luka Krznarić",
            opis: "Snaga ruke protiv snage volje. Tko obori – ide dalje.",
            lokacija: "Gradsko kupalište",
            vrijeme: "17:00h"
        }
    }
};

export default sportsData;
