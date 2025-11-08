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
                role: '創辦人 & 安卓開發',
                category: ['leader', 'app-dev'],
                image: 'images/headshot/shen.jpg',
                description: '大學畢業後創立 EZQuiz 社群與 App，持續投入平台的維護與改進。',
                instagram: '',
                order: 1,
                featured: true
            },
            {
                name: '咕嚕',
                role: 'iOS 開發',
                category: 'app-dev',
                image: 'images/headshot/glue.jpg',
                description: '負責 iOS 開發與新功能構思，並主導實作與優化。目前就讀台科電機',
                instagram: '',
                order: 2,
                featured: true
            },
            {
                name: '青蛙',
                role: '讀書會主持 & 社群小編',
                category: ['community', 'host'],
                image: 'images/headshot/frog.jpg',
                description: '擔任 115 讀書會主持，並負責倒數與國文題目限動，以可愛風格呈現淺顯易懂的解析',
                instagram: '',
                order: 3,
                featured: true
            },
            {
                name: '松鼠',
                role: '網頁設計 & 前讀書會主持',
                category: ['design', 'host'],
                image: 'images/headshot/squirrel.jpg',
                description: '目前協助設計網頁UI，曾擔任 114 讀書會主持，幽默風趣又溫暖',
                instagram: 'monkeyeeeeeeeeeee',
                order: 4,
                featured: true
            },
            {
                name: '芋頭',
                role: '社群小編',
                category: 'community',
                image: 'images/headshot/taro.jpg',
                description: '負責統測倒數限動，以溫暖短句鼓舞人心',
                instagram: '',
                order: 5,
                featured: true
            },
            {
                name: '抹茶',
                role: '社群小編',
                category: ['community', 'design'],
                image: 'images/headshot/matcha.jpg',
                description: '負責倒數與問答限動，設計風格可愛又溫暖，擔任讀書會副主持',
                instagram: '',
                order: 6,
                featured: true
            },
            {
                name: '奶昔',
                role: '貼文企劃',
                category: 'community',
                image: 'images/headshot/milkshake.jpg',
                description: '協助發想貼文內容，涵蓋讀書心態與升學制度，就讀北科工設',
                instagram: '',
                order: 7,
                featured: true
            },
            {
                name: '虹魚',
                role: '社群小編',
                category: 'community',
                image: 'images/headshot/stingray.jpg',
                description: '自創立以來擔任小編至今，精心製作英文測驗並創立化工讀書帳',
                instagram: '114study',
                order: 8,
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

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', () => {
    loadAllTeamMembers();
    // 頁面載入後自動觸發篩選，顯示現任成員
    setTimeout(() => {
        filterTeam();
    }, 100);
});
