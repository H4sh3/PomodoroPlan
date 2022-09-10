const domain = "https://pomodoro.daniel-pink.de"

export const SITE = {
  name: "PomodoroLog",
  domain,
  github: "https://github.com/h4sh3/PomodoroPlan",
  description: "Simple app to manage todos and complete pomodoro sessions",
  canonical: new URL("", domain),
  postsPerPage: 6,
};

export const META = {
  title: SITE.name,
  description: SITE.description,
  canonical: SITE.canonical,
}