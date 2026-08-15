/* =========================================================
   CRYOTRACK - SCRIPT PRINCIPAL
   ========================================================= */


/* =========================================================
   DATE
   ========================================================= */

const dateElement = document.getElementById("date");

if (dateElement) {

    const aujourdHui = new Date();

    dateElement.textContent =
        aujourdHui.toLocaleDateString("fr-FR");
}


/* =========================================================
   ÉLÉMENTS
   ========================================================= */

const stockageSelect =
    document.getElementById("stockage");

const boutonCalculer =
    document.getElementById("calculer");

const boutonEnregistrer =
    document.getElementById("enregistrer");


/* =========================================================
   RÉCUPÉRATION DU MODE MODIFICATION
   ========================================================= */

const chargementAModifier =
    JSON.parse(
        localStorage.getItem("chargementAModifier")
    );

const indexModification =
    localStorage.getItem("indexModification");


/* =========================================================
   KPI : NOM DU STOCK
   ========================================================= */

if (stockageSelect) {

    stockageSelect.addEventListener(
        "change",
        function () {

            const kpiStockNom =
                document.getElementById("kpiStockNom");

            if (kpiStockNom) {

                kpiStockNom.textContent =
                    this.value;
            }
        }
    );
}


/* =========================================================
   FONCTION : CALCUL DU BILAN
   ========================================================= */

function calculerBilan() {

    const poidsAvant =
        Number(
            document.getElementById("poidsAvant").value
        );

    const poidsApres =
        Number(
            document.getElementById("poidsApres").value
        );

    const stockAvant =
        Number(
            document.getElementById("stockAvant").value
        );

    const stockApres =
        Number(
            document.getElementById("stockApres").value
        );

    const production =
        Number(
            document.getElementById("production").value
        );


    /* Vérification */

    if (
        poidsAvant <= 0 ||
        poidsApres <= 0 ||
        stockAvant <= 0 ||
        stockApres < 0 ||
        production < 0
    ) {

        alert(
            "Veuillez remplir correctement toutes les données."
        );

        return null;
    }


    /* Masse chargée */

    const masseChargee =
        poidsApres - poidsAvant;


    if (masseChargee <= 0) {

        alert(
            "La pesée après doit être supérieure à la pesée avant."
        );

        return null;
    }


    /* Sortie du stock */

    const sortieStock =
        stockAvant +
        production -
        stockApres;


    if (sortieStock <= 0) {

        alert(
            "Vérifiez le stock avant, la production et le stock après."
        );

        return null;
    }


    /* Pertes */

    const pertes =
        sortieStock -
        masseChargee;


    /* Taux de pertes */

    const taux =
        (pertes / sortieStock) * 100;


    /* =====================================================
       AFFICHAGE DES RÉSULTATS
       ===================================================== */

    const masse =
        document.getElementById("masse");

    const sortie =
        document.getElementById("sortieStock");

    const pertesElement =
        document.getElementById("pertes");

    const tauxElement =
        document.getElementById("taux");


    if (masse) {

        masse.textContent =
            masseChargee.toFixed(2);
    }


    if (sortie) {

        sortie.textContent =
            sortieStock.toFixed(2);
    }


    if (pertesElement) {

        pertesElement.textContent =
            pertes.toFixed(2);
    }


    if (tauxElement) {

        tauxElement.textContent =
            taux.toFixed(2);
    }


    /* =====================================================
       STATUT
       ===================================================== */

    const statut =
        document.getElementById("statut");


    if (statut) {

        const seuilPertes =
    Number(
        JSON.parse(
            localStorage.getItem("parametresCryoTrack")
        )?.seuilPertes ?? 5
    );
        if (taux < 5) {

            statut.textContent =
                "Conforme — pertes inférieures à 5 %";

            statut.style.color =
                "green";

        } else {

            statut.textContent =
                "Alerte — pertes supérieures ou égales à 5 %";

            statut.style.color =
                "red";
        }
    }


    /* =====================================================
       KPI
       ===================================================== */

    const kpiChargements =
        document.getElementById("kpiChargements");

    const kpiPertes =
        document.getElementById("kpiPertes");

    const kpiStockNom =
        document.getElementById("kpiStockNom");

    const kpiStock =
        document.getElementById("kpiStock");

    const kpiStatut =
        document.getElementById("kpiStatut");


    if (kpiChargements) {

        kpiChargements.textContent =
            "1";
    }


    if (kpiPertes) {

        kpiPertes.textContent =
            taux.toFixed(2) + " %";
    }


    if (kpiStockNom && stockageSelect) {

        kpiStockNom.textContent =
            stockageSelect.value;
    }


    if (kpiStock) {

        kpiStock.textContent =
            stockApres.toFixed(0) + " L";
    }


    if (kpiStatut) {

        if (taux < seuilPertes) {

            kpiStatut.textContent =
                "Conforme";

            kpiStatut.style.color =
                "green";

        } else {

            kpiStatut.textContent =
                "Alerte";

            kpiStatut.style.color =
                "red";
        }
    }


    return {

        masseChargee:
            masseChargee,

        sortieStock:
            sortieStock,

        pertes:
            pertes,

        taux:
            taux
    };
}


/* =========================================================
   BOUTON CALCULER
   ========================================================= */

if (boutonCalculer) {

    boutonCalculer.addEventListener(
        "click",
        calculerBilan
    );
}


/* =========================================================
   REMPLIR LE FORMULAIRE EN MODE MODIFICATION
   ========================================================= */

if (chargementAModifier) {

    const operateur =
        document.getElementById("operateur");

    const dateChargement =
        document.getElementById("dateChargement");

    const produit =
        document.getElementById("produit");

    const stockage =
        document.getElementById("stockage");

    const typeSR =
        document.getElementById("typeSR");

    const numeroSR =
        document.getElementById("numeroSR");

    const poidsAvant =
        document.getElementById("poidsAvant");

    const poidsApres =
        document.getElementById("poidsApres");

    const stockAvant =
        document.getElementById("stockAvant");

    const production =
        document.getElementById("production");

    const stockApres =
        document.getElementById("stockApres");

    const heureDebut =
        document.getElementById("heureDebut");

    const heureFin =
        document.getElementById("heureFin");


    if (operateur)
        operateur.value =
            chargementAModifier.operateur || "";


    if (dateChargement)
        dateChargement.value =
            chargementAModifier.date || "";


    if (produit)
        produit.value =
            chargementAModifier.produit || "";


    if (stockage)
        stockage.value =
            chargementAModifier.stockage || "";


    if (typeSR)
        typeSR.value =
            chargementAModifier.typeSR || "";


    if (numeroSR)
        numeroSR.value =
            chargementAModifier.numeroSR || "";


    if (poidsAvant)
        poidsAvant.value =
            chargementAModifier.poidsAvant ?? "";


    if (poidsApres)
        poidsApres.value =
            chargementAModifier.poidsApres ?? "";


    if (stockAvant)
        stockAvant.value =
            chargementAModifier.stockAvant ?? "";


    if (production)
        production.value =
            chargementAModifier.production ?? "";


    if (stockApres)
        stockApres.value =
            chargementAModifier.stockApres ?? "";


    if (heureDebut)
        heureDebut.value =
            chargementAModifier.heureDebut || "";


    if (heureFin)
        heureFin.value =
            chargementAModifier.heureFin || "";


    /* Afficher les anciens résultats */

    const masse =
        document.getElementById("masse");

    const sortieStock =
        document.getElementById("sortieStock");

    const pertes =
        document.getElementById("pertes");

    const taux =
        document.getElementById("taux");


    if (masse) {

        masse.textContent =
            Number(
                chargementAModifier.masseChargee || 0
            ).toFixed(2);
    }


    if (sortieStock) {

        sortieStock.textContent =
            Number(
                chargementAModifier.sortieStock || 0
            ).toFixed(2);
    }


    if (pertes) {

        pertes.textContent =
            Number(
                chargementAModifier.pertes || 0
            ).toFixed(2);
    }


    if (taux) {

        taux.textContent =
            Number(
                chargementAModifier.taux || 0
            ).toFixed(2);
    }


    /* KPI */

    const kpiStockNom =
        document.getElementById("kpiStockNom");

    const kpiStock =
        document.getElementById("kpiStock");

    const kpiPertes =
        document.getElementById("kpiPertes");

    const kpiStatut =
        document.getElementById("kpiStatut");


    if (kpiStockNom) {

        kpiStockNom.textContent =
            chargementAModifier.stockage;
    }


    if (kpiStock) {

        kpiStock.textContent =
            Number(
                chargementAModifier.stockApres || 0
            ).toFixed(0) + " L";
    }


    if (kpiPertes) {

        kpiPertes.textContent =
            Number(
                chargementAModifier.taux || 0
            ).toFixed(2) + " %";
    }


    if (kpiStatut) {

        if (
            Number(
                chargementAModifier.taux || 0
            ) < 5
        ) {

            kpiStatut.textContent =
                "Conforme";

            kpiStatut.style.color =
                "green";

        } else {

            kpiStatut.textContent =
                "Alerte";

            kpiStatut.style.color =
                "red";
        }
    }
}


/* =========================================================
   ENREGISTRER / MODIFIER
   ========================================================= */

if (boutonEnregistrer) {

    boutonEnregistrer.addEventListener(
        "click",
        function () {

            /* Informations générales */

            const operateur =
                document.getElementById(
                    "operateur"
                ).value.trim();

            const date =
                document.getElementById(
                    "dateChargement"
                ).value;

            const produit =
                document.getElementById(
                    "produit"
                ).value;

            const stockage =
                document.getElementById(
                    "stockage"
                ).value;

            const typeSR =
                document.getElementById(
                    "typeSR"
                ).value;

            const numeroSR =
                document.getElementById(
                    "numeroSR"
                ).value.trim();


            /* Données */

            const poidsAvant =
                Number(
                    document.getElementById(
                        "poidsAvant"
                    ).value
                );

            const poidsApres =
                Number(
                    document.getElementById(
                        "poidsApres"
                    ).value
                );

            const stockAvant =
                Number(
                    document.getElementById(
                        "stockAvant"
                    ).value
                );

            const production =
                Number(
                    document.getElementById(
                        "production"
                    ).value
                );

            const stockApres =
                Number(
                    document.getElementById(
                        "stockApres"
                    ).value
                );


            const heureDebut =
                document.getElementById(
                    "heureDebut"
                ).value;

            const heureFin =
                document.getElementById(
                    "heureFin"
                ).value;


            /* Vérification */

            if (
                !operateur ||
                !date ||
                !numeroSR ||
                poidsAvant <= 0 ||
                poidsApres <= 0 ||
                stockAvant <= 0 ||
                stockApres < 0 ||
                production < 0
            ) {

                alert(
                    "Veuillez remplir correctement toutes les informations."
                );

                return;
            }


            /* Calcul */

            const masseChargee =
                poidsApres -
                poidsAvant;


            const sortieStock =
                stockAvant +
                production -
                stockApres;


            if (masseChargee <= 0) {

                alert(
                    "La masse chargée doit être supérieure à 0."
                );

                return;
            }


            if (sortieStock <= 0) {

                alert(
                    "La sortie du stock doit être supérieure à 0."
                );

                return;
            }


            const pertes =
                sortieStock -
                masseChargee;


            const taux =
                (pertes / sortieStock) * 100;


            /* Objet chargement */

            const chargement = {

                operateur:
                    operateur,

                date:
                    date,

                produit:
                    produit,

                stockage:
                    stockage,

                typeSR:
                    typeSR,

                numeroSR:
                    numeroSR,

                heureDebut:
                    heureDebut,

                heureFin:
                    heureFin,

                poidsAvant:
                    poidsAvant,

                poidsApres:
                    poidsApres,

                stockAvant:
                    stockAvant,

                production:
                    production,

                stockApres:
                    stockApres,

                masseChargee:
                    masseChargee,

                sortieStock:
                    sortieStock,

                pertes:
                    pertes,

                taux:
                    taux
            };


            /* Historique */

            let historique =
                JSON.parse(
                    localStorage.getItem(
                        "historiqueCryoTrack"
                    )
                ) || [];


            /* =================================================
               MODE MODIFICATION
               ================================================= */

            if (
                indexModification !== null &&
                chargementAModifier !== null
            ) {

                const index =
                    Number(
                        indexModification
                    );


                if (
                    !isNaN(index) &&
                    index >= 0 &&
                    index < historique.length
                ) {

                    historique[index] =
                        chargement;


                    localStorage.setItem(
                        "historiqueCryoTrack",
                        JSON.stringify(
                            historique
                        )
                    );


                    localStorage.removeItem(
                        "chargementAModifier"
                    );

                    localStorage.removeItem(
                        "indexModification"
                    );


                    alert(
                        "Chargement modifié avec succès."
                    );


                    window.location.href =
                        "historique.html.html";

                    return;
                }
            }


            /* =================================================
               NOUVEAU CHARGEMENT
               ================================================= */

            historique.push(
                chargement
            );


            localStorage.setItem(
                "historiqueCryoTrack",
                JSON.stringify(
                    historique
                )
            );


            localStorage.removeItem(
                "chargementAModifier"
            );

            localStorage.removeItem(
                "indexModification"
            );


            alert(
                "Chargement enregistré avec succès."
            );
        }
    );
}

/* =====================================================
   SYNCHRONISATION DES PARAMÈTRES
   ===================================================== */

function chargerListesDepuisParametres() {

    const donnees =
        localStorage.getItem("parametresCryoTrack");

    if (!donnees) {
        return;
    }

    const parametres =
        JSON.parse(donnees);


    /* =========================
       PRODUITS
       ========================= */

    const produitSelect =
        document.getElementById("produit");

    if (produitSelect) {

        produitSelect.innerHTML = "";

        const produits = [
            parametres.produit1,
            parametres.produit2
        ];

        produits.forEach(function(produit) {

            if (produit) {

                const option =
                    document.createElement("option");

                option.value = produit;
                option.textContent = produit;

                produitSelect.appendChild(option);
            }

        });

    }


    /* =========================
       STOCKAGES
       ========================= */

    const stockageSelect =
        document.getElementById("stockage");

    if (stockageSelect) {

        stockageSelect.innerHTML = "";

        const stockages = [
            parametres.stockage1,
            parametres.stockage2,
            parametres.stockage3,
            parametres.stockage4
        ];

        stockages.forEach(function(stockage) {

            if (stockage) {

                const option =
                    document.createElement("option");

                option.value = stockage;
                option.textContent = stockage;

                stockageSelect.appendChild(option);
            }

        });

    }


    /* =========================
       SEMI-REMORQUES
       ========================= */

    const typeSRSelect =
        document.getElementById("typeSR");

    if (typeSRSelect) {

        typeSRSelect.innerHTML = "";

        const typesSR = [
            parametres.sr1,
            parametres.sr2,
            parametres.sr3
        ];

        typesSR.forEach(function(typeSR) {

            if (typeSR) {

                const option =
                    document.createElement("option");

                option.value = typeSR;
                option.textContent = typeSR;

                typeSRSelect.appendChild(option);
            }

        });

    }

}


/* =====================================================
   LANCER LA SYNCHRONISATION
   ===================================================== */

chargerListesDepuisParametres();

/* =========================================================
   CRYOTRACK - DONNÉES DASHBOARD
   ========================================================= */

const cryoData = {

    chargementsAujourdHui: 12,

    volumeTotal: 326.5,

    typeDominant: "LIN",

    conformite: 98.7,

    evolution: {
        dates: [
            "09/08",
            "10/08",
            "11/08",
            "12/08",
            "13/08",
            "14/08",
            "15/08"
        ],

        LIN: [4, 7, 6, 5, 7, 7, 9],
        LOX: [4, 5, 6, 5, 6, 5, 10],
        B40: [1, 2, 1, 2, 1, 2, 1],
        B50: [1, 1, 2, 2, 2, 2, 2],
        B51: [1, 1, 1, 1, 1, 1, 1],
        B52: [1, 1, 1, 1, 1, 1, 2]
    },

    produits: {
        LIN: 45,
        LOX: 33,
        B40: 8,
        B50: 6,
        B51: 5,
        B52: 3
    },

    qualite: {
        ISO: 48,
        Solo: 32,
        SR: 20
    },

    derniersChargements: [
        {
            sr: "SR-125",
            produit: "LIN",
            type: "ISO",
            volume: 42.5,
            heure: "10:38"
        },
        {
            sr: "SR-124",
            produit: "LOX",
            type: "Solo",
            volume: 28.0,
            heure: "09:56"
        },
        {
            sr: "SR-123",
            produit: "LIN",
            type: "SR",
            volume: 35.2,
            heure: "09:12"
        },
        {
            sr: "SR-122",
            produit: "B51",
            type: "ISO",
            volume: 40.0,
            heure: "08:45"
        },
        {
            sr: "SR-121",
            produit: "B50",
            type: "Solo",
            volume: 29.8,
            heure: "08:20"
        }
    ]
};

/* =========================================================
   KPI
   ========================================================= */

function afficherKPI() {

    const kpiChargements =
        document.getElementById("kpiChargements");

    const kpiVolume =
        document.getElementById("kpiVolume");

    const kpiProduit =
        document.getElementById("kpiProduit");

    const kpiConformite =
        document.getElementById("kpiConformite");


    if (kpiChargements) {
        kpiChargements.textContent =
            cryoData.chargementsAujourdHui;
    }


    if (kpiVolume) {
        kpiVolume.textContent =
            cryoData.volumeTotal.toLocaleString("fr-FR")
            + " m³";
    }


    if (kpiProduit) {
        kpiProduit.textContent =
            cryoData.typeDominant;
    }


    if (kpiConformite) {
        kpiConformite.textContent =
            cryoData.conformite.toLocaleString("fr-FR")
            + "%";
    }
}

function afficherDateHeure() {

    const maintenant = new Date();

    const date = maintenant.toLocaleDateString("fr-FR");

    const heure = maintenant.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    document.getElementById("dateHeure").textContent =
        date + " - " + heure;
}

afficherDateHeure();

setInterval(afficherDateHeure, 1000);

function mettreAJourKPI() {

    const chargements = document.getElementById("kpiChargements");
    const produits = document.getElementById("kpiProduits");
    const alertes = document.getElementById("kpiAlertes");
    const conformes = document.getElementById("kpiConformes");

    if (chargements) {
        chargements.textContent = "24";
    }

    if (produits) {
        produits.textContent = "8";
    }

    if (alertes) {
        alertes.textContent = "2";
    }

    if (conformes) {
        conformes.textContent = "22";
    }
}

mettreAJourKPI();

document.addEventListener("DOMContentLoaded", function () {

    console.log("CryoTrack : script chargé");

});