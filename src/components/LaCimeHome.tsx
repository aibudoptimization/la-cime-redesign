import BookingWidget from "@/components/BookingWidget";

export default function LaCimeHome() {
  return (
    <>
<div className="topbar">
  <a href="mailto:info@la-cime.ca">info@la-cime.ca</a>
  <div className="topbar-social">
    <a href="https://www.facebook.com/lacime.station/" target="_blank">Facebook</a>
    <a href="https://www.instagram.com/lacime.station/" target="_blank">Instagram</a>
    <a href="#">FR / EN</a>
  </div>
</div>

<nav id="mainNav">
  <a href="#" className="nav-logo">La <span>Cime</span></a>
  <ul className="nav-links">
    <li><a href="#minichalets">Minichalets</a></li>
    <li><a href="#thermal">Expérience Thermale</a></li>
    <li><a href="#addons">Rehaussez</a></li>
    <li><a href="#region">Région</a></li>
    <li><a href="#avis">Avis</a></li>
    <li><a href="#contact">À propos</a></li>
    <li><a href="#booking" className="nav-cta">Réserver</a></li>
  </ul>
</nav>


<section className="hero">
  <div className="hero-media" aria-hidden="true">
    <iframe
      src="https://www.youtube.com/embed/4eXHW4aVHmU?autoplay=1&mute=1&controls=0&loop=1&playlist=4eXHW4aVHmU&modestbranding=1&rel=0&playsinline=1"
      title="La Cime hero video background"
      frameBorder="0"
      allow="autoplay; encrypted-media; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      tabIndex={-1} />
  </div>
  <div className="hero-overlay"></div>
  <div className="hero-content">
    <div className="hero-eyebrow">Sainte-Béatrix, Lanaudière</div>
    <h1 className="hero-title">Station thermale<br /><em>en haute nature</em></h1>
    <p className="hero-sub">Une expérience d'hébergement exclusive nichée à la cime des arbres, surplombant la rivière laurentienne.</p>
    <div className="hero-actions">
      <a href="#booking" className="btn-primary">Réserver maintenant</a>
      <a href="#minichalets" className="btn-outline">Découvrir les minichalets</a>
    </div>
  </div>
</section>

<div className="promo-banner">
  🌲 Dernière minute — Station Perchée, 2 nuits avant le 31 mars. Jusqu'à 15 % de rabais.
  <a href="#booking">Réservez maintenant →</a>
</div>

<BookingWidget />


<section className="intro reveal">
  <div className="intro-visual">
    <img className="intro-img" src="https://la-cime.ca/wp-content/uploads/2024/07/DSC03580-2.jpg" alt="La Cime intérieur" />
    <a className="intro-badge" href="https://www.forbes.fr/brandvoice/la-cime-quand-le-luxe-intime-rencontre-lexcellence-environnementale-au-quebec/" target="_blank" rel="noopener noreferrer"><strong>Vu dans</strong>Forbes</a>
  </div>
  <div>
    <div className="section-label">Notre vision</div>
    <h2 className="section-title">Architecture innovante,<br /><em>nature immersive</em></h2>
    <p className="section-body">La Cime est une entreprise d’hébergement expérientielle haut de gamme qui allie architecture innovante, expérience thermale privée et services exclusifs dans un environnement minimal et réfléchi.<br /><br />Idéalement située sur un flanc de montagne laurentien, chaque station thermale offre à ses voyageurs une vue panoramique sur la montagne et la rivière.<br /><br />Nichées à plusieurs mètres du sol, elles offrent toutes les commodités d’une suite d’hôtel pour assurer une expérience d’hébergement confortable et luxueuse.<br /><br />Que ce soit pour une escapade romantique, un anniversaire ou une célébration spéciale, La Cime vous invite à vous ressourcer à la cime des arbres tout en savourant des instants de pure détente.</p>
    <div className="stats-row">
      <div><div className="stat-num">1h</div><div className="stat-label">de Montréal</div></div>
      <div><div className="stat-num">2</div><div className="stat-label">Stations thermales</div></div>
      <div><div className="stat-num">100%</div><div className="stat-label">Privé & exclusif</div></div>
    </div>
  </div>
</section>


<section className="cabins" id="minichalets">
  <div className="cabins-header reveal">
    <div>
      <div className="section-label">Hébergement</div>
      <h2 className="section-title" style={{ color: 'white' }}>Nos <em style={{ color: 'var(--sage)' }}>minichalets</em></h2>
    </div>
    <p className="section-body" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '320px' }}>Deux stations uniques, chacune avec son caractère architectural et son expérience thermale entièrement privée.</p>
  </div>
  <div className="cabins-grid reveal">
    <div className="cabin-card">
      <img src="https://la-cime.ca/wp-content/uploads/2024/07/DJI_20240605164927_0548_D.jpg" alt="Cime 02" />
      <div className="cabin-overlay">
        <div className="cabin-tag">Nouvelle station</div>
        <div className="cabin-name">Cime 02</div>
        <p className="cabin-desc">Notre station flagship avec circuit thermal complet : sauna sec, cuve thermale, hammam et douche quatre saisons.</p>
        <div className="cabin-features">
          <span className="cabin-feat">Sauna sec</span><span className="cabin-feat">Cuve thermale</span><span className="cabin-feat">Hammam</span><span className="cabin-feat">Vue panoramique</span>
        </div>
        <a href="https://la-cime.ca/cime-02/" className="cabin-link">Découvrir →</a>
      </div>
    </div>
    <div className="cabin-card">
      <img src="https://la-cime.ca/wp-content/uploads/2021/09/E13-scaled.jpg" alt="Station Perchée" />
      <div className="cabin-overlay">
        <div className="cabin-tag">Station originale</div>
        <div className="cabin-name">Station Perchée</div>
        <p className="cabin-desc">Perchée à plusieurs mètres du sol, une escapade intime avec sauna sec, spa et douche extérieure estivale.</p>
        <div className="cabin-features">
          <span className="cabin-feat">Sauna sec</span><span className="cabin-feat">Spa extérieur</span><span className="cabin-feat">Vue rivière</span>
        </div>
        <a href="https://la-cime.ca/station-perchee/" className="cabin-link">Découvrir →</a>
      </div>
    </div>
  </div>
</section>


<div className="thermal" id="thermal">
  <div className="thermal-visual">
    <img src="https://la-cime.ca/wp-content/uploads/2026/01/Station-thermale.jpg" alt="Expérience thermale" />
  </div>
  <div className="thermal-content reveal">
    <div className="section-label">Bien-être exclusif</div>
    <h2 className="section-title">Expérience<br /><em>thermale privée</em></h2>
    <p className="section-body">Digne d'un spa haut de gamme, notre circuit thermal est entièrement perché à la cime des arbres. Un sanctuaire de bien-être exclusif, pensé pour vous faire décrocher du quotidien.</p>
    <div className="thermal-items">
      <div className="thermal-item"><div className="thermal-icon">🔥</div><div><div className="thermal-item-title">Sauna sec finlandais</div><div className="thermal-item-desc">Chaleur sèche intense pour une détente profonde et une purification du corps.</div></div></div>
      <div className="thermal-item"><div className="thermal-icon">🌊</div><div><div className="thermal-item-title">Cuve thermale & spa</div><div className="thermal-item-desc">Bain nordique avec jets hydrotherapeutiques, sous le ciel laurentien.</div></div></div>
      <div className="thermal-item"><div className="thermal-icon">💧</div><div><div className="thermal-item-title">Hammam & douche extérieure</div><div className="thermal-item-desc">Sauna vapeur style hammam et douche quatre saisons pour compléter le circuit.</div></div></div>
    </div>
    <div style={{ marginTop: '36px' }}><a href="https://la-cime.ca/minichalets" className="btn-primary">Réserver l'expérience</a></div>
  </div>
</div>


<section className="inclusions reveal">
  <div className="section-label">Tout inclus</div>
  <h2 className="section-title">Inclus dans<br /><em>votre séjour</em></h2>
  <p className="section-body">Chaque détail est pensé pour vous offrir une expérience complète, tout en minimisant vos préparatifs.</p>
  <div className="inclusions-grid">
    <div className="incl-card"><span className="incl-icon">🛏️</span><div className="incl-title">Literie & peignoirs moelleux</div><p className="incl-desc">Literie, serviettes et deux peignoirs 100 % québécois pour un confort digne des plus belles suites.</p></div>
    <div className="incl-card"><span className="incl-icon">☕</span><div className="incl-title">Panier gourmand d'accueil</div><p className="incl-desc">Café artisanal, confiture de poires et beurre d'érable biologique — des producteurs locaux d'exception.</p></div>
    <div className="incl-card"><span className="incl-icon">🌿</span><div className="incl-title">Produits corporels Oneka</div><p className="incl-desc">Savon, shampoing et revitalisant naturels, fabriqués au Québec par une marque écoresponsable reconnue.</p></div>
    <div className="incl-card"><span className="incl-icon">🍶</span><div className="incl-title">Huile d'olive & vinaigre</div><p className="incl-desc">Fournis par une entreprise lanaudoise pour agrémenter vos repas en toute simplicité.</p></div>
    <div className="incl-card"><span className="incl-icon">🌲</span><div className="incl-title">Épices de la forêt</div><p className="incl-desc">Offertes par notre partenaire local, elles ajoutent une touche sauvage et parfumée à vos plats.</p></div>
    <div className="incl-card"><span className="incl-icon">🕯️</span><div className="incl-title">Bois de chauffage</div><p className="incl-desc">Un bel ajout pour une soirée sous les étoiles, sans tracas lors de votre déplacement.</p></div>
  </div>
</section>


<section className="addons" id="addons">
  <div className="addons-header reveal">
    <div className="addons-intro">
      <div className="section-label">Bonifications</div>
      <h2 className="section-title">Rehaussez<br /><em>votre escapade</em></h2>
      <p className="addons-lead">Des expériences sur mesure pour transformer votre séjour en souvenir inoubliable.</p>
    </div>
  </div>
  <div className="addons-grid reveal">
    <div className="addon-card"><span className="addon-icon">🤲</span><div className="addon-name">Massothérapie</div><p className="addon-desc">Soin sur mesure dans votre microchalet : notre massothérapeute se déplace sur place, en prolongement de l'expérience thermale. Modalités de réservation au bas de la page.</p><div className="addon-price">Sur réservation</div></div>
    <div className="addon-card"><span className="addon-icon">🍲</span><div className="addon-name">Fondue chinoise du terroir</div><p className="addon-desc">Notre fondue chinoise du terroir : un panier complet pour un repas convivial, avec des produits artisanaux d'exception.</p><div className="addon-price">En option</div></div>
    <div className="addon-card"><span className="addon-icon">🍽️</span><div className="addon-name">Plateau gourmand</div><p className="addon-desc">Pause gourmande au chalet : produits artisanaux choisis pour dîner, après-midi ou fin de soirée — à savourer sur la terrasse, près du feu ou face à la vue.</p><div className="addon-price">En option</div></div>
    <div className="addon-card"><span className="addon-icon">🍺</span><div className="addon-name">Duo de bières locales</div><p className="addon-desc">Deux bières artisanales de microbrasseries lanaudoises pour découvrir la richesse brassicole de la région.</p><div className="addon-price">En option</div></div>
    <div className="addon-card"><span className="addon-icon">🍺</span><div className="addon-name">Duo de bières plus</div><p className="addon-desc">Deux bières artisanales de microbrasseries lanaudoises, accompagnées d'un saucisson et de chips.</p><div className="addon-price">En option</div></div>
    <div className="addon-card"><span className="addon-icon">🌅</span><div className="addon-name">Arrivée anticipée</div><p className="addon-desc">Profitez de votre station dès le matin pour maximiser chaque instant de votre escapade.</p><div className="addon-price">Selon disponibilité</div></div>
  </div>
</section>


<div className="region" id="region">
  <div className="region-content reveal">
    <div className="section-label">Explorez</div>
    <h2 className="section-title">Le pays<br /><em style={{ color: 'var(--gold)' }}>lanaudois</em></h2>
    <p className="section-body" style={{ color: 'rgba(255,255,255,0.65)' }}>À seulement une heure de Montréal, Lanaudière offre forêt laurentienne, lacs, rivières et paysages saisissants — tout pour décrocher du quotidien.</p>
    <div className="region-points">
      <div className="region-point">3 parcs régionaux à moins de 30 min — randonnée & plein air</div>
      <div className="region-point">Station de ski Val Saint-Côme à 20 minutes</div>
      <div className="region-point">Producteurs et artisans locaux d'exception</div>
      <div className="region-point">Rivière Ouareau directement sous vos pieds</div>
    </div>
    <div style={{ marginTop: '40px' }}><a href="https://la-cime.ca/nos-partenaires/" className="btn-primary">Nos partenaires locaux</a></div>
  </div>
  <div className="region-img">
    <img src="https://la-cime.ca/wp-content/uploads/2025/05/DJI_20250108211927_0400_D.jpg" alt="Vue aérienne Lanaudière" />
  </div>
</div>


<section className="gallery">
  <div className="gallery-header reveal">
    <div>
      <div className="section-label">Galerie</div>
      <h2 className="section-title">Vivez<br /><em>l'atmosphère</em></h2>
    </div>
    <a href="https://la-cime.ca/minichalets/" className="btn-outline" style={{ color: 'var(--forest)', borderColor: 'var(--mist)' }}>Voir toutes les photos</a>
  </div>
  <div className="gallery-grid reveal">
    <div className="gallery-item"><img src="https://la-cime.ca/wp-content/uploads/2024/07/DSC03812.jpg" alt="Extérieur" /></div>
    <div className="gallery-item"><img src="https://la-cime.ca/wp-content/uploads/2024/07/DSC03701.jpg" alt="Intérieur" /></div>
    <div className="gallery-item"><img src="https://la-cime.ca/wp-content/uploads/2024/07/EXPERIENCE-THERMALE.jpg" alt="Thermale" /></div>
    <div className="gallery-item"><img src="https://la-cime.ca/wp-content/uploads/2024/07/DSC03919-Enhanced-NR.jpg" alt="Nuit" /></div>
    <div className="gallery-item"><img src="https://la-cime.ca/wp-content/uploads/2025/05/DSC04598.jpg" alt="Détail" /></div>
    <div className="gallery-item"><img src="https://la-cime.ca/wp-content/uploads/2024/07/DSC03740-Enhanced-NR.jpg" alt="Vue" /></div>
  </div>
</section>


<section className="testimonials" id="avis">
  <div className="testimonials-wrap reveal">
    <div className="testimonials-head">
      <div className="section-label">Avis clients</div>
      <h2 className="section-title">Ce que disent<br /><em style={{ color: 'var(--sage)' }}>nos voyageurs</em></h2>
      <p className="testimonials-sub">Avis authentiques regroupés et vérifiés — vous les retrouvez en entier sur Trustindex.</p>
    </div>

    <div className="trust-summary">
      <div className="trust-score-block">
        <div className="trust-score" aria-label="Note moyenne 5 sur 5">5,0</div>
        <div className="trust-score-stars" aria-hidden="true">★★★★★</div>
        <p className="trust-score-label">Note moyenne</p>
      </div>
      <div className="trust-summary-body">
        <p className="trust-count"><strong>478 avis</strong> publiés sur les plateformes partenaires</p>
        <ul className="trust-sources" aria-label="Sources des avis">
          <li>Google</li>
          <li>Airbnb</li>
          <li>Trustindex</li>
        </ul>
        <a className="btn-trust-cta" href="https://www.trustindex.io/reviews/la-cime.ca" target="_blank" rel="noopener noreferrer">Voir tous les avis vérifiés</a>
      </div>
    </div>

    <div className="reviews-grid">
      <article className="review-card">
        <div className="review-stars" aria-hidden="true">★★★★★</div>
        <p className="review-text">« Nous avons passé un séjour absolument magnifique dans ce chalet. Tout est pensé pour la détente : la vue est spectaculaire, le spa et le sauna sont parfaits pour relaxer, et le chalet est très confortable et bien équipé. »</p>
        <div className="review-author">Joel Bouchard</div>
        <div className="review-verified">Avis vérifié · publié sur une plateforme partenaire</div>
      </article>
      <article className="review-card">
        <div className="review-stars" aria-hidden="true">★★★★★</div>
        <p className="review-text">« Nous avons adoré notre séjour en couple. Tout était irréprochable : les installations sont remarquablement bien pensées, avec un souci du détail impressionnant. Le lieu offre une intimité précieuse et une vue magnifique. »</p>
        <div className="review-author">Nancy Nakich</div>
        <div className="review-verified">Avis vérifié · publié sur une plateforme partenaire</div>
      </article>
      <article className="review-card">
        <div className="review-stars" aria-hidden="true">★★★★★</div>
        <p className="review-text">« Une belle expérience à vivre où détente et confort sont au rendez-vous. Le chalet est magnifique, ergonomique et particulièrement bien équipé ! Les hôtes sont proactifs et à l’écoute de vos besoins. »</p>
        <div className="review-author">Sophie</div>
        <div className="review-verified">Avis vérifié Trustindex</div>
      </article>
    </div>

    <p className="trust-footnote">Les citations ci-dessus sont extraites d’avis publics. Consultez l’historique complet, les dates et les réponses de La Cime sur <a href="https://www.trustindex.io/reviews/la-cime.ca" target="_blank" rel="noopener noreferrer">Trustindex</a>.</p>
  </div>
</section>


<section className="press reveal">
  <div className="press-label">Lu et vu dans</div>
  <div className="press-logos">
    <a href="https://www.forbes.fr/brandvoice/la-cime-quand-le-luxe-intime-rencontre-lexcellence-environnementale-au-quebec/" target="_blank" className="press-logo">Forbes</a>
    <a href="https://www.lapresse.ca/maison/architecture/2024-07-27/la-cime/en-haut-lieu.php" target="_blank" className="press-logo">La Presse</a>
    <a href="https://urls.fr/oxaca3" target="_blank" className="press-logo">Jardins Magazine</a>
    <a href="https://int.design/fr/projet/la-cime/" target="_blank" className="press-logo">INT.Design</a>
    <a href="https://www.grenier.qc.ca/actualites/51839/la-cime-une-identite-au-sommet" target="_blank" className="press-logo">Grenier.qc.ca</a>
    <a href="https://naturehumaine.com/portfolio/la-cime-2/" target="_blank" className="press-logo">Nature Humaine</a>
  </div>
</section>


<section className="newsletter">
  <div className="reveal">
    <h2 className="newsletter-title">Soyez les premiers<br />informés</h2>
    <p className="newsletter-sub">Nouvelles de La Cime, lancement de produits, prochains minichalets et offres exclusives — directement dans votre boîte.</p>
  </div>
  <div className="newsletter-form reveal">
    <div className="nl-row">
      <input className="nl-input" type="text" placeholder="Prénom" />
      <input className="nl-input" type="text" placeholder="Nom" />
    </div>
    <input className="nl-input" type="email" placeholder="Adresse courriel" />
    <button className="btn-primary" style={{ width: '100%', padding: '16px', border: 'none', cursor: 'pointer' }}>S'inscrire à l'infolettre</button>
  </div>
</section>


<footer id="contact">
  <div className="footer-grid">
    <div>
      <div className="footer-brand">La <span>Cime</span></div>
      <p className="footer-tagline">Station thermale en haute nature.<br />Sainte-Béatrix, Lanaudière, Québec.</p>
      <div className="footer-social">
        <a href="https://www.facebook.com/lacime.station/" target="_blank">Facebook</a>
        <a href="https://www.instagram.com/lacime.station/" target="_blank">Instagram</a>
      </div>
    </div>
    <div className="footer-col">
      <h4>Hébergement</h4>
      <ul>
        <li><a href="https://la-cime.ca/cime-02/">Cime 02</a></li>
        <li><a href="https://la-cime.ca/station-perchee/">Station Perchée</a></li>
        <li><a href="https://la-cime.ca/parenthese-dune-nuit/">Parenthèse d'une nuit</a></li>
      </ul>
    </div>
    <div className="footer-col">
      <h4>Services</h4>
      <ul>
        <li><a href="https://la-cime.ca/massotherapie/">Massothérapie</a></li>
        <li><a href="https://la-cime.ca/panier-fondue-chinoise/">Fondue chinoise</a></li>
        <li><a href="https://la-cime.ca/plateau-gourmand/">Plateau gourmand</a></li>
        <li><a href="https://la-cime.ca/cheques-cadeaux/">Chèques-cadeaux</a></li>
        <li><a href="https://la-cime.ca/peignoir/">Peignoirs La Cime</a></li>
      </ul>
    </div>
    <div className="footer-col">
      <h4>À propos</h4>
      <ul>
        <li><a href="https://la-cime.ca/notre-histoire/">Notre histoire</a></li>
        <li><a href="https://la-cime.ca/on-parle-de-nous/">On parle de nous</a></li>
        <li><a href="https://la-cime.ca/nos-partenaires/">Nos partenaires</a></li>
        <li><a href="https://la-cime.ca/contactez-nous/">Contact</a></li>
      </ul>
    </div>
  </div>
  <div className="footer-bottom">
    <span>© 2025 La Cime · #CITQ 297299</span>
    <span>Sainte-Béatrix, Lanaudière, QC</span>
  </div>
</footer>
    </>
  );
}
