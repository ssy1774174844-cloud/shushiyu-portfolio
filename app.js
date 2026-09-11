const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));

fetch('data/portfolio.json', {cache: 'no-store'})
  .then((response) => { if (!response.ok) throw new Error('无法读取公开履历数据'); return response.json(); })
  .then((data) => {
    const person = data['个人信息']; const education = data['教育背景'];
    $('#name').textContent = person['姓名'] || '个人履历';
    document.title = `${person['姓名'] || '个人'} · 公开履历`;
    $('#footer-name').textContent = person['姓名'] || '';
    $('#brand-name').textContent = person['姓名'] || '个人履历';
    $('#identity').textContent = `${education['学校']} · ${education['学院']} · ${education['专业']}`;
    $('#intro').textContent = data['个人简介'];
    $('#education').innerHTML = `<h3>${escapeHtml(education['学校'])}</h3><p>${escapeHtml(education['专业'])} · ${escapeHtml(education['学历'])}</p><p>${escapeHtml(education['时间'])}</p><p class="muted">主修课程：${escapeHtml(education['课程'])}</p>`;
    $('#academic').innerHTML = `<p>${escapeHtml(data['学业数据'])}</p><p class="muted small">${escapeHtml(data['学业数据说明'])}</p>`;
    $('#strengths').textContent = data['个人优势'];
    $('#skills').innerHTML = data['证书与技能'].map((item) => `<span>${escapeHtml(item)}</span>`).join('');
    $('#experience-list').innerHTML = data['实践经历'].map((item) => `<article><p class="time">${escapeHtml(item['时间'])}</p><div><h3>${escapeHtml(item['岗位'])}</h3><p>${escapeHtml(item['内容'])}</p></div></article>`).join('');
    $('#project-list').innerHTML = data['项目'].map((item) => `<article class="card"><p class="time">${escapeHtml(item['时间'])}</p><h3>${escapeHtml(item['标题'])}</h3><p>${escapeHtml(item['描述'])}</p><div class="chips">${item['标签'].map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div></article>`).join('');
    $('#honor-list').innerHTML = data['荣誉奖项'].map((item) => `<li>${escapeHtml(item)}</li>`).join('');
    $('#gallery').innerHTML = data['精选图片'].map((item) => `<figure><img loading="lazy" src="assets/images/${encodeURIComponent(item['文件'])}" alt="${escapeHtml(item['说明'])}"><figcaption>${escapeHtml(item['说明'])}</figcaption></figure>`).join('');
    $('#contact-links').innerHTML = (person['邮箱'] ? `<a href="mailto:${encodeURIComponent(person['邮箱'])}">${escapeHtml(person['邮箱'])}</a>` : '') + (person['电话'] ? `<a href="tel:${escapeHtml(person['电话'])}">${escapeHtml(person['电话'])}</a>` : '');
    document.querySelectorAll('.hero-actions a').forEach(a => { a.href += '?v=' + encodeURIComponent(data['更新时间']); });
    $('#updated').textContent = `公开页面更新于 ${data['更新时间']}`;
  })
  .catch((error) => { document.querySelector('main').innerHTML = `<p class="load-error">${escapeHtml(error.message)}</p>`; });

$('#year').textContent = new Date().getFullYear();
