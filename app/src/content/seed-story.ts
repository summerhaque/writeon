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
          'He is tall and grey, like he’s made of dust, and he hums while he works. His trowel scrapes like chalk on a board.',
      },
      {
        id: 'c-3',
        name: 'Dot',
        role: 'sidekick',
        wants: 'Shiny things. Also for Mira to stop fibbing so everyone can get some sleep.',
        fears: 'Cats. And the Mason, but she won’t talk about him.',
        detail:
          'A jackdaw with one white feather on her head. She can only say things that are true, even when nobody wants to hear them.',
      },
    ],
    characterNotes: '',
    setting: {
      place:
        'Hollin Hill, the small town Mira just moved to. The tower is on the hill behind her new house, and only she can see it.',
      time: 'Now, at the start of October. The tower parts all happen at night, after everyone is asleep.',
      see: 'A crooked grey tower, and every stone has a lie scratched into it in Mira’s handwriting. The moon is huge and very close, like it’s leaning down to look.',
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
  cover: { template: 'classic', color: 'sea', plateId: 'tower' },
};
