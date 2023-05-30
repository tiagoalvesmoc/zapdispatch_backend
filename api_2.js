const express = require('express');
const venom = require('venom-bot');

const app = express();
const port = 3000;
let client = null;

app.use(express.json());

venom.create().then((venomClient) => {
    client = venomClient;
}).catch((error) => {
    console.log('Erro ao criar o cliente Venom:', error);
});

app.post('/enviar-mensagens', (req, res) => {
    const contatos = req.body.contatos;

    if (!client) {
        return res.status(500).json({ error: 'Cliente Venom não está pronto.' });
    }

    function enviarMensagens(index) {
        if (index >= contatos.length) {
            console.log('Mensagens enviadas para todos os contatos.');
            res.status(200).json({ message: 'Mensagens enviadas para todos os contatos.' });
            return;
        }

        const contato = contatos[index];

    
            return client.sendImage(
              contato.telefone,
              contato.imagem,
              'logo',
            `Fala *${contato.nome}*${'\n'}${contato.mensagem}`
            )
            .then(()=>{ console.log(`Mensagem enviada para ${contato.nome}`);  enviarMensagens(index + 1);})
            .catch(()=>{   console.log(`Erro ao enviar a mensagem para ${contato.nome}:`, error);  enviarMensagens(index + 1);})

       

        // client.sendText(contato.telefone, contato.mensagem)
        //     .then(() => enviarImagem(client, contato))
        //     .then(() => {
        //         console.log(`Mensagem enviada para ${contato.nome}`);
        //         enviarMensagens(index + 1);
        //     })
        //     .catch((error) => {
        //         console.log(`Erro ao enviar a mensagem para ${contato.nome}:`, error);
        //         enviarMensagens(index + 1);
        //     });
    }

    // function enviarImagem(client, contato) {
    //     return client.sendImage(contato.telefone, contato.imagem, 'imagem.jpg');
    // }

    // function enviarImagem(contato) {
    //     return client.sendImage(
    //       contato.telefone,
    //       contato.imagem,
    //       'logo',
    //     `Fala *${contato.nome}*${'\n'}${contato.mensagem}`
    //     );
    //   }

    enviarMensagens(0);
});

app.listen(port, () => {
    console.log(`API rodando na porta ${port}`);
});
