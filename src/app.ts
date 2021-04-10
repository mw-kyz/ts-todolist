import { ITodoData } from "./js/typings"
import TodoEvent from './js/TodoEvent'

;((doc) => {
  const oInput: HTMLInputElement = doc.querySelector('input')
  const oAddBtn: HTMLElement = doc.querySelector('button')
  const oTodoList: HTMLElement = doc.querySelector('.todo-list')

  const todoData: ITodoData[] = []

  const todoEvent: TodoEvent = new TodoEvent(todoData, oTodoList)

  const init = (): void => {
    bindEvent()
  }

  function bindEvent (): void {
    oAddBtn.addEventListener('click', handleAddBtnClick, false)
    oTodoList.addEventListener('click', handleListClick, false)
  }

  function handleAddBtnClick (): void {
    const val: string = oInput.value.trim()

    if (val.length) {
      const res = todoEvent.addTodo(<ITodoData>{
        id: new Date().getTime(),
        content: val,
        completed: false
      })
      if (res === 1001) {
        alert('已存在该项！')
      }
    }

    oInput.value = ''
  }

  function handleListClick (e: MouseEvent): void {
    // 断言tar就是HTMLElement，不然读取tar.tagName会报错，认为tar上没有tagName这个属性
    const tar = e.target as HTMLElement
    const tagName = tar.tagName.toLowerCase()

    if (tagName === 'input' || tagName === 'button') {
      const id = parseInt(tar.dataset.id)
      switch (tagName) {
        case 'input':
          todoEvent.toggleComplete(tar, id)
          break
        case 'button':
          todoEvent.removeTodo(tar, id)
          break
        default:
          break
      }
    }
  }

  init()
   





})(document)