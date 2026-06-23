const SERVER_IP = "play.revo-pokemon.fr"; 

// --- 0. GESTION DES MUSIQUES (Déclarations globales) ---
const musique = document.getElementById('bg-music'); 
if (musique) {
    musique.volume = 0.3; 
}

const musiqueCredits = new Audio('pokemon french song - paolo milano ( hardstyle remix ).mp3'); 
musiqueCredits.volume = 0.4; 
musiqueCredits.loop = true; 

// --- ÉCRAN D'ACCUEIL : DÉMARRAGE DE LA MUSIQUE AU CLIC ---
const btnEntrer = document.getElementById('btn-entrer');
if (btnEntrer) {
    btnEntrer.addEventListener('click', () => { 
        if (musique) {
            musique.currentTime = 5; // Saute les 5 secondes de blanc au début
            musique.play().catch(err => console.log("Erreur de lecture :", err)); 
        }
        const screen = document.getElementById('welcome-screen');
        if (screen) {
            screen.remove(); // Supprime l'écran d'accueil
        }
    });
}

// --- 1. BRUITAGE DES BOUTONS ---
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-84.wav'); 
function appliquerBruitages() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            clickSound.currentTime = 0; 
            clickSound.play().catch(e => {}); 
        });
    });
}

// --- 2. QUITTER LE SITE ---
function quitterLeSite() {
    const menu = document.querySelector('.menu'); 
    menu.style.transition = "opacity 0.5s ease"; 
    menu.style.opacity = "0"; 
    
    setTimeout(() => {
        menu.innerHTML = `
            <div class="goodbye-screen">
                <img src="revo_poke_Logo_Finale-removebg-preview.png" alt="Logo" class="logo-fade">
                <h2>À bientôt sur Revo-Pokemon !</h2>
                <p>L'onglet peut maintenant être fermé.</p>
            </div>
        `; 
        menu.style.opacity = "1"; 
    }, 500); 
}

// --- 3. BOUTON GALERIE ---
function ouvrirGalerie() {
    const menu = document.querySelector('.menu'); 
    const htmlOrigine = menu.innerHTML; 
    
    menu.style.transition = "opacity 0.5s ease"; 
    menu.style.opacity = "0"; 
    
    setTimeout(() => {
        menu.innerHTML = `
            <div class="galerie-screen">
                <h2>GALERIE DU SERVEUR</h2>
                <p class="galerie-subtitle">Aperçu de Revo-Pokemon</p>
                <div class="galerie-grid">
                    <div class="galerie-item"><img src="Image1.jpg" alt="Image 1"></div>
                    <div class="galerie-item"><img src="Image2.jpg" alt="Image 2"></div>
                    <div class="galerie-item"><img src="Image3.jpg" alt="Image 3"></div>
                    <div class="galerie-item"><img src="Image4.jpg" alt="Image 4"></div>
                    <div class="galerie-item"><img src="Image5.jpg" alt="Image 5"></div>
                    <div class="galerie-item"><img src="Image6.jpg" alt="Image 6"></div>
                    <div class="galerie-item"><img src="Image7.jpg" alt="Image 7"></div>
                    <div class="galerie-item"><img src="Image8.jpg" alt="Image 8"></div>
                </div>
                <button class="small-btn" id="btn-retour-galerie" style="max-width: 250px; margin: 25px auto; display: block;">Retour</button>
            </div>
        `; 
        
        menu.style.opacity = "1"; 
        
        const items = menu.querySelectorAll('.galerie-item'); 
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!item.classList.contains('zoomed')) { 
                    items.forEach(i => i.classList.remove('zoomed')); 
                    item.classList.add('zoomed'); 
                } else {
                    item.classList.remove('zoomed'); 
                }
                e.stopPropagation(); 
            });
        });

        menu.querySelector('.galerie-screen').addEventListener('click', () => {
            items.forEach(i => i.classList.remove('zoomed')); 
        });
        
        document.getElementById('btn-retour-galerie').addEventListener('click', () => {
            menu.style.opacity = "0"; 
            setTimeout(() => {
                menu.innerHTML = htmlOrigine; 
                relancerEcouteursBoutons(); 
                menu.style.opacity = "1"; 
            }, 500); 
        });
    }, 500); 
}

// --- 4. FONCTION INTERNE POUR LE BOUTON CRÉDIT ---
function activerBoutonCredit() {
    const boutonCredit = document.getElementById('btn-credit'); 
    if (boutonCredit) {
        boutonCredit.addEventListener('click', () => {
            const menu = document.querySelector('.menu'); 
            const htmlOrigine = menu.innerHTML; 
            
            if (musique) musique.pause(); 
            musiqueCredits.currentTime = 0; 
            musiqueCredits.play().catch(err => console.log("Attente interaction")); 

            menu.style.transition = "opacity 0.5s ease"; 
            menu.style.opacity = "0"; 
            
            setTimeout(() => {
                menu.innerHTML = `
                    <div class="credits-screen">
                        <div class="credits-crawler">
                            <h2>REVO-POKEMON</h2>
                            <p>Merci d'avoir joué !</p>
                            
                            <h3>- FONDATEURS -</h3>
                            <p>Bida Soundouss</p><p>Azzaoui Anis</p><p>Lacombe Yanis</p>
                            
                            <h3>- DÉVELOPPEURS SITE -</h3>
                            <p>Bida Soundouss</p><p>Lacombe Yanis</p>
                    
                            <h3>- DÉVELOPPEURS SERVEUR -</h3>
                            <p>Azzaoui Anis</p><p>Lacombe Yanis</p>

                            <h3>- BUILDER -</h3>
                            <p>Azzaoui Anis</p><p>Lacombe Yanis</p>

                            <h3>- DESIGNEUSE POKEMON -</h3>
                            <p>Bida Soundouss</p>
                             
                            <h3>- REMERCIEMENTS -</h3>
                            <p>À toute la communauté</p><p>Discord de Revo-Pokemon</p>
                            
                            <br><br>
                            <button class="small-btn" id="btn-retour-menu" style="max-width: 250px; margin: 20px auto; display: block;">Retour</button>
                        </div>
                    </div>
                `; 
                
                menu.style.opacity = "1"; 
                
                document.getElementById('btn-retour-menu').addEventListener('click', () => {
                    musiqueCredits.pause(); 
                    if (musique && !musique.muted) musique.play().catch(err => {}); 

                    menu.style.opacity = "0"; 
                    
                    setTimeout(() => {
                        menu.innerHTML = htmlOrigine; 
                        
                        if (typeof updatePlayers === "function") {
                            updatePlayers(); 
                        }
                        
                        relancerEcouteursBoutons(); 
                        menu.style.opacity = "1"; 
                    }, 500); 
                });

            }, 500); 
        });
    }
}

// --- 5. RE-BRANCHEMENT DES BOUTONS APRÈS UN RETOUR ---
function relancerEcouteursBoutons() {
    appliquerBruitages(); 
    activerBoutonCredit(); // Réattache l'écouteur d'événement sur le bouton crédit
    
    const btnIp = document.getElementById('btn-ip'); 
    if(btnIp) {
        btnIp.addEventListener('click', function() {
            navigator.clipboard.writeText(SERVER_IP).then(() => { 
                const toast = document.createElement('div'); 
                toast.className = 'toast'; 
                toast.innerText = "IP copiée avec succès !"; 
                document.body.appendChild(toast); 
                setTimeout(() => toast.remove(), 2000); 
            });
        });
    }

    const btnMute = document.getElementById('btn-mute'); 
    if(btnMute) {
        btnMute.addEventListener('click', () => {
            if (musique && musique.muted) {
                musique.muted = false;
                btnMute.innerText = "🔊";
            } else if (musique) {
                musique.muted = true;
                btnMute.innerText = "🔇";
            }
        });
    }

    const btnGalerie = document.getElementById('btn-galerie'); 
    if(btnGalerie) {
        btnGalerie.addEventListener('click', ouvrirGalerie); 
    }
}

// --- 6. INITIALISATION INITIALE ---
relancerEcouteursBoutons(); 