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
                name: '張小明',
                role: '創辦人 & CEO',
                category: 'leader',
                image: 'https://i.pravatar.cc/300?img=12',
                description: '教育科技專家，致力於改善學習體驗',
                email: 'ming.chang@ezquiz.com'
            },
            {
                name: '李小華',
                role: '技術長 CTO',
                category: 'leader',
                image: 'https://i.pravatar.cc/300?img=47',
                description: '全端工程師，熱愛開發創新的學習工具',
                email: 'hua.li@ezquiz.com'
            },
            {
                name: '王小美',
                role: '設計總監',
                category: 'design',
                image: 'https://i.pravatar.cc/300?img=32',
                description: 'UX/UI 設計師，專注於打造直覺的使用體驗',
                email: 'mei.wang@ezquiz.com'
            },
            {
                name: '陳小強',
                role: '產品經理',
                category: 'leader',
                image: 'https://i.pravatar.cc/300?img=60',
                description: '擁有豐富的教育產品開發經驗',
                email: 'qiang.chen@ezquiz.com'
            },
            {
                name: '林志明',
                role: '前端工程師',
                category: 'developer',
                image: 'https://i.pravatar.cc/300?img=13',
                description: '專精於 React 和 Vue.js 開發'
            },
            {
                name: '黃雅芳',
                role: '後端工程師',
                category: 'developer',
                image: 'https://i.pravatar.cc/300?img=44',
                description: '擅長 Node.js 和資料庫設計'
            },
            {
                name: '劉建國',
                role: 'UI 設計師',
                category: 'design',
                image: 'https://i.pravatar.cc/300?img=15',
                description: '創造美觀且實用的使用者介面'
            },
            {
                name: '周美玲',
                role: '內容編輯',
                category: 'content',
                image: 'https://i.pravatar.cc/300?img=48',
                description: '負責教材編寫與課程規劃'
            },
            {
                name: '吳俊傑',
                role: '行銷經理',
                category: 'marketing',
                image: 'https://i.pravatar.cc/300?img=33',
                description: '擴大平台影響力與用戶成長'
            },
            {
                name: '鄭雅婷',
                role: '客戶服務',
                category: 'marketing',
                image: 'https://i.pravatar.cc/300?img=25',
                description: '提供優質的用戶支援服務'
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
        memberDiv.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <div class="role">${member.role}</div>
            <p>${member.description}</p>
            ${member.email ? `<a href="mailto:${member.email}" style="color: var(--primary-color); text-decoration: none; font-size: 0.9rem;"><i class="fas fa-envelope"></i> 聯絡</a>` : ''}
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
    const selectedRole = roleFilter ? roleFilter.value : 'all';
    
    let filteredMembers = allTeamMembers;
    
    // 依角色篩選
    if (selectedRole !== 'all') {
        filteredMembers = filteredMembers.filter(member => 
            member.category === selectedRole
        );
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
});
