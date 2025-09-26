import './App.css';
import { useState } from 'react';

function App() {
  const [expandedPaper, setExpandedPaper] = useState(null);

  const togglePaper = (paperId) => {
    setExpandedPaper(expandedPaper === paperId ? null : paperId);
  };
  return (
    <div className="App">
      <main className="content">
        <h1 className="greeting">
          Ben Shi
          <div className="chinese-name">石泉 (Shí Quán)</div>
        </h1>
        
        <p>
          Hi, my name is Ben. I currently work on post-training for conversational agents, based in San Francisco. In my (recent) past life I was an undergraduate student at <a href="https://www.princeton.edu/" target="_blank" rel="noopener noreferrer">Princeton</a>, advised by Professor <a href="https://www.cs.princeton.edu/~karthikn/" target="_blank" rel="noopener noreferrer">Karthik Narasimhan</a>, as well as Dr. <a href="https://ysymyth.github.io/" target="_blank" rel="noopener noreferrer">Shunyu Yao</a>.
        </p>
      
        
        <p>
          In my free time I like to <a href="https://open.spotify.com/album/2wNwNFeKUyNj4YrdJGrpaJ?si=Lb-u3T8ZQJSuhfhLI4BJgw" target="_blank" rel="noopener noreferrer">produce music and sing</a>. I do not claim to be good at it.
        </p>
        
        <div className="recent-goings">
          <h2>Recently</h2>
          <div className="timeline">
            <div className="timeline-item">
              <span className="date">Sep '25</span>
                <span className="event"><a href="https://arxiv.org/abs/2506.05579" target="_blank" rel="noopener noreferrer">When Models Know More...</a> has been accepted to NeurIPS, and <a href="https://arxiv.org/abs/2504.04332" target="_blank" rel="noopener noreferrer">IMPersona</a> has been accepted to COLM 2025!</span>
            </div>
            <div className="timeline-item">
              <span className="date">May '25</span>
              <span className="event">Farewell Princeton ~</span>
            </div>
            <div className="timeline-item">
              <span className="date">April '25</span>
                <span className="event">I released <a href="https://open.spotify.com/album/2wNwNFeKUyNj4YrdJGrpaJ?si=Lb-u3T8ZQJSuhfhLI4BJgw" target="_blank" rel="noopener noreferrer">a new album</a>!</span>
            </div>
          </div>
        </div>
        
        <p>
          Feel free to contact me at <code>benshi@princeton.edu</code>.
        </p>
        
        <section className="selected-works">
          <h2>Selected Works</h2>
          <div className="paper">
            <h3 className="paper-title clickable" onClick={() => togglePaper('knowledge-transfer')}>
              When Models Know More Than They Can Explain: Quantifying Knowledge Transfer in Human-AI Collaboration
            </h3>
            {expandedPaper === 'knowledge-transfer' && (
              <p className="paper-description">
                As we optimize model reasoning over verifiable objectives, how does this affect human understanding of said reasoning to achieve superior collaborative outcomes? In our new preprint, we conduct the first large-scale study to isolate and quantify models' ability to collaborate and transfer knowledge to humans.
              </p>
            )}
            <p className="paper-authors"><strong>Quan Shi</strong>, Carlos E. Jimenez, Shunyu Yao, Nick Haber, Diyi Yang, Karthik Narasimhan</p>
            <p className="paper-venue">NeurIPS 2025, XLLM-Reason-Plan @ COLM 2025</p>
            <div className="paper-links">
              <a href="https://arxiv.org/abs/2506.05579" target="_blank" rel="noopener noreferrer">Paper@ArXiv</a>
              <a href="https://kite-live.vercel.app" target="_blank" rel="noopener noreferrer">Project Website</a>
              <a href="https://github.com/benshi34/q-knowledge-transfer" target="_blank" rel="noopener noreferrer">Code@GitHub</a>
              <a href="https://x.com/BenShi34/status/1932457154293764399" target="_blank" rel="noopener noreferrer">Twitter Thread</a>
            </div>
          </div>
          
          <div className="paper">
            <h3 className="paper-title clickable" onClick={() => togglePaper('impersona')}>
              IMPersona: Evaluating Individual Level LM Impersonation
            </h3>
            {expandedPaper === 'impersona' && (
              <p className="paper-description">
                Language models can pass the Turing test, but can they imitate humans on the individual level? We train models on decades of text data, finding that with minimal compute and inference-time techniques, even close friends and family fail to distinguish between human and AI-generated responses. Big implications for data privacy.
              </p>
            )}
            <p className="paper-authors"><strong>Quan Shi</strong>, Carlos E. Jimenez, Stephen Dong, Brian Seo, Caden Yao, Adam Kelch, Karthik Narasimhan</p>
            <p className="paper-venue">COLM 2025, SoLaR @ COLM 2025</p>
            <div className="paper-links">
              <a href="https://arxiv.org/abs/2504.04332" target="_blank" rel="noopener noreferrer">Paper@ArXiv</a>
              <a href="https://impersona-website.vercel.app/" target="_blank" rel="noopener noreferrer">Project Website</a>
              <a href="https://github.com/princeton-nlp/impersona" target="_blank" rel="noopener noreferrer">Code@GitHub</a>
            </div>
          </div>
          
          <div className="paper">
            <h3 className="paper-title clickable" onClick={() => togglePaper('bright')}>
              BRIGHT: A Realistic and Challenging Benchmark for Reasoning-Intensive Retrieval
            </h3>
            {expandedPaper === 'bright' && (
              <p className="paper-description">
                Existing retrieval benchmarks primarily challenge keyword or semantic-based retrieval. However, many complex real-world queries require in-depth reasoning to identify relevant documents beyond surface form matching. BRIGHT introduces the first benchmark for reasoning-intensive retrieval, featuring 1,384 real-world queries spanning diverse domains like economics, psychology, mathematics, and coding.
              </p>
            )}
            <p className="paper-authors">Hongjin Su, Howard Yen, Mengzhou Xia, Weijia Shi, Niklas Muennighoff, Han-yu Wang, Haisu Liu, <strong>Quan Shi</strong>, et al.</p>
            <p className="paper-venue">ICLR 2025 (Spotlight)</p>
            <div className="paper-links">
              <a href="https://arxiv.org/abs/2407.12883" target="_blank" rel="noopener noreferrer">Paper@ArXiv</a>
              <a href="https://brightbenchmark.github.io/" target="_blank" rel="noopener noreferrer">Project Website</a>
              <a href="https://github.com/xlang-ai/BRIGHT" target="_blank" rel="noopener noreferrer">Code@GitHub</a>
              <a href="https://x.com/hongjin_su/status/1814299949326311626" target="_blank" rel="noopener noreferrer">Twitter Thread</a>
            </div>
          </div>
          
          <div className="paper">
            <h3 className="paper-title clickable" onClick={() => togglePaper('olympiad')}>
              Can Language Models Solve Olympiad Programming?
            </h3>
            {expandedPaper === 'olympiad' && (
              <p className="paper-description">
                Competitive programming represents one of the most challenging reasoning tasks for AI systems. We systematically evaluate language models on USACO problems, introducing techniques like episodic retrieval and reflection that significantly improve performance on these complex algorithmic challenges.
              </p>
            )}
            <p className="paper-authors"><strong>Quan Shi*</strong>, Michael Tang*, Karthik Narasimhan, Shunyu Yao</p>
            <p className="paper-venue">COLM 2024</p>
            <div className="paper-links">
              <a href="https://arxiv.org/abs/2404.10952" target="_blank" rel="noopener noreferrer">Paper@ArXiv</a>
              <a href="https://princeton-nlp.github.io/USACOBench/" target="_blank" rel="noopener noreferrer">Project Website</a>
              <a href="https://github.com/princeton-nlp/USACO" target="_blank" rel="noopener noreferrer">Code@GitHub</a>
              <a href="https://langchain-ai.github.io/langgraph/tutorials/usaco/usaco/" target="_blank" rel="noopener noreferrer">LangGraph Tutorial</a>
              <a href="https://mobile.x.com/ShunyuYao12/status/1780848531051544620" target="_blank" rel="noopener noreferrer">Twitter Thread</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
