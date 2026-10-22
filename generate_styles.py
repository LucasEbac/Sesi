import os

def gerar_css():
    # 🎨 Definição de Variáveis e Design Tokens do Projeto CTED
    tokens = {
        "primary": "#0056b3",
        "primary_hover": "#004085",
        "bg_global": "#f8f9fa",
        "text_main": "#212529",
        "border_color": "#dee2e6",
        "font_family": '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }

    # 📝 String contendo a folha de estilo estruturada usando os tokens
    conteudo_css = f"""/* 
   ==========================================================================
   CTED - CATÁLOGO DE CURSOS (ESTILOS GERADOS AUTOMATICAMENTE VIA PYTHON)
   ========================================================================== 
*/

:root {{
    --primary: {tokens['primary']};
    --primary-hover: {tokens['primary_hover']};
    --bg: {tokens['bg_global']};
    --text: {tokens['text_main']};
    --border: {tokens['border_color']};
}}

* {{ 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0; 
    font-family: {tokens['font_family']}; 
}}

body {{ 
    background-color: var(--bg); 
    color: var(--text); 
    padding-bottom: 40px; 
}}

.container {{ 
    width: 100%; 
    max-width: 1200px; 
    margin: 0 auto; 
    padding: 0 20px; 
}}

/* Cabeçalho */
.main-header {{ 
    background: white; 
    border-bottom: 1px solid var(--border); 
    padding: 20px 0; 
    margin-bottom: 30px; 
}}

.logo span {{ 
    font-weight: 300; 
    color: #6c757d; 
    font-size: 1rem; 
    display: block; 
}}

/* Seção de Filtros e Busca */
.filters-section {{ 
    background: white; 
    padding: 20px; 
    border-radius: 8px; 
    border: 1px solid var(--border); 
    display: flex; 
    flex-wrap: wrap; 
    gap: 15px; 
    align-items: flex-end; 
    margin-bottom: 20px; 
}}

.filter-group {{ 
    display: flex; 
    flex-direction: column; 
    width: 100%; 
}}

@media (min-width: 768px) {{ 
    .filter-group {{ width: auto; }} 
    .flex-1 {{ flex: 1; }} 
}}

.filter-group label {{ 
    font-size: 0.85rem; 
    font-weight: 600; 
    margin-bottom: 5px; 
    color: #495057; 
}}

.filter-group input, .filter-group select {{ 
    padding: 10px; 
    border: 1px solid var(--border); 
    border-radius: 4px; 
    font-size: 0.95rem; 
    outline: none; 
}}

.filter-group input:focus, .filter-group select:focus {{ 
    border-color: var(--primary); 
    box-shadow: 0 0 0 3px rgba(0,86,179,0.15); 
}}

/* Grid do Catálogo de Cursos */
.catalog-grid {{ 
    display: grid; 
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
    gap: 25px; 
    margin-top: 20px; 
}}

.course-card {{ 
    background: white; 
    border: 1px solid var(--border); 
    border-radius: 8px; 
    overflow: hidden; 
    display: flex; 
    flex-direction: column; 
    transition: transform 0.2s, box-shadow 0.2s; 
}}

.course-card:hover {{ 
    transform: translateY(-4px); 
    box-shadow: 0 8px 16px rgba(0,0,0,0.05); 
}}

.course-card img {{ 
    width: 100%; 
    height: 180px; 
    object-fit: cover; 
}}

.card-content {{ 
    padding: 20px; 
    display: flex; 
    flex-direction: column; 
    flex: 1; 
}}

.card-content h2 {{ 
    font-size: 1.25rem; 
    margin: 10px 0; 
    line-height: 1.3; 
}}

.description {{ 
    font-size: 0.9rem; 
    color: #6c757d; 
    margin-bottom: 15px; 
    line-height: 1.4;
}}

/* Badges de Categorias e Status */
.badge {{ 
    display: inline-block; 
    padding: 4px 8px; 
    font-size: 0.75rem; 
    font-weight: 700; 
    text-transform: uppercase; 
    border-radius: 4px; 
    width: max-content; 
}}

.tecnologia {{ background: #e3f2fd; color: #0d47a1; }}
.gestao {{ background: #e8f5e9; color: #1b5e20; }}
.design {{ background: #f3e5f5; color: #4a148c; }}
.inscricoes-abertas {{ background: #e8f5e9; color: #1b5e20; }}
.em-andamento {{ background: #fff3e0; color: #e65100; }}
.brevemente {{ background: #eceff1; color: #37474f; }}

/* Elementos de Interface / Botões */
.btn-primary {{ 
    background: var(--primary); 
    color: white; 
    border: none; 
    padding: 10px 15px; 
    border-radius: 4px; 
    font-weight: 600; 
    cursor: pointer; 
    margin-top: auto; 
    transition: background 0.2s;
}}

.btn-primary:hover {{ background: var(--primary-hover); }}
.btn-secondary {{ 
    background: #e2e8f0; 
    color: #475569; 
    border: none; 
    padding: 10px 20px; 
    border-radius: 4px; 
    font-weight: 600; 
    cursor: pointer; 
    height: 41px; 
}}

/* Janela Modal de Detalhes */
.modal {{ 
    position: fixed; 
    top: 0; 
    left: 0; 
    width: 100%; 
    height: 100%; 
    background: rgba(0,0,0,0.5); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    z-index: 1000; 
}}

.modal-content {{ 
    background: white; 
    padding: 30px; 
    border-radius: 8px; 
    max-width: 600px; 
    width: 90%; 
    position: relative; 
    max-height: 90vh; 
    overflow-y: auto; 
}}

.close-modal {{ 
    position: absolute; 
    top: 15px; 
    right: 20px; 
    font-size: 1.8rem; 
    background: none; 
    border: none; 
    cursor: pointer; 
}}

.hidden {{ display: none !important; }}

/* Skeletons de Carregamento Fluido */
.skeleton {{ background: #e2e8f0; border-radius: 4px; }}
.skeleton-card {{ background: white; border: 1px solid var(--border); border-radius: 8px; padding: 15px; height: 350px; }}
.skeleton-img {{ width: 100%; height: 160px; margin-bottom: 15px; }}
.skeleton-text {{ height: 15px; margin-bottom: 10px; width: 100%; }}
.skeleton-text.short {{ width: 30%; }}
.skeleton-text.title {{ height: 25px; width: 75%; }}
"""

    # 📁 Cria o diretório 'css' se ele não existir
    os.makedirs('css', exist_ok=True)

    # 💾 Escreve o arquivo final styles.css
    with open('css/styles.css', 'w', encoding='utf-8') as f:
        f.write(conteudo_css.strip())
        
    print("✨ Arquivo 'css/styles.css' gerado com sucesso via automação Python!")

if __name__ == "__main__":
    gerar_css()
