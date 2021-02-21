# Contribuindo com a Comunicação Livre

Adoraríamos que você contribuísse com o projeto e ajudasse a torná-la ainda melhor do que é hoje! Como contribuidor, aqui estão as diretrizes que gostaríamos que você seguisse:

- [Código de Conduta](#coc)
- [Dúvidas ou problemas?](#question)
- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Regras de codificação](#rules)
## <a name="coc"></a> Código de Conduta

Ajude-nos a manter a comunidade Speek aberta e inclusiva. Por favor, leia e siga nosso [Código de Conduta](CODE_OF_CONDUCT.md).


## <a name="question"></a> Tem alguma dúvida ou problema?

Não abra issues para questões gerais de suporte relacionadas a tecnologia WebRTC, pois queremos manter as issues do GitHub para relatórios de bugs. Em vez disso você pode [iniciar uma discussão](https://github.com/guiseek/speek.video/discussions/new) com a comunidade speek.video. Caso não funcione, recomendamos o uso do [Stack Overflow](https://stackoverflow.com/questions/tagged/speek.video) para fazer perguntas relacionadas ao suporte. Ao criar uma nova pergunta no Stack Overflow, certifique-se de adicionar a `speek.video` tag.

Stack Overflow é um lugar muito melhor para fazer perguntas, pois:

- existem milhares de pessoas dispostas a ajudar no Stack Overflow
- perguntas e respostas ficam disponíveis para visualização pública, então sua pergunta / resposta pode ajudar alguém
- O sistema de votação do Stack Overflow garante que as melhores respostas fiquem claramente visíveis.

Para economizar o seu e o nosso tempo, fecharemos sistematicamente todos as issues que são solicitações de suporte geral e redirecionaremos as pessoas para que abram uma discussão ou para o Stack Overflow.

Se você quiser conversar sobre a questão em tempo real, entre em contato por meio de [nosso servidor Discord][discord].

## <a name="issue"></a> Encontrou um Bug?

Se você encontrar um bug no código-fonte, pode nos ajudar [abrindo uma issue](https://github.com/guiseek/speek.video/discussions/new) em nosso [repositório Github][github].
Melhor ainda, você pode [enviar um Pull Request](#submit-pr) com uma correção.

## <a name="feature"></a> Sente falta de algum recurso?

Você pode _solicitar_ um novo recurso [iniciar uma discussão](https://github.com/guiseek/speek.video/discussions/new) para nosso Repositório GitHub.
Se você gostaria de _implementar_ um novo recurso, considere o tamanho da alteração para determinar as etapas corretas para prosseguir:

- Para um **Novo Recurso**, primeiro inicie uma discussão e esboce sua proposta para que possa ser avaliada.
  Esse processo nos permite coordenar melhor nossos esforços, evitar a duplicação de trabalho e ajudá-lo a elaborar a mudança para que seja aceita com sucesso no projeto.

  **Nota**: Adicionar um novo tópico à documentação, ou reescrever significativamente um tópico, conta como um novo recurso.

- **Pequenos recursos** podem ser criados e diretamente [enviados como um pull request](#submit-pr).

## <a name="submit-pr"></a> Diretrizes de submissão

### Enviando um problema

Antes de enviar um problema, verifique issues abertas ou recentemente fechadas, talvez já exista uma issue para o seu problema e a discussão pode informá-lo sobre as soluções alternativas disponíveis.

Queremos corrigir todos os problemas o mais rápido possível, mas antes de corrigir um bug, precisamos reproduzi-lo e confirmá-lo. Para reproduzir bugs, exigimos que você forneça uma reprodução mínima. Ter um cenário reproduzível mínimo nos dá uma riqueza de informações importantes, sem ir e voltar para você com perguntas adicionais.

Uma reprodução mínima nos permite confirmar rapidamente um bug (ou apontar um problema de codificação), bem como confirmar que estamos corrigindo o problema certo.

Infelizmente, não podemos investigar / corrigir bugs sem uma reprodução mínima, então, se não recebermos uma resposta sua, vamos encerrar um problema que não tem informações suficientes para ser reproduzido.

Você pode registrar novos problemas selecionando um dos nossos [novos modelos de problemas](https://github.com/guiseek/speek.video/issues/new/choose) e preenchendo o modelo de problemas.

---

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

Antes de enviar sua solicitação de pull (PR), considere as seguintes diretrizes:

1. Pesquise no [GitHub](https://github.com/guiseek/speek.video/pulls) um PR aberto ou fechado relacionado ao seu envio.
   Você não quer duplicar os esforços existentes.

1. Certifique-se de que um problema descreve o problema que você está corrigindo ou documenta o design do recurso que você deseja adicionar.
   Discutir o design antecipadamente ajuda a garantir que estamos prontos para aceitar seu trabalho.

1. Faça um fork do repositório guiseek/speek.video.

1. Faça suas alterações em um novo branch:

   ```shell
   git checkout -b my-fix-branch main
   ```

1. Crie seu patch, **incluindo casos de teste apropriados**.

1. Siga nossas [Regras de codificação](#rules).

1. Faça commit de suas mudanças usando uma mensagem de commit descritiva que segue nossas [convenções de mensagem de commit](#commit).
   A adesão a essas convenções é necessária porque as notas de versão são geradas automaticamente a partir dessas mensagens.

   ```shell
   git commit --all
   ```

   > **\*Nota**: a opção de linha de comando opcional commit `-a` irá automaticamente" adicionar "e" rm "os arquivos editados.\*

1. Envie seu branch para o GitHub:

   ```shell
   git push origin my-fix-branch
   ```

1. No GitHub, envie uma solicitação de pull para `speek.video:main`.

### Revisão de uma solicitação pull

A equipe Speek reserva-se o direito de não aceitar solicitações de pull de membros da comunidade que não tenham sido bons cidadãos da comunidade. Tal comportamento inclui não seguir o [código de conduta Speek](CODE_OF_CONDUCT.md) e se aplica dentro ou fora dos canais gerenciados Speek.

#### Como abordar o feedback da revisão

Se solicitarmos alterações por meio de revisões de código:

1. Faça as atualizações necessárias para o código.

1. Execute novamente os conjuntos de teste Speek para garantir que os testes ainda estejam passando.

1. Crie um commit de correção e envie para seu repositório GitHub (isso atualizará sua solicitação de pull):

   ```shell
   git commit --all --fixup HEAD
   git push
   ```

É isso aí! Obrigado pela sua contribuição!

##### Atualizando a mensagem de confirmação

Um revisor pode frequentemente sugerir mudanças em uma mensagem de confirmação (por exemplo, para adicionar mais contexto para uma mudança ou aderir às nossas [diretrizes de mensagem de confirmação] (# commit)).
Para atualizar a mensagem de commit do último commit em seu branch:

1. Confira sua branch:

   ```shell
   git checkout my-fix-branch
   ```

2. Corrija o último commit e modifique a mensagem de commit:

   ```shell
   git commit --amend
   ```

3. Envie para seu repositório GitHub:

   ```shell
   git push --force-with-lease
   ```

> NOTA: <br />
> Se você precisa atualizar a mensagem de commit de um commit anterior, você pode usar `git rebase` no modo interativo.
> Consulte os [documentos git](https://git-scm.com/docs/git-rebase#_interactive_mode) para obter mais detalhes.

#### Depois que sua solicitação pull for mesclada

Depois que sua solicitação pull for mesclada, você pode excluir com segurança seu branch e extrair as alterações do repositório principal (upstream):

- Exclua o branch remoto no GitHub por meio da IU da Web do GitHub ou do shell local da seguinte maneira:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Confira o branch main:

  ```shell
  git checkout main -f
  ```

- Exclua a branch local:

  ```shell
  git branch -D my-fix-branch
  ```

- Atualize seu mestre com a versão upstream mais recente:

  ```shell
  git pull --ff upstream main
  ```

## <a name="rules"></a> Regras de codificação

Para garantir a consistência em todo o código-fonte, lembre-se destas regras enquanto trabalha:

- Todos os recursos ou correções de bugs **devem ser testados** por uma ou mais especificações (testes de unidade).
- Todos os métodos de API públicos **devem ser documentados**.

### Formato para mensagem de commit

A mensagem do commit deve ser estruturada da seguinte forma:

---

```
<tipo>[escopo opcional]: <descrição>

[corpo opcional]

[rodapé opcional]
```
---

O commit contém os seguintes elementos estruturais, para comunicar a intenção ao utilizador da sua biblioteca:

1. **fix**: um commit do _tipo_ `fix` soluciona um problema na sua base de código (isso se correlaciona com [PATCH](https://semver.org/lang/pt-BR/#sum%C3%A1rio) do versionamento semântico).

1. **feat**: um commit do _tipo_ `feat` inclui um novo recurso na sua base de código (isso se correlaciona com [MINOR](https://semver.org/lang/pt-BR/#sum%C3%A1rio) do versionamento semântico).

1. **BREAKING CHANGE**: um commit que contém o texto `BREAKING CHANGE`:, no começo do texto do corpo opcional ou do rodapé opcional, inclui uma modificação que quebra a compatibilidade da API (isso se correlaciona com [MAJOR](https://semver.org/lang/pt-BR/#sum%C3%A1rio) do versionamento semântico). Uma BREAKING CHANGE pode fazer parte de commits de qualquer tipo.

1. Outros: _tipos_ adicionais são permitidos além de `fix:` e `feat:`, por exemplo [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) (baseado na Convenção do Angular) recomenda-se `chore:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, entre outros.

Também recomendamos `improvement` para commits que melhoram uma implementação atual sem adicionar um novo recurso ou consertar um bug. Observe que esses tipos não são obrigatórios pela especificação do Conventional Commits e não têm efeito implícito no versionamento semântico (a menos que incluam uma BREAKING CHANGE). Um escopo pode ser adicionado ao tipo do commit, para fornecer informações contextuais adicionais e está contido entre parênteses, por exemplo `feat(parser): adiciona capacidade de interpretar arrays`.

#### Exemplos

##### Mensagem de commit com descrição e modificação que quebra a compatibilidade no corpo

```
feat: permitir que o objeto de configuração fornecido estenda outras configurações

BREAKING CHANGE: a chave `extends`, no arquivo de configuração, agora é utilizada
para estender outro arquivo de configuração
```

##### Mensagem de commit com ! opcional para chamar a atenção para quebra a compatibilidade

```
chore!: remove Node 6 da matriz de testes
BREAKING CHANGE: removendo Node 6 que atinge o final de vida em Abril
```

##### Mensagem de commit sem corpo

```
docs: ortografia correta de CHANGELOG
```

##### Mensagem de commit com escopo

```
feat(lang): adiciona tradução para português brasileiro
```

##### Mensagem de commit de uma correção utilizando número de ticket (opcional)

```
fix: corrige pequenos erros de digitação no código

veja o ticket para detalhes sobre os erros de digitação corrigidos

closes issue #12
```

#### Especificação

As palavras-chaves "DEVE" ("MUST"), "NÃO DEVE" ("MUST NOT"), "OBRIGATÓRIO" ("REQUIRED"), "DEVERÁ" ("SHALL"), "NÃO DEVERÁ" ("SHALL NOT"), "PODEM" ("SHOULD"), "NÃO PODEM" ("SHOULD NOT"), "RECOMENDADO" ("RECOMMENDED"), "PODE" ("MAY") e "OPCIONAL" ("OPTIONAL"), nesse documento, devem ser interpretados como descrito na [RFC 2119](http://tools.ietf.org/html/rfc2119).


1. A mensagem de commit DEVE ser prefixado com um tipo, que consiste em um substantivo, `feat`, `fix`, etc., seguido por um escopo OPCIONAL, e OBRIGATÓRIO terminar com dois-pontos e um espaço.

1. O tipo `feat` DEVE ser usado quando um commit adiciona um novo recurso ao seu aplicativo ou biblioteca.

1. O tipo `fix` DEVE ser usado quando um commit representa a correção de um problema em seu aplicativo ou biblioteca.

1. Um escopo PODE ser fornecido após um tipo. Um escopo DEVE consistir em um substantivo que descreve uma seção da base de código entre parênteses, por exemplo, `fix(parser):`

1. Uma descrição DEVE existir depois do espaço após o prefixo tipo/escopo. A descrição é um breve resumo das alterações de código, por exemplo, _fix: problema na interpretação do array quando uma string tem vários espaços_.

1. Um corpo de mensagem de commit mais longo PODE ser fornecido após a descrição curta, fornecendo informações contextuais adicionais sobre as alterações no código. O corpo DEVE começar depois de uma linha em branco após a descrição.

1. Um rodapé de uma ou mais linhas PODE ser fornecido depois de uma linha em branco após o corpo. O rodapé DEVE conter informações adicionais sobre o commit, por exemplo, pull-requests, revisores, modificações que quebram a compatibilidade, com uma informação adicional por linha.

1. A modificação que quebra a compatibilidade DEVE ser indicadas logo no início da seção do corpo ou no início de uma linha na seção de rodapé. Uma modificação que quebra a compatibilidade DEVE consistir de um texto em maiúsculas BREAKING CHANGE, seguido por dois-pontos e um espaço.

1. Uma descrição DEVE ser fornecida após o texto “BREAKING CHANGE:”, descrevendo o que mudou na API, por exemplo, _BREAKING CHANGE: as variáveis de ambiente agora têm preferência sobre os arquivos de configuração_.

1. Além de `feat` e `fix`, outro tipo PODE ser usados em suas mensagens de commit.

1. Cada bloco de informação que compõem o commit convencional NÃO DEVE ser tratado como sensível a maiúscula e minúscula pelos implementadores, com exceção de BREAKING CHANGE, que DEVE ser maiúscula.

1. Um `!` PODE ser acrescentado antes do `:` no prefixo tipo/escopo, para chamar a atenção para modificações que quebram a compatibilidade. `BREAKING CHANGE: description` também DEVE ser incluído no corpo ou no rodapé, junto com o `!` no prefixo.


#### Porque utilizar Conventional Commits

- Criação automatizada de CHANGELOGs.
- Determinar automaticamente um aumento de versionamento semântico (com base nos tipos de commits).
- Comunicar a natureza das mudanças para colegas de equipe, o público e outras partes interessadas.
- Disparar processos de build e deploy.
- Facilitar a contribuição de outras pessoas em seus projetos, permitindo que eles explorem um histórico de commits mais estruturado.


---


## Nossa stack

<div style="display:flex; align-items: center">
  <img style="padding: 16px" alt="HTML5" src="design/stack/html5.svg" />
  <div>
    <h2 style="padding: 0">HTML5</h2>
    <p>Linguagem de marcação semântica e acessível, lembrem-se que o projeto é para todos, ao contribuir <kbd>;)</kbd> </p>
  </div>
</div>

<div style="display:flex; align-items: center">
  <img style="padding: 16px" alt="CSS3" src="design/stack/css3.svg" />
  <div>
    <h2 style="padding: 0">CSS3</h2>
    <p>Estilização, animações e customizações. Representando a identidade Speek apoiada ao Material Design</p>
  </div>
</div>

<div style="display:flex; align-items: center">
  <img style="padding: 16px" alt="JavaScript" src="design/stack/javascript.svg" />
  <div>
    <h2 style="padding: 0">JavaScript</h2>
    <p>É a base de quase tudo que temos por aqui e linguagem que permitiu WebRTC existir  <kbd>:)</kbd>
    </p>
  </div>
</div>

<div style="display:flex; align-items: center">
  <img style="padding: 16px" alt="TypeScript" src="design/stack/typescript.svg" />
  <div>
    <h2 style="padding: 0">TypeScript</h2>
    <p>Superset que da poderes ao JavaScript, auxiliando no desenvolvimento</p>
  </div>
</div>

<div style="display:flex; align-items: center">
  <img style="padding: 16px" alt="Angular" src="design/stack/angular.svg" />
  <div>
    <h2 style="padding: 0">Angular</h2>
    <p>Framework muito popular no frontend que facilita a organização de código e repositório</p>
  </div>
</div>

<div style="display:flex; align-items: center">
  <img style="padding: 16px" alt="Angular" src="design/stack/nest.svg" />
  <div>
    <h2 style="padding: 0">NestJS</h2>
    <p>Framework também popular no backend que permite um server robusto com qualidade</p>
  </div>
</div>







<!-- # Todo

> ### **_Luiz_**
>
> Coisas q vi hoje q seria interessante vc arrumar no `Peek`

1. x Saídas acidentais da chamada - Usuário devia ser avisado quando algum botão vai encerrar a chamada. Ideal uma confirmação.

1. [x] Cor do botão de desligar geralmente é vermelho. Seria legal também a confirmação. Pense em encerrar a sala em definitivo ao fazer isso. Da forma como testei, se der F5 a chamada retorna. Pode diminuir a sensação de privacidade.

1. [x] Labels nos botões para leitor de tela. Acho que aria-label simples da vida já resolve.

1. [x] O mais crítico, a página não deixa claro como conectar, parece disfuncional. Importante informar que o usuário está aguardando outra pessoa conectar para a chamada começar. Além disso, não devia ser exigido fazer F5 repetidos pra iniciar uma chamada. É um deal breaker para usuários leigos.
       Não testei o cadastro. Quando usar te passo feedbacks

1. [x] Compartilhamento é muito limitado. O texto só pode ser compartilhado no WhatsApp. Devia ser texto genérico para poder compartilhar em qualquer canal (Telegram, Signal, E-mail etc)

1. [-] Além disso o texto é muito técnico. "Chave" de reunião...
   R: Estava chave já né? ou código? Se for chave, acha técnico? com que vc abre uma porta?! eu usei chave justamente por parecer familiar

Poderia ser algo amigável como "Entre na nossa reunião do Peek por este link: ..."
R: Mas sim, isso faz sentido tbm..

