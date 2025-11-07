// 導航欄漢堡選單
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 點擊導航連結後關閉選單
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Slider 功能
let currentSlide = 0;
let slides = [];
let autoSlideInterval;

// 載入 slider 資料
async function loadSliderData() {
    try {
        const response = await fetch('content/slider.json');
        const data = await response.json();
        slides = data.slides;
        initializeSlider();
        startAutoSlide();
    } catch (error) {
        console.error('Error loading slider data:', error);
        // 使用預設 slides
        slides = [
            {
                image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600',
                title: '歡迎來到 EZQuiz 學習平台',
                description: '讓學習變得更簡單、更有趣、更有效',
                buttonText: '開始學習',
                buttonLink: '#features'
            },
            {
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600',
                title: '智能化學習體驗',
                description: 'AI 驅動的個性化學習路徑',
                buttonText: '了解更多',
                buttonLink: '#features'
            },
            {
                image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600',
                title: '與夥伴一起成長',
                description: '協作學習，共同進步',
                buttonText: '加入我們',
                buttonLink: '#team'
            }
        ];
        initializeSlider();
        startAutoSlide();
    }
}

function initializeSlider() {
    const sliderContainer = document.getElementById('heroSlider');
    const dotsContainer = document.getElementById('sliderDots');
    
    sliderContainer.innerHTML = '';
    dotsContainer.innerHTML = '';
    
    slides.forEach((slide, index) => {
        // 創建 slide
        const slideDiv = document.createElement('div');
        slideDiv.className = 'slide';
        slideDiv.style.backgroundImage = `url(${slide.image})`;
        slideDiv.innerHTML = `
            <div class="slide-content">
                <h2>${slide.title}</h2>
                <p>${slide.description}</p>
                <a href="${slide.buttonLink}" class="btn-primary">${slide.buttonText}</a>
            </div>
        `;
        sliderContainer.appendChild(slideDiv);
        
        // 創建 dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
}

function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    updateSlider();
    resetAutoSlide();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
    resetAutoSlide();
}

function updateSlider() {
    const slider = document.getElementById('heroSlider');
    const dots = document.querySelectorAll('.dot');
    
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// 載入團隊資料
async function loadTeamData() {
    try {
        const response = await fetch('content/team.json');
        const data = await response.json();
        displayTeam(data.team);
    } catch (error) {
        console.error('Error loading team data:', error);
        // 使用預設團隊資料
        const defaultTeam = [
            {
                name: '張小明',
                role: '創辦人 & CEO',
                image: 'https://i.pravatar.cc/300?img=12',
                description: '教育科技專家，致力於改善學習體驗'
            },
            {
                name: '李小華',
                role: '技術長 CTO',
                image: 'https://i.pravatar.cc/300?img=47',
                description: '全端工程師，熱愛開發創新的學習工具'
            },
            {
                name: '王小美',
                role: '設計總監',
                image: 'https://i.pravatar.cc/300?img=32',
                description: 'UX/UI 設計師，專注於打造直覺的使用體驗'
            },
            {
                name: '陳小強',
                role: '產品經理',
                image: 'https://i.pravatar.cc/300?img=60',
                description: '擁有豐富的教育產品開發經驗'
            }
        ];
        displayTeam(defaultTeam);
    }
}

function displayTeam(teamMembers) {
    const teamGrid = document.getElementById('teamGrid');
    teamGrid.innerHTML = '';
    
    teamMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'team-member';
        memberDiv.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <div class="role">${member.role}</div>
            <p>${member.description}</p>
        `;
        teamGrid.appendChild(memberDiv);
    });
}

// 表單提交
document.querySelector('.contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('感謝您的訊息！我們會盡快與您聯繫。');
    e.target.reset();
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
    loadSliderData();
    loadTeamData();
});
