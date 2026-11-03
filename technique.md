# Technique — Archive Sensible

**Archive Sensible** est un site web statique réalisé avec HTML, CSS et
JavaScript. Il ne nécessite pas de base de données, de serveur applicatif ni
de compte utilisateur.

Le site est publié avec GitHub Pages et mis à jour automatiquement à chaque
push sur la branche `main`.

## Architecture générale

```mermaid
flowchart TD
    A[Visiteur] --> B[Navigateur]
    B --> C[index3.html]
    C --> D[styles3.css]
    C --> E[script3.js]
    C --> F[images/]
    C --> G[videos/]
    E --> H[Animations au scroll]
    E --> I[QCM]
    E --> J[Spoiler]
    E --> K[Messages d’archive]
```

## Fichiers principaux

| Fichier | Rôle |
|---|---|
| `index3.html` | Structure du site, sections, œuvres, QCM et spoiler |
| `styles3.css` | Mise en page, responsive, couleurs, animations et accessibilité |
| `script3.js` | Apparitions au scroll, QCM, spoiler et messages |
| `images/` | Images utilisées dans les différentes sections |
| `videos/` | Vidéos éventuelles intégrées au site |
| `.github/workflows/deploy.yml` | Déploiement automatique vers GitHub Pages |

## Fonctionnement du scrollytelling

Le JavaScript observe les éléments présents dans la page. Lorsqu’un élément
entre dans la zone visible du navigateur, la classe `visible` lui est ajoutée.
Le CSS déclenche alors son apparition progressive.

```mermaid
sequenceDiagram
    actor Visiteur
    participant Navigateur
    participant JavaScript
    participant CSS

    Visiteur->>Navigateur: Fait défiler la page
    Navigateur->>JavaScript: Événement scroll
    JavaScript->>JavaScript: IntersectionObserver vérifie les éléments
    alt Élément visible
        JavaScript->>CSS: Ajoute la classe visible
        CSS-->>Visiteur: Apparition de l’élément
    else Élément non visible
        JavaScript->>JavaScript: Attend que l’élément entre dans le viewport
    end
```

## QCM

Chaque QCM possède un attribut `data-answer` qui contient la bonne réponse.
Lorsque le visiteur clique sur une option, le script compare la valeur choisie
avec la bonne réponse.

```mermaid
flowchart TD
    A[Visiteur clique sur une option] --> B[Lecture de data-value]
    B --> C[Comparaison avec data-answer]
    C --> D{Réponse correcte ?}
    D -->|Oui| E[Option marquée correcte]
    D -->|Non| F[Option marquée fausse]
    E --> G[Affichage du retour]
    F --> G
```

## Spoiler

La section *The Curse* utilise un bouton pour révéler un texte sensible. Après
un délai, le texte reçoit une classe d’animation qui le fait monter et
disparaître.

```mermaid
sequenceDiagram
    actor Visiteur
    participant Bouton
    participant JavaScript
    participant Texte

    Visiteur->>Bouton: Clique sur « Alerte spoiler »
    Bouton->>JavaScript: Clic détecté
    JavaScript->>Texte: Retire hidden
    Texte-->>Visiteur: Affiche le spoiler
    JavaScript->>JavaScript: Attend 7 secondes
    JavaScript->>Texte: Ajoute fly-away
    Texte-->>Visiteur: Le texte s’envole puis disparaît
```

## Responsive design

Le site utilise une mise en page flexible, des unités relatives et des media
queries. Les œuvres passent d’une colonne sur téléphone à deux colonnes sur
écran plus large.

```mermaid
flowchart TD
    A[Largeur de l’écran] --> B{Écran inférieur à 820 px ?}
    B -->|Oui| C[Une colonne]
    B -->|Non| D[Deux colonnes]
    C --> E[Images et textes empilés]
    D --> F[Image et texte côte à côte]
    E --> G[Site lisible sur téléphone]
    F --> G
```

## Accessibilité

Le site applique plusieurs principes d’accessibilité :

- Contraste renforcé entre le texte et le fond.
- `alt` sur les images.
- `aria-live` sur les retours des QCM.
- `aria-modal` sur les éventuelles fenêtres de dialogue.
- Contour de focus visible pour la navigation au clavier.
- Respect de `prefers-reduced-motion`.

```mermaid
flowchart TD
    A[Visiteur] --> B{Préfère moins d’animations ?}
    B -->|Oui| C[prefers-reduced-motion activé]
    C --> D[Animations fortement réduites]
    B -->|Non| E[Animations normales]
    D --> F[Site plus confortable]
    E --> F
```

## Déploiement

Le déploiement est réalisé avec GitHub Actions. Lors d’un push sur `main`, le
workflow copie les fichiers HTML, CSS, JavaScript et médias dans un dossier
`site`, puis le publie sur GitHub Pages.

```mermaid
flowchart TD
    A[git push vers main] --> B[GitHub Actions démarre]
    B --> C[Checkout du dépôt]
    C --> D[Création du dossier site]
    D --> E[Copie des HTML, CSS, JS et médias]
    E --> F[Upload de l’artifact]
    F --> G[GitHub Pages déploie le site]
    G --> H[Site accessible en ligne]
```

## Ajouter une image

Pour ajouter une image, place le fichier dans le dossier `images/`, puis
insère une balise `<img>` dans `index3.html`.

```mermaid
flowchart LR
    A[Image ajoutée dans images/] --> B[Balise img dans index3.html]
    B --> C[src="images/nom-du-fichier.png"]
    C --> D[Image affichée sur GitHub Pages]
```

Exemple :

```html
<img
  src="images/batter.png"
  alt="Le Batteur, personnage principal du jeu OFF"
/>
```
