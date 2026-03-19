/* animations.js
   Responsable: animaciones de invocación y combate (pequeñas utilidades)
*/
(() => {
  function animatePortalSequence(containerEl, onComplete, creatureRenderCallback){
    // secuencia: appear -> pulse -> explode -> show creature
    containerEl.classList.remove('hidden');
    const portal = document.getElementById('portal');
    portal.classList.add('portal-appear');
    portal.classList.add('energy-pulse');

    setTimeout(()=>{
      // explosion
      portal.classList.remove('energy-pulse');
      portal.classList.add('explosion');

      setTimeout(()=>{
        // finalize
        portal.classList.remove('explosion');
        portal.classList.add('hidden');
        if(typeof creatureRenderCallback === 'function') creatureRenderCallback();
        if(typeof onComplete === 'function') onComplete();
      },360);
    },900);
  }

  function attackAnimation(targetEl, onComplete){
    targetEl.classList.add('shake');
    setTimeout(()=>{ targetEl.classList.remove('shake'); if(onComplete) onComplete(); }, 360);
  }

  window.SummonAnimations = {animatePortalSequence, attackAnimation};
})();
