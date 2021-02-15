### Contributing

# Todo

> ### **_Luiz_**
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

### @ToDo

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


- Chat em grupo
  <br>_até 10 peers (limitação de banda user)_
