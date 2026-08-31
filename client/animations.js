/* animations.js
   Responsable: animaciones de invocacion y combate
*/
(() => {
  function animatePortalSequence(containerEl, onComplete, creatureRenderCallback) {
    if (!containerEl) return;
    containerEl.classList.remove('hidden');
    const portal = document.getElementById('portal');
    if (!portal) {
      if (typeof creatureRenderCallback === 'function') creatureRenderCallback();
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    containerEl.classList.remove('summon-finished');
    containerEl.classList.add('summoning-active');
    portal.classList.remove('hidden', 'explosion');
    portal.classList.add('portal-appear', 'energy-pulse');

    setTimeout(() => {
      portal.classList.remove('energy-pulse');
      portal.classList.add('explosion');

      setTimeout(() => {
        portal.classList.remove('portal-appear', 'explosion');
        portal.classList.add('hidden');
        containerEl.classList.remove('summoning-active');
        containerEl.classList.add('summon-finished');
        if (typeof creatureRenderCallback === 'function') creatureRenderCallback();
        if (typeof onComplete === 'function') onComplete();
      }, 360);
    }, 900);
  }

  function animateSummonCard(cardEl) {
    if (!cardEl) return;
    cardEl.classList.remove('summon-card-enter');
    void cardEl.offsetWidth;
    cardEl.classList.add('summon-card-enter');
    setTimeout(() => {
      cardEl.classList.remove('summon-card-enter');
    }, 820);
  }

  function pulseAnimation(targetEl, className, duration = 480, onComplete) {
    if (!targetEl) {
      if (onComplete) onComplete();
      return;
    }
    targetEl.classList.remove(className);
    void targetEl.offsetWidth;
    targetEl.classList.add(className);
    setTimeout(() => {
      targetEl.classList.remove(className);
      if (onComplete) onComplete();
    }, duration);
  }

  function attackAnimation(targetEl, onComplete) {
    pulseAnimation(targetEl, 'shake', 360, onComplete);
  }

  function animateAttack(attackerEl, targetEl) {
    pulseAnimation(attackerEl, 'attack-anim', 350);
    setTimeout(() => attackAnimation(targetEl), 120);
  }

  function animateAbility(attackerEl, targetEl) {
    pulseAnimation(attackerEl, 'cast-anim', 480);
    setTimeout(() => attackAnimation(targetEl), 180);
  }

  function animateRecover(targetEl) {
    pulseAnimation(targetEl, 'heal-anim', 540);
  }

  function animateDefend(targetEl) {
    pulseAnimation(targetEl, 'guard-anim', 480);
  }

  window.SummonAnimations = {
    animatePortalSequence,
    animateSummonCard,
    attackAnimation,
    animateAttack,
    animateAbility,
    animateRecover,
    animateDefend
  };
})();
