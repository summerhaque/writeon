/**
 * Roadmap copy: the first prompt at the top of each stage (per genre), the
 * ending-feeling lines, and why the roadmap starts where it does.
 */
import type { RoadmapLibrary } from '@/domain/types';

export const ROADMAP: RoadmapLibrary = {
  prompts: {
    idea: {
      fantasy:
        'Every fantasy has a door into somewhere that shouldn’t exist. It might be a real door, a book, or a strange gift. What’s yours?',
      scifi:
        'Science fiction asks a question about the future. Finish this sentence: what if, one day, people could…?',
      mystery:
        'Every mystery starts with something that doesn’t add up. What goes missing, or turns up where it shouldn’t, in your story?',
      comedy:
        'Funny stories often start on a perfectly normal day that goes very wrong. What’s the day, and what’s the first thing to go wrong?',
      friendship:
        'Every friendship story is about two people and what changes between them. Who are your two, and what’s about to change?',
    },
    characters: {
      fantasy:
        'Fantasy heroes are often the person nobody expected. Who is yours, and why are they the wrong person for the job?',
      scifi:
        'In science fiction, your hero could be a kid, a robot, or someone from another planet. Who is yours, and what do they want more than anything?',
      mystery:
        'Every mystery needs someone who notices what everyone else misses. Who is your detective, and what do they always notice first?',
      comedy:
        'The funniest characters are completely sure they’re right. Who is yours, and what are they sure about?',
      friendship:
        'A friendship story needs two people who matter to each other. Who are your two friends, and what does each one need from the other?',
    },
    setting: {
      fantasy:
        'A fantasy world needs at least one place your reader has never seen before. Where is it, and what’s strange about it?',
      scifi:
        'Science fiction can happen on a spaceship, a far-off planet, or your own town a hundred years from now. Where does yours happen, and when?',
      mystery:
        'Mysteries love places with secrets, like an old house or a room nobody uses. Where does yours happen, and what is it hiding?',
      comedy:
        'Funny stories often happen somewhere ordinary, like a kitchen, a classroom, or a crowded car. Where does yours happen, and who’s crammed in there with your character?',
      friendship:
        'Friends need somewhere to be together. Where do your characters meet up, and what makes that place theirs?',
    },
    conflict: {
      fantasy:
        'Every fantasy has a darkness to push back against. What threatens your hero’s world, and why does it have to be your hero who stops it?',
      scifi:
        'In science fiction, the problem is often bigger than one person, like a broken ship or a strange signal. What’s the problem in yours, and who has to solve it?',
      mystery:
        'A mystery gets harder when solving it costs something. What will your detective have to risk to find the truth?',
      comedy:
        'In comedy, the problem can be tiny, as long as it feels huge to your character. What’s their problem, and why does it feel like the end of the world?',
      friendship:
        'In a friendship story, the hardest problems come between the friends. What comes between your two, and why can’t they just fix it?',
    },
    plot: {
      fantasy:
        'Fantasy stories often follow a quest. Map your hero’s path from home to the place they most need to reach. What happens along the way?',
      scifi:
        'Science fiction plots often move like a mission, with a goal and a plan and a lot that can go wrong. What’s your character’s mission, and where does it go off course?',
      mystery:
        'A mystery plot is a trail of clues. Start with the answer and work backward. Who did it, and what’s the first clue your detective finds?',
      comedy:
        'A funny plot keeps making things worse until everything goes wrong at once. Where and when does it all fall apart?',
      friendship:
        'Friendship stories often pull friends apart before bringing them back. When are your two furthest apart, and what brings them back together?',
    },
    writing: {
      fantasy:
        'Open in your hero’s ordinary world, just before the magic arrives. What are they doing when everything starts to change?',
      scifi:
        'Start in the middle of an ordinary day in the future. What is your character doing when something goes wrong?',
      mystery:
        'Open with the moment something is found, or found missing. Who sees it first, and what do they do?',
      comedy:
        'Start with your character in the middle of a plan that’s about to go sideways. What are they up to on page one?',
      friendship:
        'Open with your two friends together, so readers see what they have before anything threatens it. What are they doing?',
    },
    revising: {
      fantasy:
        'Read your story as if you’d never been to your world. Where would a new reader get lost, and where would they want to stay longer?',
      scifi:
        'Science fiction moves fastest when readers figure things out for themselves. Read it again. Where are you explaining more than you need to?',
      mystery:
        'A mystery has to play fair. Read it like a detective. Is every clue your hero uses somewhere on the page?',
      comedy:
        'Read your funny parts out loud. Which ones made you smile, and which ones need a sharper ending?',
      friendship:
        'Read your story through each friend’s eyes, one at a time. Does each of them feel like a whole person?',
    },
    illustrating: {
      fantasy:
        'Readers have been picturing your world the whole time. Choose the place or creature they’d most like to see, and give it a caption.',
      scifi:
        'Pick the moment in your story that’s hardest to imagine, like a launch, a landing, or a strange new sky. Which one should readers see?',
      mystery:
        'In a mystery, a picture can be a clue. Which place or object should readers get a good long look at?',
      comedy:
        'Choose the funniest moment in your story to show. Then write a caption that gets a second laugh.',
      friendship:
        'Choose a picture of a place your friends share, and put it where it means the most. Which chapter should it follow?',
    },
    publishing: {
      fantasy:
        'Your world is almost ready for someone else to hold. Design a cover that promises magic. What color is your world?',
      scifi:
        'Science fiction covers often show one thing against a lot of empty space. What’s the one thing on yours?',
      mystery:
        'Your mystery is solved. Now give it a cover that keeps the secret. What title will make readers curious without giving anything away?',
      comedy:
        'A funny book needs a cover that hints at the chaos inside. What title would make someone smile before they even open it?',
      friendship:
        'Design a cover that feels like your two friends. What color and picture would they both choose?',
    },
  },

  feeling: {
    brave: {
      label: 'Brave and bold',
      plotLine:
        'Plan an ending where your character does the hardest thing in the story. What brave choice will readers remember?',
      revisingLine:
        'Read your ending again. Is your character’s brave moment hard enough that readers hold their breath?',
    },
    laughing: {
      label: 'Laughing out loud',
      plotLine:
        'Plan an ending with one last laugh. What’s the final funny moment readers will still be grinning about?',
      revisingLine:
        'Read your last pages out loud. Is there a laugh near the end, right where readers will remember it?',
    },
    surprised: {
      label: 'Never saw it coming',
      plotLine:
        'Plan a twist for the ending, and hide one small clue for it early on. What’s the surprise, and where will the clue go?',
      revisingLine:
        'Read it again as if for the first time. Does the surprise land, and does it still make sense when you look back?',
    },
    warm: {
      label: 'Warm inside',
      plotLine:
        'Plan an ending that feels like coming home. Who is together on the last page, and what has changed between them?',
      revisingLine:
        'Read the last page slowly. Does it leave readers with a warm feeling, like the end of a good day?',
    },
  },

  spark: {
    character: {
      label: 'A character',
      startLine: 'You’ve already got someone in your head. We’ll start by getting to know them.',
    },
    place: {
      label: 'A place',
      startLine: 'You can already picture where this happens. We’ll start there and see who shows up.',
    },
    'what-if': {
      label: 'A big what-if',
      startLine: 'You’ve got a question worth chasing. We’ll start by pinning it down before it gets away.',
    },
    nothing: {
      label: 'Nothing yet. Surprise me.',
      startLine:
        'Every writer starts with a blank page sometimes. We’ll begin with a few questions until one of them catches.',
    },
  },
};
