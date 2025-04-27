---
index: 1
id: considerations
title: Considerações
---

# Considerações Chave para Uso Otimizado

Antes de mergulhar nos recursos poderosos do `@wdio/visual-service`, é crucial entender algumas considerações importantes que garantem que você obtenha o máximo dessa ferramenta. Os seguintes pontos foram projetados para guiá-lo através das melhores práticas e armadilhas comuns, ajudando você a alcançar resultados precisos e eficientes em testes visuais. Essas considerações não são apenas recomendações, mas aspectos essenciais a serem lembrados para utilizar efetivamente o serviço em cenários do mundo real.

## Natureza da Comparação

-   **Base Pixel-por-Pixel:** O módulo realiza uma comparação pixel por pixel das imagens. Embora certos aspectos possam ser ajustados (veja Opções de Comparação), a abordagem principal continua sendo uma comparação básica de pixels.
-   **Impacto das Atualizações do Navegador:** Esteja ciente de que atualizações de navegadores, como o Chrome, podem afetar a renderização de fontes, potencialmente necessitando de uma atualização em suas imagens de referência.

## Consistência nas Plataformas

-   **Comparando Plataformas Idênticas:** Garanta que as capturas de tela sejam comparadas dentro da mesma plataforma. Por exemplo, uma captura de tela do Chrome em um Mac não deve ser usada para comparar com uma do Chrome no Ubuntu ou Windows.
-   **Analogia:** Em termos simples, compare _'Maçãs com Maçãs, não Maçãs com Androids'_.

## Cuidado com a Porcentagem de Incompatibilidade

-   **Risco de Aceitar Incompatibilidades:** Tenha cuidado ao aceitar uma porcentagem de incompatibilidade. Isso é especialmente verdadeiro para capturas de tela grandes, onde aceitar uma incompatibilidade pode inadvertidamente ignorar discrepâncias significativas, como botões ou elementos ausentes.

## Simulação de Tela Móvel

-   **Evite Redimensionar o Navegador para Simulação Móvel:** Não tente simular tamanhos de tela móvel redimensionando navegadores de desktop e tratando-os como navegadores móveis. Navegadores de desktop, mesmo quando redimensionados, não replicam com precisão a renderização de navegadores móveis reais.
-   **Autenticidade na Comparação:** Esta ferramenta visa comparar elementos visuais como eles apareceriam para um usuário final. Um navegador de desktop redimensionado não reflete a verdadeira experiência em um dispositivo móvel.

## Posicionamento sobre Navegadores Headless

-   **Não Recomendado para Navegadores Headless:** O uso deste módulo com navegadores headless não é aconselhável. A lógica é que os usuários finais não interagem com navegadores headless e, portanto, problemas decorrentes desse uso não serão suportados.