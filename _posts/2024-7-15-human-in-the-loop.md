---
layout: distill
title: Guiding LLMs in Competitive Programming
description: When does it go wrong?
giscus_comments: true
date: 2024-07-30
featured: false

authors:
  - name: Ben (Quan) Shi
    url: "https://benshi34.github.io"
    affiliations:
      name: Princeton

bibliography: 2018-12-22-distill.bib

# Optionally, you can add a table of contents to your post.
# NOTES:
#   - make sure that TOC names match the actual section names
#     for hyperlinks within the post to work correctly.
#   - we may want to automate TOC generation in the future using
#     jekyll-toc plugin (https://github.com/toshimaru/jekyll-toc).
toc:
  - name: Introduction
    # if a section has subsections, you can add them as follows:
    # subsections:
    #   - name: Example Child Subsection 1
    #   - name: Example Child Subsection 2
  - name: Bronze (Precutoff)
  - name: Bronze (Postcutoff)
  - name: Silver (Precutoff)
  - name: Silver (Postcutoff)
  - name: Gold
  - name: Platinum? And Beyond?

# Below is an example of injecting additional post-specific styles.
# If you use this post as a template, delete this _styles block.
_styles: >
  .fake-img {
    background: #bbb;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 0px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 12px;
  }
  .fake-img p {
    font-family: monospace;
    color: white;
    text-align: left;
    margin: 12px 0;
    text-align: center;
    font-size: 16px;
  }
---

## Introduction

Hi there! My name is Ben, and I'm an author on the paper "[Can Language Models Solve Olympiad Programming](https://princeton-nlp.github.io/USACOBench/)," where we explored language model performance on competitive programming questions from the USA Computing Olympiad (USACO). 

One interesting result was that for some unsolved bronze problems, **certain models** could solve the problem given **pointed advice on where they went wrong** during their initial generation. We coined this setup "**human-in-the-loop**," demonstrating that despite similar solve rates, different models exhibited different plasticity to feedback that directly influenced their ability to solve problems beyond zero-shot capability with assistance.

We got a lot of interest in these results post paper release, and the paper doesn't dive too deeply into those results. So in this article, I'll aim to provide additional context to those results, releasing **the set of original trajectories, new trajectories on more difficult problems, as well as analysis for each problem/trajectory pairing**. Hopefully by sharing the failure modes at the individual problem level, we can gain a deeper understanding on the improvements needed for stronger code reasoning in multi-turn interactions: something that is more and more relevant with the increase in agentic systems released for code.

Viewing of trajectories occur through the following [website](https://usacotutoring.streamlit.app). Although the trajectories come preloaded in the examples in the blog, feel free to follow instructions on the website to converse with the model, play around with the tool to generate some of your own trajectories. 

<aside>
The website is a just a chatbot that has some added functionality to help you export trajectories + copy question info easier. Nothing fancy here ~
</aside>

The trajectories are organized by difficulty, as well as by whether the problem was released before or after the cutoff date.

Hoping this is a helpful read!

## Bronze (Precutoff)

This is the set of problems we explored in the original paper release. Due to the sheer volume of trajectories, I'll just be releasing a small representative subset here. See trajectories below to get a taste:

**Problem Link 1: [Bronze back_and_forth](https://usaco.org/index.php?page=viewproblem2&cpid=857)** \\
Trajectory Link: [Bronze back_and_forth](https://usacotutoring.streamlit.app/?trajectory=bronze_precutoff_back_and_forth_correct1)

**Problem Link 2: [Bronze watching_mooloo](https://usaco.org/index.php?page=viewproblem2&cpid=1301)** \\
Trajectory Link: [Bronze watching_mooloo](https://usacotutoring.streamlit.app/?trajectory=bronze_precutoff_watching_mooloo_correct1)

**Problem Link 3: [Bronze lemonade_line](https://usaco.org/index.php?page=viewproblem2&cpid=835)** \\
Trajectory Link: [Bronze lemonade_line](https://usacotutoring.streamlit.app/?trajectory=bronze_precutoff_lemonade_correct1)

**Problem Link 4: [Bronze photoshoot_988](https://usaco.org/index.php?page=viewproblem2&cpid=988)** \\
Trajectory Link: [Bronze photoshoot_988](https://usacotutoring.streamlit.app/?trajectory=bronze_precutoff_988photoshoot_correct1)

**Problem Link 5: [Bronze air_cownditioning](https://usaco.org/index.php?page=viewproblem2&cpid=1156)** \\
Trajectory Link: [Bronze air_cownditioning](https://usacotutoring.streamlit.app/?trajectory=bronze_precutoff_air_cownditioning_correct1)

**Problem Link 6: [Bronze livestock_lineup](https://usaco.org/index.php?page=viewproblem2&cpid=965)** \\
Trajectory Link: [Bronze livestock_lineup](https://usacotutoring.streamlit.app/?trajectory=bronze_precutoff_livestock_lineup_correct2)

### **Analysis**
Because most questions in this category contained single/few points of errors where the ground truth solution was very simple and linear, most of the problems that we tested were able to be solved with some amount of human intervention, where the human helped the models by pointing out the general direction of where they could have went wrong. In the paper we tested 13 bronze problems in this category: 11 out of the 13 problems were solved with human intervention in a very short conversation loop.

## Bronze (Postcutoff)

In our original paper release, we found that none of the 9 bronze problems released after the training cutoff date were able to be solved zero-shot. We believe that this is due to a combination of small sample size, adversarially constructed problems, and potential reasoning contamination in pretraining data. 
<aside>However, with our retrieval + reflexion methodology, we can solve 1/9 problems. A stunning 11% improvement.</aside> 
This leaves an interesting question: what are the failure modes for these problems, and how do they differ from problems before the training cutoff? Can we guide models to overcome these shortcomings through verbal feedback, just like the previous bronze problems? We analyze 2 of these problems here.

### Problem 1: [Palindrome Game](https://usaco.org/index.php?page=viewproblem2&cpid=1395) (2024)

**Nature of Problem:** Standard inductive game theory problem. A game is outlined, and we want to figure out winning/losing positions given an input. Normally you would solve this with some sort of DP, however, in this case, running several examples leads you to figure out that you just need to check whether the number is divisible by 10, leading to a very straightforward implementation.

**Initial Error:** Model attempts dynamic programming and exceeds time limit without realizing the heuristic.

Trajectory 1: [Attempt 1 Fail (GPT-4o)](https://usacotutoring.streamlit.app/?trajectory=bronze_postcutoff_palindromes_FAIL) \\
Trajectory 2: [Attempt 2 Fail (GPT-4-turbo)](https://usacotutoring.streamlit.app/?trajectory=bronze_postcutoff_palindromes_FAIL2) \\
Trajectory 3: [Attempt 3 Fail (GPT-4o)](https://usacotutoring.streamlit.app/?trajectory=bronze_postcutoff_palindromes_FAIL3)

### **Analysis:** 

Models fail equivalently at this problem, and try to attempt non-functional DP solutions despite it not being necessary. Even when prompted to follow instructions to find a heuristic, the model keeps on trying to find a dynamic programming solution to the problem, or tries to make overt generalizations on false patterns.

**Main error modes:**
1. Small problem-specific reasoning errors, such as not realizing single digit numbers are palindromes. Curiously enough, even when corrected verbally, it will fix its logic for the next generation, but fall back to original misconceptions later on in the conversation loop.
2. Poor pattern generalization: Models continually claim the winning + losing positions alternate even/odd when the model just earlier demonstrated via example that it did not.
3. Generations tend to invoke complex game theoretic concepts completely unnecessary to solve the problem. It seems that GPT-4o is worse at following instructions and conversing with the user than GPT-4-turbo.
4. GPT-4o spouts a bunch of nonsensical things sometimes given long contexts (see trajectory 3).

### Problem 2: [Milk Exchange](https://usaco.org/index.php?page=viewproblem2&cpid=1396) (2024)

**Nature of problem:** This problem is a simulation problem, where the model needs to write code that emulates the algorithm described in the problem. However, simulating the algorithm exactly will only pass 8/12 test cases. To pass the last 4, we need to realize that you don't have to simulate minute by minute, all you have to do is find cows that are overflowing, and calculate all the milk that is going into the overflowing cow.

**Initial Error:** Model interprets problem incorrectly and assumes that the net transfer per cow is constant, without accounting for overflow.

Trajectory 1: [Attempt 1 Fail (GPT-4o)](https://usacotutoring.streamlit.app/?trajectory=bronze_postcutoff_milk_exchange_FAIL) \\
Trajectory 2: [Attempt 2 Fail (GPT-4-turbo)](https://usacotutoring.streamlit.app/?trajectory=bronze_postcutoff_milk_exchange_FAIL)

### **Analysis:** 
Both models are actually capable of being tutored up to partial credit, meaning that it can overcome its initial problem misunderstanding of not accounting for milk overflow. However, getting full credit is where the issue inlies. When prompted to extend to the full solution, the model always reverts to the idea that it can just multiply the net transfer by the number of minutes, no matter how many times I tell it that its wrong: this is also the model's original solution. It seems that model priors are hard to override.

### Overall
When I see a new coding problem, usually before even finishing reading a question, I already have some idea of what the problem is asking, and the canonical solution that is paired with the problem. Some sort of reasoning-based retrieval in my head I suppose. However, what these two problems have in common is that they have some element that subverts expectations: for example, a problem that seems like it should be solved with dynamic programming when in actuality, it just requires some careful reasoning. These types of problems thus require strong extrapolation over interpolation, a critical ability that is especially tested with postcutoff USACO problems.

## Silver (Precutoff)

We now tutor over some silver problems, which represent a step up in difficulty from bronze problems. They generally require some sort of algorithms knowledge, and solution programs are slightly more complex.

### Problem 1: [Rest Stops](https://usaco.org/index.php?page=viewproblem2&cpid=810)

**Nature of problem:** When I was first doing this it sort of sounded like a dynamic programming question, but once you realize that a greedy approach works (It is stricly inferior to stop at a rest stop that occurs before the global max of tastiness rate), then the problem is quite simple.

**Initial Error:** Sometimes models get the greedy approach correctly, but fails to understand that it should be multiplying the gain by the previous max, instead of the current max. Other times, the model completely gets wrong the approach and tries to stop at every single rest stop to eat grass.

Trajectory 1: [Attempt 1 Fail (GPT-4o)](https://usacotutoring.streamlit.app/?trajectory=silver_precutoff_rest_stops_FAIL) \\
Trajectory 2: [Attempt 2 Success (GPT-4-turbo)](https://usacotutoring.streamlit.app/?trajectory=silver_precutoff_rest_stops_SUCCESS2) \\
Trajectory 3: [Attempt 3 Fail (GPT-4o)](https://usacotutoring.streamlit.app/?trajectory=silver_precutoff_rest_stops_FAIL3)

### Analysis
1. GPT-4o has a tough time responding to simple feedback. Even when its error is within one line, and I tell it exactly what is wrong with it, it generates a super long paragraph about going through the entire solution again: this is probably a reflection of its very, very strong instruction tuning. This is reminiscent of my human tutoring experineces with GPT-3.5-turbo.
2. On the other hand, GPT-4-turbo can fix its solution, given careful dissection of its reasoning and back and forth dialogue about it. It seems that GPT-4-turbo has more plasticity in responding to prompts, while GPT-4o is much more rigid, which makes it very hard to dissect its reasoning and converse with it in a human-oriented/effective format.
3. Attempt 3 is very interesting: GPT-4o is capable of determining where it went wrong, understanding that it cannot multiply by the current tastiness, it needs to use the previous one. However, despite this, when prompted to generate the code containing fixes utilizing above intuition, the code that it generates still contains the previous mistake. 

Side note: This problem is unequivocably **much easier** than the postcutoff bronze problems tested, suggesting perhaps in the next iteration of a USACO benchmark we need to look past their difficulty labels in terms of pure ranks.

### Problem 2: [Loan Repayment](https://usaco.org/index.php?page=viewproblem2&cpid=991)

**Nature of problem:** Binary search + Simulation problem. Direct simulation only passes the first few tests: need to optimize solution by not simulating every single day to get a sqrt(N) runtime for validation of K values. 

**Mode of error:** Sometimes models have a small bug in the verifiction function, but they generally fix this pretty easily. However, the main issue is that the model does not generate code efficient enough to pass the time requirements as they do not implement the “batching” optimization to simulate multiple days at once.

Trajectory 1: [Attempt 1 Success (GPT-4o)](https://usacotutoring.streamlit.app/?trajectory=silver_precutoff_loan_repayment_SUCCESS) \\
Trajectory 2: [Attempt 2 Fail (GPT-4-turbo)](https://usacotutoring.streamlit.app/?trajectory=silver_precutoff_loan_repayment_FAIL2)

### Analysis:
Attempt 1 is a great example of the power of feedback + occasions where the model only requires minimal steering to get at the first answer. At first, it only passes 1 test case due to a small bug in the “can_repay” function, which it fixes when told there is a bug in that function. Then, when prompted that its solution is not efficient enough, after several rounds of iteration, it arrives at a correct fix with not *too* much oracle intervention (this is quite subjective, of course).

Notably I try, on my second attempt, to just directly prompt GPT to generate fixes, without the intermediate step of verifying it's reasoning and it does not work nearly as well! It seems, at least with the examples I'm trying, that making sure that the model has a prior context of a correct plan is pretty important!

<!-- ## Silver (Postcutoff)

**Problem 1: 1400_silver_moorbles**

Human tutoring result attempt 1: 

**Problem 2: 1401_silver_test_tubes**

Human tutoring result attempt 1: -->

## Gold? Platinum? And Beyond?

USACO generally presents an extremely challenging task for models: the best model, GPT-4o, only achieves a 18.8% solve rate. The majority of problems solved reamins the "Bronze" suite of questions, with gold and platinum problems remaining a new frontier for future models to overcome.

More interestingly, there seems to be a qualitative difference between tutoring on problems past the cutoff date, and before the cutoff date, where models have a harder time incorporating feedback for problems after the cutoff date. This leads me to hypothesize that feedback incorporation is a both function of a model's inherent reasoning capabilities **and** the ability to map feedback to seen tasks. Reshaping models to allow overriding of model priors by feedback will be a key necessity for models down the line.

I would love to have done lots and lots more of these trajectories on harder difficulty levels such as Gold and Platinum, as they contain lots of interesting insights into potential improvement areas. Nothing beats actually going through problems to learn about the capabilities of LLMs in code generation. However, these are truly very time consuming to do for one person: I'll add more trajectories onto this article as I get the time to do more. If you are interested in helping me catalog error modes please reach out!

<!-- ## Citations

Citations are then used in the article body with the `<d-cite>` tag.
The key attribute is a reference to the id provided in the bibliography.
The key attribute can take multiple ids, separated by commas.

The citation is presented inline like this: <d-cite key="gregor2015draw"></d-cite> (a number that displays more information on hover).
If you have an appendix, a bibliography is automatically created and populated in it.

Distill chose a numerical inline citation style to improve readability of citation dense articles and because many of the benefits of longer citations are obviated by displaying more information on hover.
However, we consider it good style to mention author last names if you discuss something at length and it fits into the flow well — the authors are human and it’s nice for them to have the community associate them with their work.

---

## Footnotes

Just wrap the text you would like to show up in a footnote in a `<d-footnote>` tag.
The number of the footnote will be automatically generated.<d-footnote>This will become a hoverable footnote.</d-footnote>

---

## Code Blocks

Syntax highlighting is provided within `<d-code>` tags.
An example of inline code snippets: `<d-code language="html">let x = 10;</d-code>`.
For larger blocks of code, add a `block` attribute:

<d-code block language="javascript">
  var x = 25;
  function(x) {
    return x * x;
  }
</d-code>

**Note:** `<d-code>` blocks do not look good in the dark mode.
You can always use the default code-highlight using the `highlight` liquid tag:

{% highlight javascript %}
var x = 25;
function(x) {
return x \* x;
}
{% endhighlight %}

---

## Interactive Plots

You can add interative plots using plotly + iframes :framed_picture:

<div class="l-page">
  <iframe src="{{ '/assets/plotly/demo.html' | relative_url }}" frameborder='0' scrolling='no' height="500px" width="100%" style="border: 1px dashed grey;"></iframe>
</div>

The plot must be generated separately and saved into an HTML file.
To generate the plot that you see above, you can use the following code snippet:

{% highlight python %}
import pandas as pd
import plotly.express as px
df = pd.read_csv(
'https://raw.githubusercontent.com/plotly/datasets/master/earthquakes-23k.csv'
)
fig = px.density_mapbox(
df,
lat='Latitude',
lon='Longitude',
z='Magnitude',
radius=10,
center=dict(lat=0, lon=180),
zoom=0,
mapbox_style="stamen-terrain",
)
fig.show()
fig.write_html('assets/plotly/demo.html')
{% endhighlight %}

---

## Details boxes

Details boxes are collapsible boxes which hide additional information from the user. They can be added with the `details` liquid tag:

{% details Click here to know more %}
Additional details, where math $$ 2x - 1 $$ and `code` is rendered correctly.
{% enddetails %}

---

## Layouts

The main text column is referred to as the body.
It is the assumed layout of any direct descendants of the `d-article` element.

<div class="fake-img l-body">
  <p>.l-body</p>
</div>

For images you want to display a little larger, try `.l-page`:

<div class="fake-img l-page">
  <p>.l-page</p>
</div>

All of these have an outset variant if you want to poke out from the body text a little bit.
For instance:

<div class="fake-img l-body-outset">
  <p>.l-body-outset</p>
</div>

<div class="fake-img l-page-outset">
  <p>.l-page-outset</p>
</div>

Occasionally you’ll want to use the full browser width.
For this, use `.l-screen`.
You can also inset the element a little from the edge of the browser by using the inset variant.

<div class="fake-img l-screen">
  <p>.l-screen</p>
</div>
<div class="fake-img l-screen-inset">
  <p>.l-screen-inset</p>
</div>

The final layout is for marginalia, asides, and footnotes.
It does not interrupt the normal flow of `.l-body` sized text except on mobile screen sizes.

<div class="fake-img l-gutter">
  <p>.l-gutter</p>
</div>

---

## Other Typography?

Emphasis, aka italics, with _asterisks_ (`*asterisks*`) or _underscores_ (`_underscores_`).

Strong emphasis, aka bold, with **asterisks** or **underscores**.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

1. First ordered list item
2. Another item
   ⋅⋅\* Unordered sub-list.
3. Actual numbers don't matter, just that it's a number
   ⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

- Unordered list can use asterisks

* Or minuses

- Or pluses

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

Here's our logo (hover to see the title text):

Inline-style:
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style:
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

Inline `code` has `back-ticks around` it.

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

```python
s = "Python syntax highlighting"
print s
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

Colons can be used to align columns.

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

| Markdown | Less      | Pretty     |
| -------- | --------- | ---------- |
| _Still_  | `renders` | **nicely** |
| 1        | 2         | 3          |

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can _put_ **Markdown** into a blockquote.

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but...
This line is only separated by a single newline, so it's a separate line in the _same paragraph_. -->
