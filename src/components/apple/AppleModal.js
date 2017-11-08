import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'

class AppleModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalLoading: false,
      error: false,
      item: {}
    };
  }

  componentDidMount() {
    this.setState({
      item: Object.assign({}, this.props.item)
    })
  }

  handleChange(val, name) {

    let item = this.state.item
    item[name]= val
    this.setState(item)
  }

  isValidForm(){
    if(!this.state.item.name){
      this.setState({
        error: true
      });
    }
    return !this.state.error
  }

  onFocus(){
    this.setState({
      error: false
    });
  }

  onBlur(){
    this.isValidForm.bind(this)()
  }

  submit(item) {
    if(!this.isValidForm.bind(this)){
      return
    }else{
      var updeteItem= Object.assign(item, this.state.item);
      this.props.saveItem(updeteItem);
    }
  }

  render() {
    const {item} = this.state;

    return (
      <Modal className={this.props.className} isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Добавить сорт яблок</ModalHeader>
        <Form name={'itemForm'} >
          <ModalBody>
            <FormGroup>
              <Label for="name">Название</Label>
              <Input required refs="name" type="text" name="name" id="name" value={this.state.item.name || ''} autoComplete={'off'}
                     onChange={(event) => this.handleChange(event.target.value, 'name')}
                     className={'form-control-sm'} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}/>
              {
                this.state.error && <div className="has-error help-block">Поле обязательно для заполнения</div>
              }
            </FormGroup>
            <FormGroup>
              <Label for="description">Описание</Label>
              <textarea  type="text" refs="description" name="description" value={this.state.item.description || ''}
                         className={'form-control form-control-sm'} id="description" autoComplete={'off'}
                         onChange={(event) => this.handleChange(event.target.value, 'description')}></textarea>
            </FormGroup>
            <FormGroup>
              <Label for="season">Сезон</Label>
              <Input type="select" refs="season" name="season" id="season" className={'form-control-sm'}
                     onChange={(event) => this.handleChange(event.target.value, 'season')}
                     value={this.state.item.season}>
                <option></option>
                {
                  [
                    'Осень',
                    'Зима',
                    'Весна',
                    'Лето',
                  ].map((season, index) => <option key={index}>{season}</option>)
                }
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type={'button'} className="btn btn-primary btn-sm" onClick={this.submit.bind(this, item)}>Сохранить</Button>{' '}
            <Button color="primary" size="sm" onClick={this.props.toggle}>Закрыть</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}

export default AppleModal;