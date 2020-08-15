export const delay = (ms = 300) => {
  return Promise.resolve((done) => setTimeout(done, ms))
}
