import qrcode from 'qrcode-terminal';
import { Client, LocalAuth, Message } from 'whatsapp-web.js';

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

client.on('disconnected', (reason: string) => {
    console.log('Client was logged out', reason);
    client.initialize(); 
});


client.on('qr', (qr: string) => {
    qrcode.generate(qr, { small: true })
    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');
});


let numbers: string[] = []
client.on('message', async (msg: Message) => {
    if(!numbers.includes(msg.from)){
        await msg.reply('Bot in development, ignore this for now 🐒')
        numbers.push(msg.from) // add on var numbers a msg.from
    }
});

client.initialize();
