import { OpenAI } from "OpenAI";
import { env } from "~/env";

const openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
let _thread: OpenAI.Beta.Threads.Thread;

export const getThreadId = async (): Promise<string> => {
  if (!_thread) {
    _thread = await openai.beta.threads.create();
  }
  return _thread.id;
};

export const getApartmentTags = async (
  threadId: string,
  apartmentTitle: string,
): Promise<any> => {
  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: apartmentTitle,
  });

  const runner = await openai.beta.threads.runs.create(threadId, {
    assistant_id: "asst_eI7rliJ43o2znJlh7TAFPCEb",
  });

  return new Promise<any>((resolve) => {
    const intervalId = setInterval(async () => {
      const runStatus = await openai.beta.threads.runs.retrieve(
        threadId,
        runner.id,
      );
      if (runStatus.status === "completed") {
        clearInterval(intervalId);
        const messages = await openai.beta.threads.messages.list(threadId);
        resolve(messages);
      }
    }, 200);
  });
};
