const sportsData = {
    "Dan 1": {
        "Stolni tenis": {
            maxClanovi: 2,
            maxTimovi: 16,
            voditelj: "??",
            opis: "1-na-1 turnir. Igrači se natječu u eliminacijskom format",
            lokacija: "(Stari) Studentski dom – dvorište",
            vrijeme: "17:00h"
        },
        "Stolni nogomet": {
            maxClanovi: 2,
            maxTimovi: 16,
            voditelj: "Ivančica Suhić",
            opis: "",
            lokacija: "(Stari) Studentski dom – podrum",
            vrijeme: "17:00h"
        },
        "Turnir u beli": {
            maxClanovi: 2,
            maxTimovi: 32,
            voditelj: "Lorna Zbodulja",
            opis: "Igra se u parovima, dva puta do 501, eliminacija",
            lokacija: "Studentski dom – terase/kuhinje/tribine",
            vrijeme: "17:00h"
        },
        "Turnir u trešeti": {
            maxClanovi: 2,
            maxTimovi: 12,
            voditelj: "Ivan Račan",
            vrijeme: "17:00h",
            opis: "",
            lokacija: "Studentski dom – terase/kuhinje/tribine",
        },
        "Alias": {
            maxClanovi: 2,
            maxTimovi: 8,
            voditelj: "Lorna Zbodulja",
            opis: "tim protiv tima",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "15:00h"
        },
        "Bench Press": {
            maxClanovi: 1,
            maxTimovi: 20,
            voditelj: "Niko Rastija, Matea Kucljak",
            opis: "",
            lokacija: "Studentski dom – Teretana/vani",
            vrijeme: "18:00h"
        },
        "Biceps curl": {
            maxClanovi: 1,
            maxTimovi: 20,
            voditelj: "Niko Rastija, Matea Kucljak",
            opis: "",
            lokacija: "Studentski dom – Teretana/vani",
            vrijeme: "18:00h"
        },
        "Alka": {
            maxClanovi: 2,
            maxTimovi: 20,
            voditelj: "Adam Marjanović",
            opis: "Igrači u tačkama, gađadnje kruga",
            lokacija: "Studentski dom – između tribina",
            vrijeme: "20:00"
        },
        "Košarka": {
            maxClanovi: 4,
            maxTimovi: 12,
            voditelj: "Nimaj Dupanović",
            opis: "3+1, 3-na-3 utakmica",
            lokacija: "Studentski dom – Košarkaško igralište",
            vrijeme: "15:00-17:00h"
        },
        "Beer pong": {
            maxClanovi: 2,
            maxTimovi: 12,
            voditelj: "Larija Jukić",
            opis: "Igrači pokušavaju pogoditi lopticom čaše na protivničkoj strani stola. Vremenski ograničeno (15min)",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "16:00h"
        },
        "Cageball": {
            maxClanovi: 5,
            maxTimovi: 12,
            voditelj: "Elizabeta Rengel",
            opis: "Brza verzija malog nogometa u ograđenom prostoru gdje lopta nikada ne izlazi iz igre.",
            lokacija: "Studentski dom – Cageball teren",
            vrijeme: "18:00h"
        },
        "Teqball": {
            maxClanovi: 2,
            maxTimovi: 9,
            voditelj: "Matej Gurdon-Beta",
            opis: "Inovativna kombinacija nogometa i stolnog tenisa na zakrivljenom stolu.",
            lokacija: "Studentski dom – dvorište",
            vrijeme: "17:00h"
        },
        "Vukodlaci": {
            maxClanovi: 6,
            maxTimovi: 10,
            voditelj: "Elizabeta Rengel",
            opis: "Tko je vukodlak među nama? Igrači pokušavaju otkriti ubojicu među sobom prije nego bude prekasno.",
            lokacija: "Studentski dom – Klub",
            vrijeme: "17:00h"
        }
    },

    "Dan2": {
        "Odbojka": {
            maxClanovi: 4,
            maxTimovi: 7,
            voditelj: "Manuel Mathis",
            opis: 
            `Sastav: 3 + 1 zamjena (obavezno minimalno jedna cura na terenu tijekom cijele utakmice) Izmjene igrača dozvoljene su samo između setova.
            Sustav igre: kup – jednostruka eliminacija. Igra se na 2 osvojena seta.
            Prva dva kruga eliminacije – setovi do 15 poena, 3. set do 8 poena, bez tehničkih timeoutova
            Ostali krugovi – Setovi do 21 poen, 3. set do 15 poena, jedan timeout po setu, po ekipi.
            Primjenjuju se standardna FIVB pravila.
            Mrežu se ne smije dodirivati. Ako igrač dodirne mrežu, poen se dodjeljuje protivničkom timu
            Kada igrač u bloku dodirne loptu, taj dodir se ne broji. Tim ima pravo još tri puta dodirnuti loptu. Također, igrač koji je dodirnuo loptu u bloku može je odmah nakon toga još jednom odigrati, te se tada broji kao prvi dodir.
            Nema "nošenja" lopte
            Ako lopta udari u mrežu, igrač ju može spasiti
            Rotacija na terenu nije bitna, tijekom igre igrači mogu po želji stajati na bilo kojim pozicijama. Jedino je važno pravilno se izmjenjivati prilikom servisa. Modifikacija pravila moguća je samo u dogovoru obje ekipe prije početka utakmice.`,
            lokacija: "Gradsko kupalište – Pješčani teren",
            vrijeme: "15:00h"
        },
        "Disk golf": {
            maxClanovi: 1,
            maxTimovi: 10,
            voditelj: "??",
            opis: "",
            lokacija: "Gradsko kupalište",
            vrijeme: "15:00h"
        },
        "Povlačenje užeta": {
            maxClanovi: 3,
            maxTimovi: 12,
            voditelj: "Luka Krznarić",
            opis: "",
            lokacija: "Gradsko kupalište ",
            vrijeme: "18:00h"
        },
        "Gađanje limenki s vodenim balonima": {
            maxClanovi: 1,
            maxTimovi: 8,
            voditelj: "??",
            opis: "",
            lokacija: "Gradsko kupališe",
            vrijeme: "16:00h"
        },
        "Treasure hunt": {
            maxClanovi: 4,
            maxTimovi: 10,
            voditelj: "Manuel Mathis",
            opis: "",
            lokacija: "Gradsko kupalište",
            vrijeme: "15:00h"
        },
        "Obaranje ruku": {
            maxClanovi: 2,
            maxTimovi: 0,
            voditelj: "Luka Krznarić",
            opis: "",
            lokacija: "Gradsko kupalište",
            vrijeme: "17:00h"
        }
    }
};

export default sportsData;