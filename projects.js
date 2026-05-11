// 科技未来感主题 - JavaScript 交互

// 粒子背景系统
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 80;
    this.connectionDistance = 150;
    this.mouse = { x: null, y: null, radius: 150 };

    this.init();
    this.animate();
    this.setupEventListeners();
  }

  init() {
    this.resize();
    this.createParticles();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // 边界检测
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // 鼠标交互
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - particle.x;
        const dy = this.mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.mouse.radius) {
          const force = (this.mouse.radius - distance) / this.mouse.radius;
          const angle = Math.atan2(dy, dx);
          particle.vx -= Math.cos(angle) * force * 0.2;
          particle.vy -= Math.sin(angle) * force * 0.2;
        }
      }

      // 速度限制
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
      if (speed > 2) {
        particle.vx = (particle.vx / speed) * 2;
        particle.vy = (particle.vy / speed) * 2;
      }
    });
  }

  drawParticles() {
    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 217, 255, ${particle.opacity})`;
      this.ctx.fill();

      // 发光效果
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = 'rgba(0, 217, 255, 0.5)';
    });
  }

  drawConnections() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          const opacity = (1 - distance / this.connectionDistance) * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.drawConnections();
    this.drawParticles();
    requestAnimationFrame(() => this.animate());
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }
}

// 卡片 3D 倾斜效果
class Card3DEffect {
  constructor() {
    this.cards = document.querySelectorAll('.project-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  }

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  handleMouseLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }
}

// 导航栏滚动效果
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      this.navbar.style.padding = '1rem 0';
      this.navbar.style.background = 'rgba(10, 14, 26, 0.95)';
      this.navbar.style.boxShadow = '0 4px 20px rgba(0, 217, 255, 0.1)';
    } else {
      this.navbar.style.padding = '1.5rem 0';
      this.navbar.style.background = 'rgba(10, 14, 26, 0.8)';
      this.navbar.style.boxShadow = 'none';
    }

    this.lastScroll = currentScroll;
  }
}

// 平滑滚动
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// 页面加载动画
class PageLoader {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener('load', () => {
      document.body.style.opacity = '0';
      setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
      }, 100);
    });
  }
}

// 年份自动更新
function updateYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// 初始化所有功能
function init() {
  // 粒子背景
  const canvas = document.getElementById('particles');
  if (canvas) {
    new ParticleSystem(canvas);
  }

  // 卡片 3D 效果
  new Card3DEffect();

  // 导航栏滚动
  new NavbarScroll();

  // 平滑滚动
  new SmoothScroll();

  // 页面加载动画
  new PageLoader();

  // 更新年份
  updateYear();

  // 性能优化：减少重绘
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  });
}

// WebMCP - 向 AI agent 暴露站点工具
class WebMCPProvider {
  constructor() {
    this.init();
  }

  init() {
    if (!navigator.modelContext) return;

    navigator.modelContext.provideContext({
      name: "Silentely Project Matrix",
      description: "Silentely 的个人项目矩阵主页，提供项目发现与导航工具。",
      tools: [
        {
          name: "list_projects",
          description: "列出所有可用项目，返回名称、描述、链接和技术栈。",
          inputSchema: {
            type: "object",
            properties: {},
            required: []
          },
          execute: async () => {
            return [
              { name: "eSIM 工具集", description: "Giffgaff / Simyo eSIM 管理工具", url: "https://esim.cosr.eu.org", repo: "https://github.com/Silentely/eSIM-Tools", tags: ["Serverless", "Netlify", "QR/LPA", "OAuth 2.0"] },
              { name: "Bili-Calendar", description: "B 站追番列表转 ICS 日历订阅", url: "https://calendar.cosr.eu.org", repo: "https://github.com/Silentely/Bili-Calendar", tags: ["PWA", "ICS", "Dark Mode", "Docker"] },
              { name: "AdBlock-Acceleration", description: "AdGuard / uBlock 去广告规则加速镜像", url: "https://raw.cosr.eu.org", repo: "https://github.com/Silentely/AdBlock-Acceleration", tags: ["CDN", "镜像冗余", "索引页"] },
              { name: "Demo 脚本工具箱", description: "系统优化、网络代理、Docker 等 Shell 脚本集合", url: null, repo: "https://github.com/Silentely/Demo", tags: ["Shell", "Linux"] },
              { name: "Nexus Terminal · 星枢终端", description: "现代化 Web SSH / RDP / VNC 远程连接客户端", url: null, repo: "https://github.com/Silentely/nexus-terminal", tags: ["SSH/SFTP", "RDP/VNC", "PWA", "2FA"] },
              { name: "fuckits", description: "自然语言转 Shell 命令的 AI CLI 工具", url: "https://fuckits.25500552.xyz/zh", repo: "https://github.com/Silentely/fuckits", tags: ["CLI", "Shell", "安全检测", "双语"] }
            ];
          }
        },
        {
          name: "get_project",
          description: "根据名称获取单个项目的详细信息。",
          inputSchema: {
            type: "object",
            properties: {
              name: { type: "string", description: "项目名称，如 'eSIM 工具集'、'Bili-Calendar' 等" }
            },
            required: ["name"]
          },
          execute: async (input) => {
            const projects = await this.getAllProjects();
            const project = projects.find(p => p.name.toLowerCase().includes(input.name.toLowerCase()));
            if (!project) return { error: `未找到名为 "${input.name}" 的项目` };
            return project;
          }
        }
      ]
    });
  }

  async getAllProjects() {
    return [
      { name: "eSIM 工具集", description: "Giffgaff / Simyo eSIM 管理工具，覆盖申请、更换与 LPA 激活码生成", url: "https://esim.cosr.eu.org", repo: "https://github.com/Silentely/eSIM-Tools", tags: ["Serverless", "Netlify", "QR/LPA", "OAuth 2.0"] },
      { name: "Bili-Calendar", description: "B 站追番列表转 ICS 日历订阅，支持主流日历应用", url: "https://calendar.cosr.eu.org", repo: "https://github.com/Silentely/Bili-Calendar", tags: ["PWA", "ICS", "Dark Mode", "Docker"] },
      { name: "AdBlock-Acceleration", description: "AdGuard / uBlock 去广告规则加速镜像与索引", url: "https://raw.cosr.eu.org", repo: "https://github.com/Silentely/AdBlock-Acceleration", tags: ["CDN", "镜像冗余", "索引页"] },
      { name: "Demo 脚本工具箱", description: "系统优化、网络代理、Docker 安装等 Shell 脚本集合", url: null, repo: "https://github.com/Silentely/Demo", tags: ["Shell", "Linux"] },
      { name: "Nexus Terminal · 星枢终端", description: "现代化 Web SSH / RDP / VNC 远程连接客户端", url: null, repo: "https://github.com/Silentely/nexus-terminal", tags: ["SSH/SFTP", "RDP/VNC", "PWA", "2FA"] },
      { name: "fuckits", description: "自然语言转 Shell 命令的 AI CLI 工具，内置安全检测", url: "https://fuckits.25500552.xyz/zh", repo: "https://github.com/Silentely/fuckits", tags: ["CLI", "Shell", "安全检测", "双语"] }
    ];
  }
}

// 初始化所有功能
function init() {
  // 粒子背景
  const canvas = document.getElementById('particles');
  if (canvas) {
    new ParticleSystem(canvas);
  }

  // 卡片 3D 效果
  new Card3DEffect();

  // 导航栏滚动
  new NavbarScroll();

  // 平滑滚动
  new SmoothScroll();

  // 页面加载动画
  new PageLoader();

  // 更新年份
  updateYear();

  // WebMCP
  new WebMCPProvider();

  // 性能优化：减少重绘
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        ticking = false;
      });
      ticking = true;
    }
  });
}

// DOM 加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
