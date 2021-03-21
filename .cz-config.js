module.exports = {
  types: [
    { value: 'feat', name: 'feat:     Uma nova funcionalidade' },
    { value: 'fix', name: 'fix:      É uma correção de bug' },
    { value: 'docs', name: 'docs:     Apenas documentações' },
    {
      value: 'test',
      name: 'test:     Adiciona testes faltando ou corrige testes existentes',
    },
    {
      value: 'build',
      name:
        'build:    Alteração no sistema de compilação ou dependências externas (exemplos de escopos: gulp, broccoli, npm)',
    },
    {
      value: 'ci',
      name:
        'ci:       Alteração de arquivos e scripts para configuração de CI (exemplos de escopo: Travis, Circle, BrowserStack, SauceLabs)',
    },
    {
      value: 'refactor',
      name:
        'refactor: Uma mudança de código que não corrige um bug nem adiciona uma funcionalidade',
    },
    {
      value: 'style',
      name:
        'style:    Alterações que não afeta a regra ou lógica do código (espaço em branco, formatação, ponto e vírgula ausente, etc)',
    },
    {
      value: 'chore',
      name:
        'chore:    Outras mudanças que não modificam os arquivos em src ou de testes',
    },
    { value: 'wip', name: 'wip:      Trabalho em progresso' },
  ],

  scopes: [
    { name: 'webapp', description: 'Aplicação principal' },
    { name: 'gateway', description: 'Gateway socket server' },
    { name: 'core-entity', description: 'Lib core-entity foi alterada' },
    { name: 'core-stream', description: 'Lib core-stream foi alterada' },
    {
      name: 'ui-components',
      description: 'Lib ui-components app foi alterado',
    },
    { name: 'util-format', description: 'Lib util-format foi alterado' },
    { name: 'ui-stylesheets', description: 'Estilos Sass foram alterados' },
    { name: 'core-adapter', description: 'Lib core-adapter foi alterada' },
    { name: 'data-storage', description: 'Lib data-storage foi alterada' },
    { name: 'util-share', description: 'Lib util-share foi alterada' },
    { name: 'util-device', description: 'Lib util-device foi alterada' },
    {
      name: 'design-tokens',
      description: 'Valores de design tokens alterados',
    },
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: 'fix'
  /*
    scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
    */
  // override the messages, defaults are as follows
  messages: {
    type: 'Selecione o tipo de alteração que você está enviando:',
    scope: '\nIndique o ESCOPO desta alteração (opcional):',
    // used if allowCustomScopes is true
    customScope: 'Indique o escopo desta alteração:',
    subject: 'Escreva uma descrição CURTA e IMPERATIVA da mudança:\n',
    body:
      'Forneça uma descrição mais detalhada da alteração (optional). Use "|" para quebras de linha:\n',
    breaking:
      'Listar quaisquer ALTERAÇÕES DE QUEBRA / BREAKING CHANGES (opcional):\n',
    footer:
      'Liste quaisquer conclusões de PROBLEMAS / ISSUES por esta alteração (opcional). Ex.: #31, #34:\n',
    confirmCommit: 'Tem certeza de que deseja continuar com o commit acima?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  skipQuestions: ['body'],

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: '|', // It is supported for fields body and footer.
  // footerPrefix : 'ISSUES CLOSED:'
  // askForBreakingChangeFirst : true, // default is false
}
