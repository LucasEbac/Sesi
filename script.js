function setupCarousel(trackId, prevBtnId, nextBtnId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    let index = 0;

    function updateCarousel() {
        if (!track || !track.firstElementChild) return;
        const cardWidth = track.firstElementChild.getBoundingClientRect().width + 24;
        track.style.transform = `translateX(${-index * cardWidth}px)`;
    }

    if (nextBtn && prevBtn) {
        nextBtn.replaceWith(nextBtn.cloneNode(true));
        prevBtn.replaceWith(prevBtn.cloneNode(true));
        
        const newNextBtn = document.getElementById(nextBtnId);
        const newPrevBtn = document.getElementById(prevBtnId);

        newNextBtn.addEventListener('click', () => {
            if (!track.firstElementChild) return;
            const itemWidth = track.firstElementChild.getBoundingClientRect().width + 24;
            const visibleWidth = track.parentElement.getBoundingClientRect().width;
            const maxIndex = track.children.length - Math.floor(visibleWidth / itemWidth);
            if (index < maxIndex) {
                index++;
                updateCarousel();
            }
        });

        newPrevBtn.addEventListener('click', () => {
            if (index > 0) {
                index--;
                updateCarousel();
            }
        });
    }

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

async function fetchCourses() {
    const track = document.getElementById('course-track');
    
    const fallbackData = [
        {"id":1,"nomeCompleto":"Matemática para a Precisão: Medidas e Escalas na Metalurgia","nomeBreve":"Medidas e Escalas","descricao":"Aplicação de grandezas, proporções e escalas em processos de corte, furação e usinagem.","categoria":"Matemática","modalidade":"Online","cargaHoraria":20,"status":"Disponível","imagemUrl":"https://unsplash.com","dataDisponibilizacao":"2026-01-15T00:00:00","publicoAlvo":"Operadores de máquinas, torneiros mecânicos e caldeireiros."},
        {"id":2,"nomeCompleto":"Geometria e Modelagem no Design Têxtil","nomeBreve":"Geometria Têxtil","descricao":"Explora formas geométricas, simetria e padrões matemáticos presentes em tecidos e estampas.","categoria":"Matemática","modalidade":"Online","cargaHoraria":30,"status":"Disponível","imagemUrl":"https://unsplash.com","dataDisponibilizacao":"2026-02-10T00:00:00","publicoAlvo":"Designers de moda, modelistas e tecelões industriais."},
        {"id":3,"nomeCompleto":"Estatística e Controle de Qualidade na Production","nomeBreve":"Estatística de Produção","descricao":"Leitura e interpretação de dados de controle de qualidade e produtividade industrial.","categoria":"Matemática","modalidade":"Híbrido","cargaHoraria":25,"status":"Em breve","imagemUrl":"https://unsplash.com","dataDisponibilizacao":"2026-11-05T00:00:00","publicoAlvo":"Inspetores de qualidade e analistas de processos operacionais."},
        {"id":4,"nomeCompleto":"Física do Movimento e da Energia na Metalurgia","nomeBreve":"Física Metalúrgica","descricao":"Estudo de forças, atrito, calor e energia em máquinas, fornos e prensas industriais.","categoria":"Ciências da Natureza","modalidade":"Presencial","cargaHoraria":40,"status":"Disponível","imagemUrl":"https://unsplash.com","dataDisponibilizacao":"2026-03-20T00:00:00","publicoAlvo":"Trabalhadores de fundição, metalúrgicos e mecânicos de manutenção."},
        {"id":5,"nomeCompleto":"Química dos Materiais e Sustentabilidade","nomeBreve":"Química Sustentável","descricao":"Estudo das reações e propriedades dos materiais com foco em processos limpos.","categoria":"Ciências da Natureza","modalidade":"Híbrido","cargaHoraria":35,"status":"Encerrado","imagemUrl":"https://unsplash.com","dataDisponibilizacao":"2025-09-01T00:00:00","publicoAlvo":"Técnicos em química, engenheiros ambientais e gestores de resíduos."},
        {"id":6,"nomeCompleto":"Automação Industrial Celular","nomeBreve":"Automação Celular","descricao":"Princípios básicos de lógica digital e integração de células robóticas de manufatura.","categoria":"Tecnologia","modalidade":"Presencial","cargaHoraria":50,"status":"Disponível","imagemUrl":"https://unsplash.com","dataDisponibilizacao":"2026-04-12T00:00:00","publicoAlvo":"Técnicos de automação, eletricistas e programadores de CLP."}
    ];

    try {
        const response = await fetch('https://onrender.com');
        if (!response.ok) throw new Error('Erro no servidor');
        
        const data = await response.json();
        allCourses = data.resultados || [];
        filterAndRenderCourses();
    } catch (error) {
        console.warn(error);
        allCourses = fallbackData;
        filterAndRenderCourses();
    }
}

function filterAndRenderCourses() {
    const track = document.getElementById('course-track');
    const counter = document.getElementById('results-count');
    if (!track) return;
    
    const searchText = document.getElementById('search-input') ? document.getElementById('search-input').value.toLowerCase() : '';
    const selectedCat = document.getElementById('filter-category') ? document.getElementById('filter-category').value : '';
    const selectedMod = document.getElementById('filter-modality') ? document.getElementById('filter-modality').value : '';
    const selectedStat = document.getElementById('filter-status') ? document.getElementById('filter-status').value : '';

    const filtered = allCourses.filter(curso => {
        const matchesSearch = curso.nomeCompleto.toLowerCase().includes(searchText) || 
                              curso.nomeBreve.toLowerCase().includes(searchText);
        const matchesCat = selectedCat === "" || curso.categoria === selectedCat;
        const matchesMod = selectedMod === "" || curso.modalidade === selectedMod;
        const matchesStat = selectedStat === "" || curso.status === selectedStat;
        
        return matchesSearch && matchesCat && matchesMod && matchesStat;
    });

    if (counter) {
        counter.innerText = `${filtered.length} ${filtered.length === 1 ? 'curso encontrado' : 'cursos encontrados'}`;
    }
    
    track.innerHTML = '';
    track.style.transform = 'translateX(0px)';

    if (filtered.length === 0) {
        track.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search-minus"></i>
                <p>Nenhum curso corresponde aos critérios de pesquisa selecionados.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(curso => {
        const card = document.createElement('div');
        card.className = 'course-card';
        
        card.addEventListener('click', () => openFigmaDetailPage(curso));
        
        card.innerHTML = `
            <div class="card-bg" style="background-image: url('${curso.imagemUrl}');"></div>
            <span class="category-tag">${curso.categoria.toUpperCase()}</span>
            <div class="card-content">
                <h3>${curso.nomeCompleto}</h3>
                <p>${curso.descricao}</p>
            </div>
        `;
        track.appendChild(card);
    });

    setupCarousel('course-track', 'course-prev', 'course-next');
}

function openFigmaDetailPage(curso) {
    document.getElementById('landing-page-view').style.display = 'none';
    document.getElementById('student-area-view').style.display = 'none';
    const detailView = document.getElementById('course-detail-view');
    detailView.style.display = 'block';

    document.getElementById('detail-title').innerText = curso.nomeCompleto;
    document.getElementById('detail-category-badge').innerText = curso.categoria.toUpperCase();
    document.getElementById('detail-long-description').innerText = curso.descricao;
    document.getElementById('detail-image').src = curso.imagemUrl;
    document.getElementById('bottom-bar-course-title').innerText = curso.nomeCompleto;

    const dateStr = curso.dataDisponibilizacao ? new Date(curso.dataDisponibilizacao).toLocaleDateString('pt-BR') : '05/01/2026';
    document.getElementById('detail-start-date').innerText = dateStr;

    const highlights = document.querySelectorAll('.highlight-course-name');
    highlights.forEach(el => el.innerText = curso.nomeCompleto);

    window.scrollTo(0, 0);
}

function showLandingView() {
    document.getElementById('course-detail-view').style.display = 'none';
    document.getElementById('student-area-view').style.display = 'none';
    document.getElementById('landing-page-view').style.display = 'block';
    filterAndRenderCourses();
}

function openStudentView(event) {
    if (event) event.preventDefault();
    document.getElementById('landing-page-view').style.display = 'none';
    document.getElementById('course-detail-view').style.display = 'none';
    document.getElementById('student-area-view').style.display = 'flex';
    window.scrollTo(0, 0);
}

function switchToStudentFromRegistration() {
    closeRegistrationModal();
    openStudentView();
}

function toggleAccordion(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (content.style.maxHeight && content.style.maxHeight !== '0px') {
        content.style.maxHeight = '0px';
        icon.className = 'fas fa-plus';
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.className = 'fas fa-minus';
    }
}

function openRegistrationModal() {
document.getElementById('registration-form-scope').style.display = 'block';
document.getElementById('registration-success-scope').style.display = 'none';
document.getElementById('registrationModal').classList.add('show');
}
function closeRegistrationModal() {
document.getElementById('registrationModal').classList.remove('show');
}
function handleRegistrationSubmit(event) {
event.preventDefault();
document.getElementById('registration-form-scope').style.display = 'none';
document.getElementById('registration-success-scope').style.display = 'block';
}
window.onclick = function(event) {
const regModal = document.getElementById('registrationModal');
if (event.target == regModal) closeRegistrationModal();
}
document.addEventListener('DOMContentLoaded', () => {
fetchCourses();
setupCarousel('testi-track', 'testi-prev', 'testi-next');
if (document.getElementById('search-input')) document.getElementById('search-input').addEventListener('input', filterAndRenderCourses);
if (document.getElementById('filter-category')) document.getElementById('filter-category').addEventListener('change', filterAndRenderCourses);
if (document.getElementById('filter-
modality')) document.getElementById('filter-modality').addEventListener('change', filterAndRenderCourses);
if (document.getElementById('filter-status')) document.getElementById('filter-status').addEventListener('change', filterAndRenderCourses);
const clearBtn = document.getElementById('btn-clear-filters');
if (clearBtn) {
clearBtn.addEventListener('click', () => {
document.getElementById('search-input').value = '';
document.getElementById('filter-category').value = '';
document.getElementById('filter-modality').value = '';
document.getElementById('filter-status').value = '';
filterAndRenderCourses();
});
}
const cpfInput = document.getElementById('form-cpf-input');
if (cpfInput) {
cpfInput.addEventListener('input', (e) => {
let value = e.target.value.replace(/\D/g, '');
if (value.length > 11) value = value.slice(0, 11);
if (value.length > 9) {
value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
} else if (value.length > 6) {
value = value.replace(/^(\d{3})(\d{3})(\d{0,3})$/, "$1.$2.$3");
} else if (value.length > 3) {
value = value.replace(/^(\d{3})(\d{0,3})$/, "$1.$2");
}
e.target.value = value;
});
}
const animElements = document.querySelectorAll('.scroll-anim');
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('active');
}
});
}, { threshold: 0.1 });
animElements.forEach(el => observer.observe(el));
});