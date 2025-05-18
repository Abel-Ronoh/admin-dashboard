// Mock data for users
const users = [
    {
        id: 1,
        name: "Alex Johnson",
        email: "alex@example.com",
        role: "Admin",
        status: "active",
        lastActive: "Just now",
        avatar: "AJ"
    },
    {
        id: 2,
        name: "Sarah Williams",
        email: "sarah@example.com",
        role: "Editor",
        status: "active",
        lastActive: "5 minutes ago",
        avatar: "SW"
    },
    {
        id: 3,
        name: "Michael Brown",
        email: "michael@example.com",
        role: "User",
        status: "inactive",
        lastActive: "3 days ago",
        avatar: "MB"
    },
    {
        id: 4,
        name: "Emily Davis",
        email: "emily@example.com",
        role: "User",
        status: "active",
        lastActive: "1 hour ago",
        avatar: "ED"
    },
    {
        id: 5,
        name: "David Wilson",
        email: "david@example.com",
        role: "Editor",
        status: "inactive",
        lastActive: "1 week ago",
        avatar: "DW"
    },
    {
        id: 6,
        name: "Jessica Taylor",
        email: "jessica@example.com",
        role: "User",
        status: "active",
        lastActive: "30 minutes ago",
        avatar: "JT"
    }
];

// DOM Elements
const sidebar = document.getElementById('sidebar');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const closeSidebarBtn = document.getElementById('close-sidebar');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const allUsersTable = document.getElementById('all-users-table');
const activeUsersTable = document.getElementById('active-users-table');
const userSearch = document.getElementById('user-search');
const headerSearch = document.getElementById('header-search');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownIcon = document.querySelector('.dropdown-icon');
const sidebarLinks = document.querySelectorAll('.dropdown-menu a');


function initDashboard() {
    renderUsers();
    setupEventListeners();
}

function renderUsers(searchTerm = '') {
    renderAllUsers(searchTerm);
    renderActiveUsers(searchTerm);
}

function renderAllUsers(searchTerm = '') {
    allUsersTable.innerHTML = '';
    
    const filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredUsers.length === 0) {
        allUsersTable.innerHTML = `
            <tr>
                <td colspan="4" class="empty-state">
                    No users found matching your search.
                </td>
            </tr>
        `;
        return;
    }
    
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="user-cell">
                    <div class="user-avatar">${user.avatar}</div>
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
                        <div class="user-email">${user.email}</div>
                    </div>
                </div>
            </td>
            <td>${user.role}</td>
            <td>
                <span class="status-badge ${user.status === 'active' ? 'status-active' : 'status-inactive'}">
                    ${user.status === 'active' ? 'Active' : 'Inactive'}
                </span>
            </td>
            <td class="hide-mobile">${user.lastActive}</td>
        `;
        allUsersTable.appendChild(row);
    });
}

// Render active users table
function renderActiveUsers(searchTerm = '') {
    activeUsersTable.innerHTML = '';
    
    const filteredUsers = users.filter(user => 
        user.status === 'active' && 
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    if (filteredUsers.length === 0) {
        activeUsersTable.innerHTML = `
            <tr>
                <td colspan="3" class="empty-state">
                    No active users found matching your search.
                </td>
            </tr>
        `;
        return;
    }
    
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="user-cell">
                    <div class="user-avatar">${user.avatar}</div>
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
                        <div class="user-email">${user.email}</div>
                    </div>
                </div>
            </td>
            <td>${user.role}</td>
            <td class="hide-mobile">${user.lastActive}</td>
        `;
        activeUsersTable.appendChild(row);
    });
}


function setupEventListeners() {
    // Toggle sidebar on mobile
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
    });
    
    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
    
    // Tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Search functionality
    userSearch.addEventListener('input', (e) => {
        renderUsers(e.target.value);
    });
    
    headerSearch.addEventListener('input', (e) => {
        renderUsers(e.target.value);
        userSearch.value = e.target.value;
    });
    
    // Dropdown toggle in sidebar
    dropdownToggle.addEventListener('click', (e) => {
        e.preventDefault();
        dropdownMenu.classList.toggle('open');
        dropdownIcon.style.transform = dropdownMenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0)';
    });
    
    // Sidebar menu links for tabs
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = link.getAttribute('data-tab');
            
            // Find and click the corresponding tab button
            tabButtons.forEach(btn => {
                if (btn.getAttribute('data-tab') === tabId) {
                    btn.click();
                }
            });
            
            // Close sidebar on mobile
            if (window.innerWidth < 768) {
                sidebar.classList.remove('open');
            }
        });
    });
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 768 && 
            sidebar.classList.contains('open') && 
            !sidebar.contains(e.target) && 
            e.target !== toggleSidebarBtn) {
            sidebar.classList.remove('open');
        }
    });
}

// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);