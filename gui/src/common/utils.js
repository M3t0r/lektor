export function rejectAfter(timeout) {
  return new Promise((resolve, reject) => {
    let wait = setTimeout(() => {
      reject('Timed out');
    }, timeout)
  })
}
