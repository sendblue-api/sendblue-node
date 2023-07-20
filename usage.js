import Sendblue from './sendblue/sendblue.js';

const sendblue = new Sendblue('deea8b3ba33d16ec8b862d8967f440b0', 'c8321e6689b1296d0d621dc2078b4eab');

await sendblue.sendMessage('2569602099', 'hi');

let response = await sendblue.sendGroupMessage(['2569602099', 'elliott.storey@icloud.com'], 'Hello from sendblue!\n\n');

await sendblue.modifyGroup(response.group_id, 'remove_recipient', 'elliott.storey@icloud.com');

console.log(await sendblue.lookup('2569602099'));

await sendblue.sendTypingIndicator('+12569602099');