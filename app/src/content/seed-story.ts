import type { SeedStoryContent } from '@/domain/types';

/**
 * The half-finished story a new writer finds on their desk: idea and
 * characters done, setting and plot started, chapter one drafted.
 */
export const SEED_STORY: SeedStoryContent = {
  title: 'The Tower of Fibs',
  genre: 'fantasy',
  spark: 'character',
  feeling: 'brave',
  length: 'short',
  work: {
    idea: {
      whatIf: 'What if every lie you told added a stone to a tower that only you could see?',
      pitch:
        'Mira tells small lies all the time, like that her dad is a pilot and that she has a pony. One night she sees a tower on the hill behind her house, and it gets taller every time she lies. If it reaches the moon, the Mason who builds it can climb up and carry the moon away. The only thing that knocks stones down is telling the truth.',
      why: 'Everybody tells little lies sometimes. I wanted to write about how the truth can be scarier than a monster, and how you can be brave anyway.',
      notes:
        'Maybe the stones crumble when Mira tells the truth? Dot has to be funny. Ending is the class talk??',
    },
    characters: [
      {
        id: 'c-1',
        name: 'Mira',
        role: 'protagonist',
        wants: 'For the kids at her new school to think she’s interesting.',
        fears: 'That if anyone finds out the real her, they’ll think she’s boring.',
        detail: 'She twists the end of her braid right before she tells a lie. Dot always notices.',
      },
      {
        id: 'c-2',
        name: 'The Mason',
        role: 'antagonist',
        wants: 'To build the tower all the way to the moon, then climb up and carry it off in a sack.',
        fears: 'The truth said out loud. It turns his stones to sand.',
        detail:
          'He is tall and gray, like he’s made of dust, and he hums while he works. His trowel scrapes like chalk on a board.',
      },
      {
        id: 'c-3',
        name: 'Dot',
        role: 'sidekick',
        wants: 'Shiny things. Also for Mira to stop fibbing so everyone can get some sleep.',
        fears: 'Cats. And the Mason, but she won’t talk about him.',
        detail:
          'A jackdaw with one white streak on her head. She can only say things that are true, even when nobody wants to hear them.',
      },
    ],
    characterNotes: '',
    setting: {
      place:
        'Hollin Hill, the small town Mira just moved to. The tower is on the hill behind her new house, and only she can see it.',
      time: 'Now, at the start of October. The tower parts all happen at night, after everyone is asleep.',
      see: 'A crooked gray tower, and every stone has a lie scratched into it in Mira’s handwriting. The moon is huge and very close, like it’s leaning down to look.',
      hear: 'Wind whistling through the gaps in the stones. The Mason humming. The scrape of his trowel. Dot tapping on the window with her beak.',
      smell: '',
      special: '',
      notes: '',
    },
    conflict: {
      obstacle:
        'Every lie Mira tells gives the Mason another stone. To knock the tower down she has to tell the truth, even the big one she’s been hiding since she moved.',
      kind: 'self',
      stakes: '',
      notes: '',
    },
    plot: {
      beginning:
        'Mira tells her new class that her dad is a pilot. That night a tower appears on the hill behind her house, and one of the stones says “my dad is a pilot” in her own handwriting.',
      problem:
        'Dot shows Mira the Mason at work. The tower is only three stones away from the moon, and tomorrow Mira has to give a talk in class called “My Family.”',
      rising: '',
      climax: '',
      ending: '',
      notes: '',
    },
    chapters: [
      {
        id: 'ch-1',
        title: 'The Tower on the Hill',
        body:
          'On Monday, Mira told the whole class that her dad was a pilot. He wasn’t. He fixed photocopiers, and he got carsick on buses.\n\n' +
          'Everyone thought it was cool, though. Jonah asked if she had ever been in the cockpit. Mira said yes. That was two lies before lunch.\n\n' +
          'That night she couldn’t sleep. She went to the window to look at the moon, and that’s when she saw it. There was a tower on the hill behind her house. It had not been there yesterday.\n\n' +
          'It was very dark. The tower was big. It leaned to one side like a stack of library books about to fall, and the top of it almost touched the moon.\n\n' +
          'Mira put her coat on over her pajamas and went outside. It was very cold. She went up the hill.\n\n' +
          'The door was big. Every stone around it had words scratched into it in wobbly letters. She held up her flashlight. One said “my dad is a pilot.” The one next to it said “I have been in the cockpit.”\n\n' +
          'It was her handwriting.\n\n' +
          'She was really scared.\n\n' +
          'Then something tapped on the door from the inside.',
      },
      { id: 'ch-2', title: 'Dot Tells the Truth', body: '' },
      { id: 'ch-3', title: 'Three Stones from the Moon', body: '' },
    ],
    revising: { checks: {}, notes: '' },
    illustrations: [],
    publishing: { about: '', dedication: '' },
  },
  completed: ['idea', 'characters'],
  cover: { template: 'classic', color: 'indigo', plateId: 'tower' },
};

/** A short book the demo writer has already finished and published, so the shelf isn't empty. */
export const SEED_PUBLISHED: SeedStoryContent = {
  title: 'Mr. Whiskers for President',
  genre: 'comedy',
  spark: 'what-if',
  feeling: 'laughing',
  length: 'short',
  work: {
    idea: {
      whatIf: 'What if the class hamster ran for class president, and won?',
      pitch:
        'This is a story about Mr. Whiskers, the class hamster, who wants to be president of Room 12 but has never given a speech.',
      why: 'Our class votes for everything, even the snack. I wanted to write about the smallest candidate ever.',
      notes: '',
    },
    characters: [
      {
        id: 'p-1',
        name: 'Mr. Whiskers',
        role: 'protagonist',
        wants: 'A bigger wheel, and for everyone to finally listen to him.',
        fears: 'The vacuum cleaner, and speaking in front of people.',
        detail:
          'He stuffs his cheeks when he is nervous, so he always looks like he is about to say something.',
      },
      {
        id: 'p-2',
        name: 'Brianna Coldwell',
        role: 'antagonist',
        wants: 'To be class president for the third year in a row.',
        fears: 'Losing to anybody, but especially a hamster.',
        detail: 'She carries a clipboard everywhere, even to lunch.',
      },
    ],
    characterNotes: '',
    setting: {
      place: 'Room 12 at Pinecrest Elementary',
      time: 'Election week, in October',
      see: 'Posters taped crooked on every wall, and a cage by the window with a very small podium in it.',
      hear: 'Twenty-six kids talking at once, and a squeaky wheel that never stops.',
      smell: 'Cedar shavings, glue sticks and somebody’s tuna sandwich.',
      special: 'The cage is right next to the ballot box.',
      notes: '',
    },
    conflict: {
      obstacle: 'Brianna has won every election, and Mr. Whiskers cannot talk.',
      kind: 'person',
      stakes: 'If he loses, the class votes to replace his wheel with a smaller one.',
      notes: '',
    },
    plot: {
      beginning: 'Room 12 announces class elections. Somebody writes Mr. Whiskers on the ballot as a joke.',
      problem: 'The joke catches on, and Brianna takes it very seriously.',
      rising:
        'Brianna gives a long speech about snack rules. Mr. Whiskers just runs on his wheel. Everyone loves it.',
      climax: 'At the big debate, Mr. Whiskers escapes and runs straight across the ballot box.',
      ending: 'He wins by three votes, and his first act as president is a longer recess.',
      notes: '',
    },
    chapters: [
      {
        id: 'p-ch-1',
        title: 'The Joke',
        body:
          'It started as a joke. When Ms. Ortiz passed out the ballots for class president, somebody wrote MR. WHISKERS in big letters at the bottom.\n\n' +
          'Mr. Whiskers is our hamster. He is brown and white and shaped like a dinner roll.\n\n' +
          '“Very funny,” said Brianna Coldwell, who has been class president since second grade. She clicked her pen twice, which is what she does instead of rolling her eyes.\n\n' +
          'But by lunch, everybody was talking about it. Somebody made a poster that said WHISKERS: SMALL PAWS, BIG IDEAS. Somebody else made a button out of a bottle cap.\n\n' +
          'Mr. Whiskers stuffed his cheeks so full he looked like he was about to give a speech.',
      },
      {
        id: 'p-ch-2',
        title: 'The Debate',
        body:
          'Brianna’s speech was eleven minutes long. It had three parts and a chart about snacks.\n\n' +
          'When it was Mr. Whiskers’ turn, Ms. Ortiz put his cage on the desk. The room went so quiet you could hear the clock thinking.\n\n' +
          'Mr. Whiskers looked at all of us. Then he climbed onto his wheel and ran. He ran so fast the wheel sang. Somebody started clapping, and then everybody was clapping, even Ms. Ortiz.\n\n' +
          'He won by three votes. His first act as president was a longer recess. Brianna said that was not a real law, but she stayed outside for all of it.',
      },
    ],
    revising: {
      checks: {
        'read-aloud': true,
        'strong-start': true,
        'show-dont-tell': true,
        senses: true,
        dialogue: true,
        'cut-repeats': true,
        spelling: true,
      },
      notes: '',
    },
    illustrations: [
      {
        id: 'p-pic-1',
        source: 'plate',
        plateId: 'birthday-cake',
        uri: null,
        caption: 'The victory cake. It was taller than the president.',
        chapterId: 'p-ch-2',
      },
    ],
    publishing: {
      about: 'The author is a writer in Room 12 who has never met a hamster they didn’t like.',
      dedication: 'For Mr. Whiskers, who would have won anyway.',
    },
  },
  completed: ['idea', 'characters', 'setting', 'conflict', 'plot', 'writing', 'revising', 'illustrating'],
  cover: { template: 'plate', color: 'amber', plateId: 'birthday-cake' },
};
