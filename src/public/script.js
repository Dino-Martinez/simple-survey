const promptGroup = document.querySelector('#prompt-group')
const addPromptButton = document.querySelector('#add-prompt')
let numPrompts = 0

addPromptButton.addEventListener('click', (e) => {
  const prompt = document.createElement('div')
  prompt.classList.add('prompt')
  prompt.innerHTML = `
  <label for="prompt">Prompt</label>
  <input type="text" name="questions[${numPrompts}][prompt]" id="prompt-${numPrompts}" required>

  <label for="type">Type</label>
  `

  const select = document.createElement('select')
  select.id = `type-${numPrompts}`
  select.name = `questions[${numPrompts}][type]`
  select.innerHTML = `
    <option value="text">Text</option>
    <option value="number">Number</option>
    <option value="checkbox">Checkboxes</option>
    <option value="radio">Radio Buttons</option>
  `

  select.addEventListener('focus', (e) => {
    e.target.setAttribute('oldvalue', e.target.value)
  })

  select.addEventListener('change', (e) => {
    if (e.target.value === e.target.getAttribute('oldvalue')) { return }
    if (e.target.value === 'checkbox' || e.target.value === 'radio') {
      if (!(e.target.getAttribute('oldvalue') === 'checkbox' || e.target.getAttribute('oldvalue') === 'radio')) {
        const options = document.createElement('div')
        options.id = e.target.id + '-options'
        options.classList.add('options-group')

        const addOptionButton = document.createElement('button')
        addOptionButton.type = 'button'
        addOptionButton.innerText = '+ Add Option'
        addOptionButton.classList.add('button')
        addOptionButton.addEventListener('click', (e) => {
          const index = e.target.parentElement.parentElement.getAttribute('index')
          const newOption = document.createElement('div')
          newOption.classList.add('prompt__options')
          newOption.innerHTML = `
          <label for="option">Title</label>
          <input type="text" name="questions[${index}][options]" id="prompt-${index}" required>
          `
          options.insertBefore(newOption, e.target)
        })

        options.appendChild(addOptionButton)

        prompt.appendChild(options)
      }
    } else {
      const parent = e.target.parentElement
      const options = parent.querySelector('div')
      if (options) { parent.removeChild(options) }
    }
    e.target.setAttribute('oldvalue', e.target.value)
  })

  prompt.appendChild(select)
  prompt.setAttribute('index', numPrompts)
  promptGroup.appendChild(prompt)
  numPrompts++
})
