// 導航欄漢堡選單
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function setMenu(open) {
    navMenu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
}

hamburger.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('active'));
});

// 點擊導航連結後關閉選單
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

// App Store 連結尚未設定時，點擊按鈕不跳轉
document.addEventListener('click', e => {
    if (e.target.closest('.store-btn.is-pending')) e.preventDefault();
});

async function fetchJson(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`${path}: ${response.status}`);
    return response.json();
}

// 載入 APP 資料
async function loadAppData() {
    try {
        displayAppSection(await fetchJson('content/app.json'));
    } catch (error) {
        console.error('Error loading app data:', error);
        // 保持 HTML 中的預設內容
    }
}

function displayAppSection(appData) {
    const appTitle = document.getElementById('appTitle');
    if (appTitle && appData.subtitle) appTitle.textContent = appData.subtitle;

    const appDescription = document.getElementById('appDescription');
    if (appDescription && appData.description) appDescription.textContent = appData.description;

    const steps = document.getElementById('tourSteps');
    if (steps && appData.features && appData.features.length > 0) {
        steps.innerHTML = appData.features.map(feature => `
            <li class="tour-step">
                <h3>${feature.title}</h3>
                <p>${feature.text}</p>
                <figure class="tour-shot"><img src="${feature.image}" alt="${feature.alt || feature.title}" width="330" height="717" loading="lazy"></figure>
            </li>
        `).join('');
    }

    if (appData.downloads) {
        document.querySelectorAll('[data-store]').forEach(btn => {
            const url = appData.downloads[btn.dataset.store];
            if (!url) return;
            btn.href = url;
            btn.target = '_blank';
            btn.rel = 'noopener';
            btn.classList.remove('is-pending');
            btn.removeAttribute('aria-disabled');
            btn.removeAttribute('title');
            const label = btn.querySelector('small');
            if (label) label.textContent = btn.dataset.store === 'appStore' ? 'Download on the' : 'Get it on';
        });
    }
}

// 載入 Discord 共讀室資料
async function loadStudyGroups() {
    try {
        const data = await fetchJson('content/study-groups.json');
        const group = data.groups && data.groups[0];
        if (!group) return;
        if (group.title) document.getElementById('studyGroupTitle').textContent = group.title;
        if (group.description) document.getElementById('studyGroupDescription').textContent = group.description;
        if (group.link) document.getElementById('discordLink').href = group.link;
    } catch (error) {
        console.error('Error loading study groups:', error);
    }
}

// 載入 Instagram 資料
async function loadInstagram() {
    try {
        const data = await fetchJson('content/instagram-features.json');
        if (data.title) document.getElementById('igTitle').textContent = data.title;
        if (data.description) document.getElementById('igDescription').textContent = data.description;
        const igLink = document.getElementById('igLink');
        if (data.link) igLink.href = data.link;
        if (data.account) igLink.innerHTML = `追蹤 @${data.account} <i class="fas fa-arrow-right"></i>`;
    } catch (error) {
        console.error('Error loading Instagram data:', error);
    }
}

// 載入網站資訊（全域設定）
async function loadSiteInfo() {
    try {
        updateSiteInfo(await fetchJson('content/settings/site-info.json'));
    } catch (error) {
        console.error('Error loading site info:', error);
    }
}

function updateSiteInfo(siteInfo) {
    const shortName = siteInfo.siteName ? siteInfo.siteName.replace(' 學習平台', '') : '';

    if (siteInfo.siteName && siteInfo.tagline) {
        document.title = `${siteInfo.siteName} - ${siteInfo.tagline}`;
    }
    if (siteInfo.description) {
        document.querySelector('meta[name="description"]')?.setAttribute('content', siteInfo.description);
    }
    if (siteInfo.keywords) {
        document.querySelector('meta[name="keywords"]')?.setAttribute('content', siteInfo.keywords);
    }
    if (shortName) {
        document.getElementById('siteName').textContent = shortName;
        document.getElementById('footerSiteName').textContent = shortName;
    }
    if (siteInfo.tagline) {
        document.getElementById('footerTagline').textContent = siteInfo.tagline;
    }
    if (siteInfo.copyrightYear && shortName) {
        document.getElementById('copyrightText').innerHTML = `&copy; ${siteInfo.copyrightYear} ${shortName}. All rights reserved.`;
    }
    if (siteInfo.social) {
        const icons = { instagram: 'fab fa-instagram', discord: 'fab fa-discord', facebook: 'fab fa-facebook', twitter: 'fab fa-twitter' };
        const labels = { instagram: 'Instagram', discord: 'Discord', facebook: 'Facebook', twitter: 'Twitter' };
        const linksHTML = Object.keys(icons)
            .filter(key => siteInfo.social[key])
            .map(key => `<a href="${siteInfo.social[key]}" target="_blank" rel="noopener" aria-label="${labels[key]}"><i class="${icons[key]}"></i></a>`)
            .join('');
        if (linksHTML) document.getElementById('footerSocialLinks').innerHTML = linksHTML;
    }
}

// 動畫：GSAP 載入失敗時頁面照常顯示，只是沒有動畫
function initMotion() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const navbar = document.querySelector('.navbar');
    ScrollTrigger.create({
        start: 8,
        onToggle: self => navbar.classList.toggle('is-scrolled', self.isActive)
    });

    const mm = gsap.matchMedia();

    mm.add({
        desktop: '(min-width: 961px)',
        motion: '(prefers-reduced-motion: no-preference)'
    }, context => {
        const { desktop, motion } = context.conditions;
        if (!motion) return;

        // 首頁進場：文字依序出現，接著兩支手機升起
        gsap.timeline({ defaults: { ease: 'power3.out' } })
            .from('[data-hero]', { y: 28, opacity: 0, duration: 0.8, stagger: 0.09 })
            .from('.phone--front', { yPercent: 18, opacity: 0, duration: 1.1 }, 0.25)
            .from('.phone--back', { yPercent: 24, rotation: 0, opacity: 0, duration: 1.2 }, 0.4);

        // 捲離首頁時兩支手機以不同速度上移，做出前後層次
        // 進場用 yPercent、視差用 y，兩段動畫才不會互相覆蓋
        gsap.timeline({ scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })
            .to('.phone--front', { y: -60, ease: 'none' }, 0)
            .to('.phone--back', { y: -140, ease: 'none' }, 0);

        // 區塊進入畫面時淡入
        gsap.set('[data-reveal]', { y: 32, opacity: 0 });
        ScrollTrigger.batch('[data-reveal]', {
            start: 'top 85%',
            once: true,
            onEnter: batch => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' })
        });

        if (desktop) {
            return setupPinnedTour();
        }

        gsap.utils.toArray('.tour-step').forEach(step => {
            gsap.from(step, {
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: step, start: 'top 85%', once: true }
            });
        });
    });
}

// App 功能介紹：區塊釘住，捲動距離推動截圖一張張往上蓋
function setupPinnedTour() {
    const tour = document.querySelector('.tour');
    const body = tour.querySelector('.tour-body');
    const steps = gsap.utils.toArray('.tour-step', tour);
    const screensWrap = document.getElementById('tourScreens');
    if (steps.length < 2) return;

    tour.classList.add('is-pinned');
    screensWrap.innerHTML = '';
    const screens = steps.map(step => {
        const img = document.createElement('img');
        img.src = step.querySelector('img').src;
        img.alt = '';
        screensWrap.appendChild(img);
        return img;
    });

    const last = steps.length - 1;
    const setActive = index => steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
    setActive(0);
    gsap.set(screens.slice(1), { yPercent: 100 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: body,
            start: 'center center',
            end: () => `+=${window.innerHeight * 0.8 * last}`,
            pin: true,
            scrub: 0.6,
            snap: { snapTo: 1 / last, inertia: false, duration: { min: 0.2, max: 0.5 }, ease: 'power1.inOut' },
            invalidateOnRefresh: true,
            onUpdate: self => setActive(Math.round(self.progress * last))
        }
    });

    for (let i = 1; i <= last; i++) {
        tl.to(screens[i], { yPercent: 0, ease: 'none', duration: 1 }, i - 1)
          .to(screens[i - 1], { scale: 0.9, opacity: 0.3, ease: 'none', duration: 1 }, i - 1);
    }

    // 視窗縮小到手機寬度時還原成一般排版
    return () => {
        tour.classList.remove('is-pinned');
        steps.forEach(step => step.classList.remove('is-active'));
        screensWrap.innerHTML = '';
    };
}

// 頁面載入時初始化；功能介紹要等資料載入完成才能計算釘住範圍
document.addEventListener('DOMContentLoaded', async () => {
    loadStudyGroups();
    loadInstagram();
    loadSiteInfo();
    await loadAppData();
    initMotion();
});
