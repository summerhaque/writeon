# Write On! · Congressional App Challenge answers (draft)

Draft answers in Summer's voice. Summer should read every line, change anything that isn't true for her, and write the parts marked **[Summer to personalize]** herself. Keep answers short: judges read hundreds.

> **The AI rule.** CAC allows AI tools only if "all AI usage is fully disclosed in the submission materials," and AI "must not constitute the entirety of the technical development." Answer 7 is the disclosure. It has to be accurate, and Summer should be able to explain how every part of the app works.

---

## App title

Write On!

## 1. Programming languages

JavaScript. **Other:** TypeScript, HTML, CSS.

## 2. Platforms

Web, Mobile (iOS), Mobile (Android).

## 3. What does your app do?

Write On! is a creative writing app that gives every young writer, ages 8 to 13, their own AI writing coach, guiding them from a first idea all the way to a published book.

A story is broken into nine ingredients: Idea, Characters, Setting, Conflict, Plot, Writing, Revising, Illustrating and Publishing. Students can open them in any order, because the hardest part of writing is starting. They choose an adventure (Fantasy, Sci-Fi, Mystery, Comedy or Friendship), answer a few questions, and get a personalized story roadmap.

When they're stuck or submit a draft, the writing coach reads it and responds with hints, not answers. It teaches story ideas like protagonist and antagonist, suggests plot twists, helps with revision, and introduces new words. As they write, the app generates illustrations of what they described. Mini-lessons on similes, hyperbole, word choice, sensory detail, dialogue and show-don't-tell are practised on the student's own sentences. Points, stars and badges keep them going, and their work autosaves. At the end, they export a professionally formatted PDF book, and it lands on the Story Shelf, where classmates can read each other's books.

## 4. What inspired you to create this app?

Reading well means understanding the ingredients of a story and how language fits together, and the best way to learn that is to write. Right now, only 31% of U.S. fourth-graders perform at or above NAEP Proficient in reading, down 2 points from 2022 and 4 from 2019 ([The Nation's Report Card, 2024](https://www.nationsreportcard.gov/reports/reading/2024/g4_8/)).

In a public school, one teacher can have around 150 students. Giving each of them real-time coaching on their own sentences is practically impossible. AI can do what an overwhelmed classroom can't: give just enough guidance to keep a student moving, but never so much that it stifles their creativity or drowns out their voice.

It's also not only about literacy. Writing is a creative and expressive outlet. It builds confidence, resilience and a sense of self, and that matters for kids' mental health.

**[Summer to personalize: one real moment that made this personal for you, in two or three sentences.]**

## 5. What technical/coding difficulty did you face, and how did you address it?

- **Publishing a real book from any story.** Stories range from a paragraph to many pages. I used the jsPDF library and wrote layout logic that measures the text and decides where pages break, so chapters, pictures and the About the Author page land cleanly at any length.
- **A coach that helps without writing for you.** Getting an AI model to give hints, not answers, took a lot of prompt engineering. The prompts tell it to ask a question first, escalate gently, and never produce sentences a student could paste in. They also adjust how much help it gives based on where the writer is.
- **One workbook across every stage.** The app has four data entities: Workbook, Character, CharacterRelationship and SavedStory. I shared them across every page with a React Context hook, so every stage reads and writes the same workbook without reloading.
- **Never losing work.** Kids close apps mid-sentence, so everything autosaves to persistent storage as they type.
- **Expo Go on the demo build.** For the mobile demo, the newest Expo SDK didn't open in the version of Expo Go in the app stores. I had to match the project to the SDK the store version supports.

**[Summer: put the problem that was hardest for you first, in your own words.]**

## 6. What would you change in a 2.0 version?

- A classroom mode for teachers, to see which stages each student has finished.
- More control over the AI illustrations.
- Read-aloud, so students can hear their own story while they revise.
- Spanish, then more languages.
- A full accessibility pass.
- More genres.
- Peer feedback on the Story Shelf, so classmates can leave kind, specific comments on each other's books.

## 7. AI usage disclosure

Write On! uses AI in the product, and AI helped build it.

- **In the app:** the writing coach and the illustrations call an AI model through an API. I wrote the prompts that make the coach give hints, not answers.
- **Building it:** I built Write On! with React on Base44, an AI-assisted development platform, which sped up development. AI tools also helped me write code. **[Summer: name the tools and what each one did.]**
- **What I did myself:** I designed the user experience and the writing workflow, structured the nine-ingredient process, engineered the AI feedback system and its prompts, built the PDF publishing, chose the content, and tested the app. **[Summer: correct or add to this list.]**

## 8. What did you learn? What was your biggest takeaway?

**[Summer to personalize.]**

## 9. Cover image

`docs/cac/cover.jpg`: 600×800 JPEG (3:4), in the new brand. The source is `docs/cac/cover.html`.

## Deadline

2026 submissions close **Monday, October 26, 2026 at 12:00 PM ET**. Check the date on your district's page.
