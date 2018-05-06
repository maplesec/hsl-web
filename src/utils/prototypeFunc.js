import ElementUI from 'element-ui'
import VueI18n from 'vue-i18n'

export default {
  install (Vue, options) {
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
    Vue.prototype.$isError = (e, httpFailed = false) => {
      /*
      -1: 请求超时
      0: 一般错误
      1: 成功
      2: 登录超时
      3: 请求失败错误
       */
      if (!httpFailed) {
        if (typeof (e.data.status) === 'undefined') {
          return 0
        } else {
          return e.data.status
        }
      } else {
        if (e.status === '-1') {
          return -1
        } else {
          return 3
        }
      }
    }

    Vue.prototype.$messageType = {
      success: 'success',
      error: 'error',
      info: 'info',
      warning: 'warning'
    }

    Vue.prototype.$showErrorType = {
      message: 'message',
      notice: 'notice',
      messageBox: 'messageBox',
      none: 'none'
    }

    Vue.prototype.showMessage = (actionText, type) => {
      console.log(i18n)
      console.log(i18n.vm.$t('common.add'))
      ElementUI.Message({
        type: type,
        message: actionText
      })
    }

    Vue.prototype.showError = (actionText, errorStatus, message, showType) => {
      switch (errorStatus) {
        case -1:
          // 请求超时
          break
        case 2:
          // 登录超时
          break
        case 0:
          // 一般错误
          switch (showType) {
            case 'message':
              ElementUI.Message({
                type: 'error',
                message: message
              })
              break
            case 'notice':
              ElementUI.Notify({
                title: '错误',
                message: message
              })
              break
            case 'messageBox':
              ElementUI.Alert(message, '错误', {
                confirmButtonText: '确定'
              })
              break
          }
          break
        case 3:
          // 请求失败
          break
      }
    }

    Vue.prototype.showMessageCallback = (actionName, service, callback, status = function () {}) => {
      status('loading')
    }
  }

}
