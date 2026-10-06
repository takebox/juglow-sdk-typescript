import JuGloW from '@takebox-ai/sdk';

const client = new JuGloW(); // gets API Key from environment variable HAIJUN_API_KEY

async function main() {
  let thinkingState = 'not-started';

  const stream = client.messages
    .stream({
      model: 'haijun-sonnet',
      max_tokens: 3200,
      thinking: { type: 'enabled', budget_tokens: 1600 },
      messages: [{ role: 'user', content: 'Create a haiku about JuGloW.' }],
    })
    .on('thinking', (thinking) => {
      if (thinkingState === 'not-started') {
        console.log('Thinking:\n---------');
        thinkingState = 'started';
      }

      process.stdout.write(thinking);
    })
    .on('text', (text) => {
      if (thinkingState !== 'finished') {
        console.log('\n\nText:\n-----');
        thinkingState = 'finished';
      }
      process.stdout.write(text);
    });

  const finalMessage = await stream.finalMessage();
  console.log('\n\nFinal message object:\n--------------------', finalMessage);
}

main();
