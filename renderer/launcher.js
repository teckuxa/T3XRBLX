document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('launch2016studio').addEventListener('click', () => {
    console.log('Button clicked!');
    window.electronAPI.launchClient('2016M-Studio/RobloxStudioBeta.exe');
  });

  window.electronAPI.onLaunchError((msg) => {
    document.getElementById('errorMsg').textContent = `Launch error: ${msg}`;
  });

});n