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

    // 2. Create the new user message object
    const newUserMessage = { role: 'user', content: input };

    // 3. Update the local array instantly so it updates on screen
    const updatedHistory = [...messages, newUserMessage];
    setMessages(updatedHistory);
    setInput('');

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: updatedHistory,
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

      // const data = await response.json();

      // Extract the AI's response text based on your provider's JSON structure
      // const aiResponseText = data.choices[0].message.content;
      const aiMessage = { role: 'assistant', content: fullAiReply };
      setMessages([...updatedHistory, aiMessage]);

    }
    catch (error) {
        console.error("API call failed...", error);
      } finally {
        setLoading(false);
      }
    };

    return { input, setInput, response, loading, handleSubmit , messages};
  }