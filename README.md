# AION Landing Page

Site institucional da AION Solution com páginas otimizadas para diferentes públicos.

## 🚀 Configuração GitHub Pages

### Configurações Necessárias

1. **Configurar GitHub Pages**:
   - Ir em Settings > Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

2. **Verificar URL**:
   - O site ficará disponível em: `https://[username].github.io/[repository-name]`
   - Exemplo: `https://victormeireles.github.io/aion-lp`

### Resolução de Problemas

#### Recursos não carregam (CSS/JS)
1. **Limpar cache do navegador** (Ctrl+F5)
2. **Aguardar até 10 minutos** para propagação do GitHub Pages
3. **Verificar console do navegador** (F12) para erros específicos
4. **Verificar se o repositório é público**

#### Debug no Console
Os arquivos agora incluem logs de debug. Abra o console (F12) e verifique:
- ✅ main.css carregado
- ✅ AION_CONFIG carregado
- ❌ Erros de carregamento (se houver)

### Estrutura do Projeto

```
aion-lp/
├── index.html          # Página principal
├── servicos.html       # Página de serviços
├── .nojekyll          # Previne processamento Jekyll
└── assets/
    ├── css/
    │   └── main.css
    ├── js/
    │   ├── script.js
    │   └── components/
    │       ├── config.js
    │       └── shared-components.js
    ├── images/
    ├── logos/
    └── videos/
```

### Recursos Implementados

- ✅ Meta tag para upgrade de HTTPS
- ✅ Arquivo `.nojekyll` para bypass do Jekyll
- ✅ Handlers de erro para todos os recursos
- ✅ Sistema de debug via console
- ✅ Fallback automático para componentes
- ✅ Menu adaptativo por página

### Como Fazer Deploy

1. **Commit e Push**:
   ```bash
   git add .
   git commit -m "Atualização do site"
   git push origin main
   ```

2. **Aguardar**:
   - GitHub Pages pode levar até 10 minutos para atualizar
   - Limpar cache do navegador após deploy

3. **Verificar**:
   - Acessar a URL do GitHub Pages
   - Verificar console (F12) para possíveis erros
   - Testar navegação entre páginas

### Suporte

Se os recursos ainda não carregarem após essas configurações, verifique:
1. Se o repositório está público
2. Se as configurações do GitHub Pages estão corretas
3. Se não há caracteres especiais nos nomes dos arquivos
4. Console do navegador para erros específicos 