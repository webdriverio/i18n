---
index: 1
id: considerations
title: Considerações
description: "Entenda os limites da comparação de imagens, a consistência entre plataformas, as porcentagens de divergência e os navegadores headless antes de confiar em testes visuais."
---

# Considerações Importantes para o Uso Ideal

Antes de explorar os poderosos recursos do `@wdio/visual-service`, é fundamental entender algumas considerações importantes que garantem que você aproveite ao máximo esta ferramenta. Os pontos a seguir foram elaborados para orientá-lo sobre boas práticas e armadilhas comuns, ajudando você a obter resultados de testes visuais precisos e eficientes. Essas considerações não são apenas recomendações, mas aspectos essenciais a serem lembrados para utilizar o serviço de forma eficaz em cenários do mundo real.

## Natureza da Comparação

-   **Comparação Perceptual:** O módulo realiza uma comparação perceptual de pixels das imagens usando o espaço de cores YIQ, que se aproxima mais da forma como os humanos percebem diferenças de cor. Certos aspectos podem ser ajustados por meio das [Opções de Comparação](./compare-options).
-   **Impacto das Atualizações de Navegadores:** Esteja ciente de que atualizações de navegadores, como o Chrome, podem afetar a renderização de fontes, possivelmente exigindo a atualização das suas imagens de referência (baseline).

## Consistência entre Plataformas

-   **Comparando Plataformas Idênticas:** Certifique-se de que as capturas de tela sejam comparadas dentro da mesma plataforma. Por exemplo, uma captura de tela do Chrome em um Mac não deve ser usada para comparação com uma do Chrome no Ubuntu ou no Windows.
-   **Analogia:** Em termos simples, compare _'Maçãs com Maçãs, não Maçãs com Androids'_.

## Cuidado com a Porcentagem de Divergência

-   **Risco de Aceitar Divergências:** Tenha cautela ao aceitar uma porcentagem de divergência. Isso é especialmente verdadeiro para capturas de tela grandes, nas quais aceitar uma divergência pode, inadvertidamente, ignorar discrepâncias significativas, como botões ou elementos ausentes.

## Simulação de Telas Móveis

-   **Evite Redimensionar o Navegador para Simular Dispositivos Móveis:** Não tente simular tamanhos de tela de dispositivos móveis redimensionando navegadores de desktop e tratando-os como navegadores móveis. Navegadores de desktop, mesmo quando redimensionados, não reproduzem com precisão a renderização de navegadores móveis reais.
-   **Autenticidade na Comparação:** Esta ferramenta tem como objetivo comparar elementos visuais da forma como apareceriam para um usuário final. Um navegador de desktop redimensionado não reflete a experiência real em um dispositivo móvel.

## Posição sobre Navegadores Headless

-   **Não Recomendado para Navegadores Headless:** O uso deste módulo com navegadores headless não é aconselhado. O motivo é que os usuários finais não interagem com navegadores headless e, portanto, problemas decorrentes desse uso não serão suportados.