import React, { Component } from 'react'
import { Table, Button} from 'reactstrap'
import AppleModal  from './AppleModal.js'

document.title = 'Список сортов';
/*let appleList = [
  {
    id: 1,
    name: 'Белый налив',
    description: `Широко известный и очень популярный сорт. 
                  Полакомиться таким можно уже в начале июля. 
                  Высота взрослого дерева составляет 3–5 м, плоды округлые, 
                  зеленоватого цвета, в стадии полной спелости становятся почти белыми. 
                  Мякоть ароматная, несколько рыхлая и крупнозернистая. 
                  Умеренно кисловатая. 
                  Очень важно убирать урожай, не допуская перезревания, поскольку в этом случае он теряет качества. 
                  Сорванные фрукты портятся довольно быстро, поэтому использовать их нужно, не мешкая. 
                  Белый налив зимостоек, в плодоношение саженец вступает на 5-ый год.`,
    season: 'Лето',
    dateAdded: new Date().toISOString()
  },
  {
    id: 2,
    name: 'Макинтош',
    description: `Сорт канадский, фрукты средние, желто-зеленые, с покровом из почти фиолетовых полос на красном фоне. 
                  Середина белая, часто имеет характерные красноватые прожилки, приятно пряная. 
                  Отличный коммерческий сорт. Сильнорослое и раскидистое дерево. 
                  Уборка – с сентября, есть его можно до середины зимы. 
                  Недостаток – низкая морозоустойчивость и восприимчивость к болезням.`,
    season: 'Осень',
    dateAdded: new Date(2011, 0, 1, 2, 3, 4, 567).toISOString()
  }
]*/

class AppleList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      editableApple: {},
      isModalOpened: false,
      selectedApples: {}
     /* modal: false,
      model: {},
      error: false*/
    }
  }

  toggle() {
    this.setState({
      isModalOpened: !this.state.isModalOpened
    });
  }

  addItem(model){
    let item = Object.assign({}, model)
    item.dateAdded = new Date().getTime()
    item.id = this.state.items && this.state.items.length>0 ? Number(this.state.items.length)+1 : 1;
    this.state.items.push(item);
    this.setState({
      items: this.state.items
    })
    this.toggle()
  }

  updateItem(model){
    var apples = this.state.items;
    for (var i = 0; i <apples.length; i++) {
      console.log(apples[i].id, model.id)
      if (apples[i].id ===  model.id) {
        apples[i] = Object.assign(apples[i], model)
      }
    }
    this.setState({
      items: apples
    })
    this.toggle()
  }

  isEmpty(obj) {
    for (var key in obj) {
      if(obj[key]){
        return false;
      }
    }
    return true;
  }

  getSelectedApples() {
    var apples = [];
    for (var i = 0; i < this.state.items.length; i++) {
      if (this.state.selectedApples[this.state.items[i].id] ) {
        apples.push(this.state.items[i]);
      }
    }
    return apples;
  }

  disableCreateButton(){
    return !(this.getSelectedApples().length === 1);
  }

  disableDeleteButton(){
    return (this.getSelectedApples().length  === 0);
  }

  createItem(){
    var apples = this.getSelectedApples()
    if(apples.length === 1){
      this.setState({editableApple: apples[0]})
      this.toggle(this);
    }
  }

  deleteApple(){
    console.log('Вы действительно хотите удалить?')
  }

  /*isDisabledEdit(){
    console.log(5);
    if(this.isEmpty){
      return true;
    }
    if(this.selectedApplesLength(this.state.selectedApples) ===1) {
      return false;
    }
    return true;
  }*/

/***/

  /*handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }*/

  showAddModal(){
    this.setState({
      editableApple: {},
      isModalOpened: true
    })
  }

  chosenApples(apple){
    let selectedApples = Object.assign({},this.state.selectedApples);
    if(!!selectedApples[apple]){
      selectedApples[apple] = !selectedApples[apple]
    }else{
      selectedApples[apple] = true
    }
    this.setState({
      selectedApples: selectedApples
    });
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
        this.state.items.map(apple => (
          <tr key={apple.id}>
            <td>
              <input type={"checkbox"} className="checkbox"
                     defaultChecked={false}
                     value={apple.id}
                     onChange={this.chosenApples.bind(this, apple.id)}/>
            </td>
            <td>{apple.id}</td>
            <td>{apple.name}</td>
            <td>{new Date(apple.dateAdded).toLocaleString()}</td>
            <td>
              {apple.description}<br/>
              {apple.season}
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
                  onClick={this.createItem.bind(this)} disabled={this.disableCreateButton()}>Реактировать</Button>{' '}
          <Button type={'button'} color="primary" size="sm"
                  onClick={this.deleteApple.bind(this)}
                  disabled={this.disableDeleteButton()}>Удалить</Button>
        </div>
        {
          this.state.items.length ? this.templateTable() : this.notFound()
        }
        <AppleModal apple={this.state.editableApple} isOpen={this.state.isModalOpened} toggle={this.toggle.bind(this)} saveApple={this.state.editableApple.id ? this.updateItem.bind(this) : this.addItem.bind(this)}/>
      </div>
    )
  }
}

export default AppleList;