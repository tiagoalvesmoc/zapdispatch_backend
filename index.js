const venom = require('venom-bot');

// const contatos  =  require('./data')



const contatos = [
  {
    nome: 'João',
    telefone: '5538992507225@c.us',
    mensagem:`Descubra como ganhar 💵 R$50 a R$100 💵 diariamente em apenas ⏱️1 minuto! Clique no link 👉🏻 bit.ly/tradersunited_br e aproveite essa oportunidade única para transformar sua situação financeira. Vagas limitadas, não perca tempo!"
    
    Abraços,
    (Seu nome)`,
    imagem: 'C:\Users\tiago\OneDrive\Documents\React\React\Zap Dispatch\Backend\image\logo.png'
  },
  {
    nome: 'Maria',
    telefone: '5538992507225@c.us',
    mensagem:`Tenho uma novidade incrível para compartilhar com você.${'\n'} Você sabia que é possível ganhar 💵 R$50 a R$100 💵 todos os dias? ${'\n'} dedicando apenas *⏱️1 minuto do seu tempo?* ${'\n'} Isso mesmo, você não leu errado!

    Clique no link abaixo e descubra como alcançar essa meta financeira de forma rápida e fácil: 👉🏻 bit.ly/tradersunited_br ${'\n'}
    
    Aproveite essa oportunidade *ÚNICA* ${'\n'}e comece a faturar agora mesmo! ${'\n'} Não perca tempo, pois as vagas são limitadas. Seja parte do grupo de pessoas que estão mudando sua realidade financeira. Acredite, você também pode conquistar isso!
    
    Não deixe essa chance passar!
    
    Abraços,
    (@traders_united_BR)`,
    imagem: 'C:\Users\tiago\OneDrive\Documents\React\React\Zap Dispatch\Backend\image\logo.png'
  },
  {
    nome: 'Jose',
    telefone: '5538992507225@c.us',
    mensagem:`Descubra como ganhar 💵 R$50 a R$100 💵 todos os dias em apenas ⏱️1 minuto! Clique no link 👉🏻 bit.ly/tradersunited_br e aproveite essa oportunidade única para mudar sua realidade financeira. Vagas limitadas, não perca tempo!"
    
    Abraços,
    (@traders_united_BR)`,
    imagem: 'C:\Users\tiago\OneDrive\Documents\React\React\Zap Dispatch\Backend\image\logo.png'
  },
  
  

];

venom.create().then((client) => {

 
  // Função para enviar as mensagens em sequência
  function enviarMensagens(index) {
    if (index >= contatos.length) {
      console.log('Mensagens enviadas para todos os contatos.');
      return;
    }

    const contato = contatos[index];

    client.sendText(contato.telefone,`Fala *${contato.nome}*,\n ${contato.mensagem}`).then(() => {

        // Função para enviar a imagem
  function enviarImagem(contato) {
    return client.sendImage(
      contato.telefone,
      contato.imagem,
      'imagem.jpg'
    );
  }
      console.log(`Mensagem enviada para ${contato.nome}`);
      enviarMensagens(index + 1); // Chama a função recursivamente para enviar a próxima mensagem
    }).catch((error) => {
      console.log(`Erro ao enviar a mensagem para ${contato.nome}:`, error);
      enviarMensagens(index + 1); // Chama a função recursivamente mesmo em caso de erro para enviar a próxima mensagem
    });
  }

  // Inicia o envio das mensagens a partir do primeiro contato
  enviarMensagens(0);
}).catch((error) => {
  console.log('Erro ao criar o cliente Venom:', error);
});