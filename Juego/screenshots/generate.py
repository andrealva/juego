from PIL import Image, ImageDraw, ImageFont
import os, random

W, H = 500, 700
out_dir = r'c:\Users\LAB-USR-LCENTRO\Desktop\Juego\screenshots'
os.makedirs(out_dir, exist_ok=True)

try: font_big = ImageFont.truetype('arial.ttf', 48)
except: font_big = ImageFont.load_default()
try: font_med = ImageFont.truetype('arial.ttf', 28)
except: font_med = font_big
try: font_sm = ImageFont.truetype('arial.ttf', 18)
except: font_sm = font_big
try: font_xs = ImageFont.truetype('arial.ttf', 14)
except: font_xs = font_big
try: font_btn = ImageFont.truetype('arialbd.ttf', 22)
except: font_btn = font_big

def rr(draw, xy, fill, r=8):
    draw.rounded_rectangle(xy, radius=r, fill=fill)

# ========== PORTADA ==========
img = Image.new('RGB', (W,H), '#0d0d2b')
d = ImageDraw.Draw(img)
for y in range(H):
    t = abs(y - H/2) / (H/2)
    r2 = int(13 + (26-13)*(1-t))
    g2 = int(13 + (26-13)*(1-t))
    b2 = int(43 + (78-43)*(1-t))
    d.line([(0,y),(W,y)], fill=(r2,g2,b2))

d.text((W//2, 250), 'CAR RACING', fill='#00d4ff', anchor='mm', font=font_big)
d.text((W//2, 300), 'GamePlay', fill='#ff6b35', anchor='mm', font=font_med)
d.text((W//2, 340), 'Luis Centro', fill='#FFD700', anchor='mm', font=font_med)
d.text((W//2, 375), 'Juego de Carros - JavaScript', fill='#aaa', anchor='mm', font=font_sm)
rr(d, (150, 410, 350, 460), '#0088ff', 25)
d.text((W//2, 435), 'JUGAR', fill='white', anchor='mm', font=font_btn)
d.text((W//2, 500), 'Flechas para mover el carro', fill='#888', anchor='mm', font=font_xs)
d.text((W//2, 525), 'Esquiva enemigos y barriles', fill='#888', anchor='mm', font=font_xs)
d.text((W//2, 550), 'Recoge estrellas para sumar puntos', fill='#888', anchor='mm', font=font_xs)
d.text((W//2, 575), '3 puntos para pasar de nivel!', fill='#888', anchor='mm', font=font_xs)
img.save(os.path.join(out_dir, 'portada.png'))
print('Saved portada.png')

# ========== NIVEL 1 ==========
img = Image.new('RGB', (W,H), '#2d2d2d')
d = ImageDraw.Draw(img)
d.rectangle([0,0,50,H], fill='#1a5c1a')
d.rectangle([W-50,0,W,H], fill='#1a5c1a')
d.line([(50,0),(50,H)], fill='white', width=3)
d.line([(W-50,0),(W-50,H)], fill='white', width=3)
for y in range(0,H,60):
    d.line([(W//2,y),(W//2,y+30)], fill='yellow', width=2)

rr(d, (10,10,145,40), '#000000', 5)
rr(d, (180,10,325,40), '#000000', 5)
rr(d, (360,10,490,40), '#000000', 5)
d.text((20,15), 'Vidas: 3', fill='white', font=font_xs)
d.text((190,15), 'Puntos: 1', fill='white', font=font_xs)
d.text((370,15), 'Nivel 1', fill='white', font=font_xs)

# Player car (blue)
cx = W//2
rr(d, (cx-25, H-120, cx+25, H-40), '#0066ff', 8)
d.rectangle([cx-12, H-90, cx+12, H-74], fill='#88ccff')
d.rectangle([cx-3, H-115, cx+3, H-90], fill='white')
for ox in [-29, 21]:
    d.rectangle([cx+ox, H-93, cx+ox+8, H-75], fill='#222')
    d.rectangle([cx+ox, H-55, cx+ox+8, H-37], fill='#222')
d.ellipse([cx-16, H-121, cx-8, H-113], fill='yellow')
d.ellipse([cx+8, H-121, cx+16, H-113], fill='yellow')
d.ellipse([cx-16, H-43, cx-8, H-35], fill='red')
d.ellipse([cx+8, H-43, cx+16, H-35], fill='red')

# Enemy sedan (red)
rr(d, (120, 150, 166, 230), '#cc0000', 6)
d.rectangle([132,180,154,196], fill='#660000')
d.rectangle([116,170,123,185], fill='#222')
d.rectangle([163,170,170,185], fill='#222')
d.rectangle([116,205,123,220], fill='#222')
d.rectangle([163,205,170,220], fill='#222')

# Enemy taxi (yellow)
rr(d, (310, 300, 356, 380), '#FFD700', 6)
d.rectangle([325,294,341,302], fill='white')
d.rectangle([306,320,313,335], fill='#222')
d.rectangle([353,320,360,335], fill='#222')
d.rectangle([306,355,313,370], fill='#222')
d.rectangle([353,355,360,370], fill='#222')

# Barrel
d.ellipse([184,432,216,468], fill='#8B4513')
d.ellipse([186,438,214,444], outline='#666', width=2)
d.ellipse([186,456,214,462], outline='#666', width=2)
d.rectangle([194,444,206,456], fill='red')

# Stars
d.regular_polygon((350,520,15), 5, fill='#FFD700')
d.regular_polygon((130,580,12), 5, fill='#FFD700')

img.save(os.path.join(out_dir, 'nivel1.png'))
print('Saved nivel1.png')

# ========== NIVEL 2 ==========
img = Image.new('RGB', (W,H), '#2d2d2d')
d = ImageDraw.Draw(img)
# Slight red tint on road
d.rectangle([50,0,W-50,H], fill='#302828')
d.rectangle([0,0,50,H], fill='#1a3a5c')
d.rectangle([W-50,0,W,H], fill='#1a3a5c')
d.line([(50,0),(50,H)], fill='white', width=3)
d.line([(W-50,0),(W-50,H)], fill='white', width=3)
for y in range(0,H,60):
    d.line([(W//2,y),(W//2,y+30)], fill='yellow', width=2)

rr(d, (10,10,145,40), '#000000', 5)
rr(d, (180,10,325,40), '#000000', 5)
rr(d, (360,10,490,40), '#000000', 5)
d.text((20,15), 'Vidas: 2', fill='white', font=font_xs)
d.text((190,15), 'Puntos: 4', fill='white', font=font_xs)
d.text((370,15), 'Nivel 2', fill='white', font=font_xs)

# Player car
px = W//2+40
rr(d, (px, H-120, px+50, H-40), '#0066ff', 8)
d.rectangle([px+13, H-90, px+37, H-74], fill='#88ccff')
d.rectangle([px+22, H-115, px+28, H-90], fill='white')
for ox2 in [-4, 46]:
    d.rectangle([px+ox2, H-93, px+ox2+8, H-75], fill='#222')
    d.rectangle([px+ox2, H-55, px+ox2+8, H-37], fill='#222')

# Monster truck (orange) - Level 2 exclusive
rr(d, (100, 180, 155, 275), '#FF4500', 5)
d.ellipse([88,188,112,212], fill='#111')
d.ellipse([143,188,167,212], fill='#111')
d.ellipse([88,243,112,267], fill='#111')
d.ellipse([143,243,167,267], fill='#111')
d.ellipse([95,195,105,205], fill='#888')
d.ellipse([150,195,160,205], fill='#888')
d.rectangle([114,185,141,195], fill='#ff6600')

# Sports car (purple) with neon underglow
rr(d, (300, 350, 346, 430), '#8B00FF', 10)
d.rectangle([312,375,334,388], fill='#5500aa')
d.rectangle([302,422,344,428], fill='#6600cc')
d.rectangle([300,430,346,435], fill='#ff00ff')
d.rectangle([296,370,303,384], fill='#222')
d.rectangle([343,370,350,384], fill='#222')

# Barrels
d.ellipse([364,162,396,198], fill='#8B4513')
d.rectangle([374,174,386,186], fill='red')
d.ellipse([154,482,186,518], fill='#8B4513')
d.rectangle([164,494,176,506], fill='red')

# Star
d.regular_polygon((250,480,15), 5, fill='#FFD700')

# Explosion particles
random.seed(42)
for _ in range(15):
    px2 = 200 + random.randint(-25,25)
    py2 = 400 + random.randint(-25,25)
    color = random.choice(['#ff4400','#ff8800','#ffcc00','#fff'])
    s = random.randint(3,7)
    d.rectangle([px2,py2,px2+s,py2+s], fill=color)

img.save(os.path.join(out_dir, 'nivel2.png'))
print('Saved nivel2.png')
print('All screenshots generated!')
