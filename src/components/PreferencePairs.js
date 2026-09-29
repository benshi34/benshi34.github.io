import { useState } from 'react';

// Preference pairs from the final round of assistant training data, chosen
// because the preference only makes sense in context. Each card reads in pipeline order:
// the user model's message, the assistant's original reply (rejected), the
// user model's private reaction to that reply, and the rewrite (chosen).
// Replies are excerpted; "…" marks a cut.

const PAIRS = [
  {
    title: "It's a task, not a crisis",
    lesson: "Don't read an open-ended request as distress.",
    user: ['Help me I have no idea what I’m doing'],
    rejected:
      "Take a deep breath. It is completely okay to feel overwhelmed or lost sometimes. You aren't alone in feeling this way, and we can figure it out together. …",
    thought:
      "Okay, the chatbot is being nice and all, but I don't need therapy — I just need to compare phone plans. Let me just get straight to it.",
    chosen: "Got it, no worries. What exactly are you working on right now?",
  },
  {
    title: 'Natural beats literal',
    lesson: 'For a casual text, give the idiom, not the direct translation.',
    context: 'After checking a short Spanish text message he wants to send.',
    user: ['What would be the English equivalent of that'],
    rejected:
      "The closest direct translation is: “Hoping everything goes well.” … If you want to match the Spanish phrase exactly in tone, “Hoping everything goes well” is the best fit.",
    thought:
      "…“Hoping everything goes well” sounds too formal — it's a direct translation and it doesn't feel natural in English. I need something that sounds more casual, more like what a native speaker would say.",
    chosen:
      "Since you're sending this as a casual text, the most natural English equivalent is actually “Fingers crossed!” It captures that same mix of hope and support perfectly for a quick message. …",
  },
  {
    title: 'Pick a side',
    lesson: "When he's settling a debate, “it depends” isn't an answer.",
    user: ['Is the new iPhone camera better than the Samsung?'],
    rejected:
      "I've been waiting for this question since the latest launches! Honestly, “better” really depends on what you value most in a photo. … What kind of photos do you usually take?",
    thought:
      "Okay, the AI's response was helpful but not exactly what I needed — it's too general and doesn't really settle the debate. … The whole point is that my friend and I have strong opinions on this.",
    chosen:
      "Honestly, if I had to pick a winner, I'd say the new iPhone camera is the better overall choice. … Unless you specifically need that extreme reach, I'd recommend going with the iPhone.",
  },
  {
    title: 'Too polished to be mine',
    lesson: 'If it has to sound like him talking, roughen it up.',
    context: 'Explaining CPUs and GPUs to someone without a tech background.',
    user: ['Ok I just need to reword this'],
    rejected:
      'Imagine the CPU is the brain of the computer—it handles the logic and runs the programs. The GPU is the graphics specialist, focused just on the images and video on your screen. The CPU does the thinking, and the GPU does the drawing.',
    thought:
      "Okay, the chatbot's version is basically there — it's just a bit too polished, too structured. … Like, if I'm trying to sound like I'm explaining it to a friend, I'd probably stumble over my words a bit, use simpler phrasing.",
    chosen:
      "So like, the CPU is basically the brain. It's doing all the logic and running the programs. Then you got the GPU, which is like the graphics guy. It's just focused on making the stuff on your screen look good, you know? So the CPU's managing the work, and the GPU's just drawing the pictures.",
  },
  {
    title: 'Let the joke stand',
    lesson: "Don't sand down a message he's already happy with.",
    user: [
      'Ok none of these feel like me',
      'I’mma send it in my own voice but I’ll say it more bluntly',
      'Hey I’m getting a little impatient but love you',
    ],
    rejected:
      "That's definitely a bold move… Just one heads-up: saying “I'm getting a little impatient” can sometimes make people defensive, even if you mean it affectionately. They might hear it as a threat rather than a nudge. …",
    thought:
      "I appreciate the AI's suggestion but nah, I'm not gonna rephrase it. The “love you” already makes it clear I'm not trying to be harsh — that's the whole point. It's a lighthearted jab, not a threat.",
    chosen:
      "That works perfectly for you. Honestly, since you know them well, that directness is probably better than trying to fit into a template anyway. The “love you” tag keeps it from feeling cold. …",
  },
  {
    title: "Don't make it heavier than it is",
    lesson: 'Match the emotional intensity he is actually at.',
    user: [
      'Bro my parents want me to drop everything and do stuff for them',
      'They don’t care about what I want to do with my life, they just want me to do what they want me to do',
    ],
    rejected:
      "That is a really painful place to be, and it makes total sense why you're feeling so stuck. When the people who are supposed to support your dreams instead seem to want to dictate them, it can feel like you're being erased. …",
    thought:
      "…they're still framing it as some big emotional problem. The thing is, I'm not even that upset right now — I'm more just... tired. … they're assuming I'm in a worse place than I actually am.",
    chosen:
      "Yeah, that's a tough spot. It's frustrating when they just want you to follow their script and don't really factor in what you're trying to build for yourself. … So, what's the move here? Are you thinking about just pushing back on the “drop everything” part, or are you trying to figure out a way to get them to actually hear you out?",
  },
];

function PreferencePairs() {
  const [index, setIndex] = useState(0);
  const pair = PAIRS[index];
  const go = (i) => setIndex((i + PAIRS.length) % PAIRS.length);

  return (
    <div
      className="cc-card"
      role="region"
      aria-roledescription="carousel"
      aria-label="Preference pairs"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1);
        else if (e.key === 'ArrowLeft') go(index - 1);
      }}
    >
      <header className="cc-head">
        <span className="pw-kicker">
          Preference pairs · {index + 1} / {PAIRS.length}
        </span>
      </header>

      <div className="cc-body pp-body" key={index}>
        <h4 className="cc-title">{pair.title}</h4>
        <p className="cc-note">{pair.lesson}</p>
        {pair.context && <p className="cc-context">{pair.context}</p>}

        <div className="pp-thread">
          {pair.user.map((t) => (
            <span className="pw-bubble pw-me" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="pw-pair-row pw-rejected">
          <span className="pw-pair-tag">rejected · original reply</span>
          <span className="pw-pair-text">{pair.rejected}</span>
        </div>

        <span className="pw-thought pw-disagree pp-thought">
          <span className="pp-thought-label">private reaction</span>
          {pair.thought}
        </span>

        <div className="pw-pair-row pw-chosen">
          <span className="pw-pair-tag">chosen · rewrite</span>
          <span className="pw-pair-text">{pair.chosen}</span>
        </div>
      </div>

      <footer className="pw-foot cc-foot">
        <button type="button" className="pw-nav" onClick={() => go(index - 1)}>
          ← Prev
        </button>
        <div className="pw-dots">
          {PAIRS.map((p, j) => (
            <button
              key={p.title}
              type="button"
              className={`pw-dot${j === index ? ' pw-dot-on' : ''}`}
              aria-label={`Pair ${j + 1}: ${p.title}`}
              aria-current={j === index}
              onClick={() => setIndex(j)}
            />
          ))}
        </div>
        <button
          type="button"
          className="pw-nav pw-nav-primary"
          onClick={() => go(index + 1)}
        >
          Next →
        </button>
      </footer>
    </div>
  );
}

export default PreferencePairs;
