// 初始化系統時間
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = 
        String(now.getHours()).padStart(2, '0') + ":" + 
        String(now.getMinutes()).padStart(2, '0');
}
setInterval(updateClock, 1000);
updateClock();

// 路由邏輯
function navTo(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('screen-' + screenId).classList.add('active');
    
    // 更新標題
    const titles = {
        'login': '系統登入',
        'public-main': '民眾防護端',
        'public-symptoms': '醫療求助回報',
        'medical': '醫療指揮系統',
        'command': '國家戰情監測'
    };
    if(titles[screenId]) document.getElementById('headerTitle').innerText = titles[screenId];
}

function login(role) {
    document.getElementById('backBtn').style.display = 'block';
    navTo(role);
}

function logout() {
    document.getElementById('backBtn').style.display = 'none';
    navTo('login');
}

// 民眾端：倒數計時
let timeLeft = 6 * 3600;
function updateTimer() {
    const h = Math.floor(timeLeft / 3600);
    const m = Math.floor((timeLeft % 3600) / 60);
    const s = timeLeft % 60;
    document.getElementById('countdown').innerText = 
        `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if(timeLeft > 0) timeLeft--;
}
setInterval(updateTimer, 1000);

function resetTimer(msg) {
    timeLeft = 6 * 3600;
    showToast(msg);
}

// 症狀送出
function submitSymptoms() {
    navTo('public-loading');
    setTimeout(() => {
        navTo('public-result');
    }, 2500);
}

// 醫療端模擬
function simulateDispatch() {
    const btn = event.target;
    btn.disabled = true;
    btn.innerText = "⚡ 派遣中...";
    
    setTimeout(() => {
        document.getElementById('med-tasks').innerText = "1";
        document.getElementById('med-ambs').innerText = "4";
        document.getElementById('med-target').style.opacity = "0";
        showToast("救護車已出動，預計抵達時間 12 分鐘");
        
        setTimeout(() => {
            btn.disabled = false;
            btn.innerText = "🚑 派遣最近支援";
        }, 1000);
    }, 1500);
}

// 通用提示
function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.style.opacity = '1';
    setTimeout(() => t.style.opacity = '0', 3000);
}
