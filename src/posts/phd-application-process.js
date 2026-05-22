export const meta = {
  slug: 'phd-application-process',
  title: 'On the CS PhD Application Process',
  date: 'May 2026',
  description:
    'Personal reflections, timeline notes, and advice from applying to CS PhD programs in the United States.',
};

function PdfCallout({ href, title, ariaLabel }) {
  return (
    <a
      className="pdf-callout"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <span className="pdf-file-icon" aria-hidden="true">
        <span className="pdf-file-label">PDF</span>
      </span>
      <span className="pdf-callout-text">
        <span className="pdf-callout-title">{title}</span>
        <span className="pdf-callout-meta">Opens as a PDF</span>
      </span>
    </a>
  );
}

export default function PhdApplicationProcess() {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <>
      <p>
        This past year I applied to CS PhDs in the United States, and I want to
        document a bit of my process, along with my theories/thoughts on how
        applications work, in the hopes that it helps others! I generally think
        there are pretty minimal resources out there, and this is quite the
        stressful process...
      </p>

      <p>
        Please take all advice presented here with a grain of salt: I obviously
        have no idea what actually happens in the admissions process, and I
        should not be viewed as some beacon of success where everything I
        believe in/do is correct. These are all just personal reflections and
        perspectives, so take only what you find useful!
      </p>

      <h2>Application Timeline</h2>

      <ol>
        <li>
          In October I applied to NSF GRFP. I feel you should apply to this if
          you are eligible, even if you do not feel competitive, because it
          forces you to concisely articulate the research experiences and vision
          that you will eventually include in your statement of purpose.
        </li>
        <li>
          I went to NeurIPS this application year to present a poster. I only
          ended up chatting with one professor who later interviewed me - but I
          hear this is a great way to get your work and name out from the pile
          of applications! Just be respectful of professors&apos; time and
          energy, since they probably have lots of PhD applicants throwing
          themselves at them, especially the more popular profs...
        </li>
        <li>
          Most of my application materials were taken directly from my NSF GRFP
          application, echoing the point above! Got these done in late November,
          in time for most of the deadlines in early December.
        </li>
        <li>
          Interviews started in February for me and continued through mid to
          late February.
        </li>
        <li>
          I got most of my decisions late Feb to early March - it probably
          varies a little year to year but not too much. I did my visits in
          mid-March and decided in early April. It ended up being a very tough
          decision between a job opportunity and PhDs (in general) - the only
          advice here is to talk to as many people as you possibly can.
        </li>
        <li>NSF GRFP decisions came out in April this year.</li>
      </ol>

      <h2>NSF GRFP</h2>
      <p>
        I&apos;ve attached my research statement for NSF GRFP below: I hope this
        can help people applying! The main thing here is to be very efficient
        with your words: you only get 2 pages, and you want to sound as
        comprehensive and credentialed as possible within them.
      </p>

      <PdfCallout
        href={`${publicUrl}/files/nsf-grfp-research-statement.pdf`}
        title="View NSF GRFP research statement"
        ariaLabel="View NSF GRFP research statement PDF"
      />

      <p>
        Although I do not feel comfortable sharing my personal statement since
        it contains some details about my life, I&apos;ll share the general
        structure below in case it&apos;s helpful as a reference. The structure
        is:
      </p>

      <ol>
        <li>
          I started with a ~1.25 page introduction on how I got into research to
          begin with. I felt this part needed some context, since I switched
          majors/subfields several times before landing on the research I do
          today.
        </li>
        <li>
          For the next ~1 page I talked about Intellectual Merits, which is
          essentially a list of all the research I&apos;ve done, its
          impacts/usage, awards received... basically your academic credentials.
          This can easily blend in with broader impacts, since the impact of
          your work is naturally tied to your academic credentials etc.
        </li>
        <li>
          For the final portion I talked about broader impacts, which I used as
          a dedicated section for projects/work I&apos;ve done that did not
          quite fit as research projects but still had impact on the broader
          academic community (ie organizing hackathons, maintaining open source
          projects, giving/organizing talks... etc.)
        </li>
      </ol>

      <h2>Reference Letters</h2>
      <p>
        I got my reference letters from my industry mentor, my academic mentor
        throughout undergraduate, and a professor I did a brief semester-long
        music-related research project with. I feel that reference letters are
        very important, and it&apos;s hard to optimize for them in the short
        term. Do good research + build relationships with good mentors, and
        these will come naturally!
      </p>

      <h2>Statement of Purpose</h2>
      <p>
        The purpose here is essentially to show that you have{' '}
        <em>potential</em> to do strong research in your PhD, aligned with
        professors at the institution you&apos;re applying to. Potential to do
        strong research isn&apos;t just having existing credentials or having
        done the work already - it&apos;s also the ability to think critically
        about what work <em>will</em> become important in the future and the
        pathways to getting there. This kind of thinking tends to correlate with
        having done a lot of research already, which I feel is one reason people
        assume you <em>need</em> a ton of papers to get into grad school.
      </p>

      <p>
        Personally, I had a pretty clear idea of the type of work I wanted to do
        in grad school, and I&apos;d been pursuing this direction for the past
        year. I&apos;m very, very fortunate to have worked with an advisor who
        supported my personal research endeavors in so many ways. The core thing
        I worked on was weaving my existing work into a research narrative that
        supported what I wanted to do going forward, and making sure the
        research problem was contextualized in existing work and framed around
        its enduring importance - especially in a world where it can sometimes{' '}
        <em>seem</em> like the things you can work on in academia are a pure
        subset of what&apos;s possible in industry.
      </p>

      <p>
        A common scenario people face is that the subfield they want to study is
        different from the research they already have experience in. I personally
        think the reality is that unless you have credentials suggesting
        you&apos;re universally capable of conducting research in any subfield
        (ie extremely high GPA, valedictorian, lots of awards... etc.), someone
        with more research experience in your intended subfield will most likely
        beat you out. The most practical advice I can give here is to stick with
        your experiences - and who knows, what you want to do now may not even
        stay permanent.
      </p>

      <p>
        You can find my statement of purpose below; I had to remove some
        details from work. For more excerpts, check out the very well known,
        lifesaving website{' '}
        <a href="http://cs-sop.org" target="_blank" rel="noopener noreferrer">
          cs-sop.org
        </a>
        .
      </p>

      <PdfCallout
        href={`${publicUrl}/files/statement-of-purpose.pdf`}
        title="View statement of purpose"
        ariaLabel="View statement of purpose PDF"
      />

      <h2>Personal Statement</h2>
      <p>
        To be completely honest, I&apos;m not sure how deeply this gets read,
        and it probably varies a lot by professor. I do not think it&apos;s
        particularly beneficial to go especially personal here: this is pretty
        generic advice, but if you&apos;ve faced hardships or extenuating
        circumstances that have impeded you, this would be a great place to
        mention them. That said, in a similar way to undergraduate applications,
        fabricating/exaggerating circumstances probably won&apos;t do you any
        good.
      </p>

      <h2>CV</h2>
      <p>
        The only reflection I have here is that before you prepare your CV, you
        should absolutely go through the exercise of brainstorming every single
        research experience, accomplishment, or accolade that could even
        possibly make its way into your application. By the time I applied, I
        realized there were things from earlier in undergrad and even high
        school that I&apos;d completely forgotten about which I think better
        contextualized my research interests - one example was that I had spent
        a better part of high school gunning for biology olympiad, which had
        largely slipped my mind by application time. Now, I have no way of
        knowing how much this mattered, but I can&apos;t imagine including it
        would have hurt.
      </p>

      <h2>Interviews</h2>
      <p>Congrats on getting interviews if you got here!</p>

      <p>
        All of my interviews were just general research chats with professors
        who were directly interested in taking me on as a student. The honest
        best way to prepare is to have genuine conviction and confidence in the
        kinds of research you want to work on / are passionate about. The other
        thing is that you should be able to talk extensively about research
        projects you&apos;ve worked on, understanding them at every level of
        detail - from the high level of why the project mattered for the field,
        down to the low level details of how things were actually implemented.
        It&apos;s unlikely professors will have intimate knowledge of your work,
        so be prepared to present to people who have deep knowledge of the field
        but no knowledge of your specific work. The ability to position your
        work and make it easily digestible in a short amount of time is a
        crucial skill here.
      </p>

      <h2>Visit Days</h2>
      <p>
        Visit days were super fun - I&apos;m quite anti-social and still
        managed to meet a bunch of awesome people and professors. Big on the
        professors: the people who admitted me were honestly some of the nicest,
        most genuine people I&apos;ve ever interacted with. Gives me a lot of
        hope for the academic community I&apos;ll get to be a part of going
        forward.
      </p>

      <p>
        The most interesting part was the 1-1 chats with professors - I
        personally used this time to seek research advice and gauge synergy with
        various potential advisors at different institutions. I had a research
        idea I was super passionate about at the time (which may be out by the
        time this is released? But definitely isn&apos;t at the time of writing)
        and chatted with many different professors about how they viewed the
        work and where they would position it within the prior work they&apos;d
        seen. This helped me not only gain lots of perspectives on the idea
        itself, but also better understand how seasoned researchers map new
        directions onto the landscape of what already exists. I think one of my
        weaknesses generally is that I have less background on how to position
        newer ideas in the context of older ones (tbh almost no idea is truly
        original), and talking to professors with decades of experience across a
        variety of fields was incredibly helpful in this regard.
      </p>

      <h2>Overall Reflections</h2>
      <p>
        If I had to define a guiding principle for how I operate and make
        decisions about what I do, it&apos;s that I always want to do things
        that make me learn. I&apos;m very glad I decided to apply this season,
        since I wasn&apos;t sure at first whether this was the right call.
        Perhaps I&apos;ll do another piece on the value proposition of graduate
        school in this day and age, especially in AI/ML, but at least in the
        current moment I&apos;m convinced it&apos;ll be meaningful. Who knows
        what I&apos;ll think in a year though - I could come back to this and
        regret everything...
      </p>

      <p>
        Hopefully this was helpful to somebody out there! If you have any
        questions, you&apos;re always welcome to email me at{' '}
        <a href="mailto:benshi@stanford.edu">benshi@stanford.edu</a> - I&apos;d
        be very happy to help, since this is seriously such a stressful process,
        and without a solid community of support it can feel very lonely
        sometimes...
      </p>
    </>
  );
}
