"use strict";

const jobs = [
  {
    id: 1,
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "none",
  },
  {
    id: 2,
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description:
      "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    status: "none",
  },
  {
    id: 3,
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description:
      "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "none",
  },
  {
    id: 4,
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description:
      "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "none",
  },
  {
    id: 5,
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description:
      "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    status: "none",
  },
  {
    id: 6,
    companyName: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description:
      "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
    status: "none",
  },
  {
    id: 7,
    companyName: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description:
      "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
    status: "none",
  },
  {
    id: 8,
    companyName: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
    status: "none",
  },
];

let activeTab = "all";

const jobListEl = document.getElementById("job-list");
const emptyStateEl = document.getElementById("empty-state");
const jobsCountEl = document.getElementById("jobs-count");
const statTotalEl = document.getElementById("stat-total");
const statInterviewEl = document.getElementById("stat-interview");
const statRejectedEl = document.getElementById("stat-rejected");
const tabButtons = document.querySelectorAll(".tab");

const STATUS_LABEL = {
  none: "NOT APPLIED",
  interview: "INTERVIEW",
  rejected: "REJECTED",
};
const STATUS_CLASS = {
  none: "status-not-applied",
  interview: "status-interview",
  rejected: "status-rejected",
};

function getVisibleJobs() {
  if (activeTab === "all") return jobs;
  return jobs.filter((job) => job.status === activeTab);
}

function updateDashboard() {
  statTotalEl.textContent = jobs.length;
  statInterviewEl.textContent = jobs.filter(
    (j) => j.status === "interview"
  ).length;
  statRejectedEl.textContent = jobs.filter(
    (j) => j.status === "rejected"
  ).length;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function createJobCard(job) {
  const card = document.createElement("article");
  card.className = "job-card";
  card.dataset.id = String(job.id);

  card.innerHTML = `
    <div class="job-card-head">
      <div>
        <h3 class="job-company">${escapeHtml(job.companyName)}</h3>
        <p class="job-position">${escapeHtml(job.position)}</p>
      </div>
      <button class="delete-btn" data-action="delete" aria-label="Delete ${escapeHtml(
        job.companyName
      )} listing" title="Delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
          stroke-linejoin="round" aria-hidden="true">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>
    </div>

    <div class="job-meta">
      <span>${escapeHtml(job.location)}</span>
      <span class="dot">&bull;</span>
      <span>${escapeHtml(job.type)}</span>
      <span class="dot">&bull;</span>
      <span>${escapeHtml(job.salary)}</span>
    </div>

    <div>
      <span class="status-badge ${STATUS_CLASS[job.status]}">${
    STATUS_LABEL[job.status]
  }</span>
    </div>

    <p class="job-description">${escapeHtml(job.description)}</p>

    <div class="job-actions">
      <button class="action-btn action-interview ${
        job.status === "interview" ? "is-active" : ""
      }" data-action="interview">INTERVIEW</button>
      <button class="action-btn action-rejected ${
        job.status === "rejected" ? "is-active" : ""
      }" data-action="rejected">REJECTED</button>
    </div>
  `;

  return card;
}

function render() {
  const visible = getVisibleJobs();

  jobListEl.innerHTML = "";

  if (visible.length === 0) {
    jobListEl.hidden = true;
    emptyStateEl.hidden = false;
  } else {
    jobListEl.hidden = false;
    emptyStateEl.hidden = true;
    visible.forEach((job) => jobListEl.appendChild(createJobCard(job)));
  }

  const noun = visible.length === 1 ? "job" : "jobs";
  jobsCountEl.textContent = `${visible.length} ${noun}`;

  updateDashboard();
}

function setActiveTab(tab) {
  activeTab = tab;
  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === tab;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });
  render();
}

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
});

jobListEl.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const card = button.closest(".job-card");
  if (!card) return;

  const id = Number(card.dataset.id);
  const job = jobs.find((j) => j.id === id);
  if (!job) return;

  const action = button.dataset.action;

  if (action === "delete") {
    const index = jobs.findIndex((j) => j.id === id);
    if (index > -1) jobs.splice(index, 1);
    render();
    return;
  }

  if (action === "interview" || action === "rejected") {
    job.status = job.status === action ? "none" : action;
    render();
  }
});

render();
