# Utilisateur — Archive Sensible

Cette documentation décrit comment un visiteur utilise le site
**Archive Sensible**.

Le site est conçu comme une expérience de lecture sensible : le visiteur fait
défiler, observe, clique sur certains éléments et découvre progressivement les
références présentées.

## Profil du visiteur

Le visiteur peut être :

- Un enseignant qui découvre le projet.
- Un camarade qui consulte les références.
- Une personne intéressée par l’art contemporain, la culture numérique ou
  la pop culture.
- Un visiteur sur ordinateur ou sur téléphone.

## Parcours utilisateur

```mermaid
flowchart TD
    A[Le visiteur ouvre le site] --> B[Il lit la présentation]
    B --> C[Il fait défiler la page]
    C --> D{Il atteint une œuvre}
    D --> E[Il lit le texte de présentation]
    E --> F{L’œuvre contient-elle une interaction ?}
    F -->|Oui| G[Il clique ou répond au QCM]
    F -->|Non| H[Il continue à défiler]
    G --> H
    H --> I[Il découvre la section suivante]
    I --> J[Il atteint la conclusion]
```

## Interactions disponibles

### Défilement

Le défilement déclenche l’apparition progressive des œuvres, des textes et
des éléments graphiques.

```mermaid
sequenceDiagram
    actor Visiteur
    participant Page
    participant Contenu

    Visiteur->>Page: Fait défiler
    Page->>Contenu: Vérifie la position de l’élément
    Contenu-->>Page: Élément visible
    Page-->>Visiteur: Apparition progressive du contenu
```

### QCM

Certaines œuvres proposent une question à choix multiples. Le visiteur clique
sur une réponse, puis le site indique si elle est correcte et révèle la bonne
réponse.

```mermaid
flowchart TD
    A[Le visiteur lit la question] --> B[Il choisit une réponse]
    B --> C{Réponse correcte ?}
    C -->|Oui| D[La bonne réponse est surlignée]
    C -->|Non| E[La réponse choisie est marquée comme fausse]
    D --> F[Un retour est affiché]
    E --> F
```

### Alerte spoiler

Dans la section *The Curse*, le visiteur peut choisir de révéler la fin de la
série. Après quelques secondes, le texte révélé s’envole vers le haut et
disparaît.

```mermaid
sequenceDiagram
    actor Visiteur
    participant Bouton
    participant Texte

    Visiteur->>Bouton: Clique sur « Alerte spoiler »
    Bouton->>Texte: Révèle la fin de la série
    Texte-->>Visiteur: Affiche le texte
    Note over Texte: Après quelques secondes
    Texte->>Texte: S’envole vers le haut
    Texte-->>Visiteur: Le texte disparaît
```

## Accessibilité

Le site cherche à rester lisible et utilisable par le plus grand nombre.

- Les textes ont un contraste renforcé.
- Les éléments interactifs ont un contour de focus visible.
- Les images possèdent une description alternative.
- Les QCM annoncent leur résultat.

```mermaid
flowchart TD
    A[Visiteur] --> B{Utilise un clavier ?}
    B -->|Oui| C[Navigation avec Tab]
    C --> D[Contour jaune visible]
    B -->|Non| E[Navigation à la souris ou au tactile]
    E --> F[Interactions au clic et au toucher]
    D --> G[Le site reste utilisable]
    F --> G
```

## Ce que le visiteur ne fait pas

Le site n’est pas un jeu avec un score, une victoire ou une défaite.

- Il n’y a pas de compte à créer.
- Il n’y a pas de bonne ou mauvaise « performance ».
- Il n’y a pas de récompense à obtenir.
- Le visiteur peut quitter à tout moment.
- Chaque section peut être lue indépendamment des autres.
