document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. INITIALIZE DATA IN LOCALSTORAGE
    // ==========================================
    const defaultMembers = [
        { id: 1001, name: "Khumbelo Mbedzi", status: "Active", phone: "0649729516", email: "nduvheni.mbedzi@gmail.com", birthday: "2000-06-23", anniversary: "2024-06-20" },
        { id: 1002, name: "Thendo Muvhango", status: "Active", phone: "0790379514", email: "Tmuvhango191@gmail.com", birthday: "1995-07-02", anniversary: "" },
        { id: 1003, name: "Mulalo Nethengwe", status: "Visitor", phone: "0783461294", email: "NetM2000@gmail.com", birthday: "1998-06-28", anniversary: "" }
    ];

    const defaultDonations = [
        { id: 1, name: "Khumbelo Mbedzi", category: "Tithe", date: "2026-06-07", amount: 150 },
        { id: 2, name: "Thendo Muvhango", category: "Missions", date: "2026-06-07", amount: 50 },
        { id: 3, name: "Khumbelo Mbedzi", category: "Building", date: "2026-06-07", amount: 200 }
    ];

    const defaultAttendance = {
        "2026-06-07": {
            1001: true,
            1002: true,
            1003: false
        }
    };

    const defaultEvents = [
        { id: 1, date: "2026-06-18", title: "Community Family BBQ", category: "community", time: "Saturday, 12:00 PM - 3:00 PM", location: "East Lawn Sanctuary" },
        { id: 2, date: "2026-06-25", title: "Night of Prayer & Worship", category: "worship", time: "Thursday, 7:00 PM - 8:30 PM", location: "Main Sanctuary" },
        { id: 3, date: "2026-07-02", title: "Youth Summer Camp Rally", category: "youth", time: "Friday, 6:30 PM - 9:00 PM", location: "The Youth Room" }
    ];

    const defaultHouseholds = [
        { id: 1, name: "Mbedzi Household", headId: 1001, members: [1001], relations: { 1001: "Head" } },
        { id: 2, name: "Muvhango Household", headId: 1002, members: [1002], relations: { 1002: "Head" } }
    ];

    const defaultCareTeam = {
        coordinators: [1001],
        pastors: [1002],
        leaders: [],
        volunteers: [1003],
        responders: []
    };

    const defaultPastoralIntakes = [
        {
            id: 1,
            name: "Thendo Muvhango",
            email: "Tmuvhango191@gmail.com",
            category: "Prayer Request",
            requestText: "Please pray for my mother's surgery next Tuesday, we are anxious.",
            emergencyLevel: "High",
            aiDraft: "Dear Thendo, we stand in agreement with you and your family for your mother's surgery next Tuesday. The Scripture in Isaiah 41:10 comforts us: 'Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, yes, I will help you.' Our intercessory prayer network is praying for guidance for the surgical team and complete healing for her. Grace and peace, Pastor Lufuno and the Care Team.",
            status: "Pending Approval",
            submittedAt: "2026-06-19T10:00:00Z"
        },
        {
            id: 2,
            name: "Mulalo Nethengwe",
            email: "NetM2000@gmail.com",
            category: "Bereavement/Grief Support",
            requestText: "I recently lost my uncle and we are hosting a memorial service this Friday.",
            emergencyLevel: "Medium",
            aiDraft: "Dear Mulalo, we are deeply saddened to hear about the loss of your uncle. We pray that the God of all comfort wraps His arms around you and your family during this time. As Psalm 34:18 reminds us, 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' We are scheduling the care team to reach out with practical support and visit you. Grace and peace, Pastor Lufuno and the Care Team.",
            status: "Pending Approval",
            submittedAt: "2026-06-19T11:15:00Z"
        }
    ];

    const defaultFollowups = [];

    const defaultPublicPrayers = [
        { id: 1, name: "Mulalo Nethengwe", text: "Please pray for complete healing and peace for my family during this bereavement time.", agreedCount: 8, comments: ["We stand with you in faith!", "Praying for strength, Mulalo."] },
        { id: 2, name: "Pastor Lufuno", text: "Praying for our church small groups and home cells to grow in unity and spirit.", agreedCount: 15, comments: ["Amen, thank you Pastor!", "God is faithful."] }
    ];

    const defaultSermons = [
        { id: 1, title: "Covenant Family: Walking in Unconditional Grace", speaker: "Pastor Lufuno", date: "2026-06-07", scripture: "Romans 8:1-4", desc: "A deep study on Romans chapter 8, explaining that grace sets us free and establishes our covenant family identity.", videoUrl: "sermon1" },
        { id: 2, title: "Fervent Prayer & Faith Breakthroughs", speaker: "Pastor Lufuno", date: "2026-05-31", scripture: "James 5:16", desc: "How earnest, intercessory prayer of the righteous avails much and brings about supernatural breakthroughs.", videoUrl: "sermon2" },
        { id: 3, title: "Love God, Love People Outreach", speaker: "Pastor Lindiwe", date: "2026-05-24", scripture: "Romans 15:7", desc: "Understanding our outward mission: how serving the local community displays Christ's finished work of grace.", videoUrl: "sermon3" }
    ];

    const defaultEventRegistrations = [];

    // Helper utilities to retrieve/save local storage data
    const getStoredData = (key, fallback) => {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    };

    const setStoredData = (key, val) => {
        localStorage.setItem(key, JSON.stringify(val));
    };

    // Initialize state
    let members = getStoredData('church_members', defaultMembers);
    let donations = getStoredData('church_donations', defaultDonations);
    let attendance = getStoredData('church_attendance', defaultAttendance);
    let events = getStoredData('church_events', defaultEvents);
    let households = getStoredData('church_households', defaultHouseholds);
    let careTeam = getStoredData('church_care_team', defaultCareTeam);
    let pastoralIntakes = getStoredData('church_pastoral_intakes', defaultPastoralIntakes);
    let followups = getStoredData('church_followups', defaultFollowups);
    let publicPrayers = getStoredData('church_public_prayers', defaultPublicPrayers);
    let publicSermons = getStoredData('church_public_sermons', defaultSermons);
    let eventRegistrations = getStoredData('church_event_registrations', defaultEventRegistrations);

    const saveData = () => {
        setStoredData('church_members', members);
        setStoredData('church_donations', donations);
        setStoredData('church_attendance', attendance);
        setStoredData('church_events', events);
        setStoredData('church_households', households);
        setStoredData('church_care_team', careTeam);
        setStoredData('church_pastoral_intakes', pastoralIntakes);
        setStoredData('church_followups', followups);
        setStoredData('church_public_prayers', publicPrayers);
        setStoredData('church_public_sermons', publicSermons);
        setStoredData('church_event_registrations', eventRegistrations);
    };

    // ==========================================
    // 2. CLIENT ROUTER & SPA PAGE NAVIGATION
    // ==========================================
    const header = document.getElementById('main-header');
    const publicPages = document.querySelectorAll('.public-page');

    const navigateToPage = (pageId) => {
        // Toggle active page wrappers
        publicPages.forEach(p => p.classList.remove('active'));
        const targetPage = document.getElementById(`page-${pageId}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update active navigation links
        const navLinks = document.querySelectorAll('.nav-links a[data-page]');
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Close mobile toggle menu
        const mobileToggle = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (mobileToggle && navMenu) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Trigger page-specific initializations
        if (pageId === 'events') {
            initEventsPage();
        } else if (pageId === 'ministries') {
            renderPublicPrayerBoard();
        } else if (pageId === 'sermons') {
            renderSermonsArchive();
        } else if (pageId === 'giving') {
            initGivingPage();
        } else if (pageId === 'gallery') {
            initGalleryPage();
        }
    };

    // Header scroll background toggle
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Hamburger Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Delegate page navigation link clicks (header, footer, teasers, and buttons)
    document.addEventListener('click', (e) => {
        const link = e.target.closest('[data-page-link]');
        if (link) {
            e.preventDefault();
            const pageId = link.getAttribute('data-page-link');
            navigateToPage(pageId);
        }

        const pageNav = e.target.closest('[data-page]');
        if (pageNav) {
            e.preventDefault();
            const pageId = pageNav.getAttribute('data-page');
            navigateToPage(pageId);
        }
    });

    // ==========================================
    // 2a. ABOUT PAGE INTERACTIVE TIMELINE LOGIC
    // ==========================================
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const timelineTitle = document.getElementById('timeline-detail-title');
    const timelineDesc = document.getElementById('timeline-detail-desc');

    const milestoneData = {
        "2012": {
            title: "2012: The Founding Storefront",
            desc: "Fathers House Church was founded in 2012 by Pastor Lufuno with a small congregation of just 12 people. Meeting in a storefront sanctuary in Downtown Grace, the focus was establishing a grace-centered community covenant."
        },
        "2017": {
            title: "2017: First Building Sanctuary",
            desc: "Moved to our current home on Hope Avenue, establishing the covenant community presence and inaugurating our main sanctuary seating 300+ people."
        },
        "2022": {
            title: "2022: Outreach & Kids Expansion",
            desc: "Inaugurated Fathers House Kids and Youth departments to serve families. Launched youth rallies and specialized biblical school programs, and expanded home cells."
        },
        "2027": {
            title: "2027: 15th Anniversary Celebration",
            desc: "Celebrating 15 years of God's faithfulness, grace, community, and purpose. We are looking forward to the next season of impact!"
        }
    };

    timelineNodes.forEach(node => {
        node.addEventListener('click', () => {
            timelineNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            const year = node.getAttribute('data-milestone');
            if (milestoneData[year]) {
                timelineTitle.textContent = milestoneData[year].title;
                timelineDesc.textContent = milestoneData[year].desc;
            }
        });
    });

    // ==========================================
    // 2b. EVENTS PAGE WIDGETS & CALENDAR LOGIC
    // ==========================================
    let countdownInterval;
    let selectedCalendarDateStr = "";

    const initEventsPage = () => {
        startCountdownTimer();
        renderCalendarGrid();
        renderPublicEventsList();
    };

    // Spotlight Event Countdown Timer
    const startCountdownTimer = () => {
        if (countdownInterval) clearInterval(countdownInterval);

        const now = new Date();
        // Sort chronologically and find first future event
        let nextEvent = [...events]
            .map(ev => ({ ...ev, dateObj: new Date(ev.date + 'T10:00:00') }))
            .filter(ev => ev.dateObj > now)
            .sort((a, b) => a.dateObj - b.dateObj)[0];

        let targetDate;
        if (nextEvent) {
            targetDate = nextEvent.dateObj;
            document.getElementById('spotlight-title').textContent = nextEvent.title;
            document.getElementById('spotlight-date').innerHTML = `<i class="fa-regular fa-calendar"></i> ${formatDateString(nextEvent.date)}`;
            document.getElementById('spotlight-location').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${nextEvent.location}`;
        } else {
            // Default next Sunday
            targetDate = new Date();
            targetDate.setDate(targetDate.getDate() + (7 - targetDate.getDay()) % 7);
            targetDate.setHours(10, 0, 0, 0);
            document.getElementById('spotlight-title').textContent = "Sunday Morning Service";
            document.getElementById('spotlight-date').innerHTML = `<i class="fa-regular fa-calendar"></i> Weekly at 10:00 AM`;
            document.getElementById('spotlight-location').innerHTML = `<i class="fa-solid fa-location-dot"></i> Main Sanctuary`;
        }

        const updateClock = () => {
            const diff = targetDate - new Date();
            if (diff <= 0) {
                clearInterval(countdownInterval);
                document.getElementById('cd-days').textContent = "00";
                document.getElementById('cd-hours').textContent = "00";
                document.getElementById('cd-mins').textContent = "00";
                document.getElementById('cd-secs').textContent = "00";
                return;
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            document.getElementById('cd-days').textContent = d.toString().padStart(2, '0');
            document.getElementById('cd-hours').textContent = h.toString().padStart(2, '0');
            document.getElementById('cd-mins').textContent = m.toString().padStart(2, '0');
            document.getElementById('cd-secs').textContent = s.toString().padStart(2, '0');
        };

        updateClock();
        countdownInterval = setInterval(updateClock, 1000);
    };

    // Render interactive grid calendar (June 2026)
    const renderCalendarGrid = () => {
        const gridTarget = document.getElementById('calendar-days-grid');
        if (!gridTarget) return;
        gridTarget.innerHTML = '';

        // Month info: June 2026 (Day 1 starts on Monday, total days = 30)
        const totalDays = 30;
        const startDayIndex = 1; // 0=Sunday, 1=Monday... June 1, 2026 is Monday

        // Create empty padding cells
        for (let i = 0; i < startDayIndex; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            gridTarget.appendChild(emptyCell);
        }

        // Create day cells
        for (let day = 1; day <= totalDays; day++) {
            const dateStr = `2026-06-${day.toString().padStart(2, '0')}`;
            const cell = document.createElement('div');
            cell.className = 'calendar-day';
            cell.textContent = day;

            // Highlight if today (mock today is June 19, 2026)
            if (day === 19) {
                cell.classList.add('today');
            }

            // Check if there is an event on this date
            const hasEvent = events.some(e => e.date === dateStr);
            if (hasEvent) {
                cell.classList.add('has-event');
            }

            if (selectedCalendarDateStr === dateStr) {
                cell.classList.add('active');
            }

            cell.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(c => c.classList.remove('active'));
                cell.classList.add('active');
                selectedCalendarDateStr = dateStr;
                renderPublicEventsList(); // Filter list by selected date
            });

            gridTarget.appendChild(cell);
        }
    };

    // Public Events Search & List
    const eventSearchInput = document.getElementById('event-search-input');
    const eventFilterTabs = document.querySelectorAll('.event-filter-tab');
    let currentEventFilter = 'all';

    const renderPublicEventsList = () => {
        const listTarget = document.getElementById('events-grid-public-target');
        if (!listTarget) return;
        listTarget.innerHTML = '';

        const searchQuery = eventSearchInput ? eventSearchInput.value.trim().toLowerCase() : '';

        // Filter events list
        let filtered = events.filter(e => {
            const categoryMatch = currentEventFilter === 'all' || e.category.toLowerCase() === currentEventFilter.toLowerCase();
            const searchMatch = e.title.toLowerCase().includes(searchQuery) || e.location.toLowerCase().includes(searchQuery);
            const dateMatch = selectedCalendarDateStr === "" || e.date === selectedCalendarDateStr;
            return categoryMatch && searchMatch && dateMatch;
        });

        // Sort chronologically
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (filtered.length === 0) {
            listTarget.innerHTML = `<div style="color:var(--color-text-muted); font-size:0.9rem; font-style:italic; padding: 20px 0; text-align:center;">No scheduled events found matching filters.</div>`;
            return;
        }

        filtered.forEach(evt => {
            const card = document.createElement('div');
            card.className = 'event-card-public';
            card.innerHTML = `
                <div class="event-card-details-left">
                    <span class="event-card-tag ${evt.category}">${evt.category}</span>
                    <h4>${evt.title}</h4>
                    <p><i class="fa-regular fa-calendar"></i> ${formatDateString(evt.date)} • ${evt.time}</p>
                    <p><i class="fa-solid fa-location-dot"></i> ${evt.location}</p>
                </div>
                <div class="event-card-actions-right">
                    <button class="btn btn-primary btn-reg-event" data-title="${evt.title}" data-id="${evt.id}"><i class="fa-solid fa-user-plus"></i> Register</button>
                    <button class="btn btn-secondary btn-share-event" data-title="${evt.title}" data-date="${evt.date}"><i class="fa-regular fa-share-nodes"></i> Share</button>
                </div>
            `;
            listTarget.appendChild(card);
        });

        // Register button listeners
        listTarget.querySelectorAll('.btn-reg-event').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-reg-event');
                const title = button.getAttribute('data-title');
                const eventId = button.getAttribute('data-id');
                openRegistrationPopover(button, title, eventId);
            });
        });

        // Share button listeners
        listTarget.querySelectorAll('.btn-share-event').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const title = e.target.closest('.btn-share-event').getAttribute('data-title');
                const date = e.target.closest('.btn-share-event').getAttribute('data-date');
                navigator.clipboard.writeText(`Join us for "${title}" at Fathers House Church on ${formatDateString(date)}!`);
                showNotification("Share Link Copied", `Simulated share URL copied to clipboard: Join us for ${title}!`);
            });
        });
    };

    if (eventSearchInput) {
        eventSearchInput.addEventListener('input', () => renderPublicEventsList());
    }

    eventFilterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            eventFilterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentEventFilter = tab.getAttribute('data-filter');
            selectedCalendarDateStr = ""; // Reset calendar filter on tab changes
            renderCalendarGrid();
            renderPublicEventsList();
        });
    });

    // Registration Popover: smart-positioned near the clicked button on all screen sizes
    const regPopover = document.getElementById('event-registration-popover');
    const regPopoverOverlay = document.getElementById('reg-popover-overlay');
    const regPopoverArrow = document.getElementById('reg-popover-arrow');
    const regForm = document.getElementById('event-registration-form');
    let _currentRegEventId = null;

    const openRegistrationPopover = (triggerBtn, eventTitle, eventId) => {
        _currentRegEventId = eventId || null;
        document.getElementById('reg-event-subtitle').textContent = eventTitle;
        document.getElementById('reg-event-title-val').value = eventTitle;
        regForm.reset();
        // Restore count to 1 after reset
        document.getElementById('reg-count').value = 1;

        // Show popover first (hidden so we can measure)
        regPopover.style.visibility = 'hidden';
        regPopover.classList.add('active');
        regPopoverOverlay.classList.add('active');

        positionPopover(triggerBtn);

        regPopover.style.visibility = '';
    };

    const positionPopover = (triggerBtn) => {
        const btnRect = triggerBtn.getBoundingClientRect();
        const popoverRect = regPopover.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const margin = 12;
        const POPOVER_W = Math.min(460, vw - 32);

        // On mobile (<= 600px) → centered fixed overlay, no arrow
        if (vw <= 600) {
            regPopover.style.position = 'fixed';
            regPopover.style.left = '50%';
            regPopover.style.top = '50%';
            regPopover.style.transform = 'translate(-50%, -50%)';
            regPopover.style.width = `${vw - 32}px`;
            regPopoverArrow.style.display = 'none';
            return;
        }

        // Compute position relative to button
        let left = btnRect.left + window.scrollX;
        let top = btnRect.bottom + window.scrollY + margin;
        const arrowLeft = btnRect.left + btnRect.width / 2 - left;

        // Clamp left so popover stays within viewport
        if (left + POPOVER_W > vw - 16) {
            left = vw - POPOVER_W - 16;
        }
        if (left < 16) left = 16;

        // If not enough space below, open above
        const spaceBelow = vh - btnRect.bottom - margin;
        const popoverH = regPopover.offsetHeight || 420;
        let openAbove = false;
        if (spaceBelow < popoverH && btnRect.top > popoverH + margin) {
            top = btnRect.top + window.scrollY - popoverH - margin;
            openAbove = true;
        }

        regPopover.style.position = 'absolute';
        regPopover.style.left = `${left}px`;
        regPopover.style.top = `${top}px`;
        regPopover.style.width = `${POPOVER_W}px`;
        regPopover.style.transform = 'none';

        // Arrow
        const clampedArrowLeft = Math.max(16, Math.min(arrowLeft, POPOVER_W - 16));
        regPopoverArrow.style.display = 'block';
        if (openAbove) {
            regPopoverArrow.style.top = 'auto';
            regPopoverArrow.style.bottom = '-8px';
            regPopoverArrow.style.borderColor = '#fff transparent transparent transparent';
        } else {
            regPopoverArrow.style.top = '-8px';
            regPopoverArrow.style.bottom = 'auto';
            regPopoverArrow.style.borderColor = 'transparent transparent #fff transparent';
        }
        regPopoverArrow.style.left = `${clampedArrowLeft}px`;
    };

    const closeRegistrationPopover = () => {
        regPopover.classList.remove('active');
        regPopoverOverlay.classList.remove('active');
        _currentRegEventId = null;
    };

    // Legacy openRegistrationModal for spotlight button
    const openRegistrationModal = (eventTitle) => {
        // Find a fake trigger in the center of the screen
        const fakeTrigger = { getBoundingClientRect: () => ({
            left: window.innerWidth / 2 - 60, right: window.innerWidth / 2 + 60,
            top: window.innerHeight / 2, bottom: window.innerHeight / 2 + 40,
            width: 120, height: 40
        }) };
        openRegistrationPopover(fakeTrigger, eventTitle, null);
    };

    document.getElementById('event-reg-close').addEventListener('click', closeRegistrationPopover);
    regPopoverOverlay.addEventListener('click', closeRegistrationPopover);

    // Reposition on resize
    window.addEventListener('resize', () => {
        if (regPopover.classList.contains('active') && window._lastRegTrigger) {
            positionPopover(window._lastRegTrigger);
        }
    });


    regForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventTitle = document.getElementById('reg-event-title-val').value;
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const phone = document.getElementById('reg-phone').value.trim();
        const count = parseInt(document.getElementById('reg-count').value) || 1;

        // Save registration to eventRegistrations store
        const nextId = eventRegistrations.length > 0 ? Math.max(...eventRegistrations.map(r => r.id)) + 1 : 1;
        eventRegistrations.push({
            id: nextId,
            eventId: _currentRegEventId,
            eventTitle,
            name,
            email,
            phone,
            count,
            registeredAt: new Date().toISOString(),
            status: 'Confirmed'
        });
        saveData();

        closeRegistrationPopover();

        // If CRM admin is logged in, refresh events admin too
        if (crmPortalView && crmPortalView.style.display === 'block') {
            renderEventsAdmin();
        }

        showNotification(
            '✅ Registration Confirmed!',
            `Thank you, ${name}! You are registered for "${eventTitle}" (${count} attendee${count > 1 ? 's' : ''}). A confirmation will be sent to ${email}.\n\n📊 Admin: This registration has been synced to the CRM Events module.`
        );
    });

    // Render original events function compatibility wrapper
    const renderPublicEvents = () => {
        initEventsPage();
    };

    // ==========================================
    // 2c. PRAYER BOARD SYSTEM (PUBLIC WALL)
    // ==========================================
    const renderPublicPrayerBoard = () => {
        const listTarget = document.getElementById('public-prayer-board-list');
        if (!listTarget) return;
        listTarget.innerHTML = '';

        publicPrayers.forEach((pr, index) => {
            let commentsHtml = '';
            pr.comments.forEach(c => {
                commentsHtml += `<div class="prayer-comment-item">${c}</div>`;
            });

            const card = document.createElement('div');
            card.className = 'prayer-board-card';
            card.innerHTML = `
                <div class="prayer-card-header">
                    <h4>${pr.name}</h4>
                    <span><i class="fa-regular fa-clock"></i> Covenant Wall</span>
                </div>
                <div class="prayer-card-text">
                    "${pr.text}"
                </div>
                <div class="prayer-card-footer">
                    <button class="btn-agree-pray" data-index="${index}">
                        <i class="fa-solid fa-hands-praying"></i> Stand in Agreement
                    </button>
                    <span class="prayer-agree-count" id="agree-count-${index}">${pr.agreedCount} interceding</span>
                </div>
                <div class="prayer-comments-section">
                    <div class="prayer-comments-list" id="prayer-comments-${index}">
                        ${commentsHtml}
                    </div>
                    <form class="prayer-comment-form" data-index="${index}">
                        <input type="text" class="prayer-comment-input" placeholder="Write word of encouragement..." required>
                        <button type="submit" class="btn-submit-comment"><i class="fa-regular fa-paper-plane"></i></button>
                    </form>
                </div>
            `;
            listTarget.appendChild(card);
        });

        // "Stand in Agreement" click handler
        listTarget.querySelectorAll('.btn-agree-pray').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(btn.getAttribute('data-index'));
                publicPrayers[idx].agreedCount++;
                saveData();
                document.getElementById(`agree-count-${idx}`).textContent = `${publicPrayers[idx].agreedCount} interceding`;
                btn.classList.add('agreed');
                btn.disabled = true;
            });
        });

        // Supportive Encouragement Comments submit handler
        listTarget.querySelectorAll('.prayer-comment-form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const idx = parseInt(form.getAttribute('data-index'));
                const input = form.querySelector('.prayer-comment-input');
                const commentText = input.value.trim();
                if (!commentText) return;

                publicPrayers[idx].comments.push(commentText);
                saveData();

                // Append comment dynamically
                const commentsList = document.getElementById(`prayer-comments-${idx}`);
                const commentItem = document.createElement('div');
                commentItem.className = 'prayer-comment-item';
                commentItem.textContent = commentText;
                commentsList.appendChild(commentItem);

                input.value = '';
            });
        });
    };

    // Public prayer request submit
    const publicPrayerForm = document.getElementById('public-prayer-form');
    if (publicPrayerForm) {
        publicPrayerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('board-prayer-name').value.trim() || 'Anonymous';
            const text = document.getElementById('board-prayer-text').value.trim();

            const nextId = publicPrayers.length > 0 ? Math.max(...publicPrayers.map(p => p.id)) + 1 : 1;
            publicPrayers.push({
                id: nextId,
                name: name,
                text: text,
                agreedCount: 1,
                comments: []
            });

            saveData();
            renderPublicPrayerBoard();
            publicPrayerForm.reset();
            showNotification("Prayer Posted", "Your request has been added to our public intercession community board.");
        });
    }

    // ==========================================
    // 2d. SERMONS LIBRARY & RESOURCES LOGIC
    // ==========================================
    const sermonSearchInput = document.getElementById('sermon-search-input');
    const sermonSpeakerFilter = document.getElementById('sermon-speaker-filter');

    const renderSermonsArchive = () => {
        const gridTarget = document.getElementById('sermon-archive-grid-target');
        if (!gridTarget) return;
        gridTarget.innerHTML = '';

        const searchVal = sermonSearchInput ? sermonSearchInput.value.toLowerCase() : '';
        const speakerVal = sermonSpeakerFilter ? sermonSpeakerFilter.value : 'all';

        let filtered = publicSermons.filter(s => {
            const searchMatch = s.title.toLowerCase().includes(searchVal) || s.scripture.toLowerCase().includes(searchVal) || s.desc.toLowerCase().includes(searchVal);
            const speakerMatch = speakerVal === 'all' || s.speaker === speakerVal;
            return searchMatch && speakerMatch;
        });

        filtered.forEach(s => {
            const card = document.createElement('div');
            card.className = 'sermon-card-ui';
            card.innerHTML = `
                <div class="sermon-card-thumb">
                    <img src="./assets/congregation_worship.png" alt="Sermon Thumbnail">
                    <div class="sermon-card-thumb-play btn-play-archive-sermon" data-title="${s.title}" data-speaker="${s.speaker}" data-scripture="${s.scripture}" data-desc="${s.desc}"><i class="fa-solid fa-circle-play"></i></div>
                </div>
                <div class="sermon-card-body">
                    <span class="sermon-card-speaker">${s.speaker}</span>
                    <h4>${s.title}</h4>
                    <p class="sermon-card-desc">${s.desc}</p>
                    <div class="sermon-card-footer">
                        <span><i class="fa-regular fa-clock"></i> ${formatDateString(s.date)}</span>
                        <button class="btn-card-download-notes btn-download-notes-action" data-title="${s.title}"><i class="fa-solid fa-file-pdf"></i> Notes</button>
                    </div>
                </div>
            `;
            gridTarget.appendChild(card);
        });

        // Download notes trigger
        gridTarget.querySelectorAll('.btn-download-notes-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const title = e.target.closest('.btn-download-notes-action').getAttribute('data-title');
                simulatePDFDownload(title);
            });
        });

        // Play past sermon trigger
        gridTarget.querySelectorAll('.btn-play-archive-sermon').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const trigger = e.target.closest('.btn-play-archive-sermon');
                const title = trigger.getAttribute('data-title');
                const speaker = trigger.getAttribute('data-speaker');
                const scripture = trigger.getAttribute('data-scripture');
                const desc = trigger.getAttribute('data-desc');

                // Load to featured player area and scroll up
                document.querySelector('.sermon-player-details h3').textContent = title;
                document.querySelector('.sermon-player-details .sermon-meta').textContent = `Speaker: ${speaker} • Scripture: ${scripture}`;
                document.querySelector('.sermon-player-details .sermon-description-text').textContent = desc;
                
                window.scrollTo({ top: document.querySelector('.featured-sermon-section').offsetTop - 80, behavior: 'smooth' });
                showNotification("Loading Sermon Replay", `Playing past sermon message: "${title}"`);
            });
        });
    };

    if (sermonSearchInput) sermonSearchInput.addEventListener('input', () => renderSermonsArchive());
    if (sermonSpeakerFilter) sermonSpeakerFilter.addEventListener('change', () => renderSermonsArchive());

    // Mock Video Player controls
    const playToggle = document.getElementById('sermon-play-toggle');
    const playerControls = document.getElementById('mock-player-controls');
    if (playToggle && playerControls) {
        let isPlaying = false;
        playerControls.addEventListener('click', (e) => {
            if (e.target.closest('.player-bottom-bar')) return; // ignore clicks on control bar items
            togglePlay();
        });

        playToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay();
        });

        const togglePlay = () => {
            isPlaying = !isPlaying;
            const playIcon = playToggle.querySelector('i');
            const centerPlay = document.querySelector('.player-center-play i');
            if (isPlaying) {
                playIcon.className = "fa-solid fa-pause";
                if (centerPlay) centerPlay.className = "fa-solid fa-circle-pause";
                showNotification("Playing Sermon Broadcast", "Mock video replay started.");
            } else {
                playIcon.className = "fa-solid fa-play";
                if (centerPlay) centerPlay.className = "fa-solid fa-circle-play";
            }
        };
    }

    // PDF Download Simulation helper
    const simulatePDFDownload = (sermonTitle) => {
        showNotification("Preparing Study Notes", `Compiling PDF devotionals notes and cell guides for "${sermonTitle}"...`);
        setTimeout(() => {
            const content = `FATHERS HOUSE CHURCH SERMON GUIDE\n\nTitle: ${sermonTitle}\nDate: June 2026\n\nDiscussion Guidelines:\n1. Re-read the primary scripture Romans 8.\n2. How does the grace covenant shape your daily intercessory focus?\n3. Stand in fellowship this week.`;
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${sermonTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_sermon_notes.txt`;
            link.click();
        }, 1200);
    };

    document.getElementById('btn-download-sermon-notes').addEventListener('click', () => {
        const title = document.querySelector('.sermon-player-details h3').textContent;
        simulatePDFDownload(title);
    });

    // ==========================================
    // 2e. COMMUNITY INVOLVEMENT LOGIC
    // ==========================================
    const volForm = document.getElementById('volunteer-signup-form');
    if (volForm) {
        volForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('vol-name').value.trim();
            const email = document.getElementById('vol-email').value.trim();
            
            const interests = [];
            document.querySelectorAll('input[name="vol-interest"]:checked').forEach(chk => {
                interests.push(chk.value);
            });

            volForm.reset();
            showNotification(
                "Volunteer Intake Registered",
                `Thank you, ${name}! Your request to volunteer in [${interests.join(', ') || 'General support'}] has been submitted. A coordinator will contact you at ${email}.`
            );
        });
    }

    // ==========================================
    // 2f. GIVING & CALCULATORS LOGIC (CRM SYNC)
    // ==========================================
    const offeringSlider = document.getElementById('giving-slider-range');
    const secureGivingForm = document.getElementById('public-secure-giving-form');

    const initGivingPage = () => {
        // Pre-fill select dropdown with active members in local storage
        const giveMemberSelect = document.getElementById('give-member-name');
        if (giveMemberSelect) {
            giveMemberSelect.innerHTML = '';
            members.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m.name;
                opt.textContent = `${m.name} (ID: ${m.id})`;
                giveMemberSelect.appendChild(opt);
            });
        }
        updateAllocationValues(offeringSlider ? offeringSlider.value : 500);
    };

    const updateAllocationValues = (amount) => {
        const val = parseFloat(amount);
        document.getElementById('offering-val-display').textContent = `R ${val}`;

        const outreach = Math.round(val * 0.5);
        const ops = Math.round(val * 0.3);
        const missions = Math.round(val * 0.2);

        document.getElementById('alloc-outreach').textContent = `R ${outreach}`;
        document.getElementById('alloc-ops').textContent = `R ${ops}`;
        document.getElementById('alloc-missions').textContent = `R ${missions}`;
    };

    if (offeringSlider) {
        offeringSlider.addEventListener('input', (e) => {
            updateAllocationValues(e.target.value);
        });
    }

    if (secureGivingForm) {
        secureGivingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('give-member-name').value;
            const category = document.getElementById('give-category').value;
            const amount = parseFloat(document.getElementById('give-amount-input').value) || 0;
            const cardNum = document.getElementById('give-card-num').value.trim();

            if (amount <= 0) return;

            // Secure simulated receipt
            const nextId = donations.length > 0 ? Math.max(...donations.map(d => d.id)) + 1 : 1;
            const dateStr = new Date().toISOString().split('T')[0];

            // Post transaction straight to local storage arrays (CRM ledger syncs instantly!)
            donations.push({
                id: nextId,
                name: name,
                category: category,
                date: dateStr,
                amount: amount
            });

            saveData();
            secureGivingForm.reset();

            // Refresh finance tab if loaded in CRM background
            if (crmPortalView.style.display === 'block') {
                initCRM();
            }

            // Pop premium Receipt Modal
            showNotification(
                "Secure Tithing Processed",
                `RECEIPT OF TRANSACTION\n-----------------------------\nTransaction ID: FH-902${nextId}\nDonor: ${name}\nCategory: ${category}\nAmount: R ${amount.toFixed(2)}\nPayment: Cards ending in *${cardNum.slice(-4) || '1111'}\n-----------------------------\nThank you for supporting Fathers House ministries!`
            );
        });
    }

    // ==========================================
    // 2g. GALLERY ALBUMS LIGHTBOX LOGIC
    // ==========================================
    const lightboxModal = document.getElementById('gallery-lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-image-target');
    const lightboxCaption = document.getElementById('lightbox-caption-target');
    const galleryGrid = document.getElementById('public-gallery-grid');

    const initGalleryPage = () => {
        // Wire lightbox clicks on gallery item cards
        if (galleryGrid) {
            galleryGrid.querySelectorAll('.gallery-item-card').forEach(card => {
                card.addEventListener('click', () => {
                    const img = card.querySelector('img');
                    const title = card.querySelector('h4').textContent;
                    const subtitle = card.querySelector('p').textContent;

                    lightboxImg.src = img.src;
                    lightboxCaption.textContent = `${title} — ${subtitle}`;
                    lightboxModal.classList.add('active');
                });
            });
        }
    };

    if (lightboxModal) {
        document.getElementById('lightbox-close-btn').addEventListener('click', () => {
            lightboxModal.classList.remove('active');
        });
    }

    // Gallery Album filters
    document.querySelectorAll('.gallery-filter-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.gallery-filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.getAttribute('data-filter');

            document.querySelectorAll('.gallery-item-card').forEach(card => {
                if (filter === 'all' || card.getAttribute('data-album') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Testimonial videos playback popup
    document.querySelectorAll('.btn-play-testimony').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const url = btn.getAttribute('data-video-url');
            showNotification("Testimonial Media Streaming", `Streaming community member interview video clip: [${url}].`);
        });
    });

    // Initialize events calendar lists on launch
    renderPublicEvents();

    // ==========================================
    // 3. AUTH GATES & STAFF PORTAL ACCESSIBILITY
    // ==========================================
    const openLoginBtn = document.getElementById('open-login-btn');
    const footerPortalBtn = document.getElementById('footer-portal-btn');
    const loginModal = document.getElementById('login-modal');
    const loginCloseBtn = document.getElementById('login-close-btn');

    const signinTab = document.getElementById('tab-signin-btn');
    const signupTab = document.getElementById('tab-signup-btn');
    const signinForm = document.getElementById('signin-form');
    const signupForm = document.getElementById('signup-form');

    const publicSiteView = document.getElementById('public-site-view');
    const crmPortalView = document.getElementById('crm-portal-view');
    const crmLogoutBtn = document.getElementById('crm-logout-btn');

    // Show Login Gate modal
    const showLogin = (e) => {
        if (e) e.preventDefault();
        loginModal.classList.add('active');
    };

    const hideLogin = () => {
        loginModal.classList.remove('active');
    };

    openLoginBtn.addEventListener('click', showLogin);
    footerPortalBtn.addEventListener('click', showLogin);
    loginCloseBtn.addEventListener('click', hideLogin);

    // Tab toggles in login modal
    signinTab.addEventListener('click', () => {
        signinTab.classList.add('active');
        signupTab.classList.remove('active');
        signinForm.classList.add('active-form');
        signupForm.classList.remove('active-form');
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        signinTab.classList.remove('active');
        signupForm.classList.add('active-form');
        signinForm.classList.remove('active-form');
    });

    // Handle Login authentication
    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value.trim();
        const pass = document.getElementById('signin-password').value.trim();

        // Simple default credentials or any email/password works for play along
        if (email && pass) {
            hideLogin();
            
            // Switch view from Public Site to CRM
            publicSiteView.style.display = 'none';
            crmPortalView.style.display = 'block';
            window.scrollTo(0, 0);

            // Initialize CRM view
            initCRM();
        }
    });

    // Handle Sign Up
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification("Account Created", "Registration simulated. You can now sign in using the login tab.");
        signinTab.click();
    });

    // Handle logout from CRM
    crmLogoutBtn.addEventListener('click', () => {
        crmPortalView.style.display = 'none';
        publicSiteView.style.display = 'block';
        window.scrollTo(0, 0);
    });

    // ==========================================
    // 4. CRM CORE NAVIGATION & INTERACTION
    // ==========================================
    const crmTabs = document.querySelectorAll('.crm-nav-tab');
    const crmPanels = document.querySelectorAll('.crm-tab-panel');

    const initCRM = () => {
        renderDashboard();
        renderMembers();
        renderAttendance();
        renderFinance();
        renderEventsAdmin();
        renderPastoralCare();
    };

    // Tab Switching inside CRM
    crmTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            crmTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const targetPanelId = `panel-${tab.getAttribute('data-tab')}`;
            crmPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetPanelId) {
                    panel.classList.add('active');
                }
            });

            // Re-render specifics if entering specific pages
            if (tab.getAttribute('data-tab') === 'dashboard') renderDashboard();
            if (tab.getAttribute('data-tab') === 'members') renderMembers();
            if (tab.getAttribute('data-tab') === 'attendance') renderAttendance();
            if (tab.getAttribute('data-tab') === 'finance') renderFinance();
            if (tab.getAttribute('data-tab') === 'events-admin') renderEventsAdmin();
            if (tab.getAttribute('data-tab') === 'care') renderPastoralCare();
        });
    });

    // ==========================================
    // 4a. CRM DASHBOARD LOGIC
    // ==========================================
    const renderDashboard = () => {
        // Calculate Metrics
        const totalMembers = members.length;
        
        // Attendance metric computation
        const todayKey = "2026-06-07";
        const todayAttendance = attendance[todayKey] || {};
        const presentCount = Object.values(todayAttendance).filter(v => v === true).length;
        const totalTracked = Object.keys(todayAttendance).length || totalMembers;
        const attendanceRate = totalTracked > 0 ? Math.round((presentCount / totalTracked) * 100) : 100;

        // Donations total
        const donationSum = donations.reduce((sum, item) => sum + item.amount, 0);
        const totalEvents = events.length;

        // Update dashboard values
        document.getElementById('stat-total-members').textContent = totalMembers;
        document.getElementById('stat-attendance-rate').textContent = `${attendanceRate}%`;
        document.getElementById('stat-total-donations').textContent = `R ${donationSum}`;
        document.getElementById('stat-total-events').textContent = totalEvents;

        // Populate Recent Donations Widget (Image 4)
        const recentDonationsList = document.getElementById('recent-donations-list');
        recentDonationsList.innerHTML = '';

        // Get 3 most recent donations
        const recentDonations = [...donations].slice(-3).reverse();

        recentDonations.forEach(dn => {
            const listItem = document.createElement('div');
            listItem.className = 'donation-list-item';
            listItem.innerHTML = `
                <div class="donor-info">
                    <h4>${dn.name}</h4>
                    <p>${dn.category} • ${formatDateString(dn.date)}</p>
                </div>
                <div class="donor-amount">R ${dn.amount}</div>
            `;
            recentDonationsList.appendChild(listItem);
        });

        renderAtRiskContacts();
        renderUpcomingReminders();
    };

    // Dashboard Quick Actions (Image 4 bottom buttons integration)
    document.getElementById('quick-add-member').addEventListener('click', () => {
        document.querySelector('[data-tab="members"]').click();
        document.getElementById('open-add-member-modal-btn').click();
    });

    document.getElementById('quick-check-in').addEventListener('click', () => {
        document.querySelector('[data-tab="attendance"]').click();
    });

    document.getElementById('quick-log-donation').addEventListener('click', () => {
        document.querySelector('[data-tab="finance"]').click();
        openDonationModal();
    });

    document.getElementById('quick-create-event').addEventListener('click', () => {
        document.querySelector('[data-tab="events-admin"]').click();
        document.getElementById('open-add-event-modal-btn').click();
    });

    // ==========================================
    // 4b. CRM MEMBERS DIRECTORY LOGIC (Image 5)
    // ==========================================
    const membersListTarget = document.getElementById('members-list-target');
    const memberSearchInput = document.getElementById('member-search-input');
    const memberModal = document.getElementById('member-modal');
    const memberModalClose = document.getElementById('member-modal-close');
    const memberForm = document.getElementById('member-form');
    const memberModalTitle = document.getElementById('member-modal-title');
    const memberFormSubmitBtn = document.getElementById('member-form-submit-btn');

    const renderMembers = (filterText = '') => {
        membersListTarget.innerHTML = '';
        const searchVal = filterText.toLowerCase();

        members.forEach((m, idx) => {
            if (m.name.toLowerCase().includes(searchVal) || m.email.toLowerCase().includes(searchVal)) {
                const badgeClass = m.status.toLowerCase() === 'active' ? 'active' : 'visitor';
                const memberCard = document.createElement('div');
                memberCard.className = 'member-list-item';
                memberCard.innerHTML = `
                    <div class="member-details-box">
                        <h4>${m.name}</h4>
                        <p>ID: ${m.id} • <span class="status-badge ${badgeClass}">${m.status}</span></p>
                        <p>${m.phone} • ${m.email}</p>
                    </div>
                    <div class="member-actions-row">
                        <button class="btn-member-edit" data-index="${idx}"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                        <button class="btn-member-delete" data-index="${idx}"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    </div>
                `;
                membersListTarget.appendChild(memberCard);
            }
        });

        // Add edit listener events
        document.querySelectorAll('.btn-member-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-member-edit');
                const idx = button.getAttribute('data-index');
                openEditMemberModal(idx);
            });
        });

        // Add delete listener events
        document.querySelectorAll('.btn-member-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-member-delete');
                const idx = button.getAttribute('data-index');
                const member = members[idx];
                
                if (confirm(`Are you sure you want to delete member ${member.name} (ID: ${member.id})?`)) {
                    members.splice(idx, 1);
                    saveData();
                    renderMembers(memberSearchInput.value);
                    renderDashboard(); // Update stats
                    showNotification("Member Deleted", `${member.name} has been removed from the directory.`);
                }
            });
        });
    };

    // Filter directory list dynamically
    memberSearchInput.addEventListener('input', (e) => {
        renderMembers(e.target.value);
    });

    // Modal Control
    const openAddMemberModal = () => {
        memberModalTitle.textContent = "Add New Member";
        memberFormSubmitBtn.textContent = "Save Member";
        memberForm.reset();
        document.getElementById('edit-member-index').value = "";
        memberModal.classList.add('active');
    };

    const openEditMemberModal = (idx) => {
        const m = members[idx];
        memberModalTitle.textContent = "Edit Member Info";
        memberFormSubmitBtn.textContent = "Save Changes";
        document.getElementById('edit-member-index').value = idx;
        document.getElementById('member-name').value = m.name;
        document.getElementById('member-status').value = m.status;
        document.getElementById('member-phone').value = m.phone;
        document.getElementById('member-email').value = m.email;
        memberModal.classList.add('active');
    };

    const closeMemberModal = () => {
        memberModal.classList.remove('active');
    };

    document.getElementById('open-add-member-modal-btn').addEventListener('click', openAddMemberModal);
    memberModalClose.addEventListener('click', closeMemberModal);

    memberForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const idx = document.getElementById('edit-member-index').value;
        const name = document.getElementById('member-name').value.trim();
        const status = document.getElementById('member-status').value;
        const phone = document.getElementById('member-phone').value.trim();
        const email = document.getElementById('member-email').value.trim();

        if (idx === "") {
            // Add member
            const nextId = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1001;
            members.push({ id: nextId, name, status, phone, email });
            showNotification("Member Added", `${name} was successfully registered.`);
        } else {
            // Edit member
            members[idx] = { ...members[idx], name, status, phone, email };
            showNotification("Member Updated", `Changes for ${name} saved successfully.`);
        }

        saveData();
        closeMemberModal();
        renderMembers();
    });

    // ==========================================
    // 4c. CRM ATTENDANCE LOGIC (Image 3)
    // ==========================================
    const attendanceListTarget = document.getElementById('attendance-list-target');
    const syncSheetsBtn = document.getElementById('sync-sheets-btn');
    const syncSpinnerOverlay = document.getElementById('sync-spinner-overlay');

    const renderAttendance = () => {
        attendanceListTarget.innerHTML = '';
        const todayKey = "2026-06-07";

        // Initialize today attendance mapping if empty
        if (!attendance[todayKey]) {
            attendance[todayKey] = {};
        }

        members.forEach(m => {
            // Set present true by default if not recorded
            if (attendance[todayKey][m.id] === undefined) {
                attendance[todayKey][m.id] = false;
            }

            const isChecked = attendance[todayKey][m.id] ? 'checked' : '';
            const statusText = attendance[todayKey][m.id] ? 'Present' : 'Absent';
            const statusClass = attendance[todayKey][m.id] ? '' : 'absent';

            const attendRow = document.createElement('div');
            attendRow.className = 'attendance-item';
            attendRow.innerHTML = `
                <div class="attendance-person">
                    <input type="checkbox" class="crm-checkbox attendance-toggle" data-id="${m.id}" ${isChecked} aria-label="Toggle presence">
                    <div class="person-tag">
                        <h4>${m.name}</h4>
                        <p>ID: ${m.id}</p>
                    </div>
                </div>
                <div class="presence-status ${statusClass}">${statusText}</div>
            `;
            attendanceListTarget.appendChild(attendRow);
        });

        // Add change listeners to checkboxes
        document.querySelectorAll('.attendance-toggle').forEach(chk => {
            chk.addEventListener('change', (e) => {
                const id = e.target.getAttribute('data-id');
                const isPresent = e.target.checked;
                attendance[todayKey][id] = isPresent;

                // Update text indicators dynamically
                const statusBox = e.target.closest('.attendance-item').querySelector('.presence-status');
                if (isPresent) {
                    statusBox.textContent = "Present";
                    statusBox.classList.remove('absent');
                } else {
                    statusBox.textContent = "Absent";
                    statusBox.classList.add('absent');
                }

                saveData();
            });
        });
    };

    // Simulated Sync to Google Sheets
    syncSheetsBtn.addEventListener('click', () => {
        syncSpinnerOverlay.classList.add('active');

        setTimeout(() => {
            syncSpinnerOverlay.classList.remove('active');
            
            const todayKey = "2026-06-07";
            const todayRecord = attendance[todayKey] || {};
            const checkedCount = Object.keys(todayRecord).length;
            
            showNotification(
                "Sync Successful", 
                `Exported ${checkedCount} attendance records to "Fathers House Attendance" spreadsheet on Google Sheets.`
            );
        }, 1800);
    });

    // ==========================================
    // 4d. CRM FINANCE & CHART (Image 1)
    // ==========================================
    const financeTableBody = document.getElementById('finance-table-body');
    const donationModal = document.getElementById('donation-modal');
    const donationForm = document.getElementById('donation-form');
    const donationModalClose = document.getElementById('donation-modal-close');
    const donationMemberSelect = document.getElementById('donation-member');

    const renderFinance = () => {
        // Render ledger table
        financeTableBody.innerHTML = '';
        
        // Reverse order to show newest transactions first
        const sortedDonations = [...donations].reverse();

        sortedDonations.forEach(dn => {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td><strong>${dn.name}</strong></td>
                <td>${dn.category}</td>
                <td>${formatDateString(dn.date)}</td>
                <td style="color: #1e3a8a; font-weight: 700;">R ${dn.amount}</td>
            `;
            financeTableBody.appendChild(tableRow);
        });

        renderAllocationChart();
    };

    // Draw customized, premium SVG Bar Chart
    const renderAllocationChart = () => {
        const chartTarget = document.getElementById('finance-chart-target');
        chartTarget.innerHTML = '';

        // Calculate sums by category
        const totals = { Tithe: 0, Missions: 0, Building: 0, Outreach: 0 };
        donations.forEach(dn => {
            if (totals[dn.category] !== undefined) {
                totals[dn.category] += dn.amount;
            } else {
                totals.Outreach = (totals.Outreach || 0) + dn.amount;
            }
        });

        const maxVal = Math.max(...Object.values(totals), 100);

        // SVG markup
        let svgContent = `
            <svg width="280" height="200" viewBox="0 0 280 200" style="background-color: transparent;">
                <!-- Grid Lines -->
                <line x1="40" y1="20" x2="260" y2="20" stroke="#f1f5f9" stroke-width="1"></line>
                <line x1="40" y1="70" x2="260" y2="70" stroke="#f1f5f9" stroke-width="1"></line>
                <line x1="40" y1="120" x2="260" y2="120" stroke="#f1f5f9" stroke-width="1"></line>
                <line x1="40" y1="160" x2="260" y2="160" stroke="#cbd5e1" stroke-width="1.5"></line>

                <!-- Left Labels -->
                <text x="30" y="24" text-anchor="end" class="svg-text">R ${maxVal}</text>
                <text x="30" y="94" text-anchor="end" class="svg-text">R ${Math.round(maxVal/2)}</text>
                <text x="30" y="164" text-anchor="end" class="svg-text">R 0</text>
        `;

        const colors = { Tithe: '#3b82f6', Missions: '#8b5cf6', Building: '#f59e0b', Outreach: '#10b981' };
        const categories = Object.keys(totals);

        categories.forEach((cat, index) => {
            const x = 60 + index * 50;
            const amount = totals[cat];
            const barHeight = (amount / maxVal) * 140; // max chart height = 140px
            const y = 160 - barHeight;

            svgContent += `
                <!-- Category Bar Column -->
                <rect x="${x}" y="${y}" width="24" height="${barHeight}" rx="4" fill="${colors[cat]}" class="svg-bar"></rect>
                <!-- Tooltip values -->
                <text x="${x + 12}" y="${y - 6}" text-anchor="middle" font-weight="700" font-size="9px" fill="#1e293b">R${amount}</text>
                <!-- Category bottom label -->
                <text x="${x + 12}" y="178" text-anchor="middle" class="svg-text" font-weight="500">${cat}</text>
            `;
        });

        svgContent += `</svg>`;
        chartTarget.innerHTML = svgContent;
    };

    // Donation Modal management
    const openDonationModal = () => {
        // Pre-fill select dropdown with active members list
        donationMemberSelect.innerHTML = '';
        members.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.name;
            opt.textContent = `${m.name} (ID: ${m.id})`;
            donationMemberSelect.appendChild(opt);
        });

        // Set default date picker to today
        document.getElementById('donation-date').value = new Date().toISOString().split('T')[0];
        donationModal.classList.add('active');
    };

    const closeDonationModal = () => {
        donationModal.classList.remove('active');
    };

    donationModalClose.addEventListener('click', closeDonationModal);

    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = donationMemberSelect.value;
        const category = document.getElementById('donation-category').value;
        const amount = parseFloat(document.getElementById('donation-amount').value) || 0;
        const date = document.getElementById('donation-date').value;

        if (amount <= 0) return;

        const nextId = donations.length > 0 ? Math.max(...donations.map(d => d.id)) + 1 : 1;
        donations.push({ id: nextId, name, category, date, amount });

        saveData();
        closeDonationModal();
        renderFinance();
        showNotification("Donation Logged", `Successfully logged R ${amount} offering for ${name}.`);
    });

    // Report Builder form submit (Image 1 widget integration)
    const reportForm = document.getElementById('report-generator-form');
    // Set default start/end dates
    document.getElementById('report-start-date').value = "2026-06-01";
    document.getElementById('report-end-date').value = "2026-06-30";

    reportForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.getElementById('report-type').value;
        const start = document.getElementById('report-start-date').value;
        const end = document.getElementById('report-end-date').value;

        let content = '';
        let filename = '';

        if (type === 'financial') {
            filename = `financial_report_${start}_to_${end}.csv`;
            content = "Transaction ID,Member Name,Giving Category,Date,Amount (ZAR)\n";
            donations.forEach(d => {
                if (d.date >= start && d.date <= end) {
                    content += `${d.id},"${d.name}",${d.category},${d.date},${d.amount}\n`;
                }
            });
        } else if (type === 'attendance') {
            filename = `attendance_report_${start}_to_${end}.csv`;
            content = "Member ID,Member Name,Status,Presents Checked\n";
            members.forEach(m => {
                let presentCount = 0;
                Object.keys(attendance).forEach(date => {
                    if (date >= start && date <= end) {
                        if (attendance[date][m.id]) presentCount++;
                    }
                });
                content += `${m.id},"${m.name}",${m.status},${presentCount}\n`;
            });
        } else {
            filename = `member_directory_${start}.csv`;
            content = "Member ID,Name,Status,Phone,Email\n";
            members.forEach(m => {
                content += `${m.id},"${m.name}",${m.status},${m.phone},${m.email}\n`;
            });
        }

        // Simulating the report generation download
        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification("Report Generated", `Successfully generated and downloaded report: ${filename}`);
    });

    // ==========================================
    // 4e. CRM EVENTS LOGIC
    // ==========================================
    const eventsTableBody = document.getElementById('events-table-body');
    const eventModal = document.getElementById('event-modal');
    const eventModalClose = document.getElementById('event-modal-close');
    const eventForm = document.getElementById('event-form');

    const renderEventsAdmin = () => {
        eventsTableBody.innerHTML = '';
        
        events.forEach((evt, idx) => {
            const regCount = eventRegistrations.filter(r => r.eventId == evt.id || r.eventTitle === evt.title).length;
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td><strong>${formatDateString(evt.date)}</strong></td>
                <td>${evt.title}</td>
                <td><span class="event-tag ${evt.category}">${evt.category}</span></td>
                <td>${evt.time}</td>
                <td>${evt.location}</td>
                <td>
                    <button class="btn-view-registrations" data-index="${idx}" data-title="${evt.title}" style="display:inline-flex;align-items:center;gap:5px;background:${regCount > 0 ? '#eff6ff' : '#f8fafc'};color:${regCount > 0 ? '#2563eb' : '#94a3b8'};border:1px solid ${regCount > 0 ? 'rgba(37,99,235,0.2)' : '#e2e8f0'};padding:4px 10px;border-radius:6px;font-size:0.78rem;font-weight:600;cursor:pointer;">
                        <i class="fa-solid fa-users" style="font-size:0.7rem;"></i> ${regCount}
                    </button>
                </td>
                <td><button class="btn btn-secondary btn-delete-event" data-index="${idx}" style="color: #ef4444; border-color: rgba(239,68,68,0.2); background: rgba(239,68,68,0.05); padding: 4px 10px; font-size: 0.75rem;">Delete</button></td>
            `;
            eventsTableBody.appendChild(tableRow);
        });

        // Add delete listeners
        document.querySelectorAll('.btn-delete-event').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = e.target.getAttribute('data-index');
                const title = events[idx].title;
                events.splice(idx, 1);
                
                saveData();
                renderEventsAdmin();
                renderPublicEvents(); // dynamically update public website!
                showNotification("Event Deleted", `"${title}" has been removed from the calendar.`);
            });
        });

        // View registrations
        document.querySelectorAll('.btn-view-registrations').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-view-registrations');
                const idx = parseInt(button.getAttribute('data-index'));
                const title = button.getAttribute('data-title');
                const evt = events[idx];
                openEventRegistrationsPanel(evt);
            });
        });
    };

    // Event Registrations Panel
    const openEventRegistrationsPanel = (evt) => {
        const panel = document.getElementById('event-registrations-panel');
        const tbody = document.getElementById('event-registrations-table-body');
        const titleEl = document.getElementById('reg-panel-event-title');
        const countEl = document.getElementById('reg-panel-count');

        const regs = eventRegistrations.filter(r => r.eventId == evt.id || r.eventTitle === evt.title);
        titleEl.textContent = evt.title;
        countEl.textContent = `${regs.length} registration${regs.length !== 1 ? 's' : ''} • ${formatDateString(evt.date)}`;

        tbody.innerHTML = '';
        if (regs.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--color-text-muted); font-style:italic; padding:20px;">No registrations yet for this event.</td></tr>`;
        } else {
            regs.forEach((r, i) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${i + 1}</td>
                    <td><strong>${r.name}</strong></td>
                    <td>${r.email}</td>
                    <td>${r.phone || '—'}</td>
                    <td><span style="background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:4px;font-size:0.75rem;font-weight:700;">${r.count}</span></td>
                    <td>${formatDateString(r.registeredAt)}</td>
                    <td><span style="background:#dcfce7;color:#16a34a;padding:2px 8px;border-radius:4px;font-size:0.75rem;font-weight:700;">${r.status}</span></td>
                `;
                tbody.appendChild(row);
            });
        }

        panel.style.display = 'block';
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Export button
        document.getElementById('btn-export-registrations').onclick = () => exportRegistrationsCSV(evt, regs);
        // Close button
        document.getElementById('btn-close-reg-panel').onclick = () => { panel.style.display = 'none'; };
    };

    const exportRegistrationsCSV = (evt, regs) => {
        if (regs.length === 0) {
            showNotification('No Data to Export', 'There are no registrations to export for this event.');
            return;
        }
        let csv = `Event Registration List - ${evt.title}\n`;
        csv += `Date: ${formatDateString(evt.date)}\nLocation: ${evt.location}\n\n`;
        csv += `#,Name,Email,Phone,Attendees,Registered At,Status\n`;
        regs.forEach((r, i) => {
            csv += `${i + 1},"${r.name}","${r.email}","${r.phone || ''}",${r.count},"${formatDateString(r.registeredAt)}",${r.status}\n`;
        });
        // Add summary row
        const totalAttendees = regs.reduce((sum, r) => sum + r.count, 0);
        csv += `\nTotal Registrations:,${regs.length},,Total Attendees:,${totalAttendees},,`;

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${evt.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_registrations.csv`;
        link.click();
        showNotification('📊 Spreadsheet Exported', `Downloaded ${regs.length} registrations for "${evt.title}" to CSV spreadsheet (${totalAttendees} total attendees).`);
    };

    const openEventModal = () => {
        document.getElementById('event-date-val').value = new Date().toISOString().split('T')[0];
        eventModal.classList.add('active');
    };

    const closeEventModal = () => {
        eventModal.classList.remove('active');
    };

    document.getElementById('open-add-event-modal-btn').addEventListener('click', openEventModal);
    eventModalClose.addEventListener('click', closeEventModal);

    eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('event-title').value.trim();
        const category = document.getElementById('event-category').value;
        const date = document.getElementById('event-date-val').value;
        const rawTime = document.getElementById('event-time-val').value;
        const location = document.getElementById('event-location').value.trim();

        let time = rawTime;
        if (rawTime) {
            const [hours, minutes] = rawTime.split(':');
            const hrs = parseInt(hours);
            const ampm = hrs >= 12 ? 'PM' : 'AM';
            const displayHrs = hrs % 12 || 12;
            time = `${displayHrs}:${minutes} ${ampm}`;
        }

        const nextId = events.length > 0 ? Math.max(...events.map(ev => ev.id)) + 1 : 1;
        events.push({ id: nextId, title, category, date, time, location });

        saveData();
        closeEventModal();
        renderEventsAdmin();
        renderPublicEvents(); // updates public website calendar instantly!
        showNotification("Event Created", `"${title}" added successfully to the public church calendar.`);
    });

    // ==========================================
    // 5. PUBLIC SITE SIMULATIONS & NOTIFICATIONS
    // ==========================================
    const prayerForm = document.getElementById('prayer-form');
    const givingAmountInput = document.getElementById('giving-amount');
    const simulateDonateBtn = document.getElementById('btn-donate-simulate');
    
    // Modal alert popup
    const successModal = document.getElementById('success-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalOkBtn = document.getElementById('modal-ok-btn');

    const showNotification = (title, message) => {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        successModal.classList.add('active');
    };

    const hideNotification = () => {
        successModal.classList.remove('active');
    };

    modalCloseBtn.addEventListener('click', hideNotification);
    modalOkBtn.addEventListener('click', hideNotification);
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) hideNotification();
    });

    // Public prayer request submit / Pastoral Care Intake
    prayerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('prayer-name').value.trim() || 'Anonymous Friend';
        const emailVal = document.getElementById('prayer-email').value.trim();
        const categoryVal = document.getElementById('prayer-category').value;
        const requestTextVal = document.getElementById('prayer-request').value.trim();

        // 1. Auto-categorize Emergency Level based on text keywords
        let emergencyLevel = 'Low';
        const textLower = requestTextVal.toLowerCase();
        const highKeywords = ['surgery', 'hospital', 'critical', 'accident', 'icu', 'death', 'loss', 'emergency', 'die', 'cancer', 'heart attack', 'grief', 'passed away', 'funeral', 'bereavement'];
        const mediumKeywords = ['sick', 'pain', 'volunteer', 'depressed', 'struggle', 'job', 'finances', 'anxious', 'fear', 'depression', 'sad'];
        
        if (highKeywords.some(keyword => textLower.includes(keyword))) {
            emergencyLevel = 'High';
        } else if (mediumKeywords.some(keyword => textLower.includes(keyword))) {
            emergencyLevel = 'Medium';
        }

        // 2. AI Copilot Draft Response Generator (Scriptural Context)
        let aiDraft = '';
        switch(categoryVal) {
            case 'Hospital Visit':
                aiDraft = `Dear ${nameVal}, we are praying for your swift recovery and are preparing to visit you. As James 5:14 says: 'Is anyone among you sick? Let them call the elders of the church to pray over them...' A care coordinator will contact you shortly to schedule a visit and see how we can support you. Grace and peace, Pastor Lufuno and the Care Team.`;
                break;
            case 'New Visitor':
                aiDraft = `Dear ${nameVal}, thank you so much for joining us! We are so glad you visited Fathers House. As Romans 15:7 says: 'Accept one another, then, just as Christ accepted you, in order to bring praise to God.' We would love to connect with you and help you find your place in our community. Grace and peace, Pastor Lufuno and the Care Team.`;
                break;
            case 'Bereavement/Grief Support':
                aiDraft = `Dear ${nameVal}, our hearts go out to you during this time of loss. We pray for God's comforting presence to surround you. As Psalm 34:18 reminds us: 'The Lord is close to the brokenhearted and saves those who are crushed in spirit.' A care pastor is reaching out to support you and your family. Grace and peace, Pastor Lufuno and the Care Team.`;
                break;
            case 'Birthday/Anniversary':
                aiDraft = `Dear ${nameVal}, we celebrate this beautiful milestone with you! We thank God for His faithfulness in your life. As Psalm 118:24 says: 'This is the day the Lord has made; let us rejoice and be glad in it.' Wishing you many more blessings in the year ahead! Grace and peace, Pastor Lufuno and the Care Team.`;
                break;
            case 'Volunteer Coordination':
                aiDraft = `Dear ${nameVal}, thank you for your heart to serve! As 1 Peter 4:10 teaches: 'Each of you should use whatever gift you have received to serve others...' A ministry leader will connect with you soon to discuss how you can get involved. Grace and peace, Pastor Lufuno and the Care Team.`;
                break;
            default: // Prayer Request
                aiDraft = `Dear ${nameVal}, we stand in faith with you. Scripture tells us in Philippians 4:6-7: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' We are praying for your request and believing for a breakthrough. Grace and peace, Pastor Lufuno and the Care Team.`;
        }

        // 3. Save intake to local database state
        const nextIntakeId = pastoralIntakes.length > 0 ? Math.max(...pastoralIntakes.map(pi => pi.id)) + 1 : 1;
        pastoralIntakes.push({
            id: nextIntakeId,
            name: nameVal,
            email: emailVal,
            category: categoryVal,
            requestText: requestTextVal,
            emergencyLevel: emergencyLevel,
            aiDraft: aiDraft,
            status: "Pending Approval",
            submittedAt: new Date().toISOString()
        });

        saveData();

        // 4. Update CRM views immediately if open in background
        if (crmPortalView.style.display === 'block') {
            initCRM();
        }

        // 5. Show user confirmation modal
        showNotification(
            "Request Received",
            `Thank you, ${nameVal}. Your pastoral care request has been submitted. Our care team has been notified, and a pastor is reviewing the AI Copilot draft response.`
        );

        prayerForm.reset();
    });

    // Public donation simulation
    simulateDonateBtn.addEventListener('click', () => {
        const amount = parseFloat(givingAmountInput.value) || 0;
        if (amount <= 0) return;

        showNotification(
            "Generosity Simulated",
            `Thank you for simulating an offering of R ${amount.toFixed(2)}. In a live environment, this tithing would be logged in the CRM database instantly.`
        );
    });

    // ==========================================
    // 4f. CRM PASTORAL CARE LOGIC (Sendifai concept)
    // ==========================================
    let reminderFilterDays = 7;

    const renderAtRiskContacts = () => {
        const target = document.getElementById('at-risk-list-target');
        const countBadge = document.getElementById('at-risk-count');
        if (!target || !countBadge) return;
        target.innerHTML = '';
        
        const atRisk = members.filter(m => m.status === 'Inactive' || m.status === 'Visitor');
        countBadge.textContent = atRisk.length;
        
        if (atRisk.length === 0) {
            target.innerHTML = '<div style="color:var(--color-text-muted); font-size:0.85rem; font-style:italic;">No at-risk contacts detected. All members engaged.</div>';
            return;
        }
        
        atRisk.forEach(m => {
            const item = document.createElement('div');
            item.className = 'at-risk-item';
            item.innerHTML = `
                <div class="at-risk-details">
                    <h4>${m.name}</h4>
                    <p>Status: ${m.status} • Absent from last service</p>
                </div>
                <button class="btn-reach-out" data-id="${m.id}"><i class="fa-solid fa-phone"></i> Contact</button>
            `;
            target.appendChild(item);
        });
        
        target.querySelectorAll('.btn-reach-out').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-reach-out');
                const id = parseInt(button.getAttribute('data-id'));
                const member = members.find(m => m.id === id);
                if (confirm(`Log outreach interaction with ${member.name}? This will mark them as Active and re-engage them.`)) {
                    member.status = 'Active';
                    saveData();
                    initCRM();
                    showNotification("Outreach Logged", `Interaction with ${member.name} logged. Membership status updated to Active.`);
                }
            });
        });
    };

    const renderUpcomingReminders = () => {
        const target = document.getElementById('reminders-list-target');
        if (!target) return;
        target.innerHTML = '';
        
        const list = [];
        const today = new Date("2026-06-19");
        
        members.forEach(m => {
            if (m.birthday) {
                const bdate = new Date(m.birthday);
                const bNext = new Date(today.getFullYear(), bdate.getMonth(), bdate.getDate());
                if (bNext < today) {
                    bNext.setFullYear(today.getFullYear() + 1);
                }
                const diffDays = Math.ceil((bNext - today) / (1000 * 60 * 60 * 24));
                if (diffDays >= 0 && diffDays <= reminderFilterDays) {
                    list.push({
                        name: m.name,
                        type: 'Birthday',
                        date: bNext,
                        daysLeft: diffDays
                    });
                }
            }
            if (m.anniversary) {
                const adate = new Date(m.anniversary);
                const aNext = new Date(today.getFullYear(), adate.getMonth(), adate.getDate());
                if (aNext < today) {
                    aNext.setFullYear(today.getFullYear() + 1);
                }
                const diffDays = Math.ceil((aNext - today) / (1000 * 60 * 60 * 24));
                if (diffDays >= 0 && diffDays <= reminderFilterDays) {
                    list.push({
                        name: m.name,
                        type: 'Anniversary',
                        date: aNext,
                        daysLeft: diffDays
                    });
                }
            }
        });
        
        list.sort((a, b) => a.daysLeft - b.daysLeft);
        
        if (list.length === 0) {
            target.innerHTML = `<div style="color:var(--color-text-muted); font-size:0.85rem; font-style:italic;">No upcoming birthdays or anniversaries in next ${reminderFilterDays} days.</div>`;
            return;
        }
        
        list.forEach(item => {
            const div = document.createElement('div');
            div.className = 'reminder-item';
            const dateText = item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const daysText = item.daysLeft === 0 ? 'Today!' : `in ${item.daysLeft} days`;
            div.innerHTML = `
                <div class="reminder-details">
                    <h4>${item.name}</h4>
                    <p>${item.type} • ${dateText} (${daysText})</p>
                </div>
                <span class="reminder-badge">${item.type}</span>
            `;
            target.appendChild(div);
        });
    };

    // Set up reminder filter tabs click listeners
    document.querySelectorAll('.days-filter-tabs .filter-tab').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.days-filter-tabs .filter-tab').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            reminderFilterDays = parseInt(e.target.getAttribute('data-days'));
            renderUpcomingReminders();
        });
    });

    // ==========================================
    // BULK SEND MODAL (Email / SMS / Both)
    // ==========================================
    let bulkSendChannel = 'email';
    const bulkSendModal = document.getElementById('bulk-send-modal');
    const bulkSendBackdrop = document.getElementById('bulk-send-backdrop');

    const DEFAULT_BULK_MESSAGES = {
        email: 'Dear {name},\n\nWe are reaching out with a warm celebration message for your upcoming {event}! May this special day be filled with God\'s grace and blessing.\n\nWith love,\nFathers House Church',
        sms: 'Hi {name}! 🎉 Fathers House Church is celebrating your {event} with you! God bless you. - Pastor Lufuno',
        whatsapp: 'Hi {name}! 🟢 Fathers House Church wishes you a beautiful and blessed {event}! "The Lord bless you and keep you" - Num 6:24. - Pastor Lufuno',
        both: 'Dear {name},\n\nWe celebrate your upcoming {event} with you! Wishing you a day full of God\'s favour. 🙏\n\nFathers House Church'
    };

    const buildReminderList = () => {
        const list = [];
        const today = new Date("2026-06-19");
        members.forEach(m => {
            if (m.birthday) {
                const bdate = new Date(m.birthday);
                const bNext = new Date(today.getFullYear(), bdate.getMonth(), bdate.getDate());
                if (bNext < today) bNext.setFullYear(today.getFullYear() + 1);
                const diffDays = Math.ceil((bNext - today) / (1000 * 60 * 60 * 24));
                if (diffDays >= 0 && diffDays <= reminderFilterDays) {
                    list.push({ name: m.name, email: m.email, phone: m.phone, type: 'Birthday', daysLeft: diffDays });
                }
            }
            if (m.anniversary) {
                const adate = new Date(m.anniversary);
                const aNext = new Date(today.getFullYear(), adate.getMonth(), adate.getDate());
                if (aNext < today) aNext.setFullYear(today.getFullYear() + 1);
                const diffDays = Math.ceil((aNext - today) / (1000 * 60 * 60 * 24));
                if (diffDays >= 0 && diffDays <= reminderFilterDays) {
                    list.push({ name: m.name, email: m.email, phone: m.phone, type: 'Anniversary', daysLeft: diffDays });
                }
            }
        });
        return list;
    };

    const openBulkSendModal = () => {
        const list = buildReminderList();
        // Update subtitle
        document.getElementById('bulk-send-subtitle').innerHTML = `<strong>${list.length}</strong> recipient${list.length !== 1 ? 's' : ''} in next <strong>${reminderFilterDays}</strong> days`;
        document.getElementById('bulk-days-label').textContent = reminderFilterDays;
        // Set default message
        document.getElementById('bulk-message-textarea').value = DEFAULT_BULK_MESSAGES[bulkSendChannel];
        // Render recipients
        renderBulkRecipients(list);
        bulkSendModal.style.display = 'flex';
        setTimeout(() => bulkSendModal.classList.add('visible'), 10);
    };

    const closeBulkSendModal = () => {
        bulkSendModal.classList.remove('visible');
        setTimeout(() => { bulkSendModal.style.display = 'none'; }, 250);
    };

    const renderBulkRecipients = (list) => {
        const recipientsEl = document.getElementById('bulk-recipients-list');
        if (!recipientsEl) return;
        if (list.length === 0) {
            recipientsEl.innerHTML = `<div class="bulk-no-recipients"><i class="fa-regular fa-calendar-xmark"></i><span>No upcoming milestones in this period.</span></div>`;
            return;
        }
        recipientsEl.innerHTML = list.map((item, idx) => `
            <div class="bulk-recipient-chip" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: #f8fafc; border: 1px solid var(--color-crm-border); border-radius: var(--border-radius-sm); margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 10px; flex-grow: 1;">
                    <input type="checkbox" class="bulk-recipient-checkbox" data-index="${idx}" checked style="width: 18px; height: 18px; accent-color: var(--color-crm-blue); cursor: pointer;">
                    <div class="bulk-recipient-avatar" style="width: 32px; height: 32px; background: #e2e8f0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.85rem;">${item.name.charAt(0)}</div>
                    <div class="bulk-recipient-info">
                        <span class="bulk-recipient-name" style="font-weight: 600; font-size: 0.9rem; display: block;">${item.name}</span>
                        <span class="bulk-recipient-meta" style="font-size: 0.75rem; color: var(--color-text-muted);">${item.type} • ${item.daysLeft === 0 ? 'Today!' : `in ${item.daysLeft}d`}</span>
                    </div>
                </div>
                <div class="bulk-recipient-channels">
                    ${(bulkSendChannel === 'email' || bulkSendChannel === 'both') ? `<span class="ch-badge email" style="background:#eff6ff; color:#3b82f6; padding:4px 8px; border-radius:4px; font-size:0.75rem; margin-right:4px;"><i class="fa-regular fa-envelope"></i></span>` : ''}
                    ${(bulkSendChannel === 'sms' || bulkSendChannel === 'both') ? `<span class="ch-badge sms" style="background:#ecfdf5; color:#10b981; padding:4px 8px; border-radius:4px; font-size:0.75rem; margin-right:4px;"><i class="fa-solid fa-mobile-screen-button"></i></span>` : ''}
                    ${(bulkSendChannel === 'whatsapp') ? `<span class="ch-badge whatsapp" style="background:#e8fbf0; color:#25d366; padding:4px 8px; border-radius:4px; font-size:0.75rem;"><i class="fa-brands fa-whatsapp"></i></span>` : ''}
                </div>
            </div>
        `).join('');
    };

    // Bulk Send button → open modal
    document.getElementById('btn-bulk-send-reminders').addEventListener('click', openBulkSendModal);

    // Close handlers
    document.getElementById('bulk-send-close').addEventListener('click', closeBulkSendModal);
    document.getElementById('btn-cancel-bulk-send').addEventListener('click', closeBulkSendModal);
    bulkSendBackdrop.addEventListener('click', closeBulkSendModal);

    // Channel tab switching
    document.querySelectorAll('.bulk-ch-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.bulk-ch-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            bulkSendChannel = tab.getAttribute('data-channel');
            // Update channel label
            const labels = { email: 'via Email', sms: 'via SMS', whatsapp: 'via WhatsApp', both: 'via Email + SMS' };
            document.getElementById('bulk-channel-label').textContent = labels[bulkSendChannel];
            // Update message template
            document.getElementById('bulk-message-textarea').value = DEFAULT_BULK_MESSAGES[bulkSendChannel];
            // Re-render recipients with updated channel icons
            renderBulkRecipients(buildReminderList());
        });
    });

    // Confirm & Send
    document.getElementById('btn-confirm-bulk-send').addEventListener('click', () => {
        const list = buildReminderList();
        if (list.length === 0) {
            showNotification('No Messages Sent', `No upcoming milestones in the next ${reminderFilterDays} days.`);
            closeBulkSendModal();
            return;
        }

        // Filter based on checked checkboxes
        const checkboxes = document.querySelectorAll('.bulk-recipient-checkbox');
        const selectedList = [];
        checkboxes.forEach(cb => {
            if (cb.checked) {
                const idx = parseInt(cb.getAttribute('data-index'));
                selectedList.push(list[idx]);
            }
        });

        if (selectedList.length === 0) {
            showNotification('No Recipients Selected', 'Please select at least one member to send messages to.');
            return;
        }

        const messageTemplate = document.getElementById('bulk-message-textarea').value.trim();
        const channelLabel = { email: 'Email', sms: 'SMS', whatsapp: 'WhatsApp', both: 'Email + SMS' }[bulkSendChannel];
        const sendIcon = { email: '📧', sms: '📱', whatsapp: '🟢💬', both: '📧📱' }[bulkSendChannel];

        closeBulkSendModal();
        showNotification(
            `${sendIcon} Bulk ${channelLabel} Dispatched`,
            `Successfully sent ${selectedList.length} personalized ${channelLabel} message${selectedList.length > 1 ? 's' : ''} to: ${selectedList.map(l => l.name).join(', ')}.\n\nMessages delivered via ${channelLabel} channel for members with upcoming ${selectedList.map(l => l.type).join(' / ')} celebrations.`
        );
    });

    const renderPastoralCare = () => {
        renderAIIntakeQueue();
        renderFollowupTimelines();
        renderHouseholds();
        renderCareMatrix();
    };

    const renderAIIntakeQueue = () => {
        const target = document.getElementById('care-queue-target');
        const countBadge = document.getElementById('care-queue-count');
        if (!target || !countBadge) return;
        target.innerHTML = '';

        const pending = pastoralIntakes.filter(pi => pi.status === 'Pending Approval');
        countBadge.textContent = pending.length;

        if (pending.length === 0) {
            target.innerHTML = '<div style="color:var(--color-text-muted); font-size:0.85rem; font-style:italic; text-align:center; padding:20px 0;">All care intakes have been reviewed and approved. Queue is clear!</div>';
            return;
        }

        pending.forEach(pi => {
            const emergencyBadgeClass = `emergency-${pi.emergencyLevel.toLowerCase()}`;
            const item = document.createElement('div');
            item.className = 'ai-queue-item';
            item.innerHTML = `
                <div class="queue-item-header">
                    <div class="queue-meta">
                        <h4>${pi.name}</h4>
                        <p>${pi.category} • ${formatDateString(pi.submittedAt)}</p>
                    </div>
                    <span class="emergency-badge ${emergencyBadgeClass}">${pi.emergencyLevel}</span>
                </div>
                <div class="queue-text-block">
                    "${pi.requestText}"
                </div>
                <div class="ai-draft-box">
                    <label><i class="fa-solid fa-wand-magic-sparkles"></i> AI Copilot Draft Response</label>
                    <textarea class="ai-draft-textarea" data-id="${pi.id}">${pi.aiDraft}</textarea>
                </div>
                <div class="queue-item-actions">
                    <button class="btn btn-primary btn-approve-copilot" data-id="${pi.id}">
                        <i class="fa-regular fa-circle-check"></i> Approve & Send Follow-up
                    </button>
                </div>
            `;
            target.appendChild(item);
        });

        target.querySelectorAll('.btn-approve-copilot').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-approve-copilot');
                const id = parseInt(button.getAttribute('data-id'));
                const textarea = target.querySelector(`textarea[data-id="${id}"]`);
                const approvedText = textarea.value.trim();
                approveIntake(id, approvedText);
            });
        });
    };

    const approveIntake = (id, responseText) => {
        const intake = pastoralIntakes.find(pi => pi.id === id);
        if (!intake) return;

        intake.status = 'Approved';
        intake.aiDraft = responseText;

        const nextFollowupId = followups.length > 0 ? Math.max(...followups.map(f => f.id)) + 1 : 1;
        let steps = [];
        const today = new Date("2026-06-19");
        
        const formatDateOffset = (offsetDays) => {
            const d = new Date(today);
            d.setDate(today.getDate() + offsetDays);
            return d.toISOString().split('T')[0];
        };

        if (intake.category === 'Bereavement/Grief Support') {
            steps = [
                { label: 'Day 1: Condolence Message', date: formatDateOffset(0), status: 'Completed' },
                { label: 'Day 3: Practical Support (Meals/Visits)', date: formatDateOffset(3), status: 'Current' },
                { label: 'Week 2: Grief Support Group Routing', date: formatDateOffset(14), status: 'Pending' },
                { label: 'Month 1: Remembrance Check-in', date: formatDateOffset(30), status: 'Pending' }
            ];
        } else {
            steps = [
                { label: 'Day 1: Initial Prayer Response', date: formatDateOffset(0), status: 'Completed' },
                { label: 'Week 1: Systematic Follow-Up Text', date: formatDateOffset(7), status: 'Current' },
                { label: 'Week 2: Secondary Pastoral Call', date: formatDateOffset(14), status: 'Pending' },
                { label: 'Month 1: Personal Conversational Check-in', date: formatDateOffset(30), status: 'Pending' }
            ];
        }

        followups.push({
            id: nextFollowupId,
            intakeId: id,
            name: intake.name,
            email: intake.email,
            category: intake.category,
            steps: steps
        });

        saveData();
        renderPastoralCare();
        showNotification("Intake Response Approved", `Approved draft sent to ${intake.name}. Follow-up timeline successfully initialized.`);
    };

    const renderFollowupTimelines = () => {
        const target = document.getElementById('care-timelines-target');
        if (!target) return;
        target.innerHTML = '';

        if (followups.length === 0) {
            target.innerHTML = '<div style="color:var(--color-text-muted); font-size:0.85rem; font-style:italic; text-align:center; padding:20px 0;">No active follow-up sequences currently running.</div>';
            return;
        }

        const sortedFollowups = [...followups].reverse();

        sortedFollowups.forEach(f => {
            const card = document.createElement('div');
            card.className = 'timeline-card';
            
            let stepsHtml = '';
            let nextActionBtnHtml = '';
            
            const currentStepIndex = f.steps.findIndex(s => s.status === 'Current');
            const hasPendingSteps = currentStepIndex !== -1;

            if (hasPendingSteps) {
                const nextStep = f.steps[currentStepIndex];
                nextActionBtnHtml = `
                    <button class="btn-send-step" data-id="${f.id}" data-step-index="${currentStepIndex}" style="margin-top:12px; width:100%; font-family:var(--font-heading); font-weight:600; padding:6px; cursor:pointer;">
                        Trigger "${nextStep.label}"
                    </button>
                `;
            } else {
                nextActionBtnHtml = `<div style="color:#10b981; font-size:0.75rem; font-weight:700; text-align:center; margin-top:10px;"><i class="fa-solid fa-circle-check"></i> Sequence Completed</div>`;
            }

            f.steps.forEach(s => {
                const stepClass = s.status === 'Completed' ? 'completed' : (s.status === 'Current' ? 'current' : '');
                stepsHtml += `
                    <div class="timeline-step ${stepClass}">
                        <span class="step-label">${s.label}</span>
                        <span class="step-date">${formatDateString(s.date)}</span>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="timeline-card-header" style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid #f1f5f9; padding-bottom:8px;">
                      <div>
                          <h4 style="font-weight:700; font-size:0.9rem;">${f.name}</h4>
                          <p style="font-size:0.75rem; color:var(--color-text-muted);">${f.category}</p>
                      </div>
                      <span style="font-size:0.7rem; background:#eff6ff; color:#2563eb; padding:2px 8px; border-radius:4px; font-weight:600;">Active</span>
                </div>
                <div class="timeline-steps" style="margin-top:12px;">
                    ${stepsHtml}
                </div>
                ${nextActionBtnHtml}
            `;
            target.appendChild(card);
        });

        target.querySelectorAll('.btn-send-step').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-send-step');
                const id = parseInt(button.getAttribute('data-id'));
                const stepIndex = parseInt(button.getAttribute('data-step-index'));
                triggerTimelineStep(id, stepIndex);
            });
        });
    };

    const triggerTimelineStep = (id, stepIndex) => {
        const followup = followups.find(f => f.id === id);
        if (!followup) return;

        const currentStep = followup.steps[stepIndex];
        currentStep.status = 'Completed';
        currentStep.date = new Date("2026-06-19").toISOString().split('T')[0];

        if (stepIndex + 1 < followup.steps.length) {
            followup.steps[stepIndex + 1].status = 'Current';
        } else {
            // Check if this was the last step and set it completed
        }

        saveData();
        renderPastoralCare();
        showNotification("Follow-up Step Complete", `Triggered and completed: "${currentStep.label}" for ${followup.name}.`);
    };

    const renderHouseholds = () => {
        const target = document.getElementById('care-households-target');
        if (!target) return;
        target.innerHTML = '';

        if (households.length === 0) {
            target.innerHTML = '<div style="color:var(--color-text-muted); font-size:0.85rem; font-style:italic;">No households mapped yet.</div>';
            return;
        }

        households.forEach(h => {
            const headMember = members.find(m => m.id === h.headId);
            const headName = headMember ? headMember.name : 'Unknown';

            let membersHtml = '';
            h.members.forEach(mid => {
                const m = members.find(mem => mem.id === mid);
                if (m) {
                    const role = h.relations[mid] || 'Member';
                    membersHtml += `
                        <li class="family-member-item">
                            <span>${m.name} (ID: ${m.id})</span>
                            <span class="family-role-badge">${role}</span>
                        </li>
                    `;
                }
            });

            const card = document.createElement('div');
            card.className = 'household-card';
            card.innerHTML = `
                <h4 style="font-size:0.9rem; font-weight:700;">
                    <span><i class="fa-solid fa-people-roof" style="color:var(--color-accent); margin-right:6px;"></i> ${h.name}</span>
                    <button class="btn btn-secondary btn-delete-household" data-id="${h.id}" style="padding:2px 6px; font-size:0.65rem; color:#ef4444; border-color:rgba(239,68,68,0.1); background:none; height:auto; cursor:pointer;">Delete</button>
                </h4>
                <div style="font-size:0.75rem; color:var(--color-text-muted); margin: 6px 0 10px 0;">
                    <strong>Head of House:</strong> ${headName}
                </div>
                <ul class="family-members-list">
                    ${membersHtml}
                </ul>
            `;
            target.appendChild(card);
        });

        target.querySelectorAll('.btn-delete-household').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-delete-household');
                const id = parseInt(button.getAttribute('data-id'));
                if (confirm("Are you sure you want to delete this household mapping? Family associations will be unlinked.")) {
                    const idx = households.findIndex(h => h.id === id);
                    if (idx !== -1) {
                        households.splice(idx, 1);
                        saveData();
                        renderHouseholds();
                    }
                }
            });
        });
    };

    document.getElementById('btn-create-household').addEventListener('click', () => {
        const name = prompt("Enter Household Name (e.g. Nethengwe Family):");
        if (!name) return;

        let optionsText = '';
        members.forEach(m => {
            optionsText += `${m.id}: ${m.name}\n`;
        });

        const headIdStr = prompt(`Select Head of Household (Enter Member ID):\n\n${optionsText}`);
        const headId = parseInt(headIdStr);
        const headMember = members.find(m => m.id === headId);

        if (!headMember) {
            alert("Invalid Member ID. Household creation cancelled.");
            return;
        }

        const membersListStr = prompt("Enter other family Member IDs to link (comma separated, e.g. 1002, 1003) or leave blank:");
        const membersList = [headId];
        const relations = { [headId]: "Head" };

        if (membersListStr) {
            membersListStr.split(',').forEach(idText => {
                const mid = parseInt(idText.trim());
                const m = members.find(mem => mem.id === mid);
                if (m && !membersList.includes(mid)) {
                    membersList.push(mid);
                    const role = prompt(`What is ${m.name}'s relation to Head of House (e.g. Spouse, Child)?`) || 'Member';
                    relations[mid] = role;
                }
              });
          }

          const nextHouseId = households.length > 0 ? Math.max(...households.map(h => h.id)) + 1 : 1;
          households.push({
              id: nextHouseId,
              name: name,
              headId: headId,
              members: membersList,
              relations: relations
          });

          saveData();
          renderHouseholds();
          showNotification("Household Created", `Successfully mapped ${name} with ${membersList.length} linked members.`);
      });

      const renderCareMatrix = () => {
          const target = document.getElementById('care-matrix-target');
          if (!target) return;
          target.innerHTML = '';

          const roles = [
              { key: 'coordinators', label: 'Care Coordinator', icon: 'fa-user-gear', cardClass: 'volunteer' },
              { key: 'pastors', label: 'Care Pastor', icon: 'fa-user-tie', cardClass: 'pastor' },
              { key: 'leaders', label: 'Care Team Leader', icon: 'fa-user-shield', cardClass: 'leader' },
              { key: 'volunteers', label: 'Care Volunteer', icon: 'fa-hands-holding-child', cardClass: 'volunteer' },
              { key: 'responders', label: 'Crisis Responder', icon: 'fa-kit-medical', cardClass: 'crisis' }
          ];

          roles.forEach(r => {
              const assignedIds = careTeam[r.key] || [];
              let namesHtml = '';
              
              if (assignedIds.length === 0) {
                  namesHtml = `<div style="font-size:0.75rem; color:var(--color-text-muted); font-style:italic;">No assignees.</div>`;
              } else {
                  assignedIds.forEach(id => {
                      const m = members.find(mem => mem.id === id);
                      if (m) {
                          namesHtml += `
                              <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.8rem; background:#f1f5f9; padding:4px 8px; border-radius:4px; margin-bottom:4px;">
                                  <span>${m.name}</span>
                                  <button class="btn-remove-assignee" data-role="${r.key}" data-id="${id}" style="background:none; border:none; color:#ef4444; cursor:pointer;"><i class="fa-solid fa-times"></i></button>
                              </div>
                          `;
                      }
                  });
              }

              let selectOpts = '<option value="">+ Assign Member...</option>';
              members.forEach(m => {
                  if (!assignedIds.includes(m.id)) {
                      selectOpts += `<option value="${m.id}">${m.name}</option>`;
                  }
              });

              const card = document.createElement('div');
              card.className = `care-role-card ${r.cardClass}`;
              card.innerHTML = `
                  <h4 style="display:flex; align-items:center; gap:6px; font-size:0.9rem; font-weight:700;">
                      <i class="fa-solid ${r.icon}" style="color:var(--color-primary-light);"></i> ${r.label}
                  </h4>
                  <div style="margin:10px 0; max-height: 120px; overflow-y: auto;">
                      ${namesHtml}
                  </div>
                  <select class="care-role-select" data-role="${r.key}">
                      ${selectOpts}
                  </select>
              `;
              target.appendChild(card);
          });

          target.querySelectorAll('.care-role-select').forEach(sel => {
              sel.addEventListener('change', (e) => {
                  const roleKey = e.target.getAttribute('data-role');
                  const memberId = parseInt(e.target.value);
                  if (memberId) {
                      if (!careTeam[roleKey]) careTeam[roleKey] = [];
                      careTeam[roleKey].push(memberId);
                      saveData();
                      renderCareMatrix();
                  }
              });
          });

          target.querySelectorAll('.btn-remove-assignee').forEach(btn => {
              btn.addEventListener('click', (e) => {
                  const button = e.target.closest('.btn-remove-assignee');
                  const roleKey = button.getAttribute('data-role');
                  const memberId = parseInt(button.getAttribute('data-id'));
                  
                  const index = careTeam[roleKey].indexOf(memberId);
                  if (index !== -1) {
                      careTeam[roleKey].splice(index, 1);
                      saveData();
                      renderCareMatrix();
                  }
              });
          });
      };

    // Helpers
    function formatDateString(dateStr) {
        if (!dateStr) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    }

    // ==========================================
    // 3D INTERACTIVE HERO CAROUSEL LOGIC
    // ==========================================
    const showcase3d = document.getElementById('hero-3d-showcase');
    const carousel3d = document.getElementById('hero-3d-carousel');
    const cards3d = document.querySelectorAll('.hero-3d-card');

    if (showcase3d && carousel3d && cards3d.length > 0) {
        const cardCount = cards3d.length;
        const angleUnit = 360 / cardCount;
        const translateZValue = 180; // Distance of cards from center of rotation

        // Position cards in a circle in 3D space
        cards3d.forEach((card, index) => {
            const angle = index * angleUnit;
            card.style.transform = `rotateY(${angle}deg) translateZ(${translateZValue}px)`;
        });

        let isDragging = false;
        let isHovered = false;
        let startX = 0;
        let currentRotation = 0;
        let autoRotateSpeed = -0.15; // Degrees to rotate per frame
        let velocity = 0;
        let lastX = 0;
        let lastTime = 0;

        let pitch = 0;
        let targetPitch = 0;
        let yaw = 0;
        let targetYaw = 0;

        // Interaction state handlers
        showcase3d.addEventListener('mouseenter', () => {
            isHovered = true;
        });

        showcase3d.addEventListener('mouseleave', () => {
            isHovered = false;
            targetPitch = 0;
            targetYaw = 0;
            velocity = 0;
            if (showcase3d) showcase3d.style.cursor = 'grab';
        });

        showcase3d.addEventListener('mousemove', (e) => {
            if (!isHovered) return;
            const rect = showcase3d.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            targetPitch = -(y / (rect.height / 2)) * 12; // Tilt up to 12 degrees vertically
            targetYaw = (x / (rect.width / 2)) * 12;     // Tilt up to 12 degrees horizontally
        });

        // Mouse Drag Controls
        showcase3d.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            lastX = e.clientX;
            lastTime = performance.now();
            velocity = 0;
            showcase3d.style.cursor = 'grabbing';
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const deltaX = e.clientX - startX;
            startX = e.clientX;

            const sensitivity = 0.4;
            currentRotation += deltaX * sensitivity;

            // Calculate instantaneous velocity for inertia
            const now = performance.now();
            const dt = now - lastTime;
            if (dt > 0) {
                velocity = ((e.clientX - lastX) * sensitivity) / dt * 16.67; // Normalized to ~60fps
            }
            lastX = e.clientX;
            lastTime = now;
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                if (showcase3d) showcase3d.style.cursor = 'grab';
            }
        });

        // Touch Drag Controls (Mobile Devices)
        showcase3d.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].clientX;
            lastX = e.touches[0].clientX;
            lastTime = performance.now();
            velocity = 0;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const deltaX = e.touches[0].clientX - startX;
            startX = e.touches[0].clientX;

            const sensitivity = 0.5;
            currentRotation += deltaX * sensitivity;

            const now = performance.now();
            const dt = now - lastTime;
            if (dt > 0) {
                velocity = ((e.touches[0].clientX - lastX) * sensitivity) / dt * 16.67;
            }
            lastX = e.touches[0].clientX;
            lastTime = now;
        });

        window.addEventListener('touchend', () => {
            if (isDragging) {
                isDragging = false;
            }
        });

        // Main Animation Loop
        function animate3d() {
            // Apply smooth tilting interpolation (lerp)
            pitch += (targetPitch - pitch) * 0.1;
            yaw += (targetYaw - yaw) * 0.1;

            if (!isDragging) {
                if (isHovered) {
                    // Decay velocity while hovered
                    velocity *= 0.9;
                    currentRotation += velocity;
                } else {
                    // Apply drag velocity friction or auto-rotation
                    if (Math.abs(velocity) > 0.02) {
                        currentRotation += velocity;
                        velocity *= 0.95;
                    } else {
                        currentRotation += autoRotateSpeed;
                    }
                }
            }

            // Apply transforms (combining yaw with current rotation creates responsive parallax)
            carousel3d.style.transform = `rotateX(${pitch}deg) rotateY(${currentRotation + yaw}deg)`;

            requestAnimationFrame(animate3d);
        }

        // Initialize animation loop
        if (showcase3d) showcase3d.style.cursor = 'grab';
        requestAnimationFrame(animate3d);
    }
});

// --- NEW REDESIGN LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // Fullscreen Bible App
    const fullscreenBtn = document.getElementById('fullscreen-bible-btn');
    const bibleCard = document.getElementById('bible-card');

    if (fullscreenBtn && bibleCard) {
        fullscreenBtn.addEventListener('click', () => {
            bibleCard.classList.toggle('fullscreen-mode');
            if (bibleCard.classList.contains('fullscreen-mode')) {
                fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i> Exit Full Screen';
            } else {
                fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i> Full Screen';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#' || targetId === '') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
