const sportsData = {
    "Dan 1": {
        "Stolni tenis": {
            maxClanovi: 2,
            voditelj: "??",
            opis: "Brzi i dinamični mečevi 1-na-1 na stolnoteniskom stolu. Igrači se natječu u eliminacijskom formatu. Potrebna su brza razmišljanja, odlični refleksi i precizni udarci.",
            lokacija: "(Stari) Studentski dom – podrum",
            vrijeme: "10:00"
        },
        "Stolni nogomet": {
            maxClanovi: 2,
            voditelj: "??",
            opis: "Popularna društvena igra koja zahtijeva koordinaciju, brzinu i timski rad. Svaki tim ima 2 igrača koji pokušavaju postići što više golova rotiranjem igrača na štapovima.",
            lokacija: "(Stari) Studentski dom – podrum",
            vrijeme: "10:30"
        },
        "Turnir u beli": {
            maxClanovi: 2,
            voditelj: "Lorna Zbodulja",
            opis: "Klasična kartaška igra Belot za strateške umove. Igra se u parovima, gdje svaki tim pokušava nadmudriti protivnike kombinacijama karata i taktičkim odigravanjem.",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "11:00"
        },
        "Turnir u trešeti": {
            maxClanovi: 2,
            voditelj: "Ivan Račan",
            opis: "Tradicionalna dalmatinska kartaška igra u kojoj su taktika i memorija ključni. Igrači u parovima koriste svoje znanje i dosjetljivost da bi pobijedili.",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "11:30"
        },
        "Alias": {
            maxClanovi: 4,
            voditelj: "Lorna Zbodulja",
            opis: "Brza i zabavna timska igra u kojoj jedan član objašnjava pojmove bez upotrebe riječi iz pojma, a drugi pogađa. Idealna za one s dobrim vokabularom i komunikacijskim vještinama.",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "12:00"
        },
        "Bench Press i biceps curl": {
            maxClanovi: 2,
            voditelj: "Niko Rastija, Matea Kucljak",
            opis: "Snaga i forma na testu! Natjecatelji se natječu u dizanju utega u dvije discipline – bench pressu i biceps curlu. Pobjednik je onaj s najboljim ukupnim rezultatom.",
            lokacija: "Studentski dom – Teretana",
            vrijeme: "12:30"
        },
        "Alka": {
            maxClanovi: 2,
            voditelj: "Adam Marjanović",
            opis: "Zabavna rekreacija poznate Sinjske alke – bez konja, ali s istom dozom preciznosti i natjecateljskog duha. Igrači bacaju koplje u pokretnu alku.",
            lokacija: "Studentski dom – između tribina",
            vrijeme: "13:00"
        },
        "Košarka": {
            maxClanovi: 4,
            voditelj: "Nimaj Dupanović",
            opis: "Brza 3-na-3 utakmica u kojoj vrijede pravila fer igre. Igra se u eliminacijskom formatu. Timski duh, tehnika i taktika ključni su za pobjedu.",
            lokacija: "Studentski dom – Košarkaško igralište",
            vrijeme: "13:30"
        },
        "Beer pong": {
            maxClanovi: 2,
            voditelj: "Larija Jukić",
            opis: "Preciznost i dobar cilj! Igrači pokušavaju pogoditi lopticom čaše na protivničkoj strani stola. Iako je igra simbol studentskih zabava, ovdje se natječemo ozbiljno – bez alkohola!",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "14:00"
        },
        "Cageball": {
            maxClanovi: 5,
            voditelj: "Elizabeta Rengel",
            opis: "Brza verzija malog nogometa u ograđenom prostoru gdje lopta nikada ne izlazi iz igre. Akcija je neprekidna, a timska suradnja ključ uspjeha.",
            lokacija: "Studentski dom – Cageball teren",
            vrijeme: "14:30"
        },
        "Teqball": {
            maxClanovi: 2,
            voditelj: "Matej Gurdon-Beta",
            opis: "Inovativna kombinacija nogometa i stolnog tenisa na zakrivljenom stolu. Precizni udarci i nogometna tehnika odlučuju pobjednika.",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "15:00"
        },
        "Vukodlaci": {
            maxClanovi: 6,
            voditelj: "Elizabeta Rengel",
            opis: "Društvena igra dedukcije i intuicije. Tko je vukodlak među nama? Igrači pokušavaju otkriti ubojicu među sobom prije nego bude prekasno.",
            lokacija: "Studentski dom – Klub",
            vrijeme: "15:30"
        }
    },

    "Dan 2": {
        "Odbojka": {
            maxClanovi: 6,
            voditelj: "Manuel Mathis",
            opis: "Klasična odbojka na pijesku na otvorenom. Natjecateljski format s timovima koji se natječu za titulu najboljeg. Skokovi, blokovi i odlična zabava!",
            lokacija: "Gradsko kupalište – Pješčani teren",
            vrijeme: "10:00"
        },
        "Disk golf": {
            maxClanovi: 1,
            voditelj: "??",
            opis: "Frizbi verzija golfa – umjesto loptice, ciljate koš frizbijem. Cilj je pogoditi sve mete u što manje pokušaja. Idealno za ljubitelje preciznosti i prirode.",
            lokacija: "Gradsko kupalište – Travnata zona",
            vrijeme: "10:30"
        },
        "Povlačenje užeta": {
            maxClanovi: 3,
            voditelj: "Luka Krznarić",
            opis: "Snaga i timska sinergija u jednoj od najklasičnijih ekipnih igara. Timski pokušajte povući protivnike preko označene linije.",
            lokacija: "Gradsko kupalište – Glavni teren",
            vrijeme: "11:00"
        },
        "Gađanje limenki s vodenim balonima": {
            maxClanovi: 1,
            voditelj: "??",
            opis: "Zabavno i osvježavajuće! Precizno gađanje limenki pomoću balona napunjenih vodom. Prskanje je neizbježno – donesi rezervnu majicu!",
            lokacija: "Gradsko kupalište – Zabavna zona",
            vrijeme: "11:30"
        },
        "Treasure hunt": {
            maxClanovi: 4,
            voditelj: "Manuel Mathis",
            opis: "Avanturistička timska igra u kojoj tražite skrivene tragove i predmete. Potrebna je dobra orijentacija, suradnja i kreativno razmišljanje.",
            lokacija: "Gradsko kupalište – Cijeli prostor",
            vrijeme: "12:00"
        },
        "Obaranje ruku": {
            maxClanovi: 2,
            voditelj: "Luka Krznarić",
            opis: "Natjecanje u snazi, brzini i tehnici ruku. Klasika svih druženja – tko ima jači biceps? Jedan-na-jedan eliminacijski turnir.",
            lokacija: "Gradsko kupalište – Centar",
            vrijeme: "12:30"
        }
    }
};

export default sportsData;