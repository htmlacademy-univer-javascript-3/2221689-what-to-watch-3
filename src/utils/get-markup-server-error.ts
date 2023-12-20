export function getMarkupServerError() {
  const div = document.createElement('div');
  div.innerHTML = '<h1>The server is not available</h1>';
  div.style.textAlign = 'center';
  document.body.append(div);
}
