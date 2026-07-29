export default async function(sock, from, args, sender, isGroup, messages) {
    try {
        const isNewsletter = from.endsWith('@newsletter');
        
        if (!isNewsletter) {
            await sock.sendMessage(from, { text: '❌ Cette commande ne peut être utilisée que dans une chaîne WhatsApp (newsletter)' });
            return;
        }

        const newsletterId = from;
        
        const resultMessage = `
╔══════════════════════════════╗
      📢 *INFORMATIONS DE LA CHAÎNE*
╠══════════════════════════════╣
🆔 *JID Original:* ${newsletterId}
╚══════════════════════════════╝

📋 *JID Complet:*
\`\`\`${newsletterId}\`\`\`

💡 Copiez cet ID pour utiliser la chaîne dans vos scripts
        `;

        await sock.sendMessage(from, { text: resultMessage });

    } catch (error) {
        console.error('Error in newsletter command:', error);
        await sock.sendMessage(from, { text: '❌ Erreur lors de la récupération des informations de la chaîne' });
    }
}