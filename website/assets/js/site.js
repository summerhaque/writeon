/* Write On! site: the menu, the "start anywhere" marker, and a canned demo of Coach Sparkle. */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------ Menu

  var nav = document.querySelector('[data-nav]');
  var toggle = document.querySelector('[data-nav-toggle]');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('open'));
  });
  nav.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') setMenu(false);
  });

  // ------------------------------------------------------------ Theme: light unless the visitor picks dark

  var themeToggle = document.querySelector('[data-theme-toggle]');
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    var dark = theme === 'dark';
    if (dark) document.documentElement.dataset.theme = 'dark';
    else delete document.documentElement.dataset.theme;
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    themeMeta.setAttribute('content', dark ? '#0D1B2A' : '#F4F9FD');
  }

  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  themeToggle.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('writeon-theme', next); } catch (e) { /* private mode: the choice lasts for this visit */ }
  });

  // The hero is light, so the nav starts clear; once the page moves it gets a white surface.
  function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ------------------------------------------------------------ Start anywhere

  // The marker hops between stages, because a story can start at any of them.
  var stops = document.querySelectorAll('.stages li');
  var hops = [1, 2, 0, 5];
  var hop = 0;
  if (stops.length && !reducedMotion) {
    setInterval(function () {
      if (document.hidden) return;
      stops[hops[hop]].classList.remove('here');
      hop = (hop + 1) % hops.length;
      stops[hops[hop]].classList.add('here');
    }, 2600);
  }

  // ------------------------------------------------------------ Share with a teacher

  var share = document.querySelector('[data-share]');
  if (share && /^https?:/.test(location.protocol)) {
    share.href = share.href.replace(/(body=[^&]*)/, function (body) {
      return body + encodeURIComponent(' ' + location.origin + location.pathname);
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // ------------------------------------------------------------ Coach Sparkle

  var data = window.COACH_DATA;
  var thread = document.querySelector('[data-thread]');
  if (!data || !thread) return;

  var GENRE_NAMES = { fantasy: 'Fantasy', scifi: 'Sci-Fi', mystery: 'Mystery', comedy: 'Comedy', friendship: 'Friendship' };
  var FIELD_ORDER = ['name', 'wants', 'fears', 'detail', 'antagonist'];

  // The same intent rules as app/src/coach/coach-engine.ts.
  var INTENTS = [
    ['write-it', /\b(write|do|finish|make|type)\b.{0,24}\b(for me|it for|this for)\b|\bjust (write|tell|give|do)\b|\b(give|tell) me (the |an |a )?(answer|story|ending|words|sentence)|\bcan you (write|do|finish|make)\b|\bwrite (it|this|my|the|a)\b/i],
    ['hint', /\b(hint|stuck|help|idk|i don'?t know|dunno|no idea|clue|not sure|confused|blank|can'?t think)\b/i],
    ['explain', /\b(what is|what's|what does|explain|what do you mean|meaning|how do i|why)\b/i],
    ['next', /\b(next|now what|what now|then what|i'?m done|finished|what else)\b/i],
    ['greeting', /^\s*(hi|hey|hello|yo|good (morning|afternoon|evening))\b/i],
    ['thanks', /\b(thanks|thank you|thx|ty|got it|okay|ok|cool)\b/i]
  ];

  var state = { genre: 'fantasy', hints: 0, field: 0, said: [], busy: false };
  // Bumped whenever the conversation restarts, so a late reply can't land in a new one.
  var conversation = 0;
  var context = document.querySelector('[data-context]');
  var quick = document.querySelectorAll('[data-quick] button');
  var form = document.querySelector('[data-form]');
  var input = form.querySelector('input');

  function classify(text) {
    for (var i = 0; i < INTENTS.length; i++) if (INTENTS[i][1].test(text)) return INTENTS[i][0];
    return 'unknown';
  }

  function wordCount(text) { return (text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || []).length; }

  /** The first line not yet said in this conversation. */
  function fresh(lines) {
    for (var i = 0; i < lines.length; i++) if (state.said.indexOf(lines[i]) === -1) return lines[i];
    return lines[state.said.length % lines.length];
  }

  function nextQuestion() {
    var key = FIELD_ORDER[state.field % FIELD_ORDER.length];
    state.field += 1;
    return fresh(data.fieldQuestions[key]);
  }

  function reply(intent, message) {
    var genre = data.genre[state.genre];
    switch (intent) {
      case 'write-it': return { text: fresh(data.handBack) };
      case 'hint':
        if (state.hints >= 3) return { text: fresh(data.outOfHints) };
        state.hints += 1;
        return { text: genre.hints[state.hints - 1], tier: state.hints };
      case 'explain': return { text: data.explain };
      case 'greeting': return { text: genre.opener };
      case 'next':
      case 'thanks': return { text: nextQuestion() };
      default:
        if (message && wordCount(message) >= 6) return { text: fresh(data.nudges) + ' ' + nextQuestion() };
        return { text: fresh(data.fallback) };
    }
  }

  function scrollDown() { thread.scrollTop = thread.scrollHeight; }

  function addWriter(text) {
    var bubble = document.createElement('div');
    bubble.className = 'msg-writer msg-enter';
    bubble.textContent = text;
    thread.appendChild(bubble);
  }

  function addCoach(answer, animate) {
    var row = document.createElement('div');
    row.className = 'msg-coach' + (animate ? ' msg-enter' : '');
    row.innerHTML = '<svg aria-hidden="true"><use href="#sparkle"/></svg>';
    var body = document.createElement('div');
    if (answer.tier) {
      var label = document.createElement('span');
      label.className = 'msg-hint';
      label.textContent = 'Hint ' + answer.tier + ' of 3';
      body.appendChild(label);
    }
    var text = document.createElement('p');
    text.textContent = answer.text;
    body.appendChild(text);
    row.appendChild(body);
    thread.appendChild(row);
    state.said.push(answer.text);
  }

  function setBusy(busy) {
    state.busy = busy;
    quick.forEach(function (button) { button.disabled = busy; });
  }

  /** The coach thinks for a moment, sized to the reply, then answers. */
  function respond(intent, message) {
    if (state.busy) return;
    var answer = reply(intent, message);
    setBusy(true);
    var thinking = document.createElement('div');
    thinking.className = 'msg-coach';
    thinking.setAttribute('aria-label', 'Coach Sparkle is thinking');
    thinking.innerHTML = '<svg aria-hidden="true"><use href="#sparkle"/></svg><div class="thinking"><i></i><i></i><i></i></div>';
    thread.appendChild(thinking);
    scrollDown();
    var delay = reducedMotion ? 150 : Math.min(1600, 650 + wordCount(answer.text) * 18);
    var id = conversation;
    setTimeout(function () {
      if (id !== conversation) return;
      thinking.remove();
      addCoach(answer, true);
      scrollDown();
      setBusy(false);
    }, delay);
  }

  function start(genre) {
    conversation += 1;
    state = { genre: genre, hints: 0, field: 0, said: [], busy: false };
    thread.innerHTML = '';
    context.textContent = GENRE_NAMES[genre] + ' · Characters · Hints, not answers';
    addCoach({ text: data.genre[genre].opener }, false);
    setBusy(false);
  }

  document.querySelectorAll('[data-genre]').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('[data-genre]').forEach(function (b) {
        b.setAttribute('aria-checked', String(b === button));
      });
      start(button.getAttribute('data-genre'));
    });
  });

  quick.forEach(function (button) {
    button.addEventListener('click', function () {
      if (state.busy) return;
      addWriter(button.textContent);
      respond(button.getAttribute('data-intent'), null);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var text = input.value.trim();
    if (!text || state.busy) return;
    input.value = '';
    addWriter(text);
    respond(classify(text), text);
  });

  start('fantasy');
})();
