(function () {
  'use strict';
  const params = new URLSearchParams(window.location.search);
  const codes = params.getAll('code');
  const code = codes.length === 1 && /^[A-Za-z0-9]{6}$/.test(codes[0]) ? codes[0] : '';
  const byId = id => document.getElementById(id);
  if (code) {
    byId('invite-code').textContent = code;
    byId('code-row').hidden = false;
    byId('copy-code').hidden = false;
    byId('open-app').href = 'smartbukatsu://invite?code=' + encodeURIComponent(code);
    byId('open-app').hidden = false;
    const store = new URL(byId('android-store').href);
    store.searchParams.set('referrer', 'invite_code=' + code);
    byId('android-store').href = store.toString();
    byId('copy-code').addEventListener('click', async function () {
      try {
        if (!navigator.clipboard) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(code);
        byId('copy-status').textContent = 'コピーしました。アプリの招待コード欄へ貼り付けてください。';
      } catch {
        byId('copy-status').textContent = 'コピーできませんでした。表示された招待コードを長押ししてコピーしてください。';
      }
    });
  } else {
    byId('invite-error').hidden = false;
    byId('invite-title').textContent = '招待リンクを確認してください';
    byId('invite-intro').textContent = '招待文のリンクを開き直すか、本文の招待コードを使って参加してください。';
    byId('join-step').hidden = true;
  }
  const menu = document.querySelector('.c-navIcon');
  const nav = document.querySelector('.c-globalNav_list');
  menu?.addEventListener('click', function () {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('active', !expanded);
    if (nav) nav.style.display = expanded ? '' : 'block';
  });
})();
