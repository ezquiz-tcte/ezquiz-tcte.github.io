// 導航欄漢堡選單
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 點擊導航連結後關閉選單
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

let allTeamMembers = [];

// 載入所有團隊成員
async function loadAllTeamMembers() {
    try {
        const response = await fetch('content/team.json');
        const data = await response.json();
        allTeamMembers = data.team;
        displayAllTeam(allTeamMembers);
    } catch (error) {
        console.error('Error loading team data:', error);
        // 使用預設團隊資料
        allTeamMembers = [
            {
                name: '可樂貓',
                role: '創辦人 & App 開發',
                category: ['leader', 'app-dev'],
                image: 'images/headshot/shen.jpg',
                description: '大學畢業後創立 EZQuiz 社群與 App，持續投入平台的維護與改進。',
                instagram: '',
                order: 1,
                featured: true
            },
            {
                name: '青蛙',
                role: '社群小編',
                category: 'community',
                image: 'images/headshot/frog.jpg',
                description: '負責測驗限動，以可愛風格呈現易懂的解析',
                instagram: '',
                order: 2,
                featured: true
            },
            {
                name: '魟魚',
                role: '社群小編',
                category: 'community',
                image: 'images/headshot/stingray.jpg',
                description: '自創立以來擔任小編至今，精心製作英文測驗並創立化工讀書帳',
                instagram: '114study',
                order: 3,
                featured: true
            }
        ];
        displayAllTeam(allTeamMembers);
    }
}

function displayAllTeam(teamMembers) {
    const teamGrid = document.getElementById('allTeamGrid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = '';
    
    if (teamMembers.length === 0) {
        teamGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #999;">沒有找到符合條件的團隊成員</p>';
        return;
    }
    
    teamMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'team-member';
        const imageUrl = member.image || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&size=300&background=667eea&color=fff';
        memberDiv.innerHTML = `
            <img src="${imageUrl}" alt="${member.name}" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=300&background=667eea&color=fff'">
            <h3>${member.name}</h3>
            <div class="role">${member.role}</div>
            <p>${member.description}</p>
            ${member.instagram ? `<a href="https://instagram.com/${member.instagram}" target="_blank" style="color: var(--primary-color); text-decoration: none; font-size: 0.9rem;"><i class="fab fa-instagram"></i> @${member.instagram}</a>` : ''}
        `;
        teamGrid.appendChild(memberDiv);
    });
}

// 搜尋功能
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        filterTeam();
    });
}

// 篩選功能
const roleFilter = document.getElementById('roleFilter');
if (roleFilter) {
    roleFilter.addEventListener('change', (e) => {
        filterTeam();
    });
}

function filterTeam() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedRole = roleFilter ? roleFilter.value : 'current';
    
    let filteredMembers = allTeamMembers;
    
    // 依角色篩選
    if (selectedRole === 'current') {
        // 現任成員：排除 alumni
        filteredMembers = filteredMembers.filter(member => {
            const categories = Array.isArray(member.category) ? member.category : [member.category];
            return !categories.includes('alumni');
        });
    } else if (selectedRole !== 'all') {
        // 其他類別：支援多個 category
        filteredMembers = filteredMembers.filter(member => {
            const categories = Array.isArray(member.category) ? member.category : [member.category];
            return categories.includes(selectedRole);
        });
    }
    
    // 依搜尋關鍵字篩選
    if (searchTerm) {
        filteredMembers = filteredMembers.filter(member =>
            member.name.toLowerCase().includes(searchTerm) ||
            member.role.toLowerCase().includes(searchTerm) ||
            member.description.toLowerCase().includes(searchTerm)
        );
    }
    
    displayAllTeam(filteredMembers);
}

// 載入網站資訊（全域設定）
async function loadSiteInfo() {
    try {
        const response = await fetch('content/settings/site-info.json');
        const data = await response.json();
        updateSiteInfo(data);
    } catch (error) {
        console.error('Error loading site info:', error);
        // 保持 HTML 中的預設內容
    }
}

function updateSiteInfo(siteInfo) {
    // 更新頁面標題
    if (siteInfo.siteName) {
        document.title = `團隊成員 - ${siteInfo.siteName}`;
    }

    // 更新 meta 描述
    if (siteInfo.description) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', siteInfo.description);
        }
    }

    // 更新 meta 關鍵字
    if (siteInfo.keywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', siteInfo.keywords);
        }
    }

    // 更新導航欄網站名稱
    const siteName = document.getElementById('siteName');
    if (siteName && siteInfo.siteName) {
        siteName.textContent = siteInfo.siteName.replace(' 學習平台', '');
    }

    // 更新 Footer 網站名稱
    const footerSiteName = document.getElementById('footerSiteName');
    if (footerSiteName && siteInfo.siteName) {
        footerSiteName.textContent = siteInfo.siteName.replace(' 學習平台', '');
    }

    // 更新 Footer 標語
    const footerTagline = document.getElementById('footerTagline');
    if (footerTagline && siteInfo.tagline) {
        footerTagline.textContent = siteInfo.tagline;
    }

    // 更新版權文字
    const copyrightText = document.getElementById('copyrightText');
    if (copyrightText && siteInfo.copyrightYear && siteInfo.siteName) {
        copyrightText.innerHTML = `&copy; ${siteInfo.copyrightYear} ${siteInfo.siteName.replace(' 學習平台', '')}. All rights reserved.`;
    }

    // 更新社交媒體連結
    if (siteInfo.social) {
        const socialLinks = document.getElementById('footerSocialLinks');
        if (socialLinks) {
            let linksHTML = '';
            if (siteInfo.social.instagram) {
                linksHTML += `<a href="${siteInfo.social.instagram}" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>`;
            }
            if (siteInfo.social.facebook) {
                linksHTML += `<a href="${siteInfo.social.facebook}" target="_blank" title="Facebook"><i class="fab fa-facebook"></i></a>`;
            }
            if (siteInfo.social.twitter) {
                linksHTML += `<a href="${siteInfo.social.twitter}" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>`;
            }
            if (linksHTML) {
                socialLinks.innerHTML = linksHTML;
            }
        }
    }
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
    loadAllTeamMembers();
    loadSiteInfo();
    // 頁面載入後自動觸發篩選，顯示現任成員
    setTimeout(() => {
        filterTeam();
    }, 100);
});
