// greet people based on hour of the day

export function Greeting() {
  const date = new Date();
  const hour = date.getHours();

  const allMorningGreetings = [
    "Good morning",
    "Wakey, wakey",
    "Guten Morgen",
    "Rise and shine",
    "Morning",
    "Look alive",
  ];
  const allAfternoonGreetings = [
    "Good afternoon",
    "Afternoon",
    "Good day",
    "Look alive",
    "Good afternoon",
    "Howdy",
    "Hello there",
  ];
  const allEveningGreetings = [
    "Good evening",
    "Evening",
    "Good day",
    "Good evening",
    "Nice to see you",
    "Hellooooo",
    "Hi there",
    "Look alive",
  ];

  if (hour < 12) {
    return allMorningGreetings[
      Math.floor(Math.random() * allMorningGreetings.length)
    ];
  } else if (hour < 18) {
    return allAfternoonGreetings[
      Math.floor(Math.random() * allAfternoonGreetings.length)
    ];
  } else {
    return allEveningGreetings[
      Math.floor(Math.random() * allEveningGreetings.length)
    ];
  }
}
