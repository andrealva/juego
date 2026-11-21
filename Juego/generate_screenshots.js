// Screenshot generator - creates screenshot-like images using Node canvas
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const W = 500, H = 700;

function drawRoundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

// === TITLE SCREEN ===
function drawTitleScreen() {
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');
    
    // Background gradient
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#0d0d2b');
    grad.addColorStop(0.5, '#1a1a4e');
    grad.addColorStop(1, '#0d0d2b');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
    
    // Car emoji placeholder
    ctx.font = '80px serif';
    ctx.textAlign = 'center';
    ctx.fillText('🏎️', W/2, 200);
    
    // Title
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#00d4ff';
    ctx.shadowColor = '#00d4ff';
    ctx.shadowBlur = 20;
    ctx.fillText('CAR RACING', W/2, 280);
    ctx.shadowBlur = 0;
    
    // GamePlay
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#ff6b35';
    ctx.fillText('GamePlay', W/2, 315);
    
    // Author name
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = 'rgba(255,215,0,0.5)';
    ctx.shadowBlur = 15;
    ctx.fillText('Luis Centro', W/2, 355);
    ctx.shadowBlur = 0;
    
    // Subtitle
    ctx.font = '16px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Juego de Carros - JavaScript', W/2, 385);
    
    // Button
    const btnGrad = ctx.createLinearGradient(150, 420, 350, 465);
    btnGrad.addColorStop(0, '#00d4ff');
    btnGrad.addColorStop(1, '#0088ff');
    ctx.fillStyle = btnGrad;
    drawRoundRect(ctx, 150, 420, 200, 50, 25);
    ctx.fill();
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('JUGAR', W/2, 452);
    
    // Instructions
    ctx.font = '14px Arial';
    ctx.fillStyle = '#888';
    ctx.fillText('← → Mover el carro', W/2, 510);
    ctx.fillText('Esquiva enemigos y barriles', W/2, 535);
    ctx.fillText('Recoge estrellas ⭐ para sumar puntos', W/2, 560);
    ctx.fillText('¡3 puntos para pasar de nivel!', W/2, 585);
    
    return canvas;
}

// === LEVEL 1 GAMEPLAY ===
function drawLevel1() {
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');
    
    // Road
    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#1a5c1a';
    ctx.fillRect(0, 0, 50, H);
    ctx.fillRect(W-50, 0, 50, H);
    
    // Road edges
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 0); ctx.lineTo(50, H);
    ctx.moveTo(W-50, 0); ctx.lineTo(W-50, H);
    ctx.stroke();
    
    // Lane markers
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.setLineDash([30, 30]);
    ctx.beginPath();
    ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // HUD background
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    drawRoundRect(ctx, 10, 10, 130, 30, 5);
    ctx.fill();
    drawRoundRect(ctx, 180, 10, 140, 30, 5);
    ctx.fill();
    drawRoundRect(ctx, 365, 10, 125, 30, 5);
    ctx.fill();
    
    // HUD text
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.fillText('❤️ Vidas: 3', 20, 32);
    ctx.fillText('⭐ Puntos: 1', 190, 32);
    ctx.fillText('🏁 Nivel 1', 375, 32);
    ctx.textAlign = 'center';
    
    // Player car (blue)
    ctx.fillStyle = '#0066ff';
    drawRoundRect(ctx, W/2-25, H-120, 50, 80, 8);
    ctx.fill();
    ctx.fillStyle = '#88ccff';
    ctx.fillRect(W/2-12, H-90, 24, 16);
    ctx.fillStyle = '#fff';
    ctx.fillRect(W/2-3, H-115, 6, 25);
    // Wheels
    ctx.fillStyle = '#222';
    ctx.fillRect(W/2-29, H-93, 8, 18);
    ctx.fillRect(W/2+21, H-93, 8, 18);
    ctx.fillRect(W/2-29, H-55, 8, 18);
    ctx.fillRect(W/2+21, H-55, 8, 18);
    // Headlights
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(W/2-12, H-117, 4, 0, Math.PI*2);
    ctx.arc(W/2+12, H-117, 4, 0, Math.PI*2);
    ctx.fill();
    
    // Enemy sedan (red)
    ctx.fillStyle = '#cc0000';
    drawRoundRect(ctx, 120, 150, 46, 80, 6);
    ctx.fill();
    ctx.fillStyle = '#660000';
    ctx.fillRect(132, 180, 22, 16);
    ctx.fillStyle = '#222';
    ctx.fillRect(116, 170, 7, 15);
    ctx.fillRect(163, 170, 7, 15);
    
    // Enemy taxi (yellow)
    ctx.fillStyle = '#FFD700';
    drawRoundRect(ctx, 310, 300, 46, 80, 6);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillRect(325, 294, 16, 8);
    ctx.fillStyle = '#222';
    ctx.fillRect(306, 320, 7, 15);
    ctx.fillRect(353, 320, 7, 15);
    
    // Barrel
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.ellipse(200, 450, 16, 18, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(200, 443, 14, 3, 0, 0, Math.PI*2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(200, 457, 14, 3, 0, 0, Math.PI*2);
    ctx.stroke();
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(194, 444, 12, 12);
    ctx.font = 'bold 10px Arial';
    ctx.fillStyle = '#fff';
    ctx.fillText('⚠', 200, 453);
    
    // Star
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 15;
    ctx.font = '30px serif';
    ctx.fillText('⭐', 350, 520);
    ctx.shadowBlur = 0;
    
    // Another star
    ctx.fillText('⭐', 130, 580);
    
    return canvas;
}

// === LEVEL 2 GAMEPLAY ===
function drawLevel2() {
    const canvas = createCanvas(W, H);
    const ctx = canvas.getContext('2d');
    
    // Road with reddish tint
    ctx.fillStyle = '#2d2d2d';
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,69,0,0.1)';
    ctx.fillRect(50, 0, W-100, H);
    ctx.fillStyle = '#1a3a5c';
    ctx.fillRect(0, 0, 50, H);
    ctx.fillRect(W-50, 0, 50, H);
    
    // Road edges
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 0); ctx.lineTo(50, H);
    ctx.moveTo(W-50, 0); ctx.lineTo(W-50, H);
    ctx.stroke();
    
    // Lane markers
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.setLineDash([30, 30]);
    ctx.beginPath();
    ctx.moveTo(W/2, 0); ctx.lineTo(W/2, H);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    drawRoundRect(ctx, 10, 10, 130, 30, 5);
    ctx.fill();
    drawRoundRect(ctx, 180, 10, 140, 30, 5);
    ctx.fill();
    drawRoundRect(ctx, 365, 10, 125, 30, 5);
    ctx.fill();
    
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#fff';
    ctx.fillText('❤️ Vidas: 2', 20, 32);
    ctx.fillText('⭐ Puntos: 4', 190, 32);
    ctx.fillText('🏁 Nivel 2', 375, 32);
    ctx.textAlign = 'center';
    
    // Player car
    ctx.fillStyle = '#0066ff';
    drawRoundRect(ctx, W/2+40, H-120, 50, 80, 8);
    ctx.fill();
    ctx.fillStyle = '#88ccff';
    ctx.fillRect(W/2+52, H-90, 24, 16);
    ctx.fillStyle = '#fff';
    ctx.fillRect(W/2+62, H-115, 6, 25);
    ctx.fillStyle = '#222';
    ctx.fillRect(W/2+36, H-93, 8, 18);
    ctx.fillRect(W/2+86, H-93, 8, 18);
    ctx.fillRect(W/2+36, H-55, 8, 18);
    ctx.fillRect(W/2+86, H-55, 8, 18);
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(W/2+52, H-117, 4, 0, Math.PI*2);
    ctx.arc(W/2+77, H-117, 4, 0, Math.PI*2);
    ctx.fill();
    
    // Monster truck (orange) 
    ctx.fillStyle = '#FF4500';
    drawRoundRect(ctx, 100, 180, 55, 95, 5);
    ctx.fill();
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(100, 200, 12, 0, Math.PI*2);
    ctx.arc(155, 200, 12, 0, Math.PI*2);
    ctx.arc(100, 255, 12, 0, Math.PI*2);
    ctx.arc(155, 255, 12, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.arc(100, 200, 5, 0, Math.PI*2);
    ctx.arc(155, 200, 5, 0, Math.PI*2);
    ctx.arc(100, 255, 5, 0, Math.PI*2);
    ctx.arc(155, 255, 5, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(114, 185, 27, 10);
    
    // Sports car (purple) with neon
    ctx.fillStyle = '#8B00FF';
    drawRoundRect(ctx, 300, 350, 46, 80, 10);
    ctx.fill();
    ctx.fillStyle = '#5500aa';
    ctx.fillRect(312, 375, 22, 13);
    ctx.fillStyle = '#6600cc';
    ctx.fillRect(302, 422, 42, 6);
    // Neon underglow
    ctx.shadowColor = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.fillStyle = 'rgba(255,0,255,0.5)';
    ctx.fillRect(300, 430, 46, 5);
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#222';
    ctx.fillRect(296, 370, 7, 14);
    ctx.fillRect(343, 370, 7, 14);
    
    // Barrel
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.ellipse(380, 180, 16, 18, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(374, 174, 12, 12);
    
    // Another barrel
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.ellipse(170, 500, 16, 18, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(164, 494, 12, 12);
    
    // Star
    ctx.fillStyle = '#FFD700';
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 15;
    ctx.font = '30px serif';
    ctx.fillText('⭐', 250, 480);
    ctx.shadowBlur = 0;
    
    // Some explosion particles (to show action)
    const colors = ['#ff4400', '#ff8800', '#ffcc00', '#fff'];
    for (let i = 0; i < 8; i++) {
        ctx.fillStyle = colors[i % 4];
        ctx.globalAlpha = 0.7;
        const px = 200 + (Math.random()-0.5)*40;
        const py = 400 + (Math.random()-0.5)*40;
        ctx.fillRect(px, py, 4+Math.random()*4, 4+Math.random()*4);
    }
    ctx.globalAlpha = 1;
    
    return canvas;
}

// Save screenshots
const dir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const screens = [
    { fn: drawTitleScreen, name: 'portada.png' },
    { fn: drawLevel1, name: 'nivel1.png' },
    { fn: drawLevel2, name: 'nivel2.png' },
];

screens.forEach(s => {
    const canvas = s.fn();
    const buffer = canvas.toBuffer('image/png');
    const filepath = path.join(dir, s.name);
    fs.writeFileSync(filepath, buffer);
    console.log(`Saved: ${filepath}`);
});

console.log('Done! All screenshots generated.');
