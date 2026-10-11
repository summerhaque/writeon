import type { Lesson } from '@/domain/types';

/**
 * Mini-lessons. Each one is practiced on the writer's own sentence:
 * pick a sentence, rewrite it with the technique, compare before and after.
 */
export const LESSONS: Lesson[] = [
  {
    id: 'simile',
    title: 'Similes',
    tagline: 'Compare one thing to another using like or as.',
    minutes: 3,
    explain: [
      'A simile compares two things using like or as. “The dog was big” tells the reader a fact. “The dog was as big as a sofa” puts a picture in their head.',
      'Good similes sound like your narrator. A kid who bakes might notice that the snow looks like spilled flour, because that’s what their eyes already know.',
      'Skip the ones everybody has heard, like “fast as lightning.” Ask yourself what this thing reminds you of, and keep going past the first answer.',
    ],
    examples: [
      {
        before: 'The dog was big.',
        after: 'The dog was as big as a sofa, and just as hard to move.',
        note: 'Every reader has sat on a sofa, so now they can feel the size.',
      },
      {
        before: 'The classroom went quiet.',
        after: 'The classroom went quiet, like someone had pressed pause.',
        note: 'The comparison shows how sudden the silence was, not only that it happened.',
      },
    ],
    tryPrompt: 'Rewrite your sentence so it compares something to something else, using like or as.',
    tip: 'Ask yourself: what does this remind me of?',
    practiceSentences: [
      'The moon was bright.',
      'It was very cold outside.',
      'The old car was loud.',
      'My little brother ran fast.',
    ],
    feedback: {
      pass: [
        'Now the reader has a picture to hold on to. That’s what a simile is for.',
        'That comparison tells the reader more than any adjective could.',
        'Read the two side by side. The second is the one people will remember.',
      ],
      tryAgain: [
        'I don’t see a like or as yet. What could this be compared to?',
        'Close. Add like or as, then name something the reader already knows.',
        'Think of something with the same shape or feeling, and put like in front of it.',
      ],
      unchanged: 'This matches your original sentence. Try adding a comparison with like or as.',
    },
  },
  {
    id: 'hyperbole',
    title: 'Hyperbole',
    tagline: 'Exaggerate on purpose to show how something felt.',
    minutes: 3,
    explain: [
      'Hyperbole is exaggerating on purpose. Nobody believes your backpack weighs a thousand pounds, but everyone knows exactly how it felt.',
      'It works best on big feelings. “I was hungry” is a fact. “I was so hungry I could have eaten the menu” is what hunger feels like from the inside.',
      'Save it for the moments that matter. One huge exaggeration makes a reader laugh. Five in a row and they stop believing you.',
    ],
    examples: [
      {
        before: 'The test was long.',
        after: 'The test was so long that I had a birthday halfway through it.',
        note: 'Nobody ages a year in an hour, which is exactly how the reader knows how slow it felt.',
      },
      {
        before: 'My room was messy.',
        after: 'My room was so messy you needed a map to find the bed.',
        note: 'Needing a map turns “messy” into something the reader can picture and laugh at.',
      },
    ],
    tryPrompt: 'Rewrite your sentence with an exaggeration. Make it impossible, but true to how it felt.',
    tip: 'Try the pattern “so ___ that ___.”',
    practiceSentences: [
      'I was very hungry.',
      'My backpack was heavy.',
      'It was really hot today.',
      'The car ride took a long time.',
    ],
    feedback: {
      pass: [
        'Nobody would believe that, and everybody knows what you mean. That’s hyperbole working.',
        'Impossible, and exactly right. The exaggeration does the explaining.',
        'Now the feeling is as big on the page as it was in real life.',
      ],
      tryAgain: [
        'This still sounds like it could really happen. Push it until it couldn’t.',
        'Try “so ___ that ___,” and make the second part impossible.',
        'Picture the feeling a hundred times bigger. What would happen then?',
      ],
      unchanged: 'This matches your original sentence. Try stretching one part until it’s impossible.',
    },
  },
  {
    id: 'word-choice',
    title: 'Word Choice',
    tagline: 'Trade weak words for strong verbs and exact nouns.',
    minutes: 4,
    explain: [
      'Some words do almost nothing. Very, really, went, said, nice, big and thing take up space, but a reader can’t picture them.',
      'A strong verb carries its own meaning. “She went across the room” tells us where. “She tiptoed across the room” tells us how, and makes us wonder why.',
      'Exact nouns work the same way. “A thing on the table” could be anything. “A cold pizza crust on the table” tells us something about whoever lives there.',
    ],
    examples: [
      {
        before: 'He went down the hill really fast.',
        after: 'He hurtled down the hill.',
        note: 'One strong verb replaces three weak words and carries all of the speed.',
      },
      {
        before: 'She said she didn’t want the thing.',
        after: 'She muttered that she didn’t want the broccoli.',
        note: 'Muttered shows her mood, and broccoli gives the reader something real to see.',
      },
    ],
    tryPrompt:
      'Rewrite your sentence. Swap a weak word like very, went or said for one that’s stronger and more exact.',
    tip: 'Cut very and really first. Then find one word that does their job.',
    practiceSentences: [
      'The dog went across the yard.',
      'It was a really nice day.',
      'He said he was very tired.',
      'There was a big thing in the garage.',
    ],
    feedback: {
      pass: [
        'The new word does more work than the old one did. Read both aloud and listen.',
        'Now the reader can see exactly what you meant, not just roughly.',
        'That’s a word a reader can picture. The old one was only filling space.',
      ],
      tryAgain: [
        'I can still spot a weak word in there. Which one could be more exact?',
        'Look at the verb. Is there a word that shows how it happened?',
        'Try cutting very or really, then pick one word that means the whole thing.',
      ],
      unchanged: 'This matches your original sentence. Pick one weak word and swap it.',
    },
  },
  {
    id: 'senses',
    title: 'Sensory Detail',
    tagline: 'Bring in sound, smell, taste and touch, not only sight.',
    minutes: 4,
    explain: [
      'Most writers describe how things look and stop there. But a reader standing in your scene would also hear it, smell it and feel it on their skin.',
      'One sound or smell can do more than a whole paragraph of looking. “The kitchen was busy” is fine. “The kitchen smelled of burnt toast, and someone was singing off-key” puts us in the room.',
      'You don’t need all five senses at once. Pick one, and make it specific.',
    ],
    examples: [
      {
        before: 'We walked into the gym.',
        after: 'We walked into the gym, which smelled like rubber balls and floor polish.',
        note: 'The smell tells the reader exactly what kind of room this is without describing a single wall.',
      },
      {
        before: 'It was raining.',
        after: 'Rain drummed on the car roof, and the window was cold against my cheek.',
        note: 'Sound and touch put the reader inside the car, not outside watching the weather.',
      },
    ],
    tryPrompt: 'Rewrite your sentence and add something the reader could hear, smell, taste or touch.',
    tip: 'Close your eyes in the scene. What do you notice first?',
    practiceSentences: [
      'We went to the beach.',
      'Dinner was ready.',
      'It was raining outside.',
      'The bus was crowded.',
    ],
    feedback: {
      pass: [
        'Now the reader is standing in the scene, not looking at a picture of it.',
        'That one detail does more than a paragraph of looking could.',
        'The reader can feel where they are now. Keep that habit.',
      ],
      tryAgain: [
        'I can see it, but I can’t hear, smell or feel it yet. Pick one.',
        'What would this sound like if you were standing right there?',
        'Try adding a smell. It’s the sense writers forget most.',
      ],
      unchanged: 'This matches your original sentence. Add one thing the reader could hear, smell or touch.',
    },
  },
  {
    id: 'dialogue',
    title: 'Dialogue',
    tagline: 'Let characters speak, and sound like themselves.',
    minutes: 5,
    explain: [
      'Dialogue is the exact words your characters say out loud. The words go inside quotation marks, and so does the punctuation: “Wait for me,” Sam called.',
      'Start a new paragraph each time someone new speaks. That way the reader always knows who’s talking, even without a name.',
      'Let each character sound like themselves. A nervous one might say, “Um, are we allowed in here?” A bossy one just says, “Move.”',
    ],
    examples: [
      {
        before: 'Maya told her brother to hurry up because they were late.',
        after: '“Hurry up,” Maya called from the door. “The bus is leaving without us.”',
        note: 'Her real words let us hear Maya, and the commas and periods sit inside the quotation marks.',
      },
      {
        before: 'Theo said he wasn’t scared of the dark.',
        after: '“I’m not scared,” Theo whispered. “I just like the light on. For reading.”',
        note: 'His words say one thing and mean another, which tells us more than “he was scared” ever could.',
      },
    ],
    tryPrompt: 'Rewrite your sentence so a character speaks. Put their exact words inside quotation marks.',
    tip: 'Punctuation goes inside the closing quotation mark.',
    practiceSentences: [
      'My friend asked if I wanted to come over.',
      'The teacher told everyone to be quiet.',
      'My sister said she didn’t take my headphones.',
      'The coach told us we could still win.',
    ],
    feedback: {
      pass: [
        'Now the reader can hear them. That’s the difference.',
        'That line tells us who this person is without explaining anything.',
        'Their own words beat a summary. Read it aloud to check it sounds like them.',
      ],
      tryAgain: [
        'I don’t see quotation marks yet. What exact words would they say?',
        'Write what they’d say out loud, then wrap it in quotation marks.',
        'Right now we’re told what was said. Let the character say it.',
      ],
      unchanged: 'This matches your original sentence. Turn it into words someone would actually say.',
    },
  },
  {
    id: 'show-dont-tell',
    title: 'Show, Don’t Tell',
    tagline: 'Let actions and details reveal a feeling instead of naming it.',
    minutes: 5,
    explain: [
      'Telling names a feeling: “Jo was nervous.” Showing gives the reader clues and lets them work it out: “Jo checked her pocket for the ticket. Then she checked again.”',
      'Readers like working things out. It makes them feel like they’re in the room, instead of hearing about it later.',
      'Look for feeling words in your writing, like scared or angry. Ask what that feeling looks like from the outside, and write that instead.',
    ],
    examples: [
      {
        before: 'Leo was angry.',
        after: 'Leo slammed his locker so hard it bounced back open.',
        note: 'We see what Leo does, so we feel his anger without being handed the word.',
      },
      {
        before: 'The house was old and creepy.',
        after: 'Wallpaper hung off in long curls, and the stairs groaned under every step.',
        note: 'The details let the reader decide it’s creepy, which works better than being told.',
      },
    ],
    tryPrompt:
      'Rewrite your sentence without naming the feeling. Show what someone does, says or notices instead.',
    tip: 'Ask yourself: what would a camera see?',
    practiceSentences: [
      'She was very nervous.',
      'He was happy about his birthday.',
      'The room was scary.',
      'I was tired after practice.',
    ],
    feedback: {
      pass: [
        'You never named the feeling, and the reader still knows it. That’s showing.',
        'The reader gets to work it out now. That’s what keeps them reading.',
        'That action says more than the feeling word ever did.',
      ],
      tryAgain: [
        'The feeling word is still there. What would someone see that tells them?',
        'Try cutting the feeling word. Describe a face, a hand or a voice instead.',
        'Picture it as a movie with the sound off. What do we see?',
      ],
      unchanged: 'This matches your original sentence. Try removing the feeling word and showing it instead.',
    },
  },
];
