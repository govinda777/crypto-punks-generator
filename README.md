# CryptoPunks Generator

<img src="https://raw.githubusercontent.com/govinda777/crypto-punks-generator/main/assets/banner.png" alt="crypto-punks-generator" width="600">

[perplexity](https://www.perplexity.ai/search/crie-um-sistema-que-faca-a-cri-8dyiGmBZTGaS5R6V4RTANA#0)

## Descrição

Sistema de **geração automática de imagens NFT** no estilo CryptoPunks, combinando atributos em camadas para criar milhares de avatares únicos em pixel art. Inspirado no projeto original CryptoPunks, a plataforma utiliza um pipeline moderno, código open source e bibliotecas populares para facilitar a criação, customização e exportação de suas próprias coleções generativas.

## Principais Funcionalidades

- 🌈 **Criação de avatares em camadas:** Condição de misturar diferentes bases, cabelos, acessórios, óculos, cores e outros atributos
- ⚡ **Geração massiva & aleatória:** Crie milhares de imagens únicas com poucos comandos
- 🖼️ **Pixel art 24x24px:** Estilo retrô fiel ao original dos CryptoPunks
- 🧩 **Biblioteca de camadas expansível:** Adicione novos atributos facilmente (PNG transparente)
- 📦 **Exportação em PNG:** Cada avatar é salvo individualmente, pronto para uso em NFT marketplaces
- 📝 **Exportação de metadados:** Receba arquivos JSON com as características de cada avatar
- 🚀 **Script simples em Node.js:** Rápido, leve e fácil de rodar em qualquer máquina

## Instalação

Pré-requisitos: [Node.js](https://nodejs.org/)

```bash
git clone https://github.com/govinda777/crypto-punks-generator.git
cd crypto-punks-generator
npm install
```

## Uso

1. **Prepare as camadas:**
   - Coloque cada atributo (ex: cabelos, chapéus, acessórios) como um PNG transparente na pasta correta em `/layers`.
   - Cada subpasta equivale a uma categoria.

2. **Rode o gerador:**

```bash
node index.js
# ou para gerar um número específico de avatares:
node index.js 1000
```

3. **Os arquivos aparecerão em `/output`.**
   - Imagens: avatar_XXXX.png
   - Metadados: metadata.json

## Estrutura de Pastas

```
/layers
 ├─ base/
 ├─ hair/
 ├─ eyes/
 ├─ accessories/
 ├─ hats/
 └─ ...
/output
 ├─ avatar_0001.png
 ├─ avatar_0002.png
 ├─ ...
 └─ metadata.json
```

## Personalização

- Para mudar os atributos possíveis, basta editar ou adicionar imagens PNG nas pastas correspondentes dentro de `/layers`.
- É possível alterar o algoritmo de raridade, regras de combinação e até implementar novos filtros criativos.

## Inspiração

Este projeto segue a lógica generativa utilizada pelos **[CryptoPunks originais da Larva Labs](https://www.larvalabs.com/cryptopunks)**, baseando-se em camadas transparentes de pixel art e distribuição de raridade para formar avatares verdadeiramente únicos.

## Licença

[MIT License](LICENSE)

## Contribuições

Contribuições e sugestões são muito bem-vindas! 
- Faça um fork, crie sua branch e envie um PR.
- Reporte bugs ou proponha melhorias via Issues.

## Links Úteis

- [CryptoPunks (Larva Labs)](https://www.larvalabs.com/cryptopunks)
- [ERC-721: Padrão de NFTs](https://eips.ethereum.org/EIPS/eip-721)
- [Node-canvas (biblioteca usada)](https://www.npmjs.com/package/canvas)

***

Sinta-se à vontade para adaptar conforme as particularidades do seu repositório ou adicionar exemplos visuais adicionais!

[1](https://github.com/victorquanlam/cryptopunk-nft-generator)
[2](https://github.com/larvalabs/cryptopunks)
[3](https://www.youtube.com/watch?v=f0_kabzoZ1w)
[4](https://www.youtube.com/watch?v=2_q_TRxl0l4)
[5](https://www.reddit.com/r/ethdev/comments/ni1roj/help_me_understand_cryptopunks_source_code/)
[6](https://dev.to/victorquanlam/generate-879-120-cryptopunk-nfts-with-javascript-nodejs-command-line-app-step-by-step-10hp)
[7](https://www.youtube.com/watch?v=82PndQWlBc4)
[8](https://github.com/teddykoker/cryptopunks-gan)
[9](https://www.reddit.com/r/NFT/comments/qlbutk/how_can_i_make_my_own_crypto_punk_jpeg_generator/)
[10](https://github.com/cryptopunksnotdead/cryptopunks)
[11](https://github.com/cryptopunksnotdead/punks.attributes)
[12](https://github.com/topics/cryptopunk)
[13](https://www.figma.com/community/file/1011965611456947173/cryptopunk-avatar-generator)
[14](https://www.cryptopunks.app/cryptopunks/attributes)
[15](https://www.youtube.com/watch?v=aFR0lTNcfL8)
[16](https://0xtycoon.github.io/punk-ranks/)
[17](https://en.wikipedia.org/wiki/CryptoPunks)
[18](https://nftnow.com/news/cryptopunks-ip-sells-20-million/)
