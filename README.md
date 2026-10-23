
1. Visão Geral do Projeto

O objetivo principal deste projeto foi codificar uma Landing Page institucional voltada para a capacitação de profissionais do setor industrial. A interface foi segmentada em quatro macro-seções estratégicas voltadas para conversão e engajamento:
1. Hero Section: Apresentação da proposta de valor com Navbar e chamada para ação (CTA).
2. Vitrine de Cursos: Carrossel iterativo exibindo os principais treinamentos segmentados por categorias através de tags dinâmicas.
3. Métricas de Impacto e Diferenciais: Painel numérico demonstrando a autoridade da marca e grids destacando as vantagens do modelo educacional.
4. Prova Social (Depoimentos): Carrossel de relatos reais com avaliações em formato de estrelas para elevação do gatilho de confiança.

🎨 2. Arquitetura de Design & UX


Paleta de Cores Institucional

Para transmitir solidez, dinamismo e alinhar-se à estética do setor fabril brasileiro, a interface utiliza variações controladas do espectro do vermelho:
• #920e0e (Vermelho Escuro Industrial) - Utilizado para seções densas como os depoimentos.
• #a81414 (Vermelho Primário da Marca) - Utilizado nos cartões de depoimento e elementos em destaque.
• #ffffff & #ffffff com gradientes - Utilizado para garantir taxas de contraste acessíveis (Web Content Accessibility Guidelines - WCAG).

Tipografia e Ícones

• Fonte Principal: Roboto (Google Fonts), selecionada por sua legibilidade em telas digitais de alta e baixa resolução, com pesos variando do 300 (Light) ao 900 (Black).
• Ícones: FontAwesome 6.4.0 para prover vetores leves que eliminam o peso de carregamento de imagens locais para os indicadores de benefícios e controle de interface.

🛠️ 3. Decisões Técnicas & Arquitetura de Código

A aplicação adota o padrão de Separação de Preocupações (Separation of Concerns - SoC), dividindo-se de maneira modular entre três arquivos fundamentais:
bash
├── index.html       # Estrutura semântica dos dados
├── style.css        # Camada de estilização e responsividade
└── script.js       # Regras de negócio e comportamento dinâmico
Use o código com cuidado.

🧠 Destaques de Implementação em JavaScript (script.js)

1. Carrossel Reutilizável com Algoritmo Dinâmico: Em vez de utilizar bibliotecas infladas (como Slick ou Swiper), foi desenvolvida a função setupCarousel orientada a objetos implícitos. Ela captura dinamicamente a largura dos cartões em tempo de execução via getBoundingClientRect(), garantindo que os botões de avançar (→) e voltar (←) funcionem perfeitamente em telas de qualquer resolução, limitando o scroll ao tamanho máximo real do contêiner.
2. Intersection Observer API para Animações: Para otimizar a performance, a detecção de rolagem não utiliza os tradicionais scroll listeners (que causam gargalos de processamento). Utilizou-se a API nativa de monitoramento de interseção para injetar a classe .active nos elementos apenas quando eles entram no campo de visão do usuário.
3. Gerenciamento Dinâmico de Estado do Modal: Ao clicar em um curso, a função openModal atua como um controlador. Ela recebe os parâmetros do curso (título, categoria, duração e descrição), limpa as classes anteriores para evitar vazamento de memória visual e injeta o conteúdo em tempo real no DOM, aplicando um efeito de transição via hardware (transform: translateY).

📐 Estrutura de Layout em CSS (style.css)

• CSS Grid & Flexbox: O alinhamento das estatísticas da seção de impacto foi resolvido nativamente com flexbox bidirecional. A seção dos pilares inferiores utiliza CSS Grid Layout para autocompensação de espaço.
• Responsividade Fluida (Mobile First / Media Queries): Foram adotados breakpoints limpos nos valores clássicos de 992px (para transição de tablets e desktops menores) e 768px (para ocultar menus extensos em smartphones e ajustar layouts de duas colunas para colunas únicas).

💡 4. Pontos Chave para Defender na Apresentação

Se questionado pela banca ou pelo entrevistador durante a entrevista técnica, utilize os seguintes argumentos construídos sobre este código:
• Foco em Performance (Core Web Vitals): "Optei por não utilizar frameworks pesados ou bibliotecas de terceiros para os carrosséis ou animações. O uso de JavaScript puro e da API nativa IntersectionObserver garante que a página atinja notas altíssimas no Lighthouse, carregando de forma instantânea mesmo em redes móveis restritas (3G/4G)."
• Escalabilidade no JavaScript: "A função do carrossel foi encapsulada de tal forma que ela serve tanto para a lista de cursos quanto para a lista de depoimentos sem duplicar uma única linha de lógica. Se o cliente pedir para criar um terceiro carrossel amanhã na página, basta chamá-la passando os novos IDs."
• Acessibilidade e Semântica: "O HTML foi estruturado utilizando tags semânticas corretas como <header>, <nav>, <section> e <body> facilitando a leitura por leitores de tela e melhorando o indexamento orgânico para SEO."
