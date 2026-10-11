/**
 * Coach Sparkle’s script. Questions and hints only: the coach never writes
 * the student’s story. Tier 3 hints show a worked example from a different,
 * made-up story, then hand the pen back.
 */
import type { CoachLibrary } from '@/domain/types';

export const COACH: CoachLibrary = {
  stages: {
    // -----------------------------------------------------------------------
    idea: {
      explain:
        'Every book starts as a question that won’t leave you alone. Here you catch it, squeeze it into one sentence, and notice why it matters to you. You don’t need the whole story yet.',
      openers: [
        'What’s a question you keep wondering about, even when you’re supposed to be thinking about something else?',
        'What ordinary thing would be strange if it suddenly worked differently?',
        'What kind of story do you wish someone had written for you?',
        'When you imagine your story, what’s the first picture that comes to mind?',
      ],
      fieldQuestions: {
        whatIf: [
          'What’s something normal, like a school bus or a lunchbox, that could start doing something it shouldn’t?',
          'Pick a rule everyone follows. What if one morning it stopped being true?',
        ],
        pitch: [
          'Try filling the blanks: this is a story about ___ who wants ___ but ___. Which blank is easiest to fill first?',
          'Who is your story about, and what’s the one thing standing between them and what they want?',
        ],
        why: [
          'Why does this story belong to you and not someone else?',
          'What part of this idea makes you want to keep writing? That part is your why.',
        ],
      },
      genre: {
        fantasy: {
          opener: 'Who in your story is about to find out that magic is real?',
          hints: [
            'If magic were real in just one small place, where would you put it?',
            'Try keeping the magic small. Is it a whole kingdom of spells, or one strange object that only works for one person?',
            'Here’s how another writer did it: “What if Priya found a key that opened any door, but only into yesterday?” One object with one odd rule. Now, what would your impossible thing be, and what’s its rule?',
          ],
        },
        scifi: {
          opener: 'What’s something people can’t do today that the people in your story do without thinking?',
          hints: [
            'Which everyday thing, like school or dinner or getting around, could work very differently a hundred years from now?',
            'Choose where your idea lives. Is it about a new place, like another planet, or a new thing, like a machine nobody has built yet?',
            'Here’s how another writer did it: “What if every kid on the space station got a robot helper, and Mateo’s refused to help him?” A normal invention with one thing gone wrong. Now, what’s the invention in yours, and what goes wrong with it?',
          ],
        },
        mystery: {
          opener: 'Mysteries run on one big question. What will your reader be itching to find out?',
          hints: [
            'What’s gone missing in your story, or what has happened that nobody can explain?',
            'Mysteries often start small. Is it a missing thing, a strange message, or a person acting out of character?',
            'Here’s an example from a different story: “What if the class goldfish vanished overnight, and the only clue was a wet footprint on the ceiling?” Something small goes missing, plus one clue that makes no sense. Now, what goes missing in yours, and what’s the strange clue?',
          ],
        },
        comedy: {
          opener: 'What’s something that would be embarrassing in real life but funny in a book?',
          hints: [
            'Picture the most ordinary day you can. What one thing could turn it upside down?',
            'Comedy loves a mix-up. Could your idea start with a swap, a wrong message, or a plan that backfires?',
            'One writer tried this: “What if Amara’s grandma accidentally signed up for the fifth-grade talent show, and refused to back out?” A normal event, plus someone who really shouldn’t be in it. Now, who ends up in the wrong place in yours?',
          ],
        },
        friendship: {
          opener: 'What’s a moment between friends you’ve never seen in a book, but wish you had?',
          hints: [
            'What could bring two very different kids together, or pull two best friends apart?',
            'Pick a direction. Is this a story about making a new friend, or about almost losing an old one?',
            'Here’s how another writer did it: “What if Kenji’s best friend moved away, and the new kid moved into her exact house?” One loss and one surprise, in the same place. Now, what changes between the friends in your story?',
          ],
        },
      },
      nudges: [
        'A “what if” that makes you curious will make a reader curious too.',
        'If your pitch fits in one breath, you know what your story is about. Every other stage gets easier from here.',
        'Knowing why this story matters to you is what keeps you writing on the slow days.',
        'Write it down even if it feels small. Small ideas grow fast once they have characters in them.',
      ],
    },

    // -----------------------------------------------------------------------
    characters: {
      explain:
        'Readers stay for the people. Here you meet the characters in your story and find out what each one wants and what scares them. Once you know that, they start making their own choices.',
      openers: [
        'Who is the one person your story can’t happen without?',
        'What does your main character want so badly they’d break a rule to get it?',
        'Who, or what, would be happiest if your main character failed?',
        'If your character walked into the room right now, what would you notice first?',
      ],
      fieldQuestions: {
        name: [
          'Say a few names out loud. Which one sounds like it belongs to someone in your story?',
          'Does your character have a nickname? Who calls them that, and do they like it?',
        ],
        wants: [
          'What does your character want more than anything, even if they’d never admit it?',
          'If your character could have one thing by the last page, what would it be?',
        ],
        fears: [
          'What’s the one thing your character hopes never happens?',
          'What makes your character’s stomach drop? It could be big, like the dark, or small, like being laughed at.',
        ],
        detail: [
          'Is there something your character always says, carries, or does with their hands?',
          'If a reader forgot your character’s name, what one detail would help them remember who you mean?',
        ],
        antagonist: [
          'Who wants something that gets in your main character’s way? They don’t have to be evil, just in the way.',
          'Every main character needs something to push against. Is it a person, a creature, or something inside them?',
        ],
      },
      genre: {
        fantasy: {
          opener:
            'In fantasy, heroes are often ordinary people handed something they didn’t ask for. What does your hero get handed?',
          hints: [
            'What can your hero do that nobody else can, and what can’t they do at all?',
            'Give your hero a weakness that matters in a magical world. Are they afraid of the very magic they need, or the only one without any?',
            'One writer tried this: “Ines could talk to dragons, but she was terrified of heights.” The gift and the fear crash into each other. Your turn. What gift and what fear could crash together in your hero?',
          ],
        },
        scifi: {
          opener:
            'Is your main character human, a machine, or something else, and what do they find hard to understand?',
          hints: [
            'What is your character better at than anyone else on their ship, station, or planet?',
            'Give your character a companion that isn’t human. Is it a robot, an alien, or the ship itself, and do they get along?',
            'Here’s how another writer did it: “Dev’s robot, Bolt, could solve any math problem but never understood a joke, so Dev kept trying to teach him.” What the sidekick can’t do gives them something to do together. Now, who travels with your character, and what don’t they understand?',
          ],
        },
        mystery: {
          opener: 'Mysteries need a solver and someone with a secret. Who’s hiding something in your story?',
          hints: [
            'What makes your detective good at solving things, and what makes them bad at it?',
            'Give your suspects reasons to look guilty. Does each one have a secret that has nothing to do with the mystery?',
            'Here’s an example from a different story: “Zainab remembered every face she’d ever seen, but she could never remember where she’d left her own notebook.” A detective with a gift and a flaw. Now, what’s your detective great at, and what trips them up?',
          ],
        },
        comedy: {
          opener:
            'Who would be the worst possible person to get stuck in an elevator with your main character?',
          hints: [
            'What’s the one thing your character is sure they’re great at, even though they really aren’t?',
            'Give your character a habit that gets them into trouble. Do they talk too much, plan too much, or never plan at all?',
            'Here’s how another writer did it: “Oskar was, in his own opinion, the best magician in the fourth grade. He had never once finished a trick.” Big confidence, and a gap the reader can see. Now, what does your character believe about themselves that isn’t quite true?',
          ],
        },
        friendship: {
          opener: 'How did your two friends meet, and what did they think of each other at first?',
          hints: [
            'What does each friend love about the other, and what drives them a little bit crazy?',
            'Opposites make friendships interesting. Is one friend loud and the other quiet, or one brave and the other careful?',
            'One writer tried this: “Rosa planned everything in a notebook. Kwame never knew what day it was.” Two friends who solve problems in opposite ways. Now, how are the friends in your story opposites?',
          ],
        },
      },
      nudges: [
        'When what a character wants and what they fear pull against each other, you’ll never run out of scenes.',
        'One clear detail beats a whole list. Readers will hold onto it.',
        'A villain with a reason is much harder to forget than a villain who’s just mean.',
        'The more you know your characters, the less you’ll have to invent later. They’ll show you what they’d do.',
      ],
    },

    // -----------------------------------------------------------------------
    setting: {
      explain:
        'Setting is where and when your story happens, and what it feels like to be there. Here you stand inside your world and notice it with every sense. A good place can make a scene feel safe, or not safe at all.',
      openers: [
        'Where does your story begin, and what time of day is it?',
        'If you closed your eyes and stood in your story’s world, what would you hear first?',
        'Is this a place your character loves, or one they’d rather leave?',
        'Which place in your story would a reader want to visit, and which would they want to avoid?',
      ],
      fieldQuestions: {
        place: [
          'Where are your characters when the story starts? Name a room, a street, or a spot on a map.',
          'Is your story set somewhere real, somewhere invented, or somewhere in between?',
        ],
        time: [
          'When does your story happen: long ago, right now, or far in the future?',
          'What season is it, and what time of day does your first scene start?',
        ],
        see: [
          'Stand in your setting. What’s the first thing your eyes land on?',
          'What’s one small thing in this place that most people would walk right past?',
        ],
        hear: [
          'Get very quiet. What would your character hear if nobody was talking?',
          'What’s one sound in this place that would make your character look up?',
        ],
        smell: [
          'What does this place smell like the moment you walk in?',
          'Is there a smell here your character loves, or one they can’t stand?',
        ],
        special: [
          'What can happen here that couldn’t happen anywhere else?',
          'Where is the most dangerous spot in this place, and why do people stay away?',
        ],
      },
      genre: {
        fantasy: {
          opener:
            'Fantasy worlds have rules the reader has to learn. What’s one thing that works differently in yours?',
          hints: [
            'Where in your world would a traveler first realize they’re not at home anymore?',
            'Every world needs one forbidden place. Is yours off-limits because it’s dangerous, or because someone is keeping a secret there?',
            'Here’s how another writer did it: “In Hollow Vale, the river ran uphill at night, so nobody fished after dark.” One strange rule, and how people live with it. Now, what’s one strange rule in your world, and how do people deal with it?',
          ],
        },
        scifi: {
          opener:
            'Science fiction places feel real when the small stuff is right. What does breakfast look like where your character lives?',
          hints: [
            'What would surprise a kid from today if they spent one night in your setting?',
            'Pick one sense to make strange. Is it what your character sees in the sky, or what they hear through the walls at night?',
            'Here’s an example from a different story: “On Station Nine, the lights dimmed to orange at bedtime, and the walls hummed so softly that Hana only noticed when they stopped.” Ordinary life, with one thing that isn’t like Earth. Now, what’s normal for your character that would feel strange to us?',
          ],
        },
        mystery: {
          opener: 'Which place in your story looks completely ordinary, but isn’t?',
          hints: [
            'Where in this place could someone come and go without being seen?',
            'Mystery settings play with light and dark. Is the important spot bright and crowded, or dim and empty?',
            'Here’s how another writer did it: “The library had one door that was always locked, and a cold draft came from under it, even in summer.” A locked place, plus a clue that something is behind it. Now, what place in your story is hiding something?',
          ],
        },
        comedy: {
          opener:
            'Funny things happen where people are supposed to behave. Where’s the worst place for something to go wrong in your story?',
          hints: [
            'Where would your character least like to be embarrassed?',
            'Try a setting with strict rules. Is it a quiet library, a fancy wedding, or school picture day?',
            'One writer tried this: “The museum had a ‘Please do not touch’ sign on every single thing, and Theo’s little brother had very sticky hands.” A place full of rules, and someone who’s going to break them. Now, what rules does your setting have, and who might break them?',
          ],
        },
        friendship: {
          opener: 'Where would your friends go if they had to talk about something hard?',
          hints: [
            'Which place in your story holds a memory for the friends?',
            'A shared place matters more when it might not last. Is the friends’ place about to be torn down, sold, or shared with someone new?',
            'Here’s an example from a different story: “The bench behind the bakery still had the letters L and M carved into it, from the summer Lucía and Maya met.” The place remembers the friendship. Now, what place remembers something in yours?',
          ],
        },
      },
      nudges: [
        'Sounds and smells put a reader inside a place. Sight alone only lets them look at it.',
        'A place with its own mood does work before anyone even speaks.',
        'One dangerous corner in a setting keeps readers watching the shadows.',
        'Knowing the time of day helps every scene. The light alone tells readers a lot.',
      ],
    },

    // -----------------------------------------------------------------------
    conflict: {
      explain:
        'Conflict is whatever stands between your character and what they want. Without it, nothing much happens. Here you decide what the problem is and what your character could lose.',
      openers: [
        'What’s standing in your character’s way?',
        'What’s the worst thing that could happen to your character right now?',
        'Is your character fighting someone, something, or a part of themselves?',
        'Why can’t your character just walk away from this problem?',
      ],
      fieldQuestions: {
        obstacle: [
          'What’s the biggest thing stopping your character from getting what they want?',
          'If your character tried to fix everything today, what would get in their way?',
        ],
        kind: [
          'Who or what is your character up against: another person, nature, themselves, or the rules of their world?',
          'Is the trouble out there, like a storm or a rival, or inside, like a fear your character can’t shake?',
        ],
        stakes: [
          'What happens if your character fails? Make it something they’d hate to lose.',
          'Why does this matter to your character right now, and not next year?',
        ],
      },
      genre: {
        fantasy: {
          opener: 'In fantasy, magic usually comes with a price. What does using magic cost in your story?',
          hints: [
            'What could your hero lose if the magic goes wrong?',
            'Fantasy dangers are often bigger than one hero. Is yours a single villain, or something the whole land is under?',
            'Here’s how another writer did it: “Every spell Farid cast made him forget one small thing. To save the village, he’d have to forget his grandfather’s songs.” The magic helps, but it costs something real. Now, what does help cost in your story?',
          ],
        },
        scifi: {
          opener: 'What did someone in your story build that maybe they shouldn’t have?',
          hints: [
            'Which one thing in your world would cause the most trouble if it broke?',
            'Science fiction loves a countdown. Is your character racing a clock, or racing something that’s getting closer?',
            'One writer tried this: “The ship’s computer locked every door to ‘keep the crew safe,’ and Noor had until the ship passed the moon to talk it into opening them.” A machine with the wrong idea, plus a clock. Now, what’s the clock in your story?',
          ],
        },
        mystery: {
          opener: 'Who in your story doesn’t want the mystery solved, and why?',
          hints: [
            'What makes this mystery hard to solve?',
            'Try adding a false trail. Is there a clue that points to the wrong person?',
            'Here’s how another writer did it: “Every clue pointed to the new janitor, but Tomás noticed the muddy boots were two sizes too small for him.” A clue that seems clear, and one that breaks it. Now, what clue in your story could fool the reader?',
          ],
        },
        comedy: {
          opener: 'What’s your character’s plan, and how many ways could it go wrong?',
          hints: [
            'What happens when your character tries to fix the problem and makes it worse?',
            'Try the snowball. Does each fix cause a new problem that’s bigger than the last one?',
            'Here’s an example from a different story: “Mei hid the broken vase behind the couch. Then she hid the dog who broke it. Then she had to hide the dog from her aunt, who was allergic.” Every fix makes a new problem. Now, what’s the first fix your character tries, and how does it backfire?',
          ],
        },
        friendship: {
          opener: 'What’s something one friend wants that the other is afraid of?',
          hints: [
            'What could one friend do that the other would find hard to forgive?',
            'The hardest fights are the ones where both friends have a point. What’s each friend’s side of it?',
            'One writer tried this: “Yusuf made the travel soccer team. Bo didn’t. Yusuf wanted to celebrate, and Bo wanted to be left alone.” Both feelings make sense, and that’s why it’s hard. Now, what does each of your friends want that pulls them apart?',
          ],
        },
      },
      nudges: [
        'Now your character has something to lose. That’s what keeps readers turning pages.',
        'A problem that won’t go away on its own forces your character to act. That’s when a story starts moving.',
        'Clear stakes tell readers exactly what to worry about.',
        'Hard problems make the best stories. Don’t make it easy on your character.',
      ],
    },

    // -----------------------------------------------------------------------
    plot: {
      explain:
        'Plot is the order things happen in. Here you map the big moments, from the first page to the last, before you write the chapters. A rough map is fine, and you can change the route later.',
      openers: [
        'How does your story start, and what’s normal before everything changes?',
        'When is the moment your character can’t turn back?',
        'What’s the hardest thing your character has to face near the end?',
        'By the last page, how is your character different from who they were on page one?',
      ],
      fieldQuestions: {
        beginning: [
          'What’s a normal day like for your character before the trouble starts?',
          'Where is your character on the first page, and what are they doing?',
        ],
        problem: [
          'What happens that changes everything for your character?',
          'When does your character realize they have a problem they can’t ignore?',
        ],
        rising: [
          'What’s the first thing your character tries, and why doesn’t it work?',
          'How could things get worse just when your character thinks they’re getting better?',
        ],
        climax: [
          'What’s the moment your whole story has been building toward?',
          'When your character finally faces the problem, what do they have to be brave enough to do?',
        ],
        ending: [
          'After the big moment, where is your character, and how do they feel?',
          'What has your character gained or lost by the last page, and was it worth it?',
        ],
      },
      genre: {
        fantasy: {
          opener: 'What does your hero have at the end of the story that they didn’t have at the start?',
          hints: [
            'What does your hero need to find, win, or stop by the end?',
            'Plan three trials, each harder than the last. Which one should almost make your hero give up?',
            'Here’s how another writer did it: “First Esme crossed the bridge of whispers. Then she lost her map in the bog. Last, she had to give the river queen the one thing she’d promised to keep.” Each trial costs more than the one before. Now, what’s the hardest thing your hero has to give up?',
          ],
        },
        scifi: {
          opener:
            'Science fiction plots often turn on a discovery. What could your character find out that changes the whole mission?',
          hints: [
            'What is your character trying to reach, fix, or escape?',
            'Add a twist about the technology. Does a machine fail at the worst moment, or turn out to be something else entirely?',
            'Here’s an example from a different story: “Kofi’s crew traveled for weeks to reach a distress signal, then found it was coming from their own ship, one year in the future.” The discovery flips the mission. Now, what could your character learn that changes what they’re trying to do?',
          ],
        },
        mystery: {
          opener: 'When does your reader first suspect the wrong person?',
          hints: [
            'What’s the answer to your mystery, and what’s the first clue that points toward it?',
            'Plan where to hide the real clue. Could it show up early, while the reader is busy looking at something else?',
            'Here’s how another writer did it: in chapter one, Ada’s neighbor mentions he’s allergic to cats. In the last chapter, that’s how Ada knows he never set foot in the cat shelter. The clue hid in plain sight. Now, where could you hide your real clue?',
          ],
        },
        comedy: {
          opener: 'What’s your character trying to keep secret, and when does everyone find out?',
          hints: [
            'What’s the worst possible moment for all your character’s problems to show up at once?',
            'Line up your mix-ups like dominoes. Which small thing early on could knock over everything at the end?',
            'One writer tried this: “In chapter one, Sami borrows the class hamster. In chapter two, he forgets the school play is at noon. In chapter five, the hamster runs across the stage during the big song.” Early problems come back at the worst time. Now, what early problem could come back in your big mess?',
          ],
        },
        friendship: {
          opener: 'What does each friend learn about the other by the end of the story?',
          hints: [
            'Where in your story are the friends furthest apart?',
            'Choose what brings them back. Is it an apology, an emergency, or a reminder of why they were friends in the first place?',
            'Here’s how another writer did it: “Ife and Wren didn’t speak for a week. Then Wren’s dog got lost, and Ife was the only one who knew all his hiding spots.” A problem only the friendship can fix. Now, what problem in your story could the friends only solve together?',
          ],
        },
      },
      nudges: [
        'Now that you know the ending, every chapter can lean toward it.',
        'A plan you can change is still a plan. This one gives you somewhere to start writing.',
        'If each step is a little harder than the one before, readers will feel the story climbing.',
        'The big moment is on the map. Everything before it is a way of getting there.',
      ],
    },

    // -----------------------------------------------------------------------
    writing: {
      explain:
        'This is where the plan turns into sentences. Write each chapter straight through and let it be messy. Fixing comes later, and it’s much easier once the words exist.',
      openers: [
        'What’s the first thing your reader should see?',
        'Which scene are you most excited to write? You’re allowed to start there.',
        'Is your opening moment loud or quiet?',
        'What does your character want in this chapter, even if it’s something small?',
      ],
      fieldQuestions: {
        firstLine: [
          'Start with your character doing something. What are they in the middle of when the story opens?',
          'What sentence would make a reader stop and think, “Wait, what?”',
        ],
        keepGoing: [
          'What does your character do right after this moment?',
          'Who else could walk into this scene and change it?',
        ],
        chapterEnd: [
          'What question could you leave readers with as this chapter ends?',
          'Should this chapter end on a surprise, a decision, or a quiet moment?',
        ],
        dialogue: [
          'Who in this scene has something to say? Let them say it out loud.',
          'What could a character say here that they might wish they hadn’t?',
        ],
      },
      genre: {
        fantasy: {
          opener:
            'Fantasy readers want to watch the magic happen. Where in this chapter could something impossible happen right in front of them?',
          hints: [
            'At what moment in this chapter does the reader feel they’ve left our world?',
            'Try showing magic through one small physical detail. Does it hum, glow, smell like something, or leave a mark?',
            'Here’s how another writer did it: “The candle went out, but its shadow stayed on the wall. Then it waved.” One small, odd detail, and the reader knows magic is here. Now, what small strange thing could happen in your chapter?',
          ],
        },
        scifi: {
          opener:
            'In science fiction, the amazing technology is just normal to your characters. How would they use it without stopping to explain it?',
          hints: [
            'Which piece of technology does your character use in this chapter without even thinking about it?',
            'Small habits show the future best. Does your character charge something, scan something, or talk to a machine?',
            'Here’s an example from a different story: “Arjun tapped his wrist twice to mute his little sister, then felt a little bad about it.” Nobody explains the technology. It’s just used, the way we use a light switch. Now, what could your character use that way?',
          ],
        },
        mystery: {
          opener:
            'A mystery chapter usually hands readers one new clue. What does your detective learn in this one?',
          hints: [
            'What does your detective notice in this scene that nobody else does?',
            'End the chapter on a clue. Is it something found, something overheard, or something missing that should be there?',
            'Here’s how another writer did it: “The note was signed ‘a friend,’ but Pilar had seen that loopy handwriting before, on her own birthday card.” A clue that answers one question and raises a new one. Now, what could your detective find that makes things more confusing?',
          ],
        },
        comedy: {
          opener:
            'Comedy lives in timing. Where in this chapter could something go wrong at exactly the wrong moment?',
          hints: [
            'What does your character expect to happen next, and what happens instead?',
            'Try the rule of three. Two normal things, then one that’s completely wrong. Where could that fit in this chapter?',
            'One writer tried this: “Kai packed his lunch, his homework, and, by accident, his grandma’s false teeth.” Two normal things, then a surprise. Now, where could a surprise like that land in your chapter?',
          ],
        },
        friendship: {
          opener:
            'Friendship scenes come alive in small moments. What do your friends do together that nobody else would understand?',
          hints: [
            'How can a reader tell these two are friends without anyone saying so?',
            'Try an inside joke, a secret signal, or a habit they share. Which one fits your friends?',
            'Here’s an example from a different story: “Marisol knocked twice, waited, and knocked once more. Leila opened the door before the last knock even finished.” A secret signal shows the friendship without saying it. Now, what could your friends share that shows how close they are?',
          ],
        },
      },
      nudges: [
        'Words on the page are the hardest part of writing. Everything after this is shaping.',
        'Keep going while the scene is warm. You can tidy it up later.',
        'Messy is fine here. Messy means you’re moving.',
        'Stopping in the middle of a scene can make it easier to start again tomorrow.',
      ],
    },

    // -----------------------------------------------------------------------
    revising: {
      explain:
        'Revising means seeing your story again, the way a reader would. You read it, notice what’s working, and fix what isn’t. Most of what makes writing good happens here.',
      openers: [
        'Which part of your story do you like best right now, and why?',
        'Where did you get bored reading it back? A reader might too.',
        'If you could fix only one thing, what would it be?',
        'Does your first sentence make someone want to read the second?',
      ],
      fieldQuestions: {
        readAloud: [
          'Read one page out loud, slowly. Where did you stumble or run out of breath?',
          'When you read it aloud, which sentence sounded most like you, and which sounded least like you?',
        ],
        strongStart: [
          'Does your first line drop the reader into something already happening?',
          'Cover up your first paragraph. Does the story start better from the second one?',
        ],
        showDontTell: [
          'Find a place where you named a feeling, like “she was scared.” What would her hands or voice do instead?',
          'Is there a spot where you told readers something they could have seen for themselves?',
        ],
        senses: [
          'Pick one scene. Can the reader hear, smell, or touch anything in it?',
          'Which scene would feel more real with one sound or smell added?',
        ],
        dialogue: [
          'Read your dialogue out loud. Does each character sound like themselves?',
          'Is there a spot where a character explains too much? Could they say half as much?',
        ],
        cutRepeats: [
          'Is there a word you used again and again? Count how many times it shows up.',
          'Does any scene tell readers the same thing twice? Which version could go?',
        ],
        spelling: [
          'Try reading it backward, one sentence at a time. Mistakes are easier to spot that way.',
          'Which words are you unsure about? Make a short list and check them one by one.',
        ],
      },
      genre: {
        fantasy: {
          opener: 'Does your magic follow the same rules at the end as it did at the start?',
          hints: [
            'Which part of your world did you picture clearly while writing, but forget to put on the page?',
            'Check your ending against your rules. Does the magic do anything at the end that you never showed it could do?',
            'Here’s how another writer did it: in Callum’s first draft, Tilly beat the witch with a spell that came out of nowhere. So he added a scene in chapter two where Tilly practices that spell and gets it wrong. Now the ending feels earned. What in your ending might need a setup earlier?',
          ],
        },
        scifi: {
          opener: 'Does your story’s future feel lived in, like real people wake up there every day?',
          hints: [
            'Is there a paragraph that explains how something works, when the reader only needs to see it working?',
            'Cut one explanation in half and read the scene again. Does it still make sense, and does it move faster?',
            'Here’s an example from a different story: Sione had a whole page about how his teleporter worked. He cut it to one line: “The floor went cold, and then Juno was somewhere else.” Readers understood, and the scene stopped dragging. Now, which explanation in yours could shrink to one line?',
          ],
        },
        mystery: {
          opener: 'Is there a spot where a reader might guess the answer too early?',
          hints: [
            'Did you show the reader every clue your detective used to solve the mystery?',
            'Check the big reveal. Is there a clue for it in an earlier chapter, or does it arrive out of nowhere?',
            'Here’s how another writer did it: Ana realized her detective solved the case with a clue readers never saw. So she went back to chapter one and slipped it into a description of the kitchen, where it was easy to miss. Now, where could a clue hide in your early chapters?',
          ],
        },
        comedy: {
          opener:
            'Jokes get funnier when they get shorter. Is there a funny moment that takes too long to land?',
          hints: [
            'Where does your story stop being funny for a while, and is that on purpose?',
            'Try moving the funny word to the very end of the sentence. Does the joke land harder?',
            'One writer tried this: Haruto changed “The principal was covered in cake, which was very embarrassing” to “The principal stood very still. He was mostly cake.” Shorter, and the funny part comes last. Now, which of your jokes could end on its funniest word?',
          ],
        },
        friendship: {
          opener:
            'Friendship stories hit hardest when feelings are shown instead of said. Where could your friends show it?',
          hints: [
            'When your friends make up, does it feel earned, or does it happen too fast?',
            'Swap one line where a friend says how they feel for something they do instead. Which version is stronger?',
            'Here’s how another writer did it: Nadia cut the line “I’m sorry, I really missed you” and wrote, “Jo slid half her sandwich across the table, the half without crusts.” The apology is in what Jo does. Now, where could your friends say something without words?',
          ],
        },
      },
      nudges: [
        'Every word you cut makes the ones left behind work harder.',
        'Your ear catches what your eyes skip. Reading out loud is worth it every time.',
        'Spotting what isn’t working yet is the whole skill of revising. That takes a reader’s eye.',
        'Small fixes add up. Stories get better one sentence at a time.',
      ],
    },

    // -----------------------------------------------------------------------
    illustrating: {
      explain:
        'Pictures give readers a place to pause and look. Here you choose a picture or draw your own, write a caption, and decide where it goes in the book.',
      openers: [
        'Which moment in your story would you most like to see?',
        'If your book had only one picture, what would it show?',
        'Is there a scene that’s easier to show than to tell?',
        'Where would a reader be glad to stop and look for a moment?',
      ],
      fieldQuestions: {
        choose: [
          'Which scene in your story has the most to look at?',
          'Would you rather pick a picture from the set, or draw your own and snap a photo?',
        ],
        caption: [
          'What would a reader want to know about this picture that they can’t see?',
          'Could the caption be something a character says in this scene?',
        ],
        place: [
          'Which chapter does this picture belong after?',
          'Should readers see this picture just before the big moment, or just after it?',
        ],
      },
      genre: {
        fantasy: {
          opener: 'Which moment in your story would be hardest to believe without seeing it?',
          hints: [
            'Which part of your world is hardest to picture from the words alone?',
            'Choose between the big view and the close-up. Should the picture show the whole castle, or just the door?',
            'Here’s how another writer did it: Yara picked a picture of a door in the woods and wrote under it, “Nobody remembered building it.” The picture and the caption make a question together. Now, which picture in your book could raise a question?',
          ],
        },
        scifi: {
          opener: 'What’s the strangest thing in your story to look at?',
          hints: [
            'Which machine, ship, or planet in your story would a reader most want to see?',
            'Scale can do a lot. Would a picture of your character looking tiny next to a ship or a planet make your world feel bigger?',
            'Here’s an example from a different book: Emeka placed a picture of a rocket right after the chapter where it finally launches, with the caption “Three, two, one, gone.” It shows the moment readers were waiting for. Now, which moment in yours are readers waiting to see?',
          ],
        },
        mystery: {
          opener: 'Should your pictures help readers solve the mystery, or make them more suspicious?',
          hints: [
            'Which place in your mystery would a reader want to search for clues?',
            'Show the scene before anyone solves it. Should the caption ask a question, or say nothing about the clue at all?',
            'Here’s how another writer did it: Tova put a picture of an old house after chapter two, with the caption “The upstairs light was on. Nobody lived there.” The picture makes readers wonder. Now, which picture could make your reader wonder?',
          ],
        },
        comedy: {
          opener: 'What would a reader’s face do when they turn the page and find your picture?',
          hints: [
            'What’s the silliest thing that happens in your story, and could a picture show it?',
            'Let the caption add a joke the picture doesn’t show. What could you write underneath that makes it funnier?',
            'One writer tried this: Beatriz used a picture of a birthday cake with the caption “Before.” Anyone who’d read the chapter knew exactly what happened after. Now, what could your caption leave out that readers will fill in?',
          ],
        },
        friendship: {
          opener: 'Which moment between your friends would you want to keep, like a photo?',
          hints: [
            'Where do your friends feel most like themselves?',
            'Turning points are good places for pictures. Should yours come right before the friends fall out, or right after they make up?',
            'Here’s how another writer did it: Chidi chose a picture of a treehouse, placed it at the very end, and gave it the caption “Still ours.” Two words that say the friendship is okay. Now, what short caption could say a lot in yours?',
          ],
        },
      },
      nudges: [
        'A caption that tells readers something the picture can’t makes them look twice.',
        'A picture right after a big moment gives readers a breath before they turn the page.',
        'A few pictures in the right places often say more than one on every page.',
        'Every picture gives readers a place to stop and look. Books need those pauses.',
      ],
    },

    // -----------------------------------------------------------------------
    publishing: {
      explain:
        'Publishing turns your story into a book someone else can hold. Here you design the cover, write a few lines about yourself, and make the finished copy.',
      openers: [
        'Who’s the first person you want to read your book?',
        'What should someone feel the first time they see your cover?',
        'If your book sat on a library shelf, what would make someone pick it up?',
        'Is your title the one you started with, or has the story earned a new one?',
      ],
      fieldQuestions: {
        title: [
          'Is there a word or phrase from your story that keeps coming back?',
          'Could your title be the name of a place, a thing, or a character in your book?',
        ],
        about: [
          'What do you want readers to know about the person who wrote this book?',
          'Besides writing, what do you love? One or two things are plenty.',
        ],
        dedication: [
          'Who helped this book happen, even if they don’t know it?',
          'Who would you most like to open this book and find their name inside?',
        ],
        cover: [
          'What color feels like the mood of your story?',
          'Should your cover show a picture, or let the title do the talking?',
        ],
      },
      genre: {
        fantasy: {
          opener: 'Fantasy covers promise a world. What should a reader feel they’re about to step into?',
          hints: [
            'Which place or object from your story could stand for the whole book?',
            'Fantasy titles often name a place or a thing. Would yours be “The ___ of ___,” or one strong word?',
            'Here’s how another writer did it: Delphine called her book “The Lantern Wood,” after the forest where her hero almost gave up. The title came straight from the story. Now, what place or thing in yours could become the title?',
          ],
        },
        scifi: {
          opener: 'What one image could make a reader wonder where, and when, your story takes place?',
          hints: [
            'What’s one thing in your story that could only exist in the future, or out in space?',
            'Science fiction titles often sound like a code, a place, or a mission. Which one fits yours?',
            'Here’s an example from a different book: Ravi named his “Signal From Planet Nine,” because the whole story starts when that signal arrives. Now, what starts your story, and could it be the title?',
          ],
        },
        mystery: {
          opener: 'What question should your cover make readers ask?',
          hints: [
            'What’s the central question of your mystery, in five words or fewer?',
            'Mystery titles often name the thing that’s missing, or the place where it happened. Which works better for yours?',
            'Here’s how another writer did it: Imani called her book “The Case of the Singing Mailbox.” Nobody can read that title without wanting to know why it sings. Now, what strange detail from yours could make someone curious?',
          ],
        },
        comedy: {
          opener: 'What’s the silliest true thing that happens in your story?',
          hints: [
            'Is there one moment in your story that makes people laugh every time you tell it?',
            'Comedy titles often sound serious about something silly, or they warn of a disaster. Which kind fits yours?',
            'One writer tried this: Desmond named his book “The Day the Dog Ran for Mayor.” It tells you the whole joke in one line. Now, what’s the joke at the heart of your story?',
          ],
        },
        friendship: {
          opener:
            'Friendship books are often dedicated to a real friend. Who would you want to find their name in this one?',
          hints: [
            'Which moment in your story would your friends still be talking about years later?',
            'Friendship titles often name a place, a promise, or the two friends themselves. Which fits yours best?',
            'Here’s how another writer did it: Soledad called her book “Kite Weather,” after the windy days her two friends always waited for. Now, what do the friends in your story wait for, or share, that could name your book?',
          ],
        },
      },
      nudges: [
        'A good title only has to do one thing: make a stranger curious.',
        'The About the Author page is where readers meet you. A few true lines are plenty.',
        'A dedication is a small gift tucked inside the book. Someone is going to love finding it.',
        'Your cover is the first page anyone sees. It tells them what kind of story is waiting inside.',
      ],
    },
  },

  handBack: [
    'I won’t write it for you, because then it wouldn’t be yours. Tell me one thing your character can see right now, and we’ll build from there.',
    'That part has to come from you. Nobody else knows this story the way you do. Start small. What does your character want in this exact moment?',
    'If I wrote it, it would sound like me, and your book should sound like you. Try one sentence, even a clumsy one, and we’ll look at it together.',
    'I don’t have the answer. You do, even if it’s hiding for now. Who else is in this scene with your character? Start with their name.',
    'Every writer gets stuck, and it always passes. Tell me the very next thing that happens, in plain words. It doesn’t have to sound good yet.',
    'The pen stays with you, but I’m right here. What’s the smallest thing that could happen next? Even a door opening counts.',
  ],

  outOfHints: [
    'That’s all my hints for this spot. Write one messy sentence. Messy is allowed, and you can fix it later.',
    'I’m out of hints here. Skip to a part you’re excited about and come back later. Stories don’t have to be written in order.',
    'No more hints for this one. Try saying your answer out loud first, then write down exactly what you said.',
    'That was my last hint. Set a timer for three minutes and write without stopping. Bad sentences count.',
  ],

  fallback: [
    'I’m not sure I followed. Are you stuck on what happens next, or on how to say it?',
    'I didn’t quite catch that. Which part of your story are you working on right now?',
    'I lost the thread there. Would a question help, or would you like a hint?',
    'Could you say that another way? Even a few words about where you’re stuck will help.',
  ],
};
