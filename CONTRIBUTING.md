# Contribuindo com a Comunicação Livre

Adoraríamos que você contribuísse com o projeto e ajudasse a torná-la ainda melhor do que é hoje! Como contribuidor, aqui estão as diretrizes que gostaríamos que você seguisse:

- [Código de Conduta](#coc)
- [Como posso contribuir](#how-to)
- [Dúvidas ou problemas?](#question)
- [Issues and Bugs](#issue)
- [Feature Requests](#feature)

## <a name="coc"></a> Código de Conduta

Ajude-nos a manter a comunidade Speek aberta e inclusiva. Por favor, leia e siga nosso [Código de Conduta](CODE_OF_CONDUCT.md).

## <a name="how-to"></a> Como você pode contribuir

- [Codificando](#code)
  - [Para fazer](#todo)
  - [Comandos de desenvolvimento](#cli)
- [Desenhando](#design) (em progresso)
- [Divulgando](#adversiting) (em progresso)
- [Organizando um evento](#events) (em progresso)
- [Propondo uma oficina](#workshops) (em progresso)
- [Fazendo um treinamento](#trainings) (em progresso)


## <a name="todo"></a> Para fazer

- [x] botão sair da chamada

  - [x] mat-fab warn canto left bottom room component
  - [x] guard canDeactivate room component

- [x] Chamadas

  - [x] ID da chamada
  - [x] Chamada sem alteração no tom de voz

- [-] Tela Filtro de voz

  - [x] Melhorar design
  - [x] Salvar em storage local
  - [ ] Outros filtros

- [-] MediaStream

  - [x] Áudio e vídeo
  - [ ] Salvar em storage local a permissão
  - [ ] Validar permissões de acesso
  - [x] Adicionar select com devices, separados por áudio e vídeo

- [x] Chamada de áudio e vídeo

  - [x] Não precisar dar refresh
  - [x] Hablitar/desabilitar áudio
  - [x] Hablitar/desabilitar vídeo
  - [x] Crop do vídeo remoto (aproveitar a tela na vertical)

- [ ] Auth (senha opcional)

  - [ ] Enviar código por email
  - [ ] Enviar código por sms
  - [ ] Lista de contatos com outras contas

- [-] Compartilhar link da reunião em várias mídias

  - [ ] Enviar link por email
  - [x] Whatsapp
  - [x] Telegram
  - [x] Twitter
  - [ ] SMS
  - [ ] Contatos

- [ ] Recursos

  - [ ] STUN TURN ([coturn](https://github.com/coturn/coturn))

- [ ] Integrações

  - [ ] SIP ([asterisk](https://wiki.asterisk.org/wiki/display/AST/Configuring+Asterisk+for+WebRTC+Clients))

- [ ] Chat em grupo
  <br>_até 10 peers (limitação de banda user)_ -->


## <a name="cli"></a> Comandos de desenvolvimento

| Comando | Descrição |
| --- | --- |
| `npm start` | Inicia o client e server para desenvolvimento |
| `npm run webapp` | Inicia o client |
| `npm run gateway` | Inicia o server |
| `npm test` | Executam testes unitários (ainda precisamos escreve-los / corrigi-los) |
| `npm run e2e` | Executam os testes de integração / end to end |
| `npm run format` | Executa o prettier formatando os arquivos |
| `npm run dep-graph` | Abre o gráfico de dependências do repositório com o relacionamento entre apps e libs |




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

2. Certifique-se de que um problema descreve o problema que você está corrigindo ou documenta o design do recurso que você deseja adicionar.
   Discutir o design antecipadamente ajuda a garantir que estamos prontos para aceitar seu trabalho.

3. Faça um fork do repositório guiseek/speek.video.

4. Faça suas alterações em um novo branch:

   ```shell
   git checkout -b my-fix-branch main
   ```

5. Crie seu patch, **incluindo casos de teste apropriados**.

6. Siga nossas [Regras de codificação] (#rules).

7. Faça commit de suas mudanças usando uma mensagem de commit descritiva que segue nossas [convenções de mensagem de commit](#commit).
   A adesão a essas convenções é necessária porque as notas de versão são geradas automaticamente a partir dessas mensagens.

   ```shell
   git commit --all
   ```

   > **\*Nota**: a opção de linha de comando opcional commit `-a` irá automaticamente" adicionar "e" rm "os arquivos editados.\*

8. Envie seu branch para o GitHub:

   ```shell
   git push origin my-fix-branch
   ```

9. No GitHub, envie uma solicitação de pull para `speek.video:main`.

### Revisão de uma solicitação pull

A equipe Speek reserva-se o direito de não aceitar solicitações de pull de membros da comunidade que não tenham sido bons cidadãos da comunidade. Tal comportamento inclui não seguir o [código de conduta Speek](CODE_OF_CONDUCT.md) e se aplica dentro ou fora dos canais gerenciados Speek.

#### Como abordar o feedback da revisão

Se solicitarmos alterações por meio de revisões de código:

1. Faça as atualizações necessárias para o código.

2. Execute novamente os conjuntos de teste Speek para garantir que os testes ainda estejam passando.

3. Crie um commit de correção e envie para seu repositório GitHub (isso atualizará sua solicitação de pull):

   ```shell
   git commit --all --fixup HEAD
   git push
   ```

   <!-- Para obter mais informações sobre como trabalhar com commits de correção, consulte [aqui](docs/FIXUP_COMMITS.md). -->

É isso aí! Obrigado pela sua contribuição!

##### Atualizando a mensagem de confirmação

Um revisor pode frequentemente sugerir mudanças em uma mensagem de confirmação (por exemplo, para adicionar mais contexto para uma mudança ou aderir às nossas [diretrizes de mensagem de confirmação] (# commit)).
Para atualizar a mensagem de commit do último commit em seu branch:

1. Confira sua filial:

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

- Exclua a filial local:

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
- Seguimos o [Guia de estilo JavaScript do Google][guia-estilo-js], mas agrupamos todo o código em **100 caracteres**.

  Um formatador automatizado está disponível, see [DEVELOPER.md](docs/DEVELOPER.md#clang-format).

Formato de mensagem de confirmação

_Esta especificação é inspirada e substitui o [formato de mensagem de confirmação AngularJS] [formato de mensagem de confirmação] ._

Temos regras muito precisas sobre como nossas mensagens de commit do Git devem ser formatadas.
Este formato leva ao **histórico de commits mais fácil de ler**.

Cada mensagem de confirmação consiste em um **cabeçalho** _(head)_, um **corpo** _(body)_ e um **rodapé** _(footer)_.

```
<head>
<LINHA EM BRANCO>
<body>
<LINHA EM BRANCO>
<footer>
```

O `header` é obrigatório e deve estar de acordo com o formato [Commit Message Header](#commit-header).

O `body` é obrigatório para todos os commits exceto para aqueles do tipo" docs ".
Quando o corpo está presente, deve ter pelo menos 20 caracteres e deve estar em conformidade com o formato [Corpo da Mensagem de Confirmação](#commit-body).

O `footer` é opcional. O formato [Commit Message Footer](#commit-footer) descreve para que o footer é usado e a estrutura que deve ter.

Qualquer linha da mensagem de confirmação não pode ter mais de 100 caracteres.


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

