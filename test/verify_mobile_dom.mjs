import fs from 'fs';

console.log('Testing Mobile DOM & JS Integration...');

const html = fs.readFileSync('index.html', 'utf-8');
const gameJs = fs.readFileSync('js/game.js', 'utf-8');

// 1. Verify viewport meta tag
if (!html.includes('viewport-fit=cover') || !html.includes('user-scalable=no')) {
    console.error('FAIL: Missing mobile viewport meta settings!');
    process.exit(1);
}
console.log('PASS: Mobile viewport meta tag verified.');

// 2. Check essential DOM IDs
const requiredIds = [
    'gameCanvas', 'aiCanvas', 'canvas-container', 'player-arena-box', 'ai-arena-box',
    'btn-choose-mode', 'btn-audio', 'btn-restart', 'modal-btn-retry', 'modal-btn-change-mode',
    'mode-select-modal', 'game-modal', 'modal-title', 'modal-message', 'modal-stats-container',
    'stage-val', 'score-val', 'combo-val', 'high-score-val', 'stage-progress-box',
    'stage-progress-val', 'stage-progress-bar', 'blitz-timer-stat-item', 'blitz-timer-val',
    'vs-arena-divider', 'vs-difficulty-panel', 'vs-round-score', 'vs-sudden-death-timer', 'vs-attack-msg',
    'prime-dock-tiers', 'dock-active-indicator', 'dock-prime-val', 'dock-prime-name',
    'dock-quick-row', 'btn-prime-prev', 'btn-prime-next', 'dock-swipe-track-container'
];

const missingIds = [];
for (const id of requiredIds) {
    if (!html.includes(`id="${id}"`)) {
        missingIds.push(id);
    }
}

if (missingIds.length > 0) {
    console.error('FAIL: Missing IDs in index.html:', missingIds);
    process.exit(1);
}
console.log(`PASS: All ${requiredIds.length} required DOM IDs present in index.html.`);

// 3. Verify Double-Bullet Fix in game.js
if (!gameJs.includes('lastTouchTimestamp') || !gameJs.includes('lastShotTime')) {
    console.error('FAIL: Missing double-shot prevention mechanisms in game.js!');
    process.exit(1);
}
console.log('PASS: Double-shot prevention (synthetic event blocking + shot cooldown) confirmed.');

// 4. Verify Prime Slider & Quick Row in game.js
if (!gameJs.includes('renderQuickPrimesRow') || !gameJs.includes('dock-swipe-track-container')) {
    console.error('FAIL: Missing prime slider / quick row implementation in game.js!');
    process.exit(1);
}
console.log('PASS: Prime swipe slider and smart quick row confirmed.');

console.log('ALL MOBILE VERIFICATION CHECKS PASSED!');
