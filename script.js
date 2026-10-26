const screens = [...document.querySelectorAll('.screen')];
const showScreen = id => {
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({top: 0, behavior: 'smooth'});
};

const starMessages = [
  {
    title: 'Điều anh thích ở em',
    message: 'Anh thích cách em làm những điều hết sức bình dị trở nên đặc biệt. Nụ cười của em, cách em quan tâm và cả những lúc em hơi trẻ con nữa — đều là những điều khiến anh thương em nhiều hơn.'
  },
  {
    title: 'Kỷ niệm của mình',
    message: 'Có thể mình chưa đi thật nhiều nơi, nhưng với anh, điều quan trọng không phải là đi đâu mà là được đi cùng em. Anh mong chúng mình sẽ còn có thật nhiều chuyến đi, nhiều tấm ảnh và nhiều chuyện để kể lại.'
  },
  {
    title: 'Lời hứa nhỏ',
    message: 'Anh không hứa ngày nào cũng hoàn hảo. Anh chỉ muốn luôn cố gắng lắng nghe em, cùng em giải quyết những ngày khó khăn và trân trọng cả những khoảnh khắc nhỏ mà hai đứa có với nhau.'
  }
];

const collected = new Set();
const modal = document.getElementById('starModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalEyebrow = document.getElementById('modalEyebrow');
let selectedStar = null;

document.getElementById('startBtn').addEventListener('click', () => showScreen('quest'));

document.querySelectorAll('.star-card').forEach(button => {
  button.addEventListener('click', () => {
    selectedStar = Number(button.dataset.star);
    const message = starMessages[selectedStar];
    modalTitle.textContent = message.title;
    modalMessage.textContent = message.message;
    modalEyebrow.textContent = `STAR 0${selectedStar + 1} · UNLOCKED`;
    modal.classList.remove('hidden');
  });
});

function collectStar() {
  if (selectedStar === null) return;
  collected.add(selectedStar);
  const button = document.querySelector(`[data-star="${selectedStar}"]`);
  button.classList.add('collected');
  button.querySelector('.star-icon').textContent = '✦';
  button.querySelector('small').textContent = 'COLLECTED';
  document.getElementById('progressText').textContent = `${collected.size} / 3 STARS`;
  modal.classList.add('hidden');
  if (collected.size === 3) {
    document.getElementById('giftBtn').classList.remove('hidden');
    toast('Em đã tìm đủ 3 ngôi sao rồi! ✨');
  } else {
    toast(`Đã cất ngôi sao ${collected.size}/3 ✦`);
  }
}
document.getElementById('gotItBtn').addEventListener('click', collectStar);
document.getElementById('closeModal').addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', event => {
  if (event.target === modal) modal.classList.add('hidden');
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') modal.classList.add('hidden');
});

document.getElementById('giftBtn').addEventListener('click', () => showScreen('gift'));
document.getElementById('openGift').addEventListener('click', event => {
  event.currentTarget.classList.toggle('opened');
  toast('Một món quà nhỏ, dành riêng cho em ♡');
  burst(22);
});
document.getElementById('openLetterBtn').addEventListener('click', () => showScreen('letter'));
document.getElementById('celebrateBtn').addEventListener('click', () => {
  burst(75);
  toast('Chúc mừng sinh nhật, Hồng Ngọc! 💗');
});

function toast(message) {
  const element = document.getElementById('toast');
  element.textContent = message;
  element.classList.remove('hidden');
  clearTimeout(toast.timeout);
  toast.timeout = setTimeout(() => element.classList.add('hidden'), 2400);
}

function burst(amount) {
  const symbols = ['✦', '✧', '♡', '✨', '·'];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDuration = `${2.5 + Math.random() * 3}s`;
    piece.style.animationDelay = `${Math.random() * .7}s`;
    piece.style.fontSize = `${12 + Math.random() * 18}px`;
    piece.style.color = ['#f9c9e7', '#c9bcff', '#ffe3a4', '#ffffff'][Math.floor(Math.random() * 4)];
    document.body.appendChild(piece);
    piece.addEventListener('animationend', () => piece.remove());
  }
}

// A gentle, ambient starfield for a little movement.
const starLayer = document.querySelector('.stars');
setInterval(() => {
  if (!starLayer || document.hidden) return;
  starLayer.style.opacity = Math.random() > .5 ? '.72' : '.48';
}, 1800);
const music = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

musicButton.addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      musicButton.textContent = "🎵 Tắt nhạc";
    } catch (error) {
      musicButton.textContent = "💗 Chạm để phát nhạc";
    }
  } else {
    music.pause();
    musicButton.textContent = "🎵 Bật nhạc sinh nhật";
  }
});