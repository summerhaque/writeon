import type { SampleBook } from '@/domain/types';

/**
 * The sample shelf: short finished books, written in the voice of young
 * authors. The authors and their books are fictional.
 */
export const SAMPLE_BOOKS: SampleBook[] = [
  {
    id: 'the-door-in-the-crooked-oak',
    title: 'The Door in the Crooked Oak',
    blurb: 'A tiny door in an old tree trades lost things for a price.',
    genre: 'fantasy',
    author: {
      name: 'Noor',
      age: 11,
      about:
        'Noor is 11 and lives with her parents, two little brothers and her Nani, who tells the best stories in the family. She writes in a green notebook that she is not allowed to bring to the dinner table. This is her first book.',
    },
    cover: { template: 'plate', color: 'violet', plateId: 'forest-door' },
    dedication: 'For Nani, who tells it better every time.',
    chapters: [
      {
        title: 'The Door',
        body:
          'My Nani lost her ring in Wellmeadow Park the summer she was nineteen. She was feeding the ducks, and when she reached into the bag for more bread, the ring was gone. It was gold, with a tiny green stone like a pea. She looked for it for three days. She still talks about it, mostly when she is peeling oranges.\n\n' +
          'Every Sunday Nani and I walk to the park, because she says her knees need it and I need it more. We always stop at the crooked oak by the pond. It leans so far over the water that it looks like it’s trying to drink.\n\n' +
          'This Sunday there was a door in it.\n\n' +
          'It was down by the roots, the size of a cereal box, painted the green of old pennies. The doorknob was an acorn.\n\n' +
          '“Nani,” I said. “There’s a door in the tree.”\n\n' +
          '“Of course there is,” said Nani, who was looking at a duck.\n\n' +
          'I crouched down. Above the acorn was a sign in very small writing. It said: Lost Things. Fair Trades Only. Knock Twice.\n\n' +
          'So I knocked twice.',
        plateId: 'forest-door',
        caption: 'The size of a cereal box, with an acorn for a doorknob.',
      },
      {
        title: 'Mr. Bramble’s Shop',
        body:
          'The door opened by itself. It was much too small for me, but when I ducked to look inside, I was already through, and I was the right size. I don’t know how that works. I think the door decides.\n\n' +
          'Inside was a shop, long and low like a tunnel, and every shelf was full of things people had lost. Odd gloves. House keys. A retainer (gross). A whole trombone. Seventeen umbrellas, all different. A library book from 1974 that was extremely overdue.\n\n' +
          'Behind the counter sat a badger in a cardigan with patches on the elbows. He was polishing a spoon.\n\n' +
          '“Name’s Bramble,” he said. “Looking or trading?”\n\n' +
          'Then I saw it. In a glass dish by the cash register, between a hearing aid and a tooth, was a gold ring with a stone like a green pea.\n\n' +
          '“That’s my Nani’s,” I said.\n\n' +
          '“Was,” said Mr. Bramble. “Now it belongs to the shop. You can trade for it, but the price is something you’d miss.”\n\n' +
          'I offered him my pocket money, which was three dollars and forty cents. He sniffed. I offered him my lucky marble and my best hair clip. He shook his head.\n\n' +
          '“Something you’d miss,” he said, and went back to his spoon.',
      },
      {
        title: 'Payment',
        body:
          'I sat on an upside-down flowerpot to think. What would I miss? My bike. My bedroom. Nani’s stories.\n\n' +
          'That was when I had the idea. It was a scary one.\n\n' +
          '“Can I trade you a story?” I asked. “The story of that ring. Nani has told it to me about a hundred times.”\n\n' +
          'Mr. Bramble put down his spoon. “If you trade it, it’s mine. You won’t have it anymore.”\n\n' +
          '“Okay,” I said.\n\n' +
          'So I told him. How Nana saved up for the ring by fixing bicycles. How he was so nervous he dropped it in the sugar bowl. How the ducks were extra greedy that day and Nani laughed so hard she never felt it slip off.\n\n' +
          'As I talked, my words floated out like dust in sunlight and drifted into a jam jar. Mr. Bramble screwed the lid on tight. Then he put the ring in my hand.\n\n' +
          'At home I gave it to Nani. She held it for a long time and cried a bit, the good kind.\n\n' +
          'I tried to remember how Nana bought it. It was like a word on the tip of your tongue. It was gone.\n\n' +
          '“Nani,” I said, “where did that ring come from?”\n\n' +
          'She looked at me funny. Then she smiled and patted the sofa.\n\n' +
          '“It’s a long story,” she said.\n\n' +
          '“Good,” I said. “I like the long ones.”',
      },
    ],
  },
  {
    id: 'robots-dont-have-favorites',
    title: 'Robots Don’t Have Favorites',
    blurb: 'A cleaning robot on Mars guides a lost girl home through a dust storm.',
    genre: 'scifi',
    author: {
      name: 'Mateo',
      age: 12,
      about:
        'Mateo is 12 and wants to be the first person to play the trumpet on Mars. He lives with his mom, his abuela and a very old cat named Rocket. He wrote most of this book under a blanket with a flashlight.',
    },
    cover: { template: 'band', color: 'teal', plateId: 'red-planet' },
    dedication: 'For Abuela, who says I can go to Mars if I call every Sunday.',
    chapters: [
      {
        title: 'Unit 7',
        body:
          'My name is Unit 7. I am the cleaning robot on Red Rock Base, on Mars. I have six wheels, one vacuum, two arms and a light on top that blinks orange when I am working, which is always.\n\n' +
          'Robots are not supposed to have favorite things. I have three. Number one is the drawings Lupe sticks on my lid. Number two is Pancake Tuesday, because of the crumbs. Number three is Lupe.\n\n' +
          'Lupe is nine. She is the only kid on Red Rock Base, so she talks to me a lot. She calls me Pickles. When I asked why, she said, “Because you look like a Pickles,” which is not data.\n\n' +
          'Lupe was born on Mars, so she has only seen Earth on screens. Her favorite thing to talk about is sunsets. On Earth they are orange and pink. On Mars they are blue, which Lupe says is “backwards and wrong.”\n\n' +
          '“One day I’m going to see a real one,” she told me, while I was vacuuming under her bunk. “An orange one.”\n\n' +
          'I recorded this. I record everything. But I played this one back four times, and I do not know why.',
        plateId: 'red-planet',
        caption: 'Red Rock Base. Population: 41 humans and 1 robot.',
      },
      {
        title: 'Dust',
        body:
          'On Thursday the dust storm came early.\n\n' +
          'The alarm went whoop-whoop and all the hatches locked. The adults ran around saying numbers to each other. I went to Lupe’s bunk to tell her to stay inside.\n\n' +
          'Lupe was not in her bunk.\n\n' +
          'There was a drawing on her pillow. It was the old rocket on Pad 3, the one that brought the first people here and never flew again, with an orange sun behind it. Underneath she had written: Going to see if the sunset looks different from up high. Back in 10 min!!\n\n' +
          'That was 47 minutes ago.\n\n' +
          'I told Commander Osei. She said, “Not now, Pickles.” She was on the radio. The radio sounded like frying bacon.\n\n' +
          'Cleaning robots are not built for outside. My manual says so on page 3, in red. My wheels are for floors. My battery was at 61 percent.\n\n' +
          'I went outside anyway.\n\n' +
          'The dust was so thick I could not see my own arms. The wind pushed me sideways. I followed the map in my memory: 200 meters north, past the solar panels, left at the broken rover. Every few meters I blinked my orange light, the way I do when I am working.\n\n' +
          'I was working. I was working very hard.',
        plateId: 'rocket',
        caption: 'The old rocket on Pad 3.',
      },
      {
        title: 'Blue',
        body:
          'I found her sitting against the rocket’s landing leg with her knees pulled up. Her helmet light was flickering.\n\n' +
          '“Pickles?” Her voice on the radio was very small. “I can’t see the base. I can’t see anything.”\n\n' +
          '“I can,” I said. This was a lie. I could not see anything either. But I had something better than seeing. I had my tracks.\n\n' +
          'Six wheels make very good tracks.\n\n' +
          '“Hold on to my arm,” I said. “Do not let go.”\n\n' +
          'We went back the way I came, one track at a time. My battery said 30 percent. Then 12. Then 4. At 2 percent I could see the hatch light, and then I could not see anything, because I had stopped.\n\n' +
          'When I woke up I was plugged into the kitchen wall. My battery was full. It was Tuesday, which meant pancakes.\n\n' +
          'There was a new drawing on my lid. It was a robot and a girl holding hands next to the rocket, under two moons. The sunset in the drawing was blue.\n\n' +
          '“I decided I like blue,” Lupe said. “It’s our color.”\n\n' +
          'Robots are not supposed to have favorite things.\n\n' +
          'I have four now.',
      },
    ],
  },
  {
    id: 'the-case-of-the-blinking-window',
    title: 'The Case of the Blinking Window',
    blurb: 'A window across the street keeps blinking. Someone is trying to talk.',
    genre: 'mystery',
    author: {
      name: 'Hana',
      age: 10,
      about:
        'Hana is 10 and has solved four mysteries, including the Case of the Missing Left Shoe. She lives on the fourth floor of an apartment building, which is good for watching things. She is learning Morse code.',
    },
    cover: { template: 'classic', color: 'indigo', plateId: 'old-house' },
    dedication: 'For my little brother, who is a much better assistant than Arlo.',
    chapters: [
      {
        title: 'Clue Number One',
        body:
          'My name is Pip Nakamura and I solve mysteries. I have a notebook, a flashlight and an assistant. The assistant is my little brother Arlo, who is six. He is not a very good assistant, but he is free.\n\n' +
          'From my bedroom window you can see all of Gully Hill. At the top is the Fenwick house. It has broken shutters and a weathervane shaped like a pig. Nobody has lived there since old Mrs. Fenwick moved to Arizona to be near her daughter, two years ago.\n\n' +
          'So on Tuesday night, when I saw a light in the top window, I wrote it down.\n\n' +
          'Clue Number One: Light in the Fenwick house, 8:00 p.m. exactly.\n\n' +
          'On Wednesday it happened again. 8:00 p.m. exactly. And this time the light did not just stay on. It blinked. Short, short, short, short. Then a pause. Short, short.\n\n' +
          '“It’s a ghost,” said Arlo. He was wearing his pajamas with feet.\n\n' +
          '“Ghosts don’t need electricity,” I told him.\n\n' +
          '“Maybe it’s a ghost with a flashlight.”\n\n' +
          'I did not write that down.',
        plateId: 'old-house',
        caption: 'The Fenwick house, 8:00 p.m. exactly.',
      },
      {
        title: 'Short, Short, Long',
        body:
          'For three nights I sat at my window and wrote down every blink. Short blinks were dots. Long blinks were dashes. By Friday I had two pages, and Arlo had fallen asleep on my floor twice.\n\n' +
          'Clue Number Two: The blinks are the same every night.\n\n' +
          'Clue Number Three: On Thursday the grocery van drove up Gully Hill and came back down without its boxes.\n\n' +
          'Somebody was up there. Somebody who ate groceries.\n\n' +
          'On Saturday I took my notebook to the library and showed Mr. Abara, who knows everything except where he left his glasses. He held my pages very far from his face. Then very close. Then he said, “Pip, this is Morse code.”\n\n' +
          'Morse code is an alphabet made of dots and dashes. Sailors used it, and spies. Mr. Abara found me a book about it, and I sat on the beanbag and worked it out letter by letter. Short, short, short, short was H. Short, short was I.\n\n' +
          'The rest took me an hour. When I finished, I read it three times to be sure.\n\n' +
          'It said: Hi. Is anyone there?\n\n' +
          '“See,” Arlo whispered. “A ghost.”\n\n' +
          'But I was pretty sure ghosts did not order groceries.',
      },
      {
        title: 'Case Closed',
        body:
          'That night at 8:00 p.m. exactly, I was ready. I waited for the window to finish blinking. Then I pointed my flashlight at Gully Hill and blinked back.\n\n' +
          'Long, short, long, long. Short. Short, short, short.\n\n' +
          'Yes.\n\n' +
          'The window went dark. Then it blinked so fast I could hardly keep up. It took me until bedtime to decode, but here is what it said: My name is Felix. I broke my leg on moving day. I am so bored. Do you like checkers?\n\n' +
          'On Sunday, Arlo and I walked up Gully Hill with a box of checkers and a bag of pretzels. The pig weathervane squeaked. A man with paint on his sleeves opened the door and said, “You must be the flashlight.”\n\n' +
          'Felix was ten. His cast went up to his knee and was covered in drawings. He had learned Morse code from a book in a moving box, because their internet wasn’t working yet.\n\n' +
          '“I didn’t think anyone would ever answer,” he said.\n\n' +
          '“I’m a detective,” I said. “Answering is what we do.”\n\n' +
          'Case closed. Felix is teaching me to blink faster. I am teaching him to be a detective. Arlo is teaching nobody anything, but he brings the snacks.',
      },
    ],
  },
  {
    id: 'the-leaning-tower-of-cake',
    title: 'The Leaning Tower of Cake',
    blurb: 'Seven layers, a box of chopsticks, and one very wobbly birthday.',
    genre: 'comedy',
    author: {
      name: 'Kofi',
      age: 9,
      about:
        'Kofi is 9 and has two sisters, one dog and zero cakes left. He likes baking, drawing sharks and telling jokes at dinner. This is his first book, but it is not his last.',
    },
    cover: { template: 'plate', color: 'amber', plateId: 'birthday-cake' },
    dedication: 'For my sisters, who ate the evidence.',
    chapters: [
      {
        title: 'The Promise',
        body:
          'My sister Efua was turning six, and she wanted a cake taller than her.\n\n' +
          '“That is not a real cake,” said Mom.\n\n' +
          '“It is if Kwame makes it,” said Efua, and she looked at me with her big eyes. Her big eyes are her best trick. She uses them on everybody.\n\n' +
          'I am Kwame. I am nine and a half, and I am the second best baker in our family. The best is Dad. The worst is Grandma, who once made bread so hard we used it as a doorstop.\n\n' +
          '“I’ll do it,” I said.\n\n' +
          'Efua is forty-four inches tall. I know because she measures herself on the kitchen door every morning, in case she grew in the night. A normal cake is about four inches. So I needed eleven cakes. I decided seven cakes and a lot of frosting would be close enough.\n\n' +
          'Dad said he would help, but only by watching, because it was my cake. He said the most important ingredient is patience.\n\n' +
          'I did not have any patience. But I had eleven dollars and a plan.',
      },
      {
        title: 'Seven Layers',
        body:
          'Baking seven cakes takes a whole Saturday. By the third one the kitchen was so hot that Biscuit, our dog, went to lie down in the bathtub.\n\n' +
          'The cakes did not come out flat. They came out domed, like little hills. Dad said to cut the tops off to make them level. I did not want to waste any cake, so I stacked them anyway.\n\n' +
          'Here is what happens when you stack seven hills. You get a tower that leans.\n\n' +
          'By layer four it was leaning toward the window. By layer six it was leaning toward the dog. Biscuit came out of the bathtub and sat very still and watched the cake like it was the best TV show of his life.\n\n' +
          'I fixed it with engineering. I put three chopsticks down the middle, a ruler on the side, and an empty paper towel tube under the part that was sagging. Then I covered everything in pink frosting so nobody would know.\n\n' +
          'It was the tallest thing in the kitchen except for Dad. It leaned like that famous tower in Italy.\n\n' +
          '“Well,” said Dad. He walked all the way around it. “It’s standing.”\n\n' +
          '“It’s standing,” I agreed. We both looked at it. It moved a tiny bit, like it was breathing.',
        plateId: 'birthday-cake',
        caption: 'Seven layers, three chopsticks, one ruler.',
      },
      {
        title: 'Happy Birthday, Efua',
        body:
          'At the party there were eleven kids, two grandmas and one dog who would not leave the kitchen.\n\n' +
          'When we carried the cake out, everybody went quiet. Efua put both hands on her cheeks. There were six candles, and one to grow on, way up high where she had to stand on a chair to reach.\n\n' +
          'We sang. Efua took a big breath and blew. All seven candles went out, and everybody cheered.\n\n' +
          'Then the cake leaned toward her, very slowly, like it wanted to give her a hug.\n\n' +
          'Nobody moved. The chopsticks went creak. The ruler went ping. And the Leaning Tower of Cake lay down across the whole table, from the juice to the napkins, with a sound like a big sigh.\n\n' +
          'I wanted to go and live in the bathtub with Biscuit.\n\n' +
          'Then Efua started laughing. She laughed so hard she fell off the chair (Dad caught her). She laughed so hard juice came out of her nose.\n\n' +
          '“Do it again!” she yelled. “Do it again next year!”\n\n' +
          'So we ate it with spoons, straight off the table. It was the best cake I ever made, even the parts that touched the napkins. Biscuit got the part on the floor.\n\n' +
          'Next year Efua wants a cake shaped like a shark. I have already started planning.',
      },
    ],
  },
  {
    id: 'the-word-for-kite',
    title: 'The Word for Kite',
    blurb: 'The new girl’s word for kite also means parrot. That’s where it starts.',
    genre: 'friendship',
    author: {
      name: 'Ines',
      age: 13,
      about:
        'Ines is 13 and spends her summers at her grandparents’ house in Porto. She has flown eleven kites and lost four of them to trees. She is already writing her next book, which also has wind in it.',
    },
    cover: { template: 'minimal', color: 'rose', plateId: 'kite-hill' },
    dedication: 'For Avô Zé, who taught me to let the string out slowly.',
    chapters: [
      {
        title: 'The Buddy',
        body:
          'On the first Monday of October, Mr. Delgado brought a new girl to the front of the class and said, “This is Beatriz. She’s just moved here from Portugal. Cass, you’ll be her buddy.”\n\n' +
          'I had been planning to do the science fair with Maya, my best friend since kindergarten. We already had a name for our project. Now Maya was partners with Theo, and I was partners with a girl who looked at me like I was a very loud TV.\n\n' +
          'Beatriz knew about thirty words of English. She told me later that most of them came from songs. At lunch I tried to make conversation.\n\n' +
          '“Do you like it here?”\n\n' +
          '“Yes.”\n\n' +
          '“Do you like pizza?”\n\n' +
          '“Yes.”\n\n' +
          '“Do you like being eaten by sharks?”\n\n' +
          '“Yes,” she said, very politely.\n\n' +
          'I laughed so hard I choked on my water. Beatriz just watched me, chewing her sandwich, which had a whole fried egg in it. I thought she would decide I was mean. Instead, when I finally stopped coughing, she raised one eyebrow, slowly, like a villain in a movie.\n\n' +
          'That was the first time I thought this might not be terrible.',
      },
      {
        title: 'Papagaio',
        body:
          'Our science fair topic was Things That Fly. I drew a paper airplane on our worksheet. Beatriz shook her head. She took my pencil and drew a diamond with a long, wiggly tail.\n\n' +
          '“Papagaio,” she said.\n\n' +
          'I typed it into the translator on the class laptop. It said: parrot.\n\n' +
          '“That’s a parrot?” I said, and I drew a parrot next to her diamond, with a beak and everything.\n\n' +
          'Beatriz looked at my parrot. She looked at her diamond. Then she flapped her arms and squawked and laughed until she had to put her head on the desk, and I did too, and Mr. Delgado said, “Girls,” in his warning voice, which only made it worse.\n\n' +
          'It turns out that in Portugal, the word for kite and the word for parrot are the same word. I think that is the best fact I have ever learned.\n\n' +
          'That weekend we built one at my house out of a garbage bag, two bamboo skewers and a lot of tape. Beatriz knew exactly how to tie the string so it wouldn’t slip. Her avô taught her, back in Lisbon, on a hill by the river where the wind never stops.\n\n' +
          'When she talked about him, her English got slower, and her eyes went somewhere far away.',
      },
      {
        title: 'The Word for Kite',
        body:
          'On Saturday we took our kite to Holloway Hill. Maya was there with Theo, flying a store-bought dragon kite with a face on it.\n\n' +
          'Our garbage-bag kite would not fly. I ran with it until my lungs hurt, and it dragged along the grass like a sad jellyfish. Maya and Theo watched. I wanted to sink into the hill.\n\n' +
          '“No,” said Beatriz. “Not running. Wait.”\n\n' +
          'She held the kite up and stood very still, and we waited. I didn’t know what for. Then the wind came over the top of the hill, and Beatriz let go and fed the string out slowly, hand over hand, like she was letting the kite make up its own mind.\n\n' +
          'It went up. It went higher than the dragon.\n\n' +
          'She put the string in my hands. It pulled like something alive.\n\n' +
          'After a while Maya and Theo came over, and the four of us flew both kites until it got dark, and nobody talked about the science fair or best friends or anything.\n\n' +
          'On the walk home I asked Beatriz how you say friend in Portuguese.\n\n' +
          '“Amiga,” she said. Then she pointed at me, and at the kite under my arm. “Amiga. Papagaio.”\n\n' +
          'I know forty-one words of Portuguese now. Most of them are about wind.',
        plateId: 'kite-hill',
        caption: 'Two kites over Holloway Hill. One of them is a parrot.',
      },
    ],
  },
  {
    id: 'my-brother-is-a-robot-probably',
    title: 'My Brother Is a Robot (Probably)',
    blurb: 'Leo never sleeps, never sneezes, and charges his watch at night. Evidence.',
    genre: 'scifi',
    author: {
      name: 'Rafi',
      age: 10,
      about:
        'Rafi is 10 and has one big brother, who says he is definitely not a robot. Rafi likes science fairs, spicy chips and writing in the bathtub, which is why some pages are wavy.',
    },
    cover: { template: 'classic', color: 'blue', plateId: 'rocket' },
    dedication: 'For Leo. Sorry about the screwdriver.',
    chapters: [
      {
        title: 'The Evidence',
        body:
          'I started the notebook on a Tuesday. On the first page I wrote: THINGS MY BROTHER DOES THAT HUMANS DON’T.\n\n' +
          'Number one. Leo never sleeps. I know because I tried to stay up to see him sleep and I fell asleep first, which is suspicious.\n\n' +
          'Number two. He has never sneezed. Not once. Mom says that can’t be true, but Mom also says broccoli is a treat.\n\n' +
          'Number three. Every night he plugs his watch into the wall next to his bed. He says it’s just a watch. That is exactly what a robot would say.\n\n' +
          'Number four. He knows every answer on the quiz show before the people on TV. Every single one. Even the one about frogs.\n\n' +
          'I showed the notebook to my friend Dev at lunch. Dev read it twice. Then he said, “You need proof.”\n\n' +
          '“What kind of proof?”\n\n' +
          '“Robots have a switch,” Dev said. “Somewhere behind the ear. Everybody knows that.”',
      },
      {
        title: 'Operation Ear',
        body:
          'Leo was doing homework at the kitchen table. I walked up behind him very normally, like a person who was not checking for switches.\n\n' +
          '“Why are you breathing like that?” he said without turning around.\n\n' +
          'Robots can hear breathing. I wrote that down later.\n\n' +
          'I reached for his left ear. He moved his head. I reached for his right ear. He moved it again. It was like trying to catch a fish with a spoon.\n\n' +
          '“Rafi,” he said. “What are you doing?”\n\n' +
          'So I told him everything. The notebook, the watch, the frogs. I thought he would be mad. Instead he went very quiet and looked at the floor.\n\n' +
          '“Okay,” he whispered. “You found out. Do you want to see where my battery goes?”\n\n' +
          'My whole body went cold, like when you open the freezer in your socks.',
        plateId: 'rocket',
        caption: 'Leo’s secret launch pad, in my imagination.',
      },
      {
        title: 'The Battery',
        body:
          'He took me to his room and opened his closet. My heart was going so fast I could hear it in my ears.\n\n' +
          'Inside was a box. Inside the box was a robot. A real one, about as tall as a cereal box, with wheels and two bottle caps for eyes.\n\n' +
          '“I’ve been building it for the science fair,” Leo said. “For you. It was supposed to be a surprise for your birthday.”\n\n' +
          'The robot rolled forward and beeped three times. Leo said that means hello.\n\n' +
          'So my brother is not a robot. Probably. He still has not sneezed, and I still have the notebook.\n\n' +
          'But now I have a robot too. His name is Number Five, after the page in my notebook where I ran out of evidence.',
      },
    ],
  },
];
