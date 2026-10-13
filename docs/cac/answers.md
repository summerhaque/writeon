# Write On! · Congressional App Challenge answers

Answers for the CAC submission form, in Summer's voice.

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

When they're stuck or submit a draft, the writing coach reads it and responds with hints, not answers. It teaches story ideas like protagonist and antagonist, suggests plot twists, helps with revision, and introduces new words. As they write, the app generates illustrations of what they described. Mini-lessons on similes, hyperbole, word choice, sensory detail, dialogue and show-don't-tell are practiced on the student's own sentences. Points, stars and badges keep them going, and their work autosaves. At the end, they export a professionally formatted PDF book, and it lands on the Story Shelf, where classmates can read each other's books.

## 4. What inspired you to create this app?

Reading well means understanding the ingredients of a story and how language fits together, and the best way to learn that is to write. Right now, only 31% of U.S. fourth-graders perform at or above NAEP Proficient in reading, down 2 points from 2022 and 4 from 2019 ([The Nation's Report Card, 2024](https://www.nationsreportcard.gov/reports/reading/2024/g4_8/)).

In a public school, one teacher can have around 150 students. Giving each of them real-time coaching on their own sentences is practically impossible. AI can do what an overwhelmed classroom can't: give just enough guidance to keep a student moving, but never so much that it stifles their creativity or drowns out their voice.

It's also not only about literacy. Writing is a creative and expressive outlet. It builds confidence, resilience and a sense of self, and that matters for kids' mental health.

I've seen a lot of kids, including my friends and younger kids I've helped with homework, completely freeze when a teacher says "write a story." The blank page is the scariest part. I wanted to build something that makes starting feel easy and feels like having a writing coach sitting right next to you.

## 5. What technical/coding difficulty did you face, and how did you address it?

The hardest part was the coach. My first versions kept writing the story for the student, which is exactly what I didn't want. I rewrote the prompts many times so the coach asks a question first, gives a bigger hint only if the student is still stuck, and never hands over sentences they could just copy. I also added filtering on the coach's replies, so anything that starts writing the story, or isn't right for kids, gets turned back into a hint before the student sees it.

Some other challenges:

- **Publishing a real book from any story.** Stories range from a paragraph to many pages. I used the jsPDF library and wrote layout logic that measures the text and decides where pages break, so chapters, pictures and the About the Author page land cleanly at any length.
- **One workbook across every stage.** The app has four data entities: Workbook, Character, CharacterRelationship and SavedStory. I shared them across every page with a React Context hook, so every stage reads and writes the same workbook without reloading.
- **Never losing work.** Kids close apps mid-sentence, so everything autosaves to persistent storage as they type.
- **Expo Go on the demo build.** For the mobile demo, the newest Expo SDK didn't open in the version of Expo Go in the app stores, so I had to match the project to the SDK the store version supports.

## 6. What would you change in a 2.0 version?

- A classroom mode for teachers, to see which stages each student has finished.
- More control over the AI illustrations.
- Read-aloud, so students can hear their own story while they revise.
- Spanish, then more languages.
- A full accessibility pass.
- More genres.
- Peer feedback on the Story Shelf, so classmates can leave kind, specific comments on each other's books.

## 7. AI usage disclosure

I used a lot of AI tools while building Write On!, and the app itself uses AI.

- **Building it:** I started by brainstorming and testing ideas with ChatGPT. I built the first versions on Base44, an AI-assisted development platform, which sped things up a lot. Then I moved to Claude, which I used to help write, fix and clean up code.
- **In the app:** the writing coach and the illustrations call an AI model through an API. Most of my time with AI went into prompt engineering and filtering: writing and rewriting the prompts so the coach gives hints instead of answers, and filtering its replies so they stay kid-appropriate and never hand over the student's story.
- **What I did myself:** I came up with the idea and designed the user experience and the writing workflow. I structured the nine-ingredient process and engineered the coach's prompts and filtering. I built the PDF publishing, chose the content, and tested everything over and over.

## 8. What did you learn? What was your biggest takeaway?

I learned that building a real app is mostly testing and rewriting. My first coach prompt gave away the answer almost every time, and it took a lot of tries to get it to ask good questions instead. I also learned how much design matters for younger kids: fewer words on the screen, clear buttons, and letting them start wherever they want.

My biggest takeaway is that AI is most useful when you're really specific about what it should and shouldn't do. For Write On!, the most important rule was that the coach can help, but the story always has to belong to the kid.

## 9. Cover image

`docs/cac/cover.jpg`: 600×800 JPEG (3:4), in the new brand. The source is `docs/cac/cover.html`.

## Deadline

2026 submissions close **Monday, October 26, 2026 at 12:00 PM ET**. Check the date on your district's page.
