const snowflakes = [];
const snowCount = 80;

// 雪を生成
for (let i = 0; i < snowCount; i++) {
  const flake = document.createElement('div');
  flake.classList.add('snowflake');
  flake.style.left = Math.random() * window.innerWidth + 'px';
  flake.style.top = Math.random() * window.innerHeight + 'px';
  flake.speedX = (Math.random() - 0.5) * 0.5; // 移動幅を少し大きめに
  flake.speedY = (Math.random() - 0.5) * 0.5;
  flake.size = Math.random() * 6 + 4;
  flake.style.width = flake.size + 'px';
  flake.style.height = flake.size + 'px';
  document.body.appendChild(flake);
  snowflakes.push(flake);
}

// 雪のアニメーション（漂う＋マウス反発）
let mouse = {x: -9999, y: -9999};
document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  snowflakes.forEach(f => {
    let x = parseFloat(f.style.left);
    let y = parseFloat(f.style.top);

    // 反重力効果
    const dx = x - mouse.x;
    const dy = y - mouse.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 120) { // 少し範囲広め
      const force = (120 - dist)/120 * 1.5;
      x += dx/dist * force;
      y += dy/dist * force;
    }

    x += f.speedX;
    y += f.speedY;

    // 端で反対側に滑らかに移動
    if (x > window.innerWidth) x = 0;
    if (x < 0) x = window.innerWidth;
    if (y > window.innerHeight) y = 0;
    if (y < 0) y = window.innerHeight;

    f.style.left = x + 'px';
    f.style.top = y + 'px';
  });
  requestAnimationFrame(animate);
}

animate();

// Discordコピー機能
const discord = document.getElementById('discord');
const notice = document.getElementById('copied-notice');

discord.addEventListener('click', () => {
  navigator.clipboard.writeText('3npi2').then(() => {
    notice.style.opacity = 1;
    setTimeout(() => {
      notice.style.opacity = 0;
    }, 1000);
  });
});

// リサイズ対応
window.addEventListener('resize', () => {
  snowflakes.forEach(f => {
    if (parseFloat(f.style.left) > window.innerWidth) f.style.left = Math.random() * window.innerWidth + 'px';
    if (parseFloat(f.style.top) > window.innerHeight) f.style.top = Math.random() * window.innerHeight + 'px';
  });
});S