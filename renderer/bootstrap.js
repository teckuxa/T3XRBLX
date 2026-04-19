// Fake playing counts for studio card
const studioCount = Math.floor(Math.random() * 500) + 50;
document.getElementById('studioPlaying').textContent = studioCount + ' Playing';

// Fake recommended games
const fakeGames = [
  { name: 'Sword Fight on the Heights', playing: 1243, rating: 88 },
  { name: 'Crossroads', playing: 876, rating: 91 },
  { name: 'Pizza Place', playing: 2341, rating: 94 },
  { name: 'Natural Disaster Survival', playing: 3102, rating: 92 },
  { name: 'Work at a Pizza Place', playing: 1876, rating: 89 },
  { name: 'Roblox Plague', playing: 432, rating: 78 },
];

const row = document.getElementById('recommendedRow');
fakeGames.forEach(game => {
  const card = document.createElement('div');
  card.className = 'game-card game-card-fake';
  card.innerHTML = `
    <div class="game-card-thumb game-card-thumb-placeholder">
      <span class="thumb-placeholder-text">${game.name.charAt(0)}</span>
    </div>
    <div class="game-card-title">${game.name}</div>
    <div class="game-card-meta">
      <span class="game-playing">${game.playing.toLocaleString()} Playing</span>
      <span class="game-rating">👍 ${game.rating}%</span>
    </div>
  `;
  row.appendChild(card);
});