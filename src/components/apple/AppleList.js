import React, { Component } from 'react'
import { Table, Button} from 'reactstrap'
import AppleModal  from './AppleModal.js'

class AppleList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      editableItem: {},
      isModalOpened: false,
      selectedItems: [],
      modalKey: Date.now()
    }
  }

  componentDidMount() {
    document.title = 'Список сортов';
  }

  toggle() {
    this.setState({
      modalKey: Date.now(),
      isModalOpened: !this.state.isModalOpened
    });
  }

  addItem(model){
    let item = Object.assign({}, model)
    item.dateAdded = new Date().getTime()
    item.id = Date.now();
    this.state.items.push(item);
    this.setState({
      items: this.state.items
    })
    this.toggle()
    this.unselectItems()
  }

  updateItem(model){
    var items = this.state.items;
    for (var i = 0; i <items.length; i++) {
      if (items[i].id ===  model.id) {
        items[i] = Object.assign(items[i], model)
      }
    }
    this.setState({
      items: items
    })
    this.toggle()
    this.unselectItems()
  }

  disableCreateButton(){
    return this.state.selectedItems.length !== 1
  }

  disableDeleteButton(){
    return this.state.selectedItems.length === 0
  }

  showUpdateModal(){
    if(this.state.selectedItems.length === 1){
      let editableItem = this.state.items.find((item)=>item.id === this.state.selectedItems[0])
      if(editableItem){
        this.setState({editableItem: editableItem})
        this.toggle(this);
      }
    }
  }

  isItemSelected(item){
    return this.state.selectedItems.indexOf(item.id) > -1;
  }
  
  unselectItems(){
    this.setState({
      selectedItems: []
    })
  }

  deleteItem(){
    if(this.state.selectedItems.length > 0){
      this.setState({
        items: this.state.items.filter((item) => !this.isItemSelected(item))
      })
      this.unselectItems()
    }
  }

  showAddModal(){
    this.setState({
      editableItem: {}
    })
    this.toggle();
  }

  toggleItem(item){
    if(this.isItemSelected(item)){
      this.unselectItem(item);
    }else{
      this.selectItem(item);
    }
  }
  
  selectItem(item) {
    let selectedItems = this.state.selectedItems;
    selectedItems.push(item.id);
    this.setState(selectedItems);
  }

  unselectItem(item) {
    this.setState({
      selectedItems: this.state.selectedItems.filter(id => item.id !== id)
    })
  }

  templateTable(){
    return (<Table hover striped>
      <thead>
      <tr>
        <th></th>
        <th>#</th>
        <th>Название</th>
        <th>Дата добавления</th>
        <th>Описание</th>
      </tr>
      </thead>
      <tbody>
      {
        this.state.items.map(item => (
          <tr key={item.id}>
            <td>
              <input type={"checkbox"} className="checkbox"
                     checked={this.isItemSelected(item)}
                     onChange={() => this.toggleItem(item)}/>
            </td>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{new Date(item.dateAdded).toLocaleString()}</td>
            <td>
              {item.description}<br/>
              {item.season}
            </td>
          </tr>
        ))
      }
      </tbody>
    </Table>)
  }

  notFound() {
    return (<div className={'text-center'}>Нет записей</div>)
  }

  render() {
    return (
      <div>
        <div className='actions-button-block'>
          <Button type={'button'} color="primary" size="sm"
                  onClick={this.showAddModal.bind(this)}>Добавить</Button>{' '}
          <Button type={'button'} color="primary" size="sm"
                  onClick={this.showUpdateModal.bind(this)}
                  disabled={this.disableCreateButton()}>Реактировать</Button>{' '}
          <Button type={'button'} color="primary" size="sm"
                  onClick={this.deleteItem.bind(this)}
                  disabled={this.disableDeleteButton()}>Удалить</Button>
        </div>
        {
          this.state.items.length ? this.templateTable() : this.notFound()
        }
        <AppleModal key={this.state.modalKey}
                    item={this.state.editableItem}
                    isOpen={this.state.isModalOpened}
                    toggle={this.toggle.bind(this)}
                    saveItem={this.state.editableItem.id ? this.updateItem.bind(this) : this.addItem.bind(this)}/>
      </div>
    )
  }
}

export default AppleList;