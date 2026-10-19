import AskExample, { AskWindow } from '../components/AskExample';
import Figure from '../components/Figure';
import Video from '../components/Video';
import asks from '../data/homecoming-asks.json';

export const meta = {
  slug: 'homecoming',
  title: 'Homecoming: Bring Your Data Home',
  author: 'Quan Shi',
  affiliation: 'Stanford University',
  date: 'October 2026',
  description:
    'Homecoming is an open-source macOS app that gathers your entire digital footprint into one place, so you can explore it or train on it.',
};

function Ref({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function Homecoming() {
  const publicUrl = process.env.PUBLIC_URL;
  const shots = `${publicUrl}/images/homecoming`;

  return (
    <>
      <Video
        src={`${publicUrl}/videos/homecoming-demo.mp4`}
        poster={`${publicUrl}/videos/homecoming-poster.jpg`}
        caption="A quick tour of Homecoming."
        autoPlay
      />

      <p>
        After a year in industry, I&apos;m getting back into user modeling, and
        the question I keep coming back to is how feasible it is to build a
        generalist user model at all (tbh, still unclear!). In the past I&apos;ve
        only worked with messaging data, but messaging is clearly just one piece
        of me. I&apos;ve visited so many websites. I scroll so many reels. I used
        to write Wattpad stories, I&apos;ve had many Reddit accounts, and I was
        active on the RuneScape forums. All of this is context that should be
        useful for modeling me, so before building anything else, I figured I
        should go get it. And perhaps I can help other people do it along the
        way.
      </p>

      <p>
        So the goal became helping everyone collect and take control of their
        entire digital footprint. I also think there&apos;s a cool problem here
        about self-understanding. Interacting with your own digital footprint is
        an interesting experience, and I&apos;m super interested in how people
        interact with their own user models. That&apos;s what{' '}
        <strong>Homecoming</strong> is: it brings your data home from your Mac,
        your phone, and over 2,000 websites into one place, for you to explore
        or train on. And all of it stays local on your Mac. When you ask it
        something, the AI only sees what it looks up to answer you.
      </p>

      <h2 id="features">Some features</h2>

      <h3>All your data, in one place</h3>

      <p>
        Homecoming starts with everything already on your Mac and phone:
        Messages, Photos, Safari, plus WhatsApp, Health, Notes and a bunch more
        from your iPhone. For everything else, it finds the accounts you have and
        requests your data export from each one, acting as a computer-use agent
        in your browser. Exports show up on their own schedule, so it watches
        for them and brings each one in when it arrives (or you can download
        them yourself).
      </p>

      <Figure
        src={`${shots}/collected.jpg`}
        alt="Homecoming's Collected view listing sources like Messages, Photos, Gmail, Google, Instagram and Spotify, with notifications that Instagram and Spotify are home"
        caption="Every source in one list, with notifications as new exports come home."
        variant="screenshot"
      />

      <h3>Explore your life</h3>

      <p>
        Once your data is home, Explore is the front page: your year at a glance
        (people, trips, photos, distance traveled), what you were up to on this
        day, and the people you talk to most. Your Year also plays like a story
        you can click through.
      </p>

      <Figure
        src={`${shots}/explore.jpg`}
        alt="Explore page with a Your Year card for 2025, an On This Day photo collage, and a Your People list"
        caption="Explore: your year, this day, and your people."
        variant="screenshot"
      />

      <h3>Retrace every journey</h3>

      <p>
        Homecoming works out your trips from where your photos were taken and
        puts every flight on a map, which you can flip through year by year.
      </p>

      <Figure
        src={`${shots}/journeys.jpg`}
        alt="World map with flight arcs and a Journeys summary of kilometers, flights, and trips around the Earth"
        caption="Journeys, worked out from photo locations."
        variant="screenshot"
      />

      <h3>Find your people</h3>

      <p>
        Everyone you talk to gets their own page, merged across apps (here
        Instagram, Messages, and Phone). You can see how much you talk, how much
        of it comes from you, who usually starts the conversation, and how that
        changes month to month. And then you can click in and reread every
        conversation.
      </p>

      <Figure
        src={`${shots}/people.jpg`}
        alt="A person page showing message counts, calls, photos together, who starts conversations, and messages by month"
        caption="One page per person, across every app you talk to them on."
        variant="screenshot"
      />

      <h3>See any day, as it happened</h3>

      <p>
        Your Stream lines everything up in the order it happened, so you can
        pick any day and see it: the songs on the way in, who you texted, what
        you searched, the photos you took. Duplicates across apps count once,
        and a run of the same thing (a conversation, a stretch of browsing, a
        batch of photos) becomes one event, so thousands of raw records turn
        into a day you can actually read.
      </p>

      <Figure
        src={`${shots}/day.jpg`}
        alt="A single day's timeline of events such as steps walked, Spotify tracks, texts, browsing, coding, and photos"
        caption="One day, as it happened."
        variant="screenshot"
      />

      <h3>See who keeps tabs on you</h3>

      <p>
        Your exports also include what companies know about you. Homecoming
        pulls this together: what Facebook, Instagram, X and LinkedIn have filed
        you under and think you&apos;re into, and which apps and websites told on
        you by sending a service what you did there. From a user modeling
        perspective this one is especially interesting: these are basically the
        user models these companies have built of you!
      </p>

      <Figure
        src={`${shots}/tabs.jpg`}
        alt="The you they see: interest and audience categories from Facebook and Instagram, X, and LinkedIn, above a chart of which apps told on you"
        caption="The you they see, and who told on you."
        variant="screenshot"
      />

      <h3>Ask it anything</h3>

      <p>
        Finally, you can just ask questions about your life. It looks things up
        across your library and answers with the actual messages and photos
        behind it, citing the records they came from. Your library stays on your
        Mac, and only the records it looks up to answer you ever leave it.
      </p>

      <Figure
        src={`${shots}/ask.jpg`}
        alt="An answer that quotes a message thread, then summarizes runs and photos from that summer with three lakefront photos"
        caption="Asking &ldquo;What did I get up to the summer I moved to Chicago?&rdquo;"
        variant="screenshot"
      />

      <h2 id="privacy">Privacy</h2>

      <p>
        I really want to emphasize this one: all of your data stays local on
        your Mac. The only time any of it reaches the cloud is if you use an
        API-based model (like Claude or ChatGPT) to ask questions over your
        data, and even then it only sees what it looks up to answer you. Before
        anything goes to a provider, Homecoming makes you check how long they
        keep your data and that it isn&apos;t used for training, and it keeps
        reminding you. But there&apos;s also an open-source alternative! Run a
        local model (through Ollama or LM Studio), and you get every feature
        without any of your data hitting the cloud. We take privacy and
        security super seriously.
      </p>

      <h2 id="use-cases">How I&apos;ve been using it</h2>

      <p>
        A really good use case for me has been remembering the things I forget:
        when I went to specific events, people&apos;s birthdays, and what
        happened at those birthdays. Here are two from the demo library (Riley
        Park, a made-up person, so no one&apos;s real data):
      </p>

      <AskExample caption="Real answers from Homecoming, asked of its demo library. Everything about Riley is made up.">
        {asks.map((a) => (
          <AskWindow
            key={a.question}
            question={a.question}
            lookedUp={`Looked up ${a.lookups} things`}
            answer={a.answer}
          />
        ))}
      </AskExample>

      <p>
        I built Homecoming because as I&apos;m working on building stronger
        personal user models, I&apos;m bottlenecked a lot on my data so it&apos;s
        incredibly important to work on a strong data foundation. There are
        also some super interesting questions that come after that. If capturing
        your interactions with technology is this useful, maybe we should build
        experiences that capture more of them, in ways that give real signal
        into how to give you better experiences.
      </p>

      <p>
        Homecoming is open source, and all of the code can be found here!{' '}
        <Ref href="https://github.com/benshi34/homecoming">[link]</Ref>
      </p>
    </>
  );
}
