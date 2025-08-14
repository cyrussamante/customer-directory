import axios from 'axios';

export async function askChatBot(question: string): Promise<string> {
  const { data } = await axios.post('/api/ai/chat', { question });
  return (data?.answer ?? '').toString();
}
