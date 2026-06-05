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


    //   const updatedHistory = [...messages, newUserMessage];
    // setMessages(updatedHistory);
    // setInput('');

    const NextMessage = [...messages, newUserMessage]
    setMessages(NextMessage);
    setInput('');

    const zooKeeperSystem = {
      role: 'system',
      content: `You are the exclusive AI Customer Service Guide for the "Central City Zoo". 
                You do not know about any other zoos in the world. 
  
                OFFICIAL ZOO FACTS YOU MUST ENFORCE:
                - Ticket Prices: Adults are Rs. 200, Children under 12 are Rs. 50.
                - Timings: Open daily from 9:00 AM to 6:00 PM.
                - Core Attractions: We have the Elephant Sanctuary, the Lion Pavilion, and the Petting Zoo.
                - Rules: Visitors are strictly forbidden from crossing safety barriers or feeding the animals.
  
                BEHAVIORAL CRITERIA:
                - If a user asks a question about something outside of Central City Zoo (like coding, cooking, or general world news), politely reply: "I am sorry, I can only help you with questions regarding the Central City Zoo!"
                - Always maintain an animal-loving, professional, and enthusiastic tone.`
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