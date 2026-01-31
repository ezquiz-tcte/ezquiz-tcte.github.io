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
                "title": "EZQuiz APP",
                "description": "在手機上學習、隨時練習。支援 iOS / Android",
                "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600",
                "buttonText": "前往 APP 介紹",
                "buttonLink": "#app"
            },
            {
                "title": "Discord 每週共讀",
                "description": "相互陪伴、解題討論與輕鬆交流。",
                "image": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600",
                "buttonText": "加入 Discord",
                "buttonLink": "https://discord.com/invite/ag7NzXTNBA"
            },
            {
                "title": "IG 每日限動 & 精選貼文",
                "description": "分享學習、統測與 APP 相關內容",
                "image": "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=1600",
                "buttonText": "追蹤我們",
                "buttonLink": "https://www.instagram.com/ezquiz.tcte/"
            },
            {
                "title": "加入我們的團隊",
                "description": "若你想一起打造更好的學習平台，歡迎加入 EZQuiz 團隊！",
                "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600",
                "buttonText": "查看團隊",
                "buttonLink": "#team"
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
let currentTeamSlide = 0;
let allFeaturedMembers = [];

async function loadTeamData() {
    try {
        const response = await fetch('content/team.json');
        const data = await response.json();
        // 顯示所有 featured 成員
        allFeaturedMembers = data.team.filter(member => member.featured);
        displayTeamCarousel(allFeaturedMembers.length > 0 ? allFeaturedMembers : data.team.slice(0, 8));
    } catch (error) {
        console.error('Error loading team data:', error);
        // 使用預設團隊資料
        const defaultTeam = [
            {
                name: '可樂貓',
                role: '創辦人 & 安卓開發',
                image: 'images/headshot/shen.jpg',
                description: '大學畢業後創立 EZQuiz 社群與 App，持續投入平台的維護與改進。',
                featured: true
            },
            {
                name: '咕嚕',
                role: 'iOS 開發',
                image: 'images/headshot/glue.jpg',
                description: '負責 iOS 開發與新功能構思，並主導實作與優化。目前就讀台科電機',
                featured: true
            },
            {
                name: '青蛙',
                role: '讀書會主持 & 社群小編',
                image: 'images/headshot/frog.jpg',
                description: '擔任 115 讀書會主持，並負責倒數與國文題目限動，以可愛風格呈現淺顯易懂的解析',
                featured: true
            },
            {
                name: '松鼠',
                role: '網頁設計 & 前讀書會主持',
                image: 'images/headshot/squirrel.jpg',
                description: '目前協助設計網頁UI，曾擔任 114 讀書會主持，幽默風趣又溫暖',
                featured: true
            },
            {
                name: '芋頭',
                role: '社群小編',
                image: 'images/headshot/taro.jpg',
                description: '負責統測倒數限動，以溫暖短句鼓舞人心',
                featured: true
            },
            {
                name: '抹茶',
                role: '社群小編',
                image: 'images/headshot/matcha.jpg',
                description: '負責倒數與問答限動，設計風格可愛又溫暖，擔任讀書會副主持',
                featured: true
            },
            {
                name: '奶昔',
                role: '貼文企劃',
                image: 'images/headshot/milkshake.jpg',
                description: '協助發想貼文內容，涵蓋讀書心態與升學制度，就讀北科工設',
                featured: true
            },
            {
                name: '虹魚',
                role: '社群小編',
                image: 'images/headshot/stingray.jpg',
                description: '自創立以來擔任小編至今，精心製作英文測驗並創立化工讀書帳',
                featured: true
            }
        ];
        allFeaturedMembers = defaultTeam;
        displayTeamCarousel(defaultTeam);
    }
}

function displayTeamCarousel(teamMembers) {
    const teamCarousel = document.getElementById('teamCarousel');
    if (!teamCarousel) return;
    
    teamCarousel.innerHTML = '';
    
    teamMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'team-member-slide';
        const imageUrl = member.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&size=300&background=667eea&color=fff';
        memberDiv.innerHTML = `
            <img src="${imageUrl}" alt="${member.name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=300&background=667eea&color=fff'">
            <h3>${member.name}</h3>
            <div class="role">${member.role}</div>
            <p>${member.description}</p>
        `;
        teamCarousel.appendChild(memberDiv);
    });
    
    currentTeamSlide = 0;
    teamCarousel.style.transform = 'translateX(0px)';
    updateTeamCarousel();
}

function changeTeamSlide(direction) {
    const visibleSlides = getVisibleSlides();
    const maxSlide = Math.max(0, allFeaturedMembers.length - visibleSlides);
    
    currentTeamSlide += direction;
    if (currentTeamSlide > maxSlide) currentTeamSlide = maxSlide;
    if (currentTeamSlide < 0) currentTeamSlide = 0;
    
    updateTeamCarousel();
}

function getVisibleSlides() {
    const width = window.innerWidth;
    if (width >= 1200) return 4;
    if (width >= 768) return 3;
    if (width >= 480) return 2;
    return 1;
}

function updateTeamCarousel() {
    const teamCarousel = document.getElementById('teamCarousel');
    const prevBtn = document.getElementById('teamPrevBtn');
    const nextBtn = document.getElementById('teamNextBtn');
    
    if (!teamCarousel) return;

    const slides = teamCarousel.querySelectorAll('.team-member-slide');
    if (!slides.length) return;

    const visibleSlides = getVisibleSlides();
    const maxSlide = Math.max(0, slides.length - visibleSlides);
    if (currentTeamSlide > maxSlide) currentTeamSlide = maxSlide;
    if (currentTeamSlide < 0) currentTeamSlide = 0;

    // 視窗（可視區）通常是 track 的 parentElement
    const viewport = teamCarousel.parentElement || document.documentElement;
    const item = slides[currentTeamSlide];

    // 計算要移動的像素值 (item.offsetLeft 為 item 在 track 的左偏移)
    let offsetPx = item.offsetLeft;

    // 若僅顯示 1 個卡片時要將卡片置中，避免卡片被截邊
    if (visibleSlides === 1) {
        offsetPx -= (viewport.clientWidth - item.offsetWidth) / 2;
    }

    // 限制最大、最小位移，避免移動過頭導致空白或被截
    const maxOffset = Math.max(0, teamCarousel.scrollWidth - viewport.clientWidth);
    if (offsetPx < 0) offsetPx = 0;
    if (offsetPx > maxOffset) offsetPx = maxOffset;

    teamCarousel.style.transform = `translateX(${-Math.round(offsetPx)}px)`;

    // 更新按鈕狀態
    if (prevBtn) prevBtn.disabled = currentTeamSlide === 0;
    if (nextBtn) nextBtn.disabled = currentTeamSlide >= maxSlide;
}

// 監聽視窗大小變化
window.addEventListener('resize', () => {
    const visibleSlides = getVisibleSlides();
    const maxSlide = Math.max(0, allFeaturedMembers.length - visibleSlides);
    if (currentTeamSlide > maxSlide) {
        currentTeamSlide = maxSlide;
    }
    updateTeamCarousel();
});

function displayTeamPreview(teamMembers) {
    // 保留舊函數以防其他地方使用
    displayTeamCarousel(teamMembers);
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
                "title": "每週共讀活動",
                "date": "每週六",
                "time": "19:00 - 21:00",
                "location": "Discord 線上社群",
                "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600",
                "description": "主持人陪伴大家一起學習，溫暖互助的學習氛圍。隨時提出問題、解題討論，還可以小聊放鬆，讓學習不孤單"
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
                </div>
            </div>
        `;
        groupsGrid.appendChild(groupDiv);
    });
}

// 載入 APP 資料
async function loadAppData() {
    try {
        const response = await fetch('content/app.json');
        const data = await response.json();
        displayAppSection(data);
    } catch (error) {
        console.error('Error loading app data:', error);
        // 保持 HTML 中的預設內容
    }
}

function displayAppSection(appData) {
    // 更新 APP 圖片
    const appImage = document.getElementById('appImage');
    if (appImage && appData.image) {
        appImage.src = appData.image;
        appImage.alt = appData.title;
    }

    // 更新 APP 標題
    const appTitle = document.querySelector('.app-info h3');
    if (appTitle && appData.subtitle) {
        appTitle.textContent = appData.subtitle;
    }

    // 更新 APP 描述
    const appDescription = document.getElementById('appDescription');
    if (appDescription && appData.description) {
        appDescription.textContent = appData.description;
    }

    // 更新 APP 特色
    if (appData.features && appData.features.length > 0) {
        const featuresContainer = document.querySelector('.app-features');
        if (featuresContainer) {
            featuresContainer.innerHTML = '';
            appData.features.forEach(feature => {
                const featureDiv = document.createElement('div');
                featureDiv.className = 'app-feature-item';
                featureDiv.innerHTML = `
                    <i class="${feature.icon}"></i>
                    <span>${feature.text}</span>
                `;
                featuresContainer.appendChild(featureDiv);
            });
        }
    }

    // 更新下載按鈕連結
    if (appData.downloads) {
        const appStoreBtn = document.querySelector('.download-buttons a[href*="apps.apple.com"]');
        const googlePlayBtn = document.querySelector('.download-buttons a[href*="play.google.com"]');

        if (appStoreBtn && appData.downloads.appStore) {
            appStoreBtn.href = appData.downloads.appStore;
        }
        if (googlePlayBtn && appData.downloads.googlePlay) {
            googlePlayBtn.href = appData.downloads.googlePlay;
        }
    }
}

// 載入 Instagram 特色資料
async function loadInstagramFeatures() {
    try {
        const response = await fetch('content/instagram-features.json');
        const data = await response.json();
        displayInstagramFeatures(data);
    } catch (error) {
        console.error('Error loading Instagram features:', error);
        // 保持 HTML 中的預設內容
    }
}

function displayInstagramFeatures(igData) {
    // 更新標題
    const sectionTitle = document.querySelector('.instagram-section .section-title');
    if (sectionTitle && igData.title) {
        sectionTitle.innerHTML = `<i class="fab fa-instagram"></i> ${igData.title}`;
    }

    // 更新副標題
    const sectionSubtitle = document.querySelector('.instagram-section .section-subtitle');
    if (sectionSubtitle && igData.subtitle) {
        sectionSubtitle.textContent = igData.subtitle;
    }

    // 更新特色卡片
    if (igData.features && igData.features.length > 0) {
        const featuresContainer = document.querySelector('.instagram-features');
        if (featuresContainer) {
            featuresContainer.innerHTML = '';
            igData.features.forEach(feature => {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'instagram-feature-card';

                let itemsHtml = '';
                if (feature.items && feature.items.length > 0) {
                    itemsHtml = feature.items.map(item =>
                        `<li><i class="fas fa-check"></i> ${item}</li>`
                    ).join('');
                }

                cardDiv.innerHTML = `
                    <div class="instagram-icon">
                        <i class="${feature.icon}"></i>
                    </div>
                    <h3>${feature.title}</h3>
                    <ul>
                        ${itemsHtml}
                    </ul>
                `;
                featuresContainer.appendChild(cardDiv);
            });
        }
    }

    // 更新追蹤按鈕
    if (igData.link && igData.account) {
        const igButton = document.querySelector('.btn-instagram');
        if (igButton) {
            igButton.href = igData.link;
            igButton.innerHTML = `<i class="fab fa-instagram"></i> 追蹤 @${igData.account}`;
        }
    }
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
    loadAppData();
    loadInstagramFeatures();
});
