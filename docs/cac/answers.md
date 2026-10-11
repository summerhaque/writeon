# Write On! · Congressional App Challenge answers (draft)

Draft answers for the CAC submission form, written in Summer's voice. Summer should read every line, change anything that isn't true for her, and fill in the parts in **[brackets]**. Only she can write those. Each answer is short on purpose: judges read hundreds.

> **Before submitting, read the AI rule.** CAC rules allow AI tools only if "all AI usage is fully disclosed in the submission materials," and AI "must not constitute the entirety of the technical development." Answer 7 is a disclosure draft. It has to be accurate, and Summer needs to be able to explain how every part of the app works, because judges expect "significant individual contributions and technical understanding."

---

## 1. What is the title of your app?

WriteOn!

## 2. Explain the app's purpose.

Write On! is a step-by-step creative writing studio that takes young writers, ages 8 to 13, from their very first idea to a finished, published book, with a writing coach that gives hints, never answers.

A story has nine stages in the app: Idea, Characters, Setting, Conflict, Plot, Writing, Revising, Illustrating and Publishing. Kids pick a kind of story, answer three quick questions, and get a roadmap made for that story. They can start at any stage, in any order. Each stage is a short workspace with real writer's questions, like "What does your character want more than anything?", and it saves as they type.

Coach Sparkle sits beside every stage. It asks guiding questions and gives three hints that get more specific when a kid is stuck. If a kid asks it to write the story, it kindly hands the pen back. Six mini-lessons (similes, hyperbole, word choice, sensory detail, dialogue, show-don't-tell) are practised on the student's own sentences, with a before-and-after comparison. At the end, students design a cover, add scene illustrations or a photo of their own drawing, and export a real PDF book with a title page, chapters and an About the Author page. It goes on their shelf next to sample books by other young writers.

## 3. What inspired you to create this app?

The hardest part of writing is starting. **[Summer: one real moment goes here. When did you see someone, maybe you, a sibling, a friend or a classmate, freeze at a blank page? Two or three sentences, in your own words.]**

Most writing tools start at "Once upon a time" and expect you to march forward. I wanted the opposite. If you already have a character in your head, start with the character. If you have a place, start there. And I didn't want a tool that writes the story for you. Kids don't need someone to write for them. They need a way in. That's why the coach only asks questions and gives hints, and why every story ends as a book you can hold.

## 4. What technical/coding difficulty did you face in programming your app, and how did you address this technical challenge?

**Making the coach helpful without letting it write the story.** The coach had to feel like a real conversation but never produce sentences a student could paste in. I built it as a local, scripted engine. It reads what the student has already filled in, finds the most useful blank (say, a hero with no fear yet), and asks about that. Hints escalate in three tiers: a question, then a narrower choice, then an example from a different, made-up story. Requests like "just write it for me" are detected and answered by handing the pen back. The engine has one clear interface, so a real AI model could replace the script later, with a system prompt that enforces "hints, not answers."

**Turning a story into a real printed book.** Exporting a PDF from a phone was harder than it looked. Long chapters run across several pages, and the page margins disappeared on every page after the first. I fixed it by laying out each chapter as a table whose header and footer repeat on every printed page, which gives each page its margins. I also embedded the fonts inside the PDF so the book looks the same on any device.

**Never losing a student's work.** Kids close apps mid-sentence. The editor saves a moment after they stop typing, when they leave a field, and when the app goes to the background. I also had to keep the cursor visible above the keyboard while writing long chapters on a small screen.

**[Summer: if a different problem was hardest for you, put it first. Judges want to hear your own experience.]**

## 5. What did you learn while participating in the CAC? What was your biggest takeaway?

**[Summer: write this one yourself. A few prompts: What did you learn about designing for younger kids? About building something real instead of a class assignment? What surprised you when someone tested it?]**

## 6. What would you change about your app if you were to create a 2.0 version?

- **A smarter coach, with the same rule.** Replace the scripted coach with an AI model behind the same interface, still limited to questions and hints. It would never write the story.
- **Teacher accounts.** A class code already exists in the app. In 2.0 it would connect to a teacher dashboard that shows which stages each student has finished, without grading their creativity.
- **Sync and sharing.** Right now stories stay on one device. 2.0 would back them up and let classmates read each other's published books.
- **Read-aloud and more languages.** Text-to-speech for revising ("read it out loud" is already on the checklist) and Spanish first for new languages.
- **Testing with real classrooms.** **[Summer: if you've had kids or a teacher try it, say what you'd change based on what they told you.]**

## 7. AI usage disclosure (required by CAC rules)

**[Summer and her mentor: this must be accurate and complete. Edit it to match what really happened.]**

AI tools were used in building Write On!. Claude (Anthropic) was used to help with **[list exactly what, e.g. "scaffolding the Expo project, drafting components and screens, writing the coach's hint scripts and the sample books, and drawing the illustration plates"]**. My own work included **[list exactly what Summer designed, decided, wrote, coded, tested or changed, e.g. the nine-stage "start anywhere" design, the hints-not-answers rule, testing with kids, and the changes she made afterwards]**. Coach Sparkle itself does not use AI: it runs a local script on the device, and no student writing is sent anywhere.

## Tools and languages (for the form and the video)

- **App:** TypeScript, React Native with Expo (SDK 57) and Expo Router. Animations with Reanimated, drawings with react-native-svg, PDF books with expo-print, sharing with expo-sharing, and photos of drawings with expo-image-picker. Data is saved on the device.
- **Website:** HTML, CSS and JavaScript, with no framework.
- **Design:** Fraunces and Source Sans 3 (Google Fonts), and the Write On! brand palette.
- **AI assistance:** see section 7.

## Deadline

2026 submissions close **Monday, October 26, 2026 at 12:00 PM ET**. After that, nothing can be changed. Check the date on your district's page.
