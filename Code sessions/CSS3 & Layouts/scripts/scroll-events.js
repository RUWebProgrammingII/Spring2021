const state = {
  infoSectionDisplayed: false,
  shoutOutSectionDisplayed: [ false, false ],
  infoSectionScrollBreakpoint: 0,
  firstShoutOutSectionScrollBreakpoint: 0,
  secondShoutOutSectionScrollBreakpoint: 0
};

document.addEventListener('DOMContentLoaded', () => {
  const infoSection = document.querySelector('.info-section-item:nth-child(1)');
  const firstShoutOutSection = document.querySelectorAll('.shout-out-section')[0];
  const secondShoutOutSection = document.querySelectorAll('.shout-out-section')[1];

  setScrollBreakpoint('infoSectionScrollBreakpoint', infoSection);
  setScrollBreakpoint('firstShoutOutSectionScrollBreakpoint', firstShoutOutSection);
  setScrollBreakpoint('secondShoutOutSectionScrollBreakpoint', secondShoutOutSection);
});

function setScrollBreakpoint(key, elem) {
  state[key] = elem.offsetTop - elem.offsetHeight;
}

function showInfoSection(scrollPosition) {
  if (scrollPosition > state.infoSectionScrollBreakpoint && !state.infoSectionDisplayed) {
    const infoSectionItems = document.querySelectorAll('.info-section-item');
    for (let i = 0; i < infoSectionItems.length; i++) {
      const currentItem = infoSectionItems[i];
      currentItem.classList.add('from-top');
      currentItem.style.animationDelay = `${i / 2}s`;
    }
    state.infoSectionDisplayed = true;
  }
}

function showShoutOutSection(scrollPosition, startPosition, childNumberIndex) {
  const hasBeenDisplayed = state.shoutOutSectionDisplayed[childNumberIndex];
  if (scrollPosition > startPosition && !hasBeenDisplayed) {
    const sections = document.querySelectorAll('.shout-out-section');
    const section = sections[childNumberIndex];

    const img = section.querySelector('img');
    const info = section.querySelector('.shout-out-section-info');

    if (section.classList.contains('left')) {
      img.classList.add('slide-from-left');
    } else {
      img.classList.add('slide-from-right');
    }

    img.style.animationDelay = '.8s';
    info.classList.add('from-top');

    state.shoutOutSectionDisplayed[childNumberIndex] = true;
  }
}

function updateScrollDisplay(scrollPosition) {
  document.querySelector('.current-scroll').innerHTML = scrollPosition;
}

document.addEventListener('scroll', function (e) {
  const scrollPosition = window.scrollY;

  window.requestAnimationFrame(function () {
    updateScrollDisplay(scrollPosition);
    showInfoSection(scrollPosition);
    showShoutOutSection(scrollPosition, state.firstShoutOutSectionScrollBreakpoint, 0);
    showShoutOutSection(scrollPosition, state.secondShoutOutSectionScrollBreakpoint, 1);
  });
});
