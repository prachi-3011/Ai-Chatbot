import { useLlm } from './LlmService';

export default function NewChat() {
    const { input, setInput, response, loading, handleSubmit, messages } = useLlm();

    return (
        <div style={{ padding: '50px 20px', fontFamily: 'sans-serif', margin: '0 auto', width: 'fit-content', boxSizing: 'border-box' }}>
            <h1 style={{ textAlign: 'center', color: '#f5f5f5' }}>AI Chatbot</h1>

            <div className='scroll-container' style={{
                marginTop: '20px',
                marginBottom: '20px',
                background: '#f5f5f5',
                padding: '15px',
                borderRadius: '30px',
                height: '400px',
                overflow: 'auto',
                width: 'fit-content' 
            }}>
                <div className='text-boundary' style={{ display: 'flex', flexDirection: 'column', width: 'auto', maxWidth:'900px',minWidth:'600px' }}>
                    
                    {messages.map((msg, index) => (
                        <div key={index} style={{ 
                            margin: '8px 0', 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start'
                        }}>
                            <strong style={{ color: '#555', fontSize: '12px', marginBottom: '2px', padding: '0 5px' }}>
                                {msg.role === 'user' ? 'You' : 'Assistant'}
                            </strong>
                            <p style={{
                                display: 'inline-block',
                                maxWidth: '85%',        
                                textAlign: 'left',
                                padding: '10px 15px',
                                borderRadius: '15px',
                                background: msg.role === 'user' ? '#007bff' : '#e0e0e0',
                                color: msg.role === 'user' ? 'white' : 'black',
                                margin: 0,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}>{msg.content}</p>
                        </div>
                    ))}

                    {loading && response && (
                        <div style={{ 
                            margin: '8px 0', 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'flex-start' 
                        }}>
                            <strong style={{ color: '#555', fontSize: '12px', marginBottom: '2px', padding: '0 5px' }}>Assistant</strong>
                            <p style={{
                                display: 'inline-block',
                                maxWidth: '85%',
                                width: 'fit-content',
                                textAlign: 'left',
                                padding: '10px 15px',
                                borderRadius: '15px',
                                background: '#e0e0e0',
                                color: 'black',
                                margin: 0,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word'
                            }}>{response}</p>
                        </div>
                    )}

                    {messages.length === 0 && !loading && (
                        <p style={{ color: '#888', textAlign: 'center', marginTop: '150px' }}>
                            No text generated yet. Ask something to get started!
                        </p>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a follow-up question..."
                    style={{ flexGrow: 1, padding: '12px', marginRight: '8px', borderRadius: '15px', border: '1px solid #ccc', minWidth: '0' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '8px 28px', borderRadius: '15px', cursor: 'pointer' }}>
                    {loading ? 'Thinking...' : 'Send'}
                </button>
            </form>
        </div>
    );
}