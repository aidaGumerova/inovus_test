import React, { Component } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap'

class AppleModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalLoading: false,
      error: false,
      apple: {}
    };
  }

  handleChange(val, name) {
    let model = this.state.apple
    model[name]= val
    this.setState({
      model :model
    })
  }

  isValidForm(){
    if(!this.state.apple.name){
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

  submit(apple) {
    if(!this.isValidForm.bind(this)){
      return
    }else{
      var updeteApple= Object.assign(apple, this.state.apple);
      this.props.saveApple(updeteApple);
    }
  }

  render() {
    let apple = Object.assign({}, this.props.apple);
    return (
      <Modal className={this.props.className} isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>Добавить сорт яблок</ModalHeader>
        <Form name={'appleForm'} >
          <ModalBody>
            <FormGroup>
              <Label for="name">Название</Label>
              <Input required refs="name" type="text" name="name" id="name" defaultValue={apple.name} autoComplete={'off'}
                     onChange={(event) => this.handleChange(event.target.value, 'name')}
                     className={'form-control-sm'} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}/>
              {
                this.state.error && <div className="has-error help-block">Поле обязательно для заполнения</div>
              }
            </FormGroup>
            <FormGroup>
              <Label for="description">Описание</Label>
              <textarea  type="text" refs="description" name="description" defaultValue={apple.description}
                         className={'form-control form-control-sm'} id="description" autoComplete={'off'}
                         onChange={(event) => this.handleChange(event.target.value, 'description')}></textarea>
            </FormGroup>
            <FormGroup>
              <Label for="season">Сезон</Label>
              <Input type="select" refs="season" name="season" id="season" className={'form-control-sm'}
                     onChange={(event) => this.handleChange(event.target.value, 'season')}
                     defaultValue={apple.season}>
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
            <Button type={'button'} className="btn btn-primary btn-sm" onClick={this.submit.bind(this, apple)}>Сохранить</Button>{' '}
            <Button color="primary" size="sm" onClick={this.props.toggle}>Закрыть</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}

export default AppleModal;


/*
<Modal className={this.props.className}>
        <ModalHeader toggle={this.props.toggle}>Добавить сорт яблок</ModalHeader>
        <Form name={'appleForm'} >
          <ModalBody>
            <FormGroup>
              <Label for="name">Название</Label>
              <Input required refs="name" type="text" name="name" value={apple.name} id="name"
                     onChange={(event) => this.handleChange(event.target.value, 'name')}
                     className={'form-control-sm'} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}/>
              {
                this.state.error && <div className="has-error help-block">Поле обязательно для заполнения</div>
              }
            </FormGroup>
            <FormGroup>
              <Label for="description">Описание</Label>
              <textarea  type="text" refs="description" name="description"
                         className={'form-control form-control-sm'} id="description"
                         onChange={(event) => this.handleChange(event.target.value, 'description')}
                         value={apple.description}></textarea>
            </FormGroup>
            <FormGroup>
              <Label for="season">Сезон</Label>
              <Input type="select" refs="season" name="season" id="season" className={'form-control-sm'}
                     onChange={(event) => this.handleChange(event.target.value, 'season')}
                     value={apple.season}>
                <option></option>
                <option>Осень</option>
                <option>Зима</option>
                <option>Весна</option>
                <option>Лето</option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type={'button'} className="btn btn-primary btn-sm" onClick={this.submit.bind(this)}>Сохранить</Button>{' '}
            <Button  color="primary" size="sm" onClick={this.props.toggle}>Закрыть</Button>
          </ModalFooter>
        </Form>
      </Modal>
 */