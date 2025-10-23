const pathAtual = window.location.pathname;

if (pathAtual === '/cursos') {
    renderizarListaCursos();
} else if (pathAtual.startsWith('/cursos/')) {
    const partes = pathAtual.split('/');
    const cursoId = partes[partes.length - 1]; 
    renderizarDetalhesCurso(cursoId);
}

async function renderizarListaCursos() {
    const ul = document.getElementById('lista-cursos');
    ul.innerHTML = '<li>Buscando dados...</li>';
    
    try {
        const response = await fetch('/api/cursos');
        const cursos = await response.json();

        ul.innerHTML = '';

        cursos.forEach(curso => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="/cursos/${curso.id}">
                    <strong>[${curso.area}]</strong>: ${curso.titulo}
                </a>
            `;
            ul.appendChild(li);
        });

    } catch (error) {
        ul.innerHTML = '<li>Erro ao carregar os cursos.</li>';
        console.error('Erro ao buscar a lista de cursos:', error);
    }
}

async function renderizarDetalhesCurso(id) {
    const divDetalhes = document.getElementById('detalhes-curso');
    
    try {
        const response = await fetch(`/api/cursos/${id}`); 
        const curso = await response.json();

        if (response.status === 404) {
            divDetalhes.innerHTML = `<h2>Erro 404: ${curso.error}</h2>`;
            document.getElementById('titulo-pagina').textContent = 'Curso Não Encontrado';
            return;
        }

        document.getElementById('titulo-pagina').textContent = curso.titulo;

        divDetalhes.innerHTML = `
            <h2>${curso.titulo}</h2>
            <p><strong>ID:</strong> ${curso.id}</p>
            <p><strong>Área:</strong> ${curso.area}</p>
            <p><strong>Nível:</strong> ${curso.nivel}</p>
            <p><strong>Descrição:</strong> ${curso.descricao}</p>
        `;

    } catch (error) {
        divDetalhes.innerHTML = '<h2>Erro ao carregar os detalhes do curso.</h2>';
        console.error('Erro ao buscar detalhes do curso:', error);
    }
}