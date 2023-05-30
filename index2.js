const venom = require('venom-bot');

 

const contatos = [
  {
    nome: 'Richard',
    telefone: '5538988583742@c.us',
    mensagem:`Descubra como ganhar${'\n'} 💵 R$50 a R$100 💵${'\n'} diariamente em apenas ⏱️1 minuto! ${'\n'} Clique no link 👉🏻 bit.ly/tradersunited_br ${'\n'} e aproveite essa oportunidade única para transformar sua situação financeira. Vagas limitadas, não perca tempo!"
    
    Abraços,
    (@traders_united_br)`,
    imagem: `./image/logo.png`
  },
  {
    nome: 'Richard',
    telefone: '5538988583742@c.us',
    mensagem:`Descubra como ganhar${'\n'} 💵 R$50 a R$100 💵${'\n'} diariamente em apenas ⏱️1 minuto! ${'\n'} Clique no link 👉🏻 bit.ly/tradersunited_br ${'\n'} e aproveite essa oportunidade única para transformar sua situação financeira. Vagas limitadas, não perca tempo!"
    
    Abraços,
    (@traders_united_br)`,
    imagem: `./image/logo.png`
  },
  {
    nome: 'Richard',
    telefone: '5538988583742@c.us',
    mensagem:`Descubra como ganhar${'\n'} 💵 R$50 a R$100 💵${'\n'} diariamente em apenas ⏱️1 minuto! ${'\n'} Clique no link 👉🏻 bit.ly/tradersunited_br ${'\n'} e aproveite essa oportunidade única para transformar sua situação financeira. Vagas limitadas, não perca tempo!"
    
    Abraços,
    (@traders_united_br)`,
    imagem: `./image/logo.png`
  },
  
];

venom.create().then((client) => {
  // Função para enviar a imagem
  function enviarImagem(contato) {
    return client.sendImage(
      contato.telefone,
      contato.imagem,
      'logo',
    `Fala *${contato.nome}*${'\n'}${contato.mensagem}`
    );
  }

  // Função para enviar a mensagem
  function enviarMensagem(contato) {
    return client.sendText(
      contato.telefone,
      `Fala *${contato.nome}*,\n ${contato.mensagem}`
    );
  }

  // Função para enviar as mensagens em sequência
  async function enviarMensagens(index) {
    if (index >= contatos.length) {
      console.log('Mensagens enviadas para todos os contatos.');
      return;
    }

    const contato = contatos[index];

    try {
      await enviarImagem(contato);
      console.log(`Imagem enviada para ${contato.nome}`);

     // await enviarMensagem(contato);
     // console.log(`Mensagem enviada para ${contato.nome}`);
    } catch (error) {
      console.log(`Erro ao enviar a imagem e mensagem para ${contato.nome}:`, error.me.text);
    }

    enviarMensagens(index + 1); // Chama a função recursivamente para enviar para o próximo contato
  }

  // Inicia o envio das mensagens a partir do primeiro contato
  enviarMensagens(0);
}).catch((error) => {
  console.log('Erro ao criar o cliente Venom:', error);
});