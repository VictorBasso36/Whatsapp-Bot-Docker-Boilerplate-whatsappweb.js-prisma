const qrcode = require('qrcode-terminal')

const { Client, LocalAuth } = require('whatsapp-web.js')
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox']},  
});


client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async ( msg ) => {
    if (msg.body === '!ping') {
        await msg.reply('pong');
    }
});

client.initialize();