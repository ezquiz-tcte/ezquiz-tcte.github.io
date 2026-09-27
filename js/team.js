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

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => setMenu(false));
});

// 歷屆成員依參與過的工作分組，成員歸入 category 裡第一個非 alumni 的類別
const ALUMNI_GROUPS = [
    { key: 'app-dev', title: 'App 開發' },
    { key: 'host', title: '讀書會主持' },
    { key: 'design', title: '設計' },
    { key: 'community', title: '社群小編' }
];

function categoriesOf(member) {
    return Array.isArray(member.category) ? member.category : [member.category];
}

function instagramLink(member) {
    return member.instagram
        ? `<a class="team-ig" href="https://instagram.com/${member.instagram}" target="_blank" rel="noopener"><i class="fab fa-instagram"></i> @${member.instagram}</a>`
        : '';
}

function displayCurrentTeam(members) {
    const grid = document.getElementById('currentTeam');
    grid.innerHTML = members.map(member => `
        <article class="team-card">
            <h3>${member.name}</h3>
            <div class="team-role">${member.role}</div>
            <p>${member.description}</p>
            ${instagramLink(member)}
        </article>
    `).join('');
}

function displayAlumni(members) {
    const container = document.getElementById('alumniGroups');
    container.innerHTML = ALUMNI_GROUPS.map(group => {
        const inGroup = members.filter(member => {
            const primary = categoriesOf(member).find(c => c !== 'alumni');
            return primary === group.key;
        });
        if (inGroup.length === 0) return '';
        return `
            <div class="alumni-group">
                <h3>${group.title}</h3>
                <ul class="alumni-list">
                    ${inGroup.map(member => `
                        <li class="alumni-item">
                            <strong>${member.name}</strong><span class="team-role">${member.role}</span>
                            <p>${member.description}</p>
                            ${instagramLink(member)}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }).join('');
}

async function loadTeam() {
    try {
        const response = await fetch('content/team.json');
        const data = await response.json();
        const team = [...data.team].sort((a, b) => (a.order || 0) - (b.order || 0));
        const isAlumni = member => categoriesOf(member).includes('alumni');
        displayCurrentTeam(team.filter(member => !isAlumni(member)));
        displayAlumni(team.filter(isAlumni));
    } catch (error) {
        console.error('Error loading team data:', error);
        document.getElementById('currentTeam').innerHTML = '<p>成員資料載入失敗，請重新整理頁面。</p>';
    }
}

// 載入網站資訊（全域設定）
async function loadSiteInfo() {
    try {
        const response = await fetch('content/settings/site-info.json');
        const siteInfo = await response.json();
        const shortName = siteInfo.siteName ? siteInfo.siteName.replace(' 學習平台', '') : '';

        if (siteInfo.siteName) document.title = `團隊成員 - ${siteInfo.siteName}`;
        if (siteInfo.description) {
            document.querySelector('meta[name="description"]')?.setAttribute('content', siteInfo.description);
        }
        if (shortName) {
            document.getElementById('siteName').textContent = shortName;
            document.getElementById('footerSiteName').textContent = shortName;
        }
        if (siteInfo.tagline) document.getElementById('footerTagline').textContent = siteInfo.tagline;
        if (siteInfo.copyrightYear && shortName) {
            document.getElementById('copyrightText').innerHTML = `&copy; ${siteInfo.copyrightYear} ${shortName}. All rights reserved.`;
        }
    } catch (error) {
        console.error('Error loading site info:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTeam();
    loadSiteInfo();
});
