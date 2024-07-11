const questions = [
  {
    question:
      'The battle royale video game / game platform , that focuses on building complex structures while engaging in combat is named :',
    answer: [
      { answerText: 'Apex Legends', isCorrect: false },
      { answerText: 'Fortnite', isCorrect: true, genName: 'z' },
      { answerText: 'PUBG: BATTLEGROUNDS', isCorrect: false },
      { answerText: 'Call Of Duty: Warzone', isCorrect: false }
    ]
  },
  {
    question: "What year was the album 'Abbey Road' released?",
    answer: [
      { answerText: '1955', isCorrect: false },
      { answerText: '1967', isCorrect: false },
      { answerText: '1970', isCorrect: false },
      { answerText: '1966', isCorrect: true, genName: 'b' }
    ]
  },
  {
    question: "Who was the director for Michael Jackson's video , Thriller?",
    answer: [
      { answerText: 'James Cameron', isCorrect: false },
      { answerText: 'Steven Spielberg', isCorrect: false },
      { answerText: 'Francis Ford Coppola', isCorrect: false },
      { answerText: 'John Landis', isCorrect: true, genName: 'x' }
    ]
  },
  {
    question:
      'What actor starred in the movies Rebel without a Cause , East Of Eden, & Giant?',
    answer: [
      { answerText: 'Dean Martin', isCorrect: false },
      { answerText: 'Marlon Brando', isCorrect: false },
      { answerText: 'James Dean', isCorrect: true, genName: 'b' },
      { answerText: 'John Wayne', isCorrect: false }
    ]
  },
  {
    question:
      "This Nirvana album brought Alternative Rock into the mainstream and catapulted a subcuture of Rock Music called 'Grunge'.",
    answer: [
      { answerText: 'Nevermore', isCorrect: false },
      { answerText: 'Nevermind', isCorrect: true, genName: 'm' },
      { answerText: 'Alice In Chains', isCorrect: false },
      { answerText: 'In Utero', isCorrect: false }
    ]
  },
  {
    question:
      'This Nintendo Switch fighting game is home to over 40 different franchises.',
    answer: [
      { answerText: 'Nintendo Switch Sports', isCorrect: false },
      { answerText: 'Super Mario Party', isCorrect: false },
      {
        answerText: 'Super Smash Bros. Ultimate',
        isCorrect: true,
        genName: 'z'
      },
      { answerText: 'Super Mario Bros. Wonder', isCorrect: false }
    ]
  },
  {
    question: 'What was the the name of the first video game console?',
    answer: [
      { answerText: 'Super Nintendo', isCorrect: false },
      { answerText: 'Magnavox Odyssey', isCorrect: true, genName: 'x' },
      { answerText: 'Pong', isCorrect: false },
      { answerText: 'Atari', isCorrect: false }
    ]
  },
  {
    question:
      'What is the name of the Tupac Shakur album , that debuted at No. 1 on the Billboard Hot 100 while he was in jail?',
    answer: [
      { answerText: 'All Eyez On Me', isCorrect: false },
      { answerText: 'Better Dayz', isCorrect: false },
      { answerText: 'Me Against The World', isCorrect: true, genName: 'm' },
      { answerText: '2Pacalypse Now', isCorrect: false }
    ]
  },
  {
    question:
      "What TV show is known for the popular catchphrase , 'Lucy , I'm Home!'?",
    answer: [
      { answerText: 'I Love Lucy', isCorrect: true, genName: 'b' },
      { answerText: 'The Andy Griffith Show', isCorrect: false },
      { answerText: 'The Honeymooners', isCorrect: false },
      { answerText: 'Bewitched', isCorrect: false }
    ]
  },
  {
    question: "What was the name of Kendrick Lamar's debut studio album?",
    answer: [
      { answerText: 'Overly Dedicated', isCorrect: false },
      { answerText: 'Good Kid , M.A.A.D. City', isCorrect: false },
      { answerText: 'Kendrick Lamar', isCorrect: false },
      { answerText: 'Section.80', isCorrect: true, genName: 'z' }
    ]
  },
  {
    question: 'Which US city was John F. Kennedy killed?',
    answer: [
      { answerText: 'Dallas', isCorrect: true, genName: 'b' },
      { answerText: 'Birmingham', isCorrect: false },
      { answerText: 'Washington D.C.', isCorrect: false },
      { answerText: 'Miami', isCorrect: false }
    ]
  },
  {
    question:
      'John F. Kennedy was the sitting US president during the moon landing.',
    answer: [
      { answerText: 'True', isCorrect: false },
      { answerText: 'False', isCorrect: true, genName: 'x' }
    ]
  },
  {
    question:
      'This online influencer has over 290 million subscribers on YouTube (as of 2024).',
    answer: [
      { answerText: 'iShowSpeed', isCorrect: false },
      { answerText: 'Mr. Beast', isCorrect: true, genName: 'z' },
      { answerText: 'Kai Cenat', isCorrect: false },
      { answerText: 'Penguinz0', isCorrect: false }
    ]
  },
  {
    question: 'What state was Elvis Presley born?',
    answer: [
      { answerText: 'Mississippi', isCorrect: true, genName: 'b' },
      { answerText: 'Tennesee', isCorrect: false },
      { answerText: 'Georgia', isCorrect: false },
      { answerText: 'Alabama', isCorrect: false }
    ]
  },
  {
    question:
      'What was the posthumously released movie starring Bruce Lee , in which his character participated in a martial arts tournament on a private island?',
    answer: [
      { answerText: 'Game Of Death', isCorrect: false },
      { answerText: 'Return Of The Dragon', isCorrect: false },
      { answerText: 'The Chinese Connection', isCorrect: false },
      { answerText: 'Enter The Dragon', isCorrect: true, genName: 'x' }
    ]
  },
  {
    question:
      'Which Michael Jackson music video became a cultural impact and significant shift for black artists , and the marketing of music videos on MTV?',
    answer: [
      { answerText: 'Thriller', isCorrect: false },
      { answerText: 'Billie Jean', isCorrect: true, genName: 'x' },
      { answerText: 'Smooth Criminal', isCorrect: false },
      { answerText: 'Bad', isCorrect: false }
    ]
  },
  {
    question: "Which brand of candy is a portmanteau of 'Twin Sticks,?",
    answer: [
      { answerText: 'Milky Way', isCorrect: false },
      { answerText: 'Twix', isCorrect: true, genName: 'b' },
      { answerText: 'Skittles', isCorrect: false },
      { answerText: 'Snickers', isCorrect: false }
    ]
  },
  {
    question:
      'What is the name of the final album by Elvis Presley , released in 1977?',
    answer: [
      { answerText: 'Moody Blue', isCorrect: true, genName: 'x' },
      { answerText: 'Promised Land', isCorrect: false },
      { answerText: 'Elvis', isCorrect: false },
      { answerText: 'Good Times', isCorrect: false }
    ]
  },
  {
    question: "Which one of these kids' toys was NOT introduced in the 1990s'?",
    answer: [
      { answerText: 'Bop It', isCorrect: false },
      { answerText: 'Transformers', isCorrect: true, genName: 'm' },
      { answerText: 'BeyBlade', isCorrect: false },
      { answerText: 'Pokémon Cards', isCorrect: false }
    ]
  },
  {
    question:
      'What is the name of the Beyoncé visual album that appeared as an HBO special in 2016?',
    answer: [
      { answerText: 'Beyoncé', isCorrect: false },
      { answerText: 'Renaissance', isCorrect: false },
      { answerText: 'Cowboy Carter', isCorrect: false },
      { answerText: 'Lemonade', isCorrect: true, genName: 'z' }
    ]
  },
  {
    question: 'What year was the first color TV mass-produced?',
    answer: [
      { answerText: '1960', isCorrect: false },
      { answerText: '1970', isCorrect: false },
      { answerText: '1955', isCorrect: true, genName: 'b' },
      { answerText: '1945', isCorrect: false }
    ]
  },
  {
    question: 'Which one of these fashion trends did NOT emerge in the 70s?',
    answer: [
      { answerText: 'Heavy Metal', isCorrect: true, genName: 'x' },
      { answerText: 'Designer Jeans', isCorrect: false },
      { answerText: 'Daisy Dukes', isCorrect: false },
      { answerText: 'Bell Bottoms', isCorrect: false }
    ]
  },
  {
    question:
      "____ is a Disney animated musical film that follows a princess' journey to find her sister , known for it's grammy-winning song , 'Let It Go'.",
    answer: [
      { answerText: 'Cinderella', isCorrect: false },
      { answerText: 'Frozen', isCorrect: true, genName: 'z' },
      { answerText: 'Moana', isCorrect: false },
      { answerText: 'The Lion King', isCorrect: false }
    ]
  },
  {
    question:
      'Which music genre emerged in the mid 1960s , characterized by a rhythmic , danceable groove , pioneered by artists such as James Brown?',
    answer: [
      { answerText: 'Disco', isCorrect: false },
      { answerText: 'R & B', isCorrect: false },
      { answerText: 'Soul', isCorrect: false },
      { answerText: 'Funk', isCorrect: true, genName: 'x' }
    ]
  },
  {
    question:
      "What was the name of the war that contributed to the 'Fall of Saigon'?",
    answer: [
      { answerText: 'World War II', isCorrect: false },
      { answerText: 'Vietnam War', isCorrect: true, genName: 'b' },
      { answerText: 'Iraq War', isCorrect: false },
      { answerText: 'Korean War', isCorrect: false }
    ]
  },
  {
    question:
      'This true-crime documentary about a former zookeeper and convicted felon went viral in March 2020.',
    answer: [
      { answerText: 'Tiger King', isCorrect: true, genName: 'z' },
      { answerText: 'Jack Hanna', isCorrect: false },
      { answerText: 'Kevin Richardson', isCorrect: false },
      { answerText: 'Siegfried & Roy', isCorrect: false }
    ]
  },
  {
    question:
      'What year was the social media app Facebook introduced to the public?',
    answer: [
      { answerText: '2003', isCorrect: false },
      { answerText: '2000', isCorrect: false },
      { answerText: '2006', isCorrect: true, genName: 'm' },
      { answerText: '2008', isCorrect: false }
    ]
  },
  {
    question:
      "Who is the actor that helped pioneer spaghetti western films , such as 'The Good , The Bad , & The Ugly' , 'A Fistful of Dollars' , and 'A Few Dollars More'?",
    answer: [
      { answerText: 'Henry Fonda', isCorrect: false },
      { answerText: 'Clint Eastwood', isCorrect: true, genName: 'b' },
      { answerText: 'John Wayne', isCorrect: false },
      { answerText: 'Steve McQueen', isCorrect: false }
    ]
  },
  {
    question: 'What year was the first iMac released?',
    answer: [
      { answerText: '1995', isCorrect: false },
      { answerText: '2007', isCorrect: false },
      { answerText: '1985', isCorrect: false },
      { answerText: '1998', isCorrect: true, genName: 'm' }
    ]
  },
  {
    question:
      '___ is a short-form video hosting service with over 2 Billion downloads worldwide (as of 2024).',
    answer: [
      { answerText: 'Instagram', isCorrect: false },
      { answerText: 'Twitch', isCorrect: false },
      { answerText: 'TikTok', isCorrect: true, genName: 'z' },
      { answerText: 'Kick', isCorrect: false }
    ]
  },
  {
    question:
      "Jason David Frank played 'Tommy Oliver' in this popular live-action kids tv show.",
    answer: [
      { answerText: 'Boy Meets World', isCorrect: false },
      { answerText: 'Power Rangers', isCorrect: true, genName: 'm' },
      { answerText: 'Teenage Mutant Ninja Turtles', isCorrect: false },
      { answerText: 'Animorphs', isCorrect: false }
    ]
  },
  {
    question:
      "What famous director caused a small panic when he broadcasted an adaptation of 'War of the Worlds'?",
    answer: [
      { answerText: 'Orson Welles', isCorrect: true, genName: 'b' },
      { answerText: 'Alfred Hitchcock', isCorrect: false },
      { answerText: 'James Cameron', isCorrect: false },
      { answerText: 'Ingmar Bergman', isCorrect: false }
    ]
  },
  {
    question:
      '____ , a show about Rue Bennett , a teenager struggling with addiction and the world , played by Zendaya.',
    answer: [
      { answerText: 'Freaks and Geeks', isCorrect: false },
      { answerText: '13 Reasons Why', isCorrect: false },
      { answerText: 'Stranger Things', isCorrect: false },
      { answerText: 'Euphoria', isCorrect: true, genName: 'z' }
    ]
  },
  {
    question:
      'This fighting game , released in 1992 , was one of the reasons for the creation of the ESRB Ratings board.',
    answer: [
      { answerText: 'Doom', isCorrect: false },
      { answerText: 'Wolfenstein 3D', isCorrect: false },
      { answerText: 'Street Fighter II', isCorrect: false },
      { answerText: 'Mortal Kombat', isCorrect: true, genName: 'm' }
    ]
  },
  {
    question:
      "The subgenre of hip-hop music , spearheaded by producers such as Teddy Riley , was defined by a mix of dance pop and hip-hop , with notable albums such as Janet Jackson's 'Control', and Michael Jackson's 'Dangerous', is called : ",
    answer: [
      { answerText: 'New Jack Swing', isCorrect: true, genName: 'x' },
      { answerText: 'Trip-Hop', isCorrect: false },
      { answerText: 'Boom-Bap Rap', isCorrect: false },
      { answerText: 'G-Funk', isCorrect: false }
    ]
  },
  {
    question:
      "This series of children's horror novels was adapted into a live-action tv show in 1995.",
    answer: [
      { answerText: 'Fear Street', isCorrect: false },
      { answerText: 'Goosebumps', isCorrect: true, genName: 'm' },
      { answerText: 'Scary Stories To Tell In The Dark', isCorrect: false },
      { answerText: 'Nightmare Hour', isCorrect: false }
    ]
  },
  {
    question:
      'In the first Star Wars film , who did Princess Leia give the Death Star plans to?',
    answer: [
      { answerText: 'Luke Skywalker', isCorrect: false },
      { answerText: 'Han Solo', isCorrect: false },
      { answerText: 'Darth Vader', isCorrect: false },
      { answerText: 'R2-D2', isCorrect: true, genName: 'x' }
    ]
  },
  {
    question: 'What year was the first iPhone released?',
    answer: [
      { answerText: '2003', isCorrect: false },
      { answerText: '2009', isCorrect: false },
      { answerText: '2007', isCorrect: true, genName: 'm' },
      { answerText: '2006', isCorrect: false }
    ]
  },
  {
    question:
      "This South Korean show went viral in 2021 , where 456 players risk their lives in a contest of deadly children's games to earn money to fix their financial troubles.",
    answer: [
      { answerText: 'Battle Royale', isCorrect: false },
      { answerText: 'Squid Games', isCorrect: true, genName: 'z' },
      { answerText: 'Train To Busan', isCorrect: false },
      { answerText: 'Parasite', isCorrect: false }
    ]
  },
  {
    question:
      "The 'Banks' family was a group of characters in this popular tv sitcom starring Will Smith.",
    answer: [
      { answerText: 'Friends', isCorrect: false },
      { answerText: 'Martin', isCorrect: false },
      {
        answerText: 'The Fresh Prince of Bel-Air',
        isCorrect: true,
        genName: 'm'
      },
      { answerText: 'In The House', isCorrect: false }
    ]
  },
  {
    question:
      'Electric Ladyland is a psychadelic rock album , the third and final album , released by which artist?',
    answer: [
      { answerText: 'Jimi Hendrix', isCorrect: true, genName: 'x' },
      { answerText: 'Buddy Holly', isCorrect: false },
      { answerText: 'Kurt Cobain', isCorrect: false },
      { answerText: 'David Bowie', isCorrect: false }
    ]
  },
  {
    question:
      "What does the slang term 'cap' mean in current internet culture (as of 2024)?",
    answer: [
      { answerText: 'To wear a hat', isCorrect: false },
      { answerText: 'A captain', isCorrect: false },
      { answerText: 'To be untruthful', isCorrect: true, genName: 'z' },
      { answerText: 'A boss', isCorrect: false }
    ]
  },
  {
    question:
      'What video game console did Kai Cenat give away when he was arrested for inciting a riot in 2023?',
    answer: [
      { answerText: 'Steam Deck', isCorrect: false },
      { answerText: 'Playstation 5', isCorrect: true, genName: 'z' },
      { answerText: 'Xbox Series X', isCorrect: false },
      { answerText: 'Nintendo Switch', isCorrect: false }
    ]
  },
  {
    question:
      "Which one of these lines were famously said in the movie , 'The Godfather'?",
    answer: [
      { answerText: "'We're gonna need a bigger boat.'", isCorrect: false },
      { answerText: "'You complete, ME.'", isCorrect: false },
      { answerText: "'You can't handle the truth!'", isCorrect: false },
      {
        answerText: "'I'll make him an offer he can't refuse.'",
        isCorrect: true,
        genName: 'x'
      }
    ]
  },
  {
    question:
      'What was the name of the Miles Davis album that had a significant impact on the future of jazz?',
    answer: [
      { answerText: 'Kind Of Blue', isCorrect: true, genName: 'b' },
      { answerText: "What's Going On?", isCorrect: false },
      { answerText: 'Sketches Of Spain', isCorrect: false },
      { answerText: 'The Man With The Horn', isCorrect: false }
    ]
  },
  {
    question:
      "This singer , known as 'The Queen Of Tejano' , was portrayed by Jennifer Lopez in a biographical drama film in 1997.",
    answer: [
      { answerText: 'Gloria Estafan', isCorrect: false },
      { answerText: 'Marília Mendonća', isCorrect: false },
      { answerText: 'Selena', isCorrect: true, genName: 'm' },
      { answerText: 'Shakira', isCorrect: false }
    ]
  },
  {
    question: "Which of these horror movies was NOT released in the 1970s'?",
    answer: [
      { answerText: 'Texas Chainsaw Massacre', isCorrect: false },
      { answerText: 'Friday The 13th', isCorrect: true, genName: 'x' },
      { answerText: 'The Exorcist', isCorrect: false },
      { answerText: 'Halloween', isCorrect: false }
    ]
  },
  {
    question:
      'Which American actress popularized the headscarf in popular fashion?',
    answer: [
      { answerText: 'Audrey Hepburn', isCorrect: true, genName: 'b' },
      { answerText: 'Marilyn Monroe', isCorrect: false },
      { answerText: 'Liza Minnelli', isCorrect: false },
      { answerText: 'Elizabeth Taylor', isCorrect: false }
    ]
  },
  {
    question:
      'This event at the turn of the millennium , involving a potential bug that was thought to possibly cause disasters around the world , with computers malfunctioning when dealing with dates after December 31 , 1999 , was called :',
    answer: [
      { answerText: '9-11', isCorrect: false },
      { answerText: 'The Millennium Problem', isCorrect: false },
      { answerText: 'The Y2K Scare', isCorrect: true, genName: 'm' },
      { answerText: 'The 2000 Outage', isCorrect: false }
    ]
  },
  {
    question:
      'What was the previous name of the publishing label that eventually became Marvel Comics?',
    answer: [
      { answerText: 'Atlas Comics', isCorrect: true, genName: 'b' },
      { answerText: '1955', isCorrect: false },
      { answerText: '1967', isCorrect: false },
      { answerText: '1970', isCorrect: false }
    ]
  }
]

export default questions
