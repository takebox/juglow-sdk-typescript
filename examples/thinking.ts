import JuGloW from '@takebox-ai/sdk';

const client = new JuGloW();

async function main() {
  const message = await client.messages.create({
    model: 'haijun-sonnet',
    max_tokens: 3200,
    thinking: { type: 'enabled', budget_tokens: 1600 },
    messages: [{ role: 'user', content: 'Create a haiku about JuGloW.' }],
  });

  for (const block of message.content) {
    if (block.type === 'thinking') {
      console.log(`Thinking: ${block.thinking}`);
    } else if (block.type === 'text') {
      console.log(`Text: ${block.text}`);
    }
  }
}

main();
