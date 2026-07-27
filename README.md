# Alif & Amira Im — voyage d'étoile en étoile

Une petite BD à pages, façon liseuse, racontant le voyage du prince Alif et
de la princesse Amira Im de planète en planète.

## Lancer le projet

Comme le lecteur charge `data/pages.json` via `fetch`, il faut le servir
par un petit serveur local (l'ouverture directe du fichier `index.html`
en `file://` bloque le fetch dans certains navigateurs) :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Publier sur GitHub Pages

1. Pousse ce dossier tel quel sur un dépôt GitHub.
2. Dans les paramètres du dépôt → **Pages**, choisis la branche
   `main` et le dossier `/ (root)`.
3. Le site sera disponible à `https://<utilisateur>.github.io/<repo>/`.

## Structure

```
index.html          page principale
css/style.css        styles
js/app.js             logique du lecteur (navigation, clavier, swipe)
data/pages.json       texte des 10 pages (planète, personnage, dialogues)
images/page-1.svg     … page-10.svg — illustrations
```

## Ajouter une nouvelle page

1. Ajoute une image dans `images/` (SVG ou PNG/JPG).
2. Ajoute une entrée dans `data/pages.json` :

```json
{
  "id": 11,
  "planete": "Nom de la planète",
  "personnage": "Nom du personnage rencontré (ou null)",
  "image": "images/page-11.svg",
  "dialogue": [
    "Texte descriptif ou réplique de dialogue."
  ]
}
```

Le lecteur affiche automatiquement toute nouvelle entrée, dans l'ordre
du tableau — pas besoin de toucher au code.

## Navigation

- Boutons ← / → sous l'image
- Flèches du clavier
- Swipe gauche/droite sur mobile
- Points de progression cliquables
