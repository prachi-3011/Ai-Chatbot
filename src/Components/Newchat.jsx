import { useLlm } from './LlmService';
import './index.css';

export default function NewChat({ userName = "Explorer" }) {
    const { input, setInput, response, loading, handleSubmit, messages } = useLlm(userName);

    return (
        <div style={{background:'#000000', minHeight: '100vh'}}>
        <div style={{ padding: '20px 40px', fontFamily: 'sans-serif', margin: '0 auto', width: 'fit-content', boxSizing: 'border-box' }}>
            
            <h1 style={{ textAlign: 'center', color: '#f5f5f5', marginBottom: '5px' }}>AI Chatbot</h1>
            
            {/* CONDITIONAL RENDER: This greeting sub-header banner will automatically hide once messages exist */}
            {messages.length === 0 && (
                <p style={{ textAlign: 'center', color: '#888', margin: '0 0 20px 0', fontSize: '16px' }}>
                    How are you, <span style={{ color: '#655ec9', fontWeight: 'bold' }}>{userName}</span>? 👋
                </p>
            )}

            <div className='scroll-container' style={{
                marginTop: '20px',
                marginBottom: '20px',
                background: 'linear-gradient(to bottom, #53515185, #000000)',
                border:'1px solid #000',
                padding: '15px 25px',
                borderRadius: '30px',
                height: '400px',
                overflowY: 'auto',
                width: 'fit-content', 
                boxSizing:'border-box'
            }}>
                <div className='text-boundary' style={{ display: 'flex', flexDirection: 'column', width: 'fit-content',minWidth:'600px', maxWidth:'900px' }}>
                    
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
                                background: msg.role === 'user' ? '#2a2b2c' : '#e0e0e0',
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
                    style={{ flexGrow: 1, padding: '12px', marginRight: '8px', borderRadius: '15px', border: '2px solid #3f3e3ec7', minWidth: '0' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '8px 28px', borderRadius: '15px', cursor: 'pointer',color:'#f5f5f5', background:'#655ec9' }}>
                    {loading ? 'Thinking...' : 'Send'}
                </button>
            </form>
        </div>
        </div>
    );
}