export const sanitize = (string) => {
  const dump = document.createElement("div")
  dump.textContent = string
  return dump.innerHTML
}
