const express = require('express');
const venom = require('venom-bot');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/enviar-mensagens', (req, res) => {
  const contatos = req.body.contatos;

  venom.create().then((client) => {
    function enviarMensagens(index) {
      if (index >= contatos.length) {
        console.log('Mensagens enviadas para todos os contatos.');
        res.status(200).json({ message: 'Mensagens enviadas para todos os contatos.' });
        return;
      }

      const contato = contatos[index];

      client.sendText(contato.telefone, contato.mensagem)
        .then(() => enviarImagem(client, contato))
        .then(() => {
          console.log(`Mensagem enviada para ${contato.nome}`);
          enviarMensagens(index + 1);
        })
        .catch((error) => {
          console.log(`Erro ao enviar a mensagem para ${contato.nome}:`, error);
          enviarMensagens(index + 1);
        });
    }

    function enviarImagem(client, contato) {
      return client.sendImage(contato.telefone, contato.imagem, 'imagem.jpg');
    }

    enviarMensagens(0);
  }).catch((error) => {
    console.log('Erro ao criar o cliente Venom:', error);
    res.status(500).json({ error: 'Erro ao criar o cliente Venom.' });
  });
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
