# TMP International - Transport Auto

Site-ul TMP International pentru servicii de transport auto Romania-Germania-Romania.

## 🚀 Deployment pe Vercel

### Pasul 1: Pregătește repository-ul pe GitHub

1. Creează un cont pe [GitHub](https://github.com) dacă nu ai deja
2. Creează un repository nou:
   - Click pe "+" → "New repository"
   - Nume: `tmp-international` (sau orice nume vrei)
   - Public sau Private (după preferință)
   - **NU** bifea "Add a README file" (avem deja unul)
   - Click "Create repository"

### Pasul 2: Upload fișierele pe GitHub

**Opțiunea A: Folosind GitHub Desktop**
1. Descarcă [GitHub Desktop](https://desktop.github.com/)
2. Clonează repository-ul
3. Copiază toate fișierele în folderul repository
4. Commit și Push

**Opțiunea B: Folosind Git în terminal**
```bash
# Navighează în folderul proiectului
cd "C:\Users\George\Desktop\tmp international"

# Inițializează Git
git init

# Adaugă toate fișierele
git add .

# Creează primul commit
git commit -m "Initial commit - TMP International website"

# Adaugă remote repository (înlocuiește USERNAME cu username-ul tău)
git remote add origin https://github.com/USERNAME/tmp-international.git

# Push pe GitHub
git branch -M main
git push -u origin main
```

**Opțiunea C: Upload manual pe GitHub**
1. Mergi pe pagina repository-ului pe GitHub
2. Click "uploading an existing file"
3. Drag & drop toate fișierele
4. Commit changes

### Pasul 3: Deploy pe Vercel

1. Mergi pe [Vercel](https://vercel.com)
2. Sign up cu GitHub (cel mai ușor)
3. Click "Add New Project"
4. Selectează repository-ul `tmp-international`
5. Vercel va detecta automat că e un site static
6. **Settings importante:**
   - Framework Preset: **Other** (sau lasă pe auto-detect)
   - Root Directory: `./` (rădăcina)
   - Build Command: (lasă gol - nu e nevoie de build)
   - Output Directory: (lasă gol)
7. Click "Deploy"
8. Așteaptă ~30 secunde
9. Site-ul va fi live la: `https://tmp-international.vercel.app` (sau un URL similar)

### Pasul 4: Configurare domeniu personalizat (opțional)

1. În Vercel Dashboard → Settings → Domains
2. Adaugă domeniul tău (ex: `tmp-international.ro`)
3. Urmează instrucțiunile pentru configurare DNS

## 📁 Structura Fișierelor

```
tmp-international/
├── index.html          # Pagina principală
├── styles.css          # Stiluri CSS
├── script.js           # JavaScript
├── logo.png            # Logo
├── Transconnect-Movie-Final.mp4  # Video background
├── *.jpg, *.jpeg       # Imagini
├── .gitignore          # Fișiere ignorate de Git
└── README.md           # Acest fișier
```

## 🔧 Configurare Video

Video-ul `Transconnect-Movie-Final.mp4` trebuie să fie în folderul root pentru a funcționa corect.

## 📝 Note

- Toate fișierele trebuie să fie în root-ul repository-ului
- Vercel suportă automat HTML/CSS/JS static
- Video-ul va fi servit de Vercel (poate fi mare, dar funcționează)
- Pentru optimizare video mai târziu, poți folosi un CDN

## 🌐 Link-uri Utile

- [GitHub](https://github.com)
- [Vercel](https://vercel.com)
- [Vercel Documentation](https://vercel.com/docs)

---

© 2024 TMP International - Toate drepturile rezervate.

