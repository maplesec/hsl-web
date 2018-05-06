import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      greet: 'good luck'
    },
    validation: {
      require: 'Please enter the',
      characters: 'characters',
      checkPass: 'Please enter the password again',
      passDiff: 'Different Passwords'
    },
    common: {
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      cancel: 'Cancel',
      space: ' ',
      operation: 'Operation'
    },
    user: {
      user: 'User',
      account: 'Account',
      name: 'Name',
      password: 'Password',
      checkPass: 'CheckPass'
    },
    role: {
      role: 'Role',
      name: 'Name'
    }
  },
  zh: {
    message: {
      greet: '祝君好运'
    },
    validation: {
      require: '请输入',
      characters: '字符',
      checkPass: '请再次输入密码',
      passDiff: '两次输入密码不一致'
    },
    common: {
      add: '添加',
      edit: '编辑',
      delete: '删除',
      confirm: '确定',
      cancel: '取消',
      space: '',
      operation: '操作'
    },
    user: {
      user: '用户',
      account: '账户',
      name: '用户名',
      password: '密码',
      checkPass: '确认密码'
    },
    role: {
      role: '角色',
      name: '名称'
    }
  }
}

const i18n = new VueI18n({
  locale: 'zh',
  messages
})

export default i18n
