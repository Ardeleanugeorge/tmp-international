# Cum să convertești video-ul în GIF

Pentru a avea autoplay garantat pe mobile, trebuie să convertești video-ul `Transconnect-Movie-Final.mp4` într-un GIF animat.

## Opțiuni pentru conversie:

### Opțiunea 1: Online (Recomandat - Cel mai ușor)

1. **EzGIF.com** - https://ezgif.com/video-to-gif
   - Upload video-ul
   - Setează rezoluția (recomandat: 1920x1080 sau mai mic pentru dimensiune mai mică)
   - Setează calitatea și frame rate
   - Click "Convert to GIF"
   - Download GIF-ul

2. **CloudConvert** - https://cloudconvert.com/mp4-to-gif
   - Upload video-ul
   - Ajustează setările
   - Convert

### Opțiunea 2: Software Desktop

1. **FFmpeg** (gratuit, command line):
```bash
ffmpeg -i Transconnect-Movie-Final.mp4 -vf "fps=10,scale=1920:-1:flags=lanczos" -loop 0 Transconnect-Movie-Final.gif
```

2. **GIMP** (gratuit):
   - File → Import as frames
   - Export as GIF

3. **Photoshop**:
   - File → Import → Video Frames to Layers
   - File → Export → Save for Web → GIF

## Setări recomandate pentru GIF:

- **Rezoluție**: 1920x1080 (sau mai mică dacă fișierul e prea mare)
- **Frame Rate**: 10-15 fps (pentru dimensiune mai mică)
- **Calitate**: Medium-High
- **Dimensiune maximă**: Încearcă să păstrezi sub 10-15 MB pentru încărcare rapidă

## După conversie:

1. Salvează GIF-ul ca `Transconnect-Movie-Final.gif` în același folder
2. Site-ul va detecta automat și va folosi GIF-ul pe mobile
3. Video-ul va rămâne pentru desktop

## Notă:

GIF-urile pot fi mari ca dimensiune. Dacă fișierul e prea mare (>20MB), consideră:
- Reducerea rezoluției
- Reducerea frame rate-ului
- Folosirea unui serviciu de optimizare GIF

