const qrcode = require('qrcode-terminal')

const { Client, LocalAuth } = require('whatsapp-web.js')
const wwebVersion = '2.2407.3';
const client = new Client({
    authStrategy: new LocalAuth(),
    webVersionCache: {
        type: 'remote',
        remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
    },

    puppeteer: { 
        headless: true,
        executablePath: '/usr/bin/google-chrome',
        args: ['--disable-gpu', '--no-sandbox'],

    
    },  
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