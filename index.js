import { makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } from 'baileys';
import readline from 'readline';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = 'sessionData';

async function getUserNumber() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question('📲 Enter your WhatsApp number (with country code, e.g., 243xxxx): ', (number) => {
            rl.close();
            resolve(number.trim());
        });
    });
}

async function handleMessage(sock, msg) {
    try {
        const messages = msg.messages[0];
        if (!messages || !messages.message) return;
        
        const from = messages.key.remoteJid;
        const isGroup = from.endsWith('@g.us');
        const sender = messages.key.participant || from;
        const messageType = Object.keys(messages.message)[0];
        
        let body = '';
        if (messageType === 'conversation') {
            body = messages.message.conversation;
        } else if (messageType === 'extendedTextMessage') {
            body = messages.message.extendedTextMessage.text;
        } else if (messageType === 'imageMessage') {
            body = messages.message.imageMessage.caption || '';
        } else {
            return;
        }

        if (!body) return;

        const prefix = '.';
        if (!body.startsWith(prefix)) return;

        const args = body.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const commandPath = path.join(__dirname, 'commands', `${commandName}.js`);
        
        if (!fs.existsSync(commandPath)) {
            await sock.sendMessage(from, { text: '❌ Command not found' });
            return;
        }

        const command = await import(`file://${commandPath}`);
        
        if (command.default) {
            await command.default(sock, from, args, sender, isGroup, messages);
        } else {
            await sock.sendMessage(from, { text: '❌ Invalid command structure' });
        }

    } catch (error) {
        console.error('Error handling message:', error);
        try {
            const from = msg.messages[0]?.key?.remoteJid;
            if (from) {
                await sock.sendMessage(from, { text: '❌ Error processing command' });
            }
        } catch (e) {}
    }
}

async function connectToWhatsapp() {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(version);

    const { state, saveCreds } = await useMultiFileAuthState(data);

    const sock = makeWASocket({
        version: version,
        auth: state,
        printQRInTerminal: false,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        logger: pino({ level: 'silent' }),
        keepAliveIntervalMs: 10000,
        connectTimeoutMs: 60000,
        generateHighQualityLinkPreview: true,
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const reason = lastDisconnect?.error?.toString() || 'unknown';
            console.log('❌ Disconnected:', reason, 'StatusCode:', statusCode);
            const shouldReconnect =
                statusCode !== DisconnectReason.loggedOut && reason !== 'unknown';
            if (shouldReconnect) {
                console.log('🔄 Reconnecting in 5 seconds...');
                setTimeout(() => connectToWhatsapp(), 5000);
            } else {
                console.log('🚫 Logged out permanently. Please reauthenticate manually.');
            }
        } else if (connection === 'connecting') {
            console.log('⏳ Connecting...');
        } else if (connection === 'open') {
            console.log('✅ WhatsApp connection established!');

            try {
                const chatId = '243833389567@s.whatsapp.net';
                const imagePath = 'https://files.catbox.moe/vj82dq.jpg';

                if (!fs.existsSync(imagePath)) {
                    console.warn('⚠️ Image not found at path:', imagePath);
                }

                const messageText = `
╔══════════════════╗
      *DigiX Bot Connected Successfully* 🚀
╠══════════════════╣
> "Always Forward. Digital Crew, one of the best."
╚══════════════════╝

*Digital Crew 243*
                `;

                await sock.sendMessage(chatId, {
                    image: { url: imagePath },
                    caption: messageText,
                    footer: '💻 Powered by DigiX Crew',
                });

                console.log('📩 Welcome message sent successfully!');
            } catch (err) {
                console.error('❌ Error sending welcome message:', err);
            }

            sock.ev.on('messages.upsert', async (msg) => handleMessage(sock, msg));
        }
    });

    setTimeout(async () => {
        if (!state.creds.registered) {
            console.log('⚠️ Not logged in. Preparing pairing process...');
            try {
                const number = 243833389567;

                console.log(`🔄 Requesting pairing code for ${number}`);
                const code = await sock.requestPairingCode(number, 'DIGIXBOT');
                console.log('📲 Pairing Code:', code);
                console.log('👉 Enter this code on your WhatsApp app to pair.');

            } catch (e) {
                console.error('❌ Error while requesting pairing code:', e);
            }
        }
    }, 5000);

    return sock;
}

async function startBot() {
    try {
        console.log('🚀 Starting WhatsApp Bot...');
        await connectToWhatsapp();
    } catch (error) {
        console.error('❌ Failed to start bot:', error);
        process.exit(1);
    }
}

startBot();