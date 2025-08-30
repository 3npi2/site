// 粒の配列と個数
const snowflakes = [];         // 作った粒(div)を全部ここで管理
const snowCount = 80;          // 作る数

// 粒（白丸）をまとめて生成
for (let i = 0; i < snowCount; i++) {
  const flake = document.createElement('div'); // <div> 作成
  flake.classList.add('snowflake');            // CSSで丸く白くするクラスを付与

  // 画面内のランダムな位置へ
  flake.style.left = Math.random() * window.innerWidth  + 'px';
  flake.style.top  = Math.random() * window.innerHeight + 'px';

  // 粒ごとのランダム速度（X,Y）
  flake.speedX = (Math.random() - 0.5) * 0.5;  // -0.25〜+0.25くらい
  flake.speedY = (Math.random() - 0.5) * 0.5;

  // 粒の大きさ（px）
  flake.size = Math.random() * 6 + 4;          // 4〜10px
  flake.style.width  = flake.size + 'px';
  flake.style.height = flake.size + 'px';

  // 画面に出す & 配列に登録
  document.body.appendChild(flake);
  snowflakes.push(flake);
}

// マウス位置（最初は画面外に）
let mouse = { x: -9999, y: -9999 };
document.addEventListener('mousemove', e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// アニメーション
function animate() {
  snowflakes.forEach(f => {
    // いまの位置（"123px" → 数値に）
    let x = parseFloat(f.style.left);
    let y = parseFloat(f.style.top);

    // マウスからの反発
    const dx = x - mouse.x;
    const dy = y - mouse.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 120 && dist > 0.0001) {             // 近いときだけ & 0除算回避
      const force = (120 - dist) / 120 * 2;      // 近いほど強い
      x += (dx / dist) * force;                    // 単位ベクトル × 力
      y += (dy / dist) * force;
    }

    // 固有の速度で漂う
    x += f.speedX;
    y += f.speedY;

    // 端で反対側へワープ
    if (x > window.innerWidth)  x = 0;
    if (x < 0)                  x = window.innerWidth;
    if (y > window.innerHeight) y = 0;
    if (y < 0)                  y = window.innerHeight;

    // 位置を反映
    f.style.left = x + 'px';
    f.style.top  = y + 'px';
  });

  // 次の描画前にまた呼んでもらう
  requestAnimationFrame(animate);
}
animate();

// Discord名コピー（ボタン風の要素をクリック）
const discord = document.getElementById('discord');
const notice  = document.getElementById('copied-notice');

discord.addEventListener('click', () => {
  navigator.clipboard.writeText('3npi2').then(() => {
    // 1秒だけ「Copied!」を表示
    notice.style.opacity = 1;
    setTimeout(() => {
      notice.style.opacity = 0;
    }, 1000);
  });
});

// ウィンドウサイズ変更で外に出過ぎた粒を戻す
window.addEventListener('resize', () => {
  snowflakes.forEach(f => {
    if (parseFloat(f.style.left) > window.innerWidth)
      f.style.left = Math.random() * window.innerWidth + 'px';
    if (parseFloat(f.style.top) > window.innerHeight)
      f.style.top = Math.random() * window.innerHeight + 'px';
  });
});