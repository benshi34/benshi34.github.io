import AlgorithmSlides from '../components/AlgorithmSlides';
import ArenaDemo from '../components/ArenaDemo';
import AssistantFigure from '../components/AssistantFigure';
import BeforeAfter from '../components/BeforeAfter';
import CiteBlock from '../components/CiteBlock';
import ConversationCarousel from '../components/ConversationCarousel';
import ConversationTheater from '../components/ConversationTheater';
import {
  ContextWalkthrough,
  ReasoningWalkthrough,
} from '../components/DataWalkthroughs';
import CoherenceProblemsWalkthrough from '../components/EvalProblems';
import EvalFigure from '../components/EvalFigure';
import InfoTip from '../components/InfoTip';
import PaperWalkthrough from '../components/PaperWalkthrough';
import PreferencePairs from '../components/PreferencePairs';
import SituationHeatmap from '../components/SituationHeatmap';
import Toc from '../components/Toc';
import UserModelMap from '../components/UserModelMap';

export const meta = {
  slug: 'impersona-env',
  title: 'IMPersona-Env: User Models as Environments for Model Personalization',
  author: 'Quan Shi',
  affiliation: 'Stanford University',
  date: 'September 2026',
  description:
    'We allow a personal assistant model to interact infinitely with a simulation of me to learn complex situational preferences and collaboration patterns.',
};

const REFS = {
  impersona: 'https://arxiv.org/abs/2504.04332',
};

function Ref({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

const CITE_POST = `@misc{shi2026assistant,
  author       = {Shi, Quan},
  title        = {IMPersona-Env: User Models as Environments for Model Personalization},
  year         = {2026},
  month        = {September},
  howpublished = {\\url{https://benshi34.github.io/#/blog/impersona-env}},
  note         = {Blog post}
}`;

const CITE_IMPERSONA = `@article{shi2025impersona,
  title   = {IMPersona: Evaluating Individual Level LM Impersonation},
  author  = {Shi, Quan and Jimenez, Carlos E. and Dong, Stephen and Seo, Brian
             and Yao, Caden and Kelch, Adam and Narasimhan, Karthik},
  journal = {arXiv preprint arXiv:2504.04332},
  year    = {2025}
}`;

const SECTIONS = [
  { id: 'useful', label: 'How can we make good user models useful?' },
  { id: 'user-model', label: 'Training a good user model' },
  { id: 'assistant-model', label: 'Training a good assistant model' },
  { id: 'conclusions', label: 'Conclusions' },
];

export default function ImpersonaEnv() {
  return (
    <>
      <div className="post-tldr">
        <p className="post-tldr-body">
          <span className="post-tldr-label">TLDR:</span>{' '}
          We allow a personal assistant model to interact infinitely with a{' '}
          <em>simulation of me</em> to learn complex situational preferences and
          collaboration patterns.
        </p>
        <p className="post-tldr-contact">
          Please reach out at{' '}
          <a href="mailto:benshi@stanford.edu">benshi@stanford.edu</a> if you're
          working on anything similar — would love to chat!
        </p>
      </div>

      <ConversationTheater
        caption={
          'Three conversations running at once between my user model (blue) and ' +
          'a chat assistant (grey). Its private reactions to each reply are what ' +
          'become training signal.'
        }
      />

      <Toc items={SECTIONS} />

      <h2 id="useful">How can we make good user models useful?</h2>

      <p>
        In April of 2025 we released a paper called{' '}
        <Ref href={REFS.impersona}>IMPersona</Ref>, where we trained a model to
        replicate a specific individual's textual outputs to the point where
        people who knew that individual often couldn't tell the model apart
        from the real person. <PaperWalkthrough /> Since then it has become
        easier and easier to build complex models from our personal data, as
        models improve on both sides of the pipeline: as the simulator being
        fine-tuned, and as the annotator that recovers the context,
        relationships, and latent reasoning that raw personal data leaves
        implicit. Forming complex representations of human preferences, desires
        and values from our messages, our screen activity, the things we click
        on and the things we ignore could be a tremendous advancement in how
        models understand and collaborate with humans to maximize human
        agency, wellbeing, and output.
      </p>


      <p>
        As we grow the capability to build models of individual decision making,
        one big question arises:{' '}
        <strong>
          how can we best utilize accurate{' '}
          <span className="post-term">user models</span>
          <InfoTip label="What I mean by user model">
            People use &ldquo;user model&rdquo; to mean different things. Here,
            a user model is a model that, given any context, can replicate the
            output of a target user: what that specific person would say, do, or
            think in that situation.
          </InfoTip>
          ?
        </strong> How can we
        leverage such a model to help an individual achieve their goals more
        efficiently and more satisfyingly, and reach their full potential? I
        think there are several promising applications of highly accurate user
        models:
      </p>

      <ol>
        <li>
          <strong>It allows an agent to faithfully act on our behalf.</strong>{' '}
          Given a model that approximates a user's decisions at any given
          context/state, an agent can query it in place of the user whenever it
          hits a decision point it would otherwise escalate. This has several
          implications: (a) as agent rollouts get longer and more parallel, the
          number of decisions requiring human input grows with the amount of
          work delegated, and a user model greatly the human as the bottleneck
          on throughput; (b) alignment of actions with individual-level values
          makes agents more resistant to hijacking, phishing, manipulation; and
          (c) a user model you train yourself is an explicit artifact you can
          audit, correct, version, and carry across providers, giving you
          sovereignty over your own representation.
        </li>
        <li>
          <strong>
            It lets us sample durably from a user's action and value
            distribution in ways we could never do with the actual human.
          </strong>{' '}
          This is something you cannot do with the actual human. A human's
          responses are path-dependent: each query changes their state through
          anchoring on previous answers, or simply fatigue, and the number of
          queries they will tolerate is small. An LLM-based user model is
          stateless, so we can sample it repeatedly from the same context,
          evaluate counterfactuals by perturbing that context, and scale the
          number of queries arbitrarily. In effect, the user's preferences
          become a queryable function. This is especially important in today's
          training paradigms, where RL requires reward queries at a scale no
          individual human could ever provide.
        </li>
        <li>
          <strong>
            It allows a user to interact with an externalized model of
            themselves.
          </strong>{' '}
          A user model is an alternative internalization of the same experiences
          the user has lived through, and unlike your own cognition, you can
          query it directly: ask how you would act in a given context and why,
          surface inconsistencies between your stated and revealed preferences,
          or compare how versions of the model trained on different periods of
          your life diverge. This makes the user model a tool for
          self-understanding, not just a proxy for delegation. I find this
          direction super cool and promising. We are on a constant quest to
          understand how our experiences shape us, and observing how a model
          internalizes those same experiences gives us a new lens on that
          question, one we can inspect and perturb in ways we never could with
          our own minds.
        </li>
      </ol>

      <p>
        This project combines applications (1) and (2). It asks a simple
        question:{' '}
        <strong>
          can a chat assistant learn from us the way a human assistant would?
        </strong>{' '}
        A good human assistant gets better at working with you by seeing
        you across a wide range of situations, and every interaction carries
        rich feedback: not just whether you were satisfied, but how you pushed
        back, what you let slide, and what you had to explain twice.
      </p>

      <p>
        Current models can't learn this way from a real person. They are much
        less sample-efficient than humans and generalize less from each
        interaction, so they need far more interactions than any one person
        could provide, and for the reasons in (2), a real person can't be
        sampled at that scale anyway. A sufficiently accurate user model removes
        this constraint. Because it can be queried durably, it can act as both
        the environment and the source of reward, supporting as many
        interactions as training needs. And because it has learned from a large
        history of my own messages, the feedback it gives retains much of the
        richness of mine.
      </p>

      <p>
        To instantiate this, I put a simulation of me in an environment and let
        a personal assistant model interact with it indefinitely to learn my
        situational preferences and collaboration patterns. It boils down
        roughly to the following algorithm:
      </p>

      <AlgorithmSlides />

      <p>
        Each part depends on the others. The assistant can only be as good as
        the user model it learns from, so the user model has to be faithful. The
        environment has to be calibrated to the kinds of interactions I actually
        have with an assistant, or else the assistant learns preferences for
        situations that never come up. Below I walk through each part: training
        the user model, then training the assistant model (including the
        challenges along the way and the evals we built), followed by results.
      </p>

      <details className="post-aside">
        <summary>
          <span className="post-aside-tag">Aside</span>
          Why not just memory?
        </summary>
        <div className="post-aside-body">
          <p>
            Okay, but can't we just give the assistant a memory? Existing
            personalization mostly works by storing discrete facts about the user
            and retrieving them at inference time, like ChatGPT's memory or
            retrieval over user profiles. Why go through the trouble of
            training a user model and running RL against it? There are a few
            differences that I think matter:
          </p>

          <ul>
            <li>
              <strong>Facts are not contextualized.</strong> Memory works well for
              things like where you live or your favorite ice cream store. But most
              of what makes collaboration go well is situational: when I want to be
              asked versus when I want you to just do it, what tone I respond to,
              what I care about in one context but not another. These are hard to
              write down as factoids, because the space of branches they would
              have to express is combinatorially large: the right move depends
              on the situation, the person, the stakes and the mood, and there
              are far too many combinations to enumerate.
            </li>
            <li>
              <strong>Memory has to guess what will matter.</strong> A memory system
              decides what to store before knowing what it will be used for.
              Interacting with a user model is grounded in a task distribution from
              the start: the assistant learns whatever turns out to matter for the
              tasks it's actually doing.
            </li>
            <li>
              <strong>It isn't how humans learn about each other.</strong> We don't
              learn to work with someone by memorizing a list of facts about them.
              We interact with them repeatedly and gradually build a model of how
              they behave across situations. A user model makes this kind of
              learning possible at a scale no real human could support, which is
              exactly application (2) above.
            </li>
          </ul>

          <p>
            The two approaches aren't mutually exclusive. An assistant trained this
            way can still use memory. The bet here is that the missing piece in
            personalization is contextualized, interaction-derived representations,
            and that these complex, situational preferences would be difficult
            to represent with memory alone.
          </p>
        </div>
      </details>

      <h2 id="user-model">Training a good user model</h2>

      <p>
        The user model is SFT'd over my text message history.
        The pipeline condenses to four steps: export my message
        history, segment it into conversations, convert each of my replies into
        a next-message prediction example conditioned on the preceding context,
        and SFT Llama-3.1-8B on the result. The training objective
        is unchanged from IMPersona; the gains since come almost entirely from
        the data, specifically from recovering context that raw transcripts
        leave implicit.
      </p>

      <details className="post-aside">
        <summary>
          <span className="post-aside-tag">Aside</span>
          Why Llama-3.1-8B?
        </summary>
        <div className="post-aside-body">
          <p>
            Llama-3.1-8B is an old base model, and I did try to replace it. Most
            of the newer open-weight models I tested, including small
            Qwen-series models and Gemma 4, responded worse to the same SFT
            pipeline and scored lower on the evals below. My hypothesis is that
            their post-training is heavily optimized for agentic and assistant
            behavior, and acting as a user just isn't a priority. Humans&amp; build Persimmon on Nemotron, which I haven't
            tried; it may well suit this setting better. Compute constraints
            unfortunately made it difficult to experiment across many base
            models, or with larger ones :(
          </p>
        </div>
      </details>

      <ul>
        <li>
          <strong>Relationship and situational context.</strong>{' '}
          <ContextWalkthrough /> An annotator
          model writes a summary of my relationship with each contact, and every
          training example is conditioned on it. Each conversation is
          additionally annotated with the state immediately preceding it:
          ongoing plans, recent events, and relevant shared context. This
          addresses a failure mode identified in the original paper: real
          messages frequently depend on events absent from the transcript, so a
          model trained on the transcript alone learns to produce unmotivated
          conversational jumps. Conditioning on relationship context also lets
          the model capture how tone, disclosure, and behavior vary with the
          interlocutor.
        </li>
        <li>
          <strong>Reconstructed internal reasoning.</strong>{' '}
          <ReasoningWalkthrough /> For each real
          reply, an annotator model reconstructs a short internal monologue
          describing what I noticed, felt, or intended, and the user model is
          trained to emit it as a <code>&lt;think&gt;</code> block before its
          message. This makes the model's latent preferences inspectable, and it
          is the channel that later supplies the preference signal for the
          assistant. Because reconstruction is prone to hallucinating
          unsupported motivations, the annotator applies strict skip rules,
          abstaining whenever the reasoning cannot be inferred without
          fabrication.
          <details className="post-aside">
            <summary>
              <span className="post-aside-tag">Aside</span>
              But wait…
            </summary>
            <div className="post-aside-body">
              <p>
                Although we do find that adding the reconstructed thoughts and
                the relationship summaries greatly helps the coherence of the
                user model (the original IMPersona paper is roughly the baseline
                without them), it's natural to wonder: what new information does
                the annotator actually introduce, if it only sees the same
                conversation the model is trained on? And what if it doesn't
                recover the reasoning that actually produced the message?
              </p>
              <p>
                My intuition here is that data augmentation serves to offload
                necessary multi-hop inference to dataset-creation time, and
                shortens the implicit computation the model has to learn to map
                context to the gold output, which should make credit assignment
                during training much easier. The thought writes that reasoning
                out right before the reply, instead of leaving the model to infer
                it. I'm also pretty sure this has to do with the model size I'm
                working with: an 8B model may not reliably learn that latent
                inference from x → y alone, while larger models might already
                perform most of it implicitly.
              </p>
            </div>
          </details>
        </li>
      </ul>

      <p>
        Across the pipeline, filtering is deliberately aggressive: any example
        whose context or reasoning cannot be recovered is dropped rather than
        kept.
      </p>

      <h3 className="post-subhead">Evaluating the user model</h3>

      <EvalFigure />

      <p>
        Evaluation is hard. Without a reliable metric, it's hard to
        hillclimb in any structured way, or to attribute an improvement to any
        single intervention. We're also operating in an unusual space: an
        eval built around one person's data may not transfer to anyone
        else, and optimizing for several people at once raises a whole set of
        privacy concerns. In practice, you have access to the shape of the data
        you want to build evals around, but not its contents. I'm super
        interested in this space of <strong>Federated Evaluation</strong> problems, and hope to
        write more about it in the future! The approach below
        is a first pass, and improving it is an active direction, but it
        splits evaluation into two parts.
      </p>

      <ul>
        <li>
          <strong>General coherence.</strong> A check that the model remains a
          coherent conversational agent. We roll out simulated conversations
          across a fixed set of scenarios and use an LLM judge to score the user
          model's coherence on a 1–7 scale along four criteria: whether each
          message follows from the preceding turns, whether the conversation
          has a followable trajectory, whether it stays grounded in the
          scenario, and whether its expressed thoughts and goals remain
          internally consistent. One interesting problem we faced here is that
          coherence depends on the person <CoherenceProblemsWalkthrough />
          <details className="post-aside">
            <summary>
              <span className="post-aside-tag">Aside</span>
              Should coherence go up?
            </summary>
            <div className="post-aside-body">
              <p>
                Grading coherence is complicated, because more of it isn't
                always better. Real people aren't perfectly coherent: they drop
                threads, change their minds, and jump topics mid-conversation. I
                can decide on a PhD and in the next message ask whether the gym
                opens at 8am. A judge that always rewards more coherence pushes
                the user model to be tidier than the person it imitates, and the
                most coherent transcripts we saw were often the least like me:
                complete sentences, polite, thanking the assistant for its help.
              </p>
              <p>
                So we treat coherence as a guardrail rather than a target. A low
                score catches a user model that has broken, but past the
                person's own level, a higher score means less like them, not
                better. The right reference point is how coherent the person
                is, which means scoring their real conversations with the same
                judge. v9, the version we use, has the lowest coherence in the
                table.
              </p>
            </div>
          </details>
        </li>
        <li>
          <strong>Fidelity to me.</strong> Checks that target me
          specifically:
          <ul>
            <li>
              <strong>Style.</strong> A stylistic judge that scores whether the
              model's messages read as mine.
            </li>
            <li>
              <strong>Fact recall and decision making.</strong> Facts that
              should surface in a given scenario are sampled, and the model is
              checked for recalling and acting on them correctly.
            </li>
            <li>
              <strong>Manual review.</strong> These automated metrics are
              complemented by manual review, in which we score whole
              transcripts against a rubric. The rubric folds in the checks
              above (coherence, style, and fact recall and decisions) and adds
              two things specific to me: whether the model uses humor the way I
              do, deflecting with a joke when a conversation gets heavy or
              turning the assistant's own words back on it, and whether it
              treats the assistant the way I do, with little patience for
              generic or corporate-sounding advice and short acknowledgments
              rather than effusive thanks.
            </li>
            <li>
              <strong>Disagreement rate.</strong> Not really a target but a
              useful side measurement: it is the share of the user model's reasoning turns that critique
              the assistant's previous reply, as labeled by an LLM judge. It
              tells us how often the user model's private reactions push back
              on the assistant, and so how much signal each rollout can give
              the assistant training that comes next.
            </li>
          </ul>
        </li>
      </ul>

      <h3 className="post-subhead">How the user model does</h3>

      <div className="post-table-wrap">
        <table className="post-table">
          <thead>
            <tr>
              <th>Version</th>
              <th className="num">Batch</th>
              <th className="num">Coherence</th>
              <th className="num">Style</th>
              <th className="num">Facts &amp; decisions</th>
              <th className="num">Manual review</th>
              <th className="num">Disagreement rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                v2
                <span className="post-table-sub">8.9k examples</span>
              </td>
              <td className="num">16</td>
              <td className="num">5.70</td>
              <td className="num">4.6</td>
              <td className="num">62%</td>
              <td className="num">4.2</td>
              <td className="num">7.0%</td>
            </tr>
            <tr>
              <td>
                v4
                <span className="post-table-sub">15.2k examples</span>
              </td>
              <td className="num">16</td>
              <td className="num">5.55</td>
              <td className="num">4.7</td>
              <td className="num">58%</td>
              <td className="num">4.5</td>
              <td className="num">8.7%</td>
            </tr>
            <tr>
              <td>
                v4.1
                <span className="post-table-sub">larger batch</span>
              </td>
              <td className="num">32</td>
              <td className="num">5.35</td>
              <td className="num">4.5</td>
              <td className="num">78%</td>
              <td className="num">4.5</td>
              <td className="num">8.5%</td>
            </tr>
            <tr>
              <td>
                v6
                <span className="post-table-sub">14.1k trimmed examples</span>
              </td>
              <td className="num">16</td>
              <td className="num">5.30</td>
              <td className="num">4.7</td>
              <td className="num">88%</td>
              <td className="num">4.8</td>
              <td className="num">6.6%</td>
            </tr>
            <tr>
              <td>
                v7
                <span className="post-table-sub">scaling up trimming, 36.4k examples</span>
              </td>
              <td className="num">16</td>
              <td className="num"><strong>5.83</strong></td>
              <td className="num">4.4</td>
              <td className="num"><strong>93%</strong></td>
              <td className="num">2.8</td>
              <td className="num">5.2%</td>
            </tr>
            <tr>
              <td>
                v8
                <span className="post-table-sub">different reasoning truncation</span>
              </td>
              <td className="num">64</td>
              <td className="num">5.70</td>
              <td className="num">4.6</td>
              <td className="num">71%</td>
              <td className="num">3.0</td>
              <td className="num"><strong>12.8%</strong></td>
            </tr>
            <tr className="post-table-final">
              <td>
                <strong>v9 (final)</strong>
                <span className="post-table-sub">less epochs</span>
              </td>
              <td className="num">64</td>
              <td className="num">5.17</td>
              <td className="num"><strong>4.8</strong></td>
              <td className="num">89%</td>
              <td className="num"><strong>5.7</strong></td>
              <td className="num">12.2%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        The better conversations show behavior well beyond style transfer. In
        the four below, the user model recognizes when it is stalling, catches
        the assistant hedging and makes its own call, reasons through a
        decision with real numbers, and admits a decision it has already
        made.
      </p>

      <ConversationCarousel group="good" kicker="Example conversations" />

      <p>
        Overall, I'm pretty satisfied with where the user model landed, but
        there's still a lot of headroom. The first is that I haven't cracked{' '}
        <strong>evaluation</strong>: I haven't found a set of metrics that correlates strongly
        with my own judgment. This matters because the solution space is often
        quite simple (tuning hyperparameters, cleaning or augmenting data), and
        agents can iterate through it orders of magnitude faster than a human
        can evaluate the results. A challenge here is whether the eval
        generalizes across people under a{' '}
        <strong>federated evaluation</strong> setup, where you know the shape
        of each person's data but can't look at its contents. The second is the{' '}
        <strong>base model</strong>. There are many more open-weight models than when I ran
        these experiments, but most are post-trained heavily for agentic use.
        For a user model, that's not the behavior I'm after, and I'm not sure
        how it interacts with fine-tuning on someone's personal messages. I'd
        like to try model families with more balanced post-training, and much
        larger models than 8B.
      </p>

      <h2 id="assistant-model">Training a good assistant model</h2>

      <AssistantFigure />

      <p>
        The key idea is to use the user model's latent representation of my
        values as the reward. Before every message, the user model reasons
        privately about what the assistant just said, and that reasoning is
        where its preferences surface. For example:
      </p>

      <ul className="post-thoughts">
        <li>
          “Okay, the chatbot is being nice and all, but I don’t need therapy
          — I just need to compare phone plans.”
        </li>
        <li>
          “Yeah, ‘Hoping everything goes well’ sounds too formal — it’s a
          direct translation and it doesn’t feel natural in English.”
        </li>
        <li>
          “Okay, the AI’s response was helpful but not exactly what I needed
          — it’s too general and doesn’t really settle the debate.”
        </li>
      </ul>

      <p>
        We recap the final algorithm here. First, we mass-sample conversations
        between the user model and the assistant, and at each turn an LLM judge
        reads the user model's reasoning and decides whether it contains
        meaningful feedback on the assistant's last reply. If it does, we form
        a preference pair from the current response and a rewrite by the
        original assistant model. Then, the feedback reaches the rewrite only
        as a guideline that references what is observable in the conversation,
        so the assistant learns from cues it could actually have noticed, not
        from thoughts it will never see. Although this is fundamentally
        off-policy, it is far more sample and compute-efficient, and
        empirically it produced similar results to an on-policy setup that
        samples repeatedly from the assistant to form preference sets. I'm
        very compute bound, so this bit mattered a lot.
      </p>

      <p>
        An alternative that worked decently well, though I didn't expand on it
        much, was an interview-style intervention: at points in the
        conversation, we ask the user model directly for feedback on the
        conversation so far, and use its natural-language answer to assign
        rewards.
      </p>

      <p>
        We show a few of the preference pairs extracted here. Most are
        hyper-specific to the scenario they came from, less a general rule
        like "be concise" than a judgment about what this particular reply got
        wrong in this particular moment. Reading through them myself, I found
        I agreed with the user model far more often than not: of 100 pairs I
        sampled, I agreed with 89.
      </p>

      <PreferencePairs />

      <p>
        Training is DPO over the extracted preference pairs. The assistant is
        Qwen3.5-27B, trained on roughly 3,000 preference pairs derived from
        conversations across 130 scenarios.
      </p>

      <p>
        Evaluating the assistant was less systematic than evaluating the user
        model. We tracked a couple of automatic signals: the disagreement rate,
        now as a measure of how often the assistant says something the user
        model privately objects to, and the user model's coherence, as a check
        that conversations weren't degrading. But both are measured through the
        same user model the assistant was trained against, so on their own
        they can't tell real improvement apart from the assistant learning the
        user model's quirks. In practice, most of the evaluation ended up being manual:
        tune the hyperparameters, roll out a fresh set of conversations, read
        through them, and repeat.
      </p>

      <p>
        The clearest way to see what changed is to give the untrained and the
        trained assistant exactly the same conversation and compare their next
        reply:
      </p>

      <BeforeAfter />

      <p>
        Crucially, what the assistant learns is not a flat rule. In the grid
        below, each row is a kind of situation, each column is a feature of
        the assistant's replies, and the color shows how that feature changed
        with training. Some shifts are broad but uneven: replies lose their
        lists almost everywhere, yet lists nearly vanish from therapy and
        health conversations while car trouble keeps most of them. Other
        features move in opposite directions depending on the situation.
        Replies about stress and etiquette actually got longer. Empathetic
        openers became more common in acute support and conflict but rarer in
        homesickness and tech help. Asking several questions at once dropped
        sharply for homesickness and tech help but rose for motivation and
        stress, and offering options fell in most emotional situations but
        rose for nutrition, research and planning.
      </p>

      <SituationHeatmap />

      <p>
        There's a huge space of decisions here that I wanted to explore but
        didn't get to. The first is how the user model's natural-language
        feedback gets into training: OPSD, or on-policy RL after converting the
        feedback into scalar rewards, could both be interesting. As usual,
        bigger models, and the capabilities that emerge from the interaction between data, model size and training
        method, would be super interesting to study. And most crucially, I'd
        like to extend this to more people, to find out which parts of the
        pipeline are overfit to qualities specific to my data.
      </p>

      <h3 className="post-subhead">Final evaluation: a blind arena</h3>

      <p>
        I wanted a final evaluation of the assistant in its usual deployment
        setting, by using it as my daily personal assistant. So I built a small
        arena, and for two weeks I used it for all of my normal ChatGPT queries.
        Every
        conversation ran against two assistants side by side, blind to which
        model was which, and I picked the better one (or called a tie, or
        marked both as bad). Each battle drew two of four baselines at random:
      </p>

      <ul>
        <li>
          <strong>The untrained assistant</strong> (Qwen3.5-27B), as the floor.
        </li>
        <li>
          <strong>The same model with a search tool over my message
          history</strong>, the retrieval baseline behind "Why not just
          memory?".
        </li>
        <li>
          <strong>Our trained assistant.</strong>
        </li>
        <li>
          <strong>A much larger model</strong> (Qwen3.5-397B) with the same
          search tool, to test whether targeted training on a smaller model can
          beat scale plus retrieval.
        </li>
      </ul>

      <ArenaDemo />

      <div className="post-table-wrap">
        <table className="post-table">
          <thead>
            <tr>
              <th>Model</th>
              <th className="num">W</th>
              <th className="num">L</th>
              <th className="num">T</th>
              <th className="num">Total</th>
              <th className="num">Win %</th>
            </tr>
          </thead>
          <tbody>
            <tr className="post-table-final">
              <td><strong>Qwen 27B + DPO</strong></td>
              <td className="num">50</td>
              <td className="num">30</td>
              <td className="num">33</td>
              <td className="num">113</td>
              <td className="num"><strong>44%</strong></td>
            </tr>
            <tr>
              <td>Qwen 397B + memory search</td>
              <td className="num">57</td>
              <td className="num">49</td>
              <td className="num">37</td>
              <td className="num">143</td>
              <td className="num">40%</td>
            </tr>
            <tr>
              <td>Qwen 27B + memory search</td>
              <td className="num">46</td>
              <td className="num">59</td>
              <td className="num">34</td>
              <td className="num">139</td>
              <td className="num">33%</td>
            </tr>
            <tr>
              <td>Qwen 27B (vanilla)</td>
              <td className="num">31</td>
              <td className="num">46</td>
              <td className="num">28</td>
              <td className="num">105</td>
              <td className="num">30%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Qualitatively, the difference shows up where
        the preference data was concentrated: it gets to the point faster,
        commits to a single recommendation instead of listing options, answers
        the question as asked, takes my word for it when I describe my
        situation, and uses far fewer lists and headers. On information-heavy
        queries, where the answer depends on knowledge rather than on how it is
        delivered, the gap largely closes. This is consistent with what the
        preference pairs contain, which is feedback on how to respond to me
        rather than on what is correct. It also suggests these gains are not
        something scale provides on its own: the 397B model, with the same
        search over my messages, has a lower win rate than the trained 27B
        model.
      </p>

      <h2 id="conclusions">Conclusions</h2>

      <p>
        If we define a user model as a model of a person's conditional output
        distribution (aka, one that can predict what they would do given any
        context), I think a perfect one is extremely difficult. The problem is
        fundamentally partially observable: most of the state behind any given
        decision is never logged, like a conversation someone had in person an
        hour ago, what they read that morning, or how tired they are. It's also
        non-stationary, since humans constantly update with respect to an
        environment that models do not have access to (at least in current
        societal infrastructure). Human decision making also carries significant
        variance, which takes proportionally more data to model well. This data
        inefficiency is unfortunate as the amount of human data we record is
        highly, highly asymmetric.
      </p>

      <p>
        Still, I'm quite bullish on this direction, because most use cases
        don't need an oracle. An oracle user model would solve essentially
        everything, but in the imperfect reality we live in, I think it's more
        useful to place use cases by how much individual-level data they
        actually need:
      </p>

      <UserModelMap />

      <p>
        The less individual data a use case needs, the more of the model can
        come from a population-level prior. At the far left, filing tax forms
        is mostly the same procedure for everyone, plus a few facts about you.
        Further along, for grocery ordering, most of what matters is fact
        recall (what I usually buy, what I can't eat) plus a handful of general
        traits, like how cost-sensitive I am or how comfortable I am handing
        decisions to the agent. At the far right, therapy and emotional support
        genuinely need individual-level data: the relevant state is
        idiosyncratic and drifting, but it is also exactly the kind of state
        that text messages record densely, which is what makes a user model
        like the one in this post feasible there. For many other use cases on
        that end of the scale, we simply don't record comparable data yet. It's
        precisely because of this spread that I'm still bullish: a lot of use
        cases don't need a perfect model of the person, and for the ones that
        do, the question becomes whether the right data exists.
      </p>

      <p>
        That frames building user models as a sample-complexity question: for
        each downstream application, <strong>how much individual data and how much live
        context do you need before a personal model beats the population
        prior?</strong> Some applications need very little, some a lot, and some may
        never be reachable. Mapping that out, and building evals grounded in
        the downstream tasks a user model actually helps with, is a research
        direction I'm super excited to pursue. If you're thinking about any of
        this, would love to chat:{' '}
        <a href="mailto:benshi@stanford.edu">benshi@stanford.edu</a>.
      </p>

      <h2 id="acknowledgements">Acknowledgements</h2>

      <p>
        Thank you to Hunter Lightman, Stephen Dong, Omar Shaikh, Jonathan Ward,
        Victor Barres, Diyi Yang, Karthik Narasimhan, Daphne Ippolito, Sherry
        Wu, Serina Chang and Daniel Fried for discussions that helped shape the
        project. And thank you to{' '}
        <strong>
          <Ref href="https://modal.com">Modal</Ref>
        </strong>{' '}
        for generously
        sponsoring the compute for this exploration!
      </p>

      <h2 id="citation">Citation</h2>

      <p>If you found this useful, feel free to cite this blog post!</p>

      <CiteBlock text={CITE_POST} />

      <p>
        For the user model training method, can cite the original IMPersona
        paper:
      </p>

      <CiteBlock text={CITE_IMPERSONA} />

    </>
  );
}
