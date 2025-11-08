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

// 載入團隊資料（首頁精選）
async function loadTeamData() {
    try {
        const response = await fetch('content/team.json');
        const data = await response.json();
        // 只顯示前 4 位標記為 featured 的成員
        const featuredMembers = data.team
            .filter(member => member.featured)
            .slice(0, 4);
        displayTeamPreview(featuredMembers.length > 0 ? featuredMembers : data.team.slice(0, 4));
    } catch (error) {
        console.error('Error loading team data:', error);
        // 使用預設團隊資料
        const defaultTeam = [
            {
                name: '張小明',
                role: '創辦人 & CEO',
                image: 'https://i.pravatar.cc/300?img=12',
                description: '教育科技專家，致力於改善學習體驗',
                featured: true
            },
            {
                name: '李小華',
                role: '技術長 CTO',
                image: 'https://i.pravatar.cc/300?img=47',
                description: '全端工程師，熱愛開發創新的學習工具',
                featured: true
            },
            {
                name: '王小美',
                role: '設計總監',
                image: 'https://i.pravatar.cc/300?img=32',
                description: 'UX/UI 設計師，專注於打造直覺的使用體驗',
                featured: true
            },
            {
                name: '陳小強',
                role: '產品經理',
                image: 'https://i.pravatar.cc/300?img=60',
                description: '擁有豐富的教育產品開發經驗',
                featured: true
            }
        ];
        displayTeamPreview(defaultTeam);
    }
}

function displayTeamPreview(teamMembers) {
    const teamGrid = document.getElementById('teamPreviewGrid');
    if (!teamGrid) return;
    
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
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('感謝您的訊息！我們會盡快與您聯繫。');
        e.target.reset();
    });
}

// 載入讀書會資料
async function loadStudyGroups() {
    try {
        const response = await fetch('content/study-groups.json');
        const data = await response.json();
        displayStudyGroups(data.groups.slice(0, 3)); // 只顯示前 3 個
    } catch (error) {
        console.error('Error loading study groups:', error);
        // 使用預設資料
        const defaultGroups = [
            {
                title: '程式設計讀書會',
                date: '2025-11-15',
                time: '19:00 - 21:00',
                location: '線上會議',
                participants: 15,
                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600',
                description: '一起學習 Python 程式設計，從基礎到進階'
            },
            {
                title: '英文學習小組',
                date: '2025-11-18',
                time: '18:30 - 20:30',
                location: '台北市大安區',
                participants: 8,
                image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600',
                description: '透過討論和對話練習，提升英文口說能力'
            },
            {
                title: '數學解題工作坊',
                date: '2025-11-20',
                time: '14:00 - 17:00',
                location: '線上會議',
                participants: 20,
                image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600',
                description: '針對高中數學難題進行深入討論與解析'
            }
        ];
        displayStudyGroups(defaultGroups);
    }
}

function displayStudyGroups(groups) {
    const groupsGrid = document.getElementById('studyGroupGrid');
    if (!groupsGrid) return;
    
    groupsGrid.innerHTML = '';
    
    groups.forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'study-group-card';
        groupDiv.innerHTML = `
            <img src="${group.image}" alt="${group.title}" class="study-group-image">
            <div class="study-group-content">
                <h3 class="study-group-title">${group.title}</h3>
                <div class="study-group-date">
                    <i class="fas fa-calendar"></i>
                    ${group.date} ${group.time}
                </div>
                <p class="study-group-description">${group.description}</p>
                <div class="study-group-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${group.location}</span>
                    <span><i class="fas fa-users"></i> ${group.participants} 人</span>
                </div>
            </div>
        `;
        groupsGrid.appendChild(groupDiv);
    });
}

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
    loadStudyGroups();
});
