import React, { Component, createRef } from 'react';
import { CEF } from 'api';
import { connect } from 'react-redux';
import $ from 'jquery';


interface Reg {
  promocode: React.RefObject<HTMLInputElement>;
  email: React.RefObject<HTMLInputElement>;
  age: React.RefObject<HTMLInputElement>;
  password: React.RefObject<HTMLInputElement>;
  password2: React.RefObject<HTMLInputElement>;
  rp_name: React.RefObject<HTMLInputElement>;
  referrer: React.RefObject<HTMLInputElement>;
  updateEvent: RegisterResponse
}

class Reg extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      sended: false,
    }

    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.email = createRef();
    this.age = createRef();
    this.password = createRef();
    this.password2 = createRef();
    this.rp_name = createRef();
    this.promocode = createRef();
    this.referrer = createRef();

    this.updateEvent = mp.events.register('cef:register:updateSendStatus', () => {
      this.setState({ sended: false });
    });
  }

  componentDidMount() {
    $(document).on('keyup', this.handleKeyUp);
  }
  componentWillUnmount() {
    $(document).off('keyup', this.handleKeyUp);
    this.updateEvent.destroy();
  }

  handleKeyUp(e: JQuery.KeyUpEvent) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleClick(e);
    }
  }

  handleClick(e: any) {
    e.preventDefault();
    if (this.state.sended) return;
    let rp_name = this.rp_name.current.value
      .replace(/"/g, "'")
      .replace(/^\s\s*/, '')
      .replace(/\s\s*$/, '');
    let password = this.password.current.value
      .replace(/"/g, "'")
      .replace(/^\s\s*/, '')
      .replace(/\s\s*$/, '');
    let age = parseInt(this.age.current.value)
    let password2 = this.password2.current.value
      .replace(/"/g, "'")
      .replace(/^\s\s*/, '')
      .replace(/\s\s*$/, '');
    let email = this.email.current.value
      .replace(/"/g, "'")
      .replace(/^\s\s*/, '')
      .replace(/\s\s*$/, '');
    let promocode = this.promocode.current.value
      .replace(/"/g, "'")
      .replace(/^\s\s*/, '')
      .replace(/\s\s*$/, '');
    let referrer = this.referrer.current.value
      .replace(/"/g, "'")
      .replace(/^\s\s*/, '')
      .replace(/\s\s*$/, '');
    if (!/^([A-Z][a-z]+ [A-Z][a-z]+)$/.test(rp_name))
      return CEF.alert.setAlert(
        'error',
        'Некорректное игровое имя. Пример РП никнейма: John Dow'
      );
    if(isNaN(age)) return CEF.alert.setAlert('error', 'В поле возраста допускается ввод только цифр');
    if(age < 16 || age > 90) return CEF.alert.setAlert('error', 'Допустимый возраст персонажа - 16-90 лет');
    if (password.length < 6)
      return CEF.alert.setAlert('error', 'Длина пароль должна быть не меньше 6 символов');
    if(password != password2){
      return CEF.alert.setAlert('error', 'Пароли не совпадают');
    }
    if (email !== '' && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
      return CEF.alert.setAlert(
        'error',
        'Некорректный адрес электронной почты. Пример: admin@mail.ru'
      );
    mp.events.callServer('server:user:account:register', rp_name, password, email, referrer, promocode, age);
    this.setState({ sended: true });
  }

  render() {
    return (
      <section className="section-view login-section">
        <div className="box-white box-login">
        <div className="logo"></div>
              <div className="loginwelcome">Для игры на сервере Вам необходимо
пройти регистрацию.</div>
                <div className="regwelcome">Есть аккаунт?</div>
                <div className="regwelcome2" onClick={() => CEF.gui.setGui('login')}>Авторизация</div>
       <div className="effecttext">РЕГИСТРАЦИЯ</div>
              <div className="effects2"></div> 
              <div className="effects3"></div>
              <div className="krug1"></div>
              <div className="krug2"></div>
              <div className="krug3"></div>
              <div className="krug4"></div>
              <div className="krug5"></div>
              <div className="krug6"></div>
              <div className="krug7"></div>
              <div className="krug8"></div>
              <div className="krug9"></div>
              <div className="krug10"></div>
            <div className="box1"></div>
              <div className="box2"></div>
              <div className="box3"></div>
              <div className="box4"></div>
              <div className="box5"></div>
              <div className="inputname">
                <input
                  type="text"
                  placeholder="Никнейм"
                  className="inputinfo"
                  ref={this.rp_name}
                />
              </div>
              <div className="inputemail">
                <input
                  type="text"
                  placeholder="Ваша почта"
                  className="inputinfo"
                  ref={this.email}
                />
              </div>
              <div className="inputpassword">
                <input
                  type="password"
                  placeholder="Пароль"
                  className="inputinfo"
                  ref={this.password}
                />
              </div>
              <div className="inputpassnew">
                <input
                  type="password"
                  placeholder="Повторите пароль"
                  className="inputinfo"
                  ref={this.password2}
                />
              </div>
              <div className="inputage">
                <input
                  min="16"
                  type="number"
                  placeholder="Возраст персонажа"
                  className="inputinfo"
                  ref={this.age}
                />
              </div>
               <div className="input-wrap">
                <input
                  type="text"
                  placeholder="Кто пригласил"
                  className="primary-input"
                  ref={this.referrer}
                />
              </div>
              <div className="input-wrap mb30">
                <input
                  type="text"
                  placeholder="Промокод"
                  className="primary-input"
                  ref={this.promocode}
                />
              </div> 
              <div className="regbutton" onClick={this.handleClick}></div>
{/*               <div className="button-center">
                <button type="submit" className="primary-button mb30" onClick={this.handleClick}>
                  <span>Создать</span>
                </button>
              </div> */}
          </div>
      </section>
    );
  }
}

const mapStateToProps = (state: any) => ({
  login: state.login,
});

export default connect(
  mapStateToProps,
  null
)(Reg);
