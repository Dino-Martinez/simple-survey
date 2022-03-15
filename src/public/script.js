// function addPrompt () {
//   const label = document.createElement('label')
//   createForm.appendChild(label)
// }

// const createForm = document.querySelector('#create-form')
// // const numInputs = document.querySelectorAll('input').length
// addPromptButton.on('click', addPrompt)

const promptGroup = document.querySelector('#prompt-group')
const addPromptButton = document.querySelector('#add-prompt')
let numPrompts = 0
addPromptButton.addEventListener('click', (e) => {
  const prompt = document.createElement('div')
  prompt.classList.add('prompt')
  prompt.innerHTML = `
  <label for="prompt">Prompt</label>
  <input type="text" name="questions[${numPrompts}][prompt]" id="prompt-${numPrompts}">

  <label for="type">Type</label>
  <select name="questions[${numPrompts}][type]" id="type-${numPrompts}">
    <option value="text">Text</option>
    <option value="number">Number</option>
  </select>
  `
  numPrompts++
  promptGroup.appendChild(prompt)
})

const type = document.querySelector('#type')
if (type) {
  type.addEventListener('change', (e) => {
    console.log(e.target.value)
  })
}
