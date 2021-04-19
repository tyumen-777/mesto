export default class UserInfo {
  constructor({profileName, profileProfession, profileAvatar}) {
    this._profileName = document.querySelector(profileName)
    this._profileProfession = document.querySelector(profileProfession)
    this._profileAvatar = document.querySelector(profileAvatar)
  }

  getUserInfo() {
    const userValue = {
      name: this._profileName.textContent,
      about: this._profileProfession.textContent,
      avatar: this._profileAvatar.src
    }
    return userValue;

  }

  setUserInfo({name, about, avatar}) {
    if (name) {
      this._profileName.textContent = name;
    }
    if (about) {
      this._profileProfession.textContent = about;
    }
    if (avatar) {
      this._profileAvatar.src = avatar;
    }
    // console.log(about)
    // console.log(name)

  }
  // setUserAvatar({avatar}) {
  //   this._profileAvatar.src = avatar
  // }
}
