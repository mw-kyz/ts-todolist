import { ITodoData } from "./typings"
import TodoTemplete from "./TodoTemplete"
import { createItem, findParentNode } from "./utils";

class TodoDom extends TodoTemplete {
  private todoWrapper: HTMLElement

  constructor (todoWrapper: HTMLElement) {
    super();
    this.todoWrapper = todoWrapper
  }

  protected initList (todoData: ITodoData[]): void {
    if (todoData.length) {
      const oFrag: DocumentFragment = document.createDocumentFragment()
      todoData.map((todo: ITodoData) => {
        const oItem: HTMLElement = createItem('div', 'todo-item', this.todoView(todo))
        oFrag.appendChild(oItem)
      })
      this.todoWrapper.appendChild(oFrag)
    }
  }

  protected addItem (todo: ITodoData): void {
    const oItem: HTMLElement = createItem('div', 'todo-item', this.todoView(todo))
    this.todoWrapper.appendChild(oItem)
  }

  protected removeItem (target: HTMLElement): void {
    const oParentNode: HTMLElement = findParentNode(target, 'todo-item')
    oParentNode.remove()
  }

  protected changeCompleted (target: HTMLElement, completed: boolean): void {
    const oParentNode: HTMLElement = findParentNode(target, 'todo-item')
    const oContent: HTMLElement = oParentNode.getElementsByTagName('span')[0]

    oContent.style.textDecoration = completed ? 'line-through' : ''
  }
}

export default TodoDom