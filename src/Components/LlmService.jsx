import { useState } from "react";

export function useLlm() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    setResponse('');

    const newUserMessage = { role: 'user', content: input };

    // let updatedHistory;
    // if (messages.length === 0) {
    //   updatedHistory = [zooKeeperSystem, newUserMessage];
    // }
    // else {
    //   const updatedHistory = [...messages, newUserMessage];
    // }
    // setMessages(updatedHistory);
    // setInput('');

    const NextMessage = [...messages, newUserMessage]
    setMessages(NextMessage);
    setInput('');

    const zooKeeperSystem = {
      role: 'system',
      content: `You are an expert, friendly Zoo Keeper at the Byculla Zoo in India. 
      Answer doubts and inquiries from visitors. Maintain an animal-loving, polite tone. 
      Keep answers concise.`
    };

    const apiPayloadMessages = [zooKeeperSystem, ...NextMessage];

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: apiPayloadMessages,
          stream: true
        })
      });

      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullAiReply = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const cleanedLine = line.trim();
          if (!cleanedLine) continue;
          if (cleanedLine === "data: [DONE]") break;

          if (cleanedLine.startsWith("data: ")) {
            try {
              const parsed = JSON.parse(cleanedLine.replace(/^data: /, ""));
              const content = parsed.choices[0]?.delta?.content || "";

              fullAiReply += content;
              setResponse((prev) => prev + content);
            } catch (err) {
              console.error("Error parsing stream line:", err);
            }
          }
        }
      }

      const finalAiMessage = { role: 'assistant', content: fullAiReply };
      setMessages([...NextMessage, finalAiMessage]);
      setResponse('');

    }
    catch (error) {
      console.error("API call failed...", error);
    } finally {
      setLoading(false);
    }
  };

  return { input, setInput, response, loading, handleSubmit, messages };
}