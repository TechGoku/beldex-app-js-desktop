'use strict'

const View = require('../../Views/View.web')
const commonComponents_forms = require('../../MMAppUICommonComponents/forms.web')
const commonComponents_navigationBarButtons = require('../../MMAppUICommonComponents/navigationBarButtons.web')
const commonComponents_tables = require('../../MMAppUICommonComponents/tables.web')
const commonComponents_tooltips = require('../../MMAppUICommonComponents/tooltips.web')
const commonComponents_activityIndicators = require('../../MMAppUICommonComponents/activityIndicators.web')
const BaseView_Wallet_MetaInfo = require('./BaseView_Wallet_MetaInfo.web')

const Modes_LoginWith =
{
  MnemonicSeed: 'MnemonicSeed',
  AddrAndPrivKeys: 'AddrAndPrivKeys'
}

class UseExisting_MetaInfo_View extends BaseView_Wallet_MetaInfo {
  _setup_views () {
    const self = this
    super._setup_views()
    { // state
      self.mode_loginWith = Modes_LoginWith.MnemonicSeed
    }
    {
      self._setup_form_walletMnemonicField()
      self._setup_form_walletAddrAndKeysFields()
      self._setup_form_toggleLoginModeLayer()
    }
    self._setup_form_walletNameField()
    self._setup_form_walletSwatchField()
    setTimeout(function () { // after visible… (TODO: improve by doing on VDA or other trigger)
      self.mnemonicTextAreaView.layer.focus()
    }, 600)
  }

  _setup_form_walletMnemonicField () {
    const self = this
    const div = commonComponents_forms.New_fieldContainerLayer(self.context)
    div.style.paddingBottom = '0' // instead of 20, here, special case... we will move the 20 to the "Or, use…" layer
    {
      const labelLayer = commonComponents_forms.New_fieldTitle_labelLayer('SECRET MNEMONIC', self.context)
      div.appendChild(labelLayer)
      {
        const tooltipText = 'This secret mnemonic is never<br/>sent to the Beldex-lws server.'
        const view = commonComponents_tooltips.New_TooltipSpawningButtonView(tooltipText, self.context)
        const layer = view.layer
        labelLayer.appendChild(layer)
      }
      //
      const view = commonComponents_forms.New_fieldValue_textAreaView({
        placeholderText: 'From your existing wallet'
      }, self.context)
      view.layer.autocorrect = 'off'
      view.layer.autocomplete = 'off'
      view.layer.autocapitalize = 'none'
      view.layer.spellcheck = 'false'
      div.appendChild(view.layer)
      self.mnemonicTextAreaView = view
      view.layer.addEventListener(
        'keypress',
        function (event) {
          self.AWalletFieldInput_did_keypress(event) // defined on super
        }
      )
      view.layer.addEventListener(
        'keyup',
        function (event) {
          self.AWalletFieldInput_did_keyup(event) // defined on super
        }
      )
      view.layer.addEventListener(
        'change',
        function (event) {
          self.AWalletFieldInput_did_keyup(event) // defined on super
        }
      )
      view.layer.addEventListener(
        'paste',
        function (event) {
          setTimeout(function () {
            self.AWalletFieldInput_did_keyup(event) // defined on super
          }, 300) // wait a little because value seems not to be readable otherwise
        }
      )
    }
    self.walletMnemonicField_layer = div
    self.form_containerLayer.appendChild(div)
  }

  _setup_form_walletAddrAndKeysFields () {
    const self = this
    self.addrAndKeysFieldsContainerLayer = document.createElement('div')
    self.addrAndKeysFieldsContainerLayer.style.display = 'none' // for now
    { // wallet address
      const div = commonComponents_forms.New_fieldContainerLayer(self.context)
      div.style.paddingBottom = '0' // instead of 20, here, special case... we will move the 20 to the "Or, use…" layer
      {
        const labelLayer = commonComponents_forms.New_fieldTitle_labelLayer('ADDRESS', self.context)
        div.appendChild(labelLayer)
        {
          const tooltipText = "Your wallet's public address"
          const view = commonComponents_tooltips.New_TooltipSpawningButtonView(tooltipText, self.context)
          const layer = view.layer
          labelLayer.appendChild(layer)
        }
        //
        const view = commonComponents_forms.New_fieldValue_textAreaView({
        }, self.context)
        view.layer.autocorrect = 'off'
        view.layer.autocomplete = 'off'
        view.layer.autocapitalize = 'none'
        view.layer.spellcheck = 'false'
        div.appendChild(view.layer)
        self.addrTextAreaView = view
        view.layer.addEventListener(
          'keypress',
          function (event) {
            self.AWalletFieldInput_did_keypress(event) // defined on super
          }
        )
        view.layer.addEventListener(
          'keyup',
          function (event) {
            self.AWalletFieldInput_did_keyup(event) // defined on super
          }
        )
        view.layer.addEventListener(
          'change',
          function (event) {
            self.AWalletFieldInput_did_keyup(event) // defined on super
          }
        )
        view.layer.addEventListener(
          'paste',
          function (event) {
            setTimeout(function () {
              self.AWalletFieldInput_did_keyup(event) // defined on super
            }, 300) // wait a little because value seems not to be readable otherwise
          }
        )
      }
      self.addrAndKeysFieldsContainerLayer.appendChild(div)
    }
    { // wallet viewKey
      const div = commonComponents_forms.New_fieldContainerLayer(self.context)
      div.style.paddingBottom = '0' // instead of 20, here, special case... we will move the 20 to the "Or, use…" layer
      {
        const labelLayer = commonComponents_forms.New_fieldTitle_labelLayer('VIEW KEY', self.context)
        div.appendChild(labelLayer)
        {
          const tooltipText = 'This private view key and the wallet<br/>address are the only things sent<br/>to the Beldex-lws server.'
          const view = commonComponents_tooltips.New_TooltipSpawningButtonView(tooltipText, self.context)
          const layer = view.layer
          labelLayer.appendChild(layer)
        }
        //
        const view = commonComponents_forms.New_fieldValue_textAreaView({
        }, self.context)
        view.layer.autocorrect = 'off'
        view.layer.autocomplete = 'off'
        view.layer.autocapitalize = 'none'
        view.layer.spellcheck = 'false'
        div.appendChild(view.layer)
        self.viewKeyTextAreaView = view
        view.layer.addEventListener(
          'keypress',
          function (event) {
            self.AWalletFieldInput_did_keypress(event) // defined on super
          }
        )
        view.layer.addEventListener(
          'keyup',
          function (event) {
            self.AWalletFieldInput_did_keyup(event) // defined on super
          }
        )
        view.layer.addEventListener(
          'change',
          function (event) {
            self.AWalletFieldInput_did_keyup(event) // defined on super
          }
        )
        view.layer.addEventListener(
          'paste',
          function (event) {
            setTimeout(function () {
              self.AWalletFieldInput_did_keyup(event) // defined on super
            }, 300) // wait a little because value seems not to be readable otherwise
          }
        )
      }
      self.addrAndKeysFieldsContainerLayer.appendChild(div)
    }
    { // wallet spendKey
      const div = commonComponents_forms.New_fieldContainerLayer(self.context)
      div.style.paddingBottom = '0' // instead of 20, here, special case... we will move the 20 to the "Or, use…" layer
      {
        const labelLayer = commonComponents_forms.New_fieldTitle_labelLayer('SPEND KEY', self.context)
        div.appendChild(labelLayer)
        {
          const tooltipText = 'This private spend key is never<br/>sent to the Beldex-lws server.'
          const view = commonComponents_tooltips.New_TooltipSpawningButtonView(tooltipText, self.context)
          const layer = view.layer
          labelLayer.appendChild(layer)
        }
        //
        const view = commonComponents_forms.New_fieldValue_textAreaView({
        }, self.context)
        view.layer.autocorrect = 'off'
        view.layer.autocomplete = 'off'
        view.layer.autocapitalize = 'none'
        view.layer.spellcheck = 'false'
        div.appendChild(view.layer)
        self.spendKeyTextAreaView = view
        view.layer.addEventListener(
          'keypress',
          function (event) {
            self.AWalletFieldInput_did_keypress(event) // defined on super
          }
        )
        view.layer.addEventListener(
          'keyup',
          function (event) {
            self.AWalletFieldInput_did_keyup(event) // defined on super
          }
        )
        view.layer.addEventListener(
          'change',
          function (event) {
            self.AWalletFieldInput_did_keyup(event) // defined on super
          }
        )
        view.layer.addEventListener(
          'paste',
          function (event) {
            setTimeout(function () {
              self.AWalletFieldInput_did_keyup(event) // defined on super
            }, 300) // wait a little because value seems not to be readable otherwise
          }
        )
      }
      self.addrAndKeysFieldsContainerLayer.appendChild(div)
    }
    self.form_containerLayer.appendChild(self.addrAndKeysFieldsContainerLayer)
  }

  _setup_form_toggleLoginModeLayer () {
    const self = this
    const layer = document.createElement('div')
    layer.style.fontFamily = 'Native-Light, input, menlo, monospace'
    layer.style.webkitFontSmoothing = 'subpixel-antialiased' // for chrome browser
    layer.style.fontSize = '10px'
    layer.style.letterSpacing = '0.5px'
    if (typeof process !== 'undefined' && process.platform === 'linux') {
      layer.style.fontWeight = '700' // surprisingly does not render well w/o this… not linux thing but font size thing. would be nice to know which font it uses and toggle accordingly. platform is best guess for now
    } else {
      layer.style.fontWeight = '300'
    }
    layer.style.fontSize = '11px' // must set 11px so it matches visual weight of other labels
    layer.style.letterSpacing = '0'
    layer.style.color = '#8d8b8d'
    layer.style.letterSpacing = '0'
    layer.style.margin = '9px 0 17px 32px'
    layer.style.paddingBottom = '8px'
    {
      const span = document.createElement('span')
      span.innerHTML = 'Or, use&nbsp;'
      layer.appendChild(span)
    }
    {
      function _new_titleFor_loginModeButton () {
        if (self.mode_loginWith == Modes_LoginWith.MnemonicSeed) {
          return 'Address and Private Keys'
        } else if (self.mode_loginWith == Modes_LoginWith.AddrAndPrivKeys) {
          return 'Secret Mnemonic'
        } else {
          throw Error('unrecognized self.mode_loginWith')
          // return undefined
        }
      }
      const view = commonComponents_tables.New_clickableLinkButtonView(
        _new_titleFor_loginModeButton(),
        self.context,
        function () {
          self.toggle_loginWithMode()
        }
      )
      self.toggleLoginModeButtonATagLayerView = view
      const a = view.layer
      a.style.margin = '0' // since this is not a standalone button
      a.style.fontSize = '11px' // chrome renders 11px too big compared to sketch
      a.style.letterSpacing = '0'
      a.style.fontWeight = '200'
      a.style.display = 'inline' // special case, line text - else it's block
      a.style.float = 'none'
      a.style.clear = 'none'
      view.ConfigureWithLoginMode = function () {
        a.innerHTML = _new_titleFor_loginModeButton()
      }
      layer.appendChild(a)
    }
    self.form_containerLayer.appendChild(layer)
  }

  _setup_form_walletNameField () {
    const self = this
    super._setup_form_walletNameField()
    self.walletNameFieldContainerLayer.style.paddingBottom = '11px' // special case for this screen - packed more tightly
  }

  _setup_form_walletSwatchField () {
    const self = this
    super._setup_form_walletSwatchField()
    self.walletSwatchFieldContainerLayer.style.paddingTop = '0px' // special case for this screen - packed more tightly
  }

  _setup_startObserving () {
    const self = this
    super._setup_startObserving()
  }

  //
  //
  // Lifecycle - Teardown
  //
  TearDown () {
    const self = this
    super.TearDown()
  }

  //
  //
  // Runtime - Accessors - Navigation
  //
  Navigation_Title () {
    return 'Log Into Your Wallet'
  }

  Navigation_New_LeftBarButtonView () {
    const self = this
    if (self.options.wizardController_current_wizardTaskModeName != self.wizardController.WizardTask_Mode_FirstTime_UseExisting()) {
      return null // cause we either want null or maybe a back button
    }
    const view = commonComponents_navigationBarButtons.New_LeftSide_CancelButtonView(self.context)
    const layer = view.layer
    layer.addEventListener(
      'click',
      function (e) {
        e.preventDefault()
        if (view.isEnabled !== false) {
          self.wizardController._fromScreen_userPickedCancel()
        }
        return false
      }
    )
    return view
  }

  // Navigation_New_RightBarButtonView()
  // {
  // 	const self = this
  // 	const view = super.Navigation_New_RightBarButtonView()
  // 	view.layer.innerHTML = "Add"
  // 	return view
  // }
  //
  //
  // Runtime - Accessors - Overridable
  //
  _overridable_canEnableSubmitButton () {
    const self = this
    const supers_value = super._overridable_canEnableSubmitButton()
    if (supers_value == false) { // i.e. no wallet name
      return supers_value
    }
    if (self.mode_loginWith == Modes_LoginWith.MnemonicSeed) {
      const mnemonicSeed = self.lookup__mnemonicSeed()
      if (!mnemonicSeed || typeof mnemonicSeed === 'undefined') {
        return false
      }
    } else if (self.mode_loginWith == Modes_LoginWith.AddrAndPrivKeys) {
      const addr = self.lookup__addr()
      const viewKey = self.lookup__viewKey()
      const spendKey = self.lookup__spendKey()
      if (!addr || typeof addr === 'undefined') {
        return false
      }
      if (!viewKey || typeof viewKey === 'undefined') {
        return false
      }
      if (!spendKey || typeof spendKey === 'undefined') {
        return false
      }
    } else {
      throw Error('unrecognized self.mode_loginWith')
      // return false
    }

    return true
  }

  //
  //
  // Runtime - Accessors - Lookups - Field values
  //
  lookup__walletName () {
    const self = this

    return self.walletNameInputLayer.value
  }

  lookup__colorHexString () {
    const self = this

    return self.walletColorPickerInputView.Component_Value()
  }

  lookup__mnemonicSeed () {
    const self = this
    return (self.mnemonicTextAreaView.layer.value || '').trim()
  }

  lookup__addr () {
    const self = this
    return (self.addrTextAreaView.layer.value || '').trim()
  }

  lookup__viewKey () {
    const self = this
    return (self.viewKeyTextAreaView.layer.value || '').trim()
  }

  lookup__spendKey () {
    const self = this
    return (self.spendKeyTextAreaView.layer.value || '').trim()
  }

  //
  //
  // Runtime - Imperatives - Login mode
  //
  toggle_loginWithMode () {
    const self = this
    let otherMode
    if (self.mode_loginWith == Modes_LoginWith.MnemonicSeed) {
      otherMode = Modes_LoginWith.AddrAndPrivKeys
    } else if (self.mode_loginWith == Modes_LoginWith.AddrAndPrivKeys) {
      otherMode = Modes_LoginWith.MnemonicSeed
    } else {
      throw Error('unrecognized self.mode_loginWith')
    }
    self.mode_loginWith = otherMode
    //
    self.toggleLoginModeButtonATagLayerView.ConfigureWithLoginMode()
    //
    if (self.mode_loginWith == Modes_LoginWith.MnemonicSeed) {
      self.mnemonicTextAreaView.layer.value = ''
      self.walletMnemonicField_layer.style.display = 'block'
      //
      self.addrAndKeysFieldsContainerLayer.style.display = 'none'
    } else if (self.mode_loginWith == Modes_LoginWith.AddrAndPrivKeys) {
      self.walletMnemonicField_layer.style.display = 'none'
      //
      self.addrTextAreaView.layer.value = ''
      self.viewKeyTextAreaView.layer.value = ''
      self.spendKeyTextAreaView.layer.value = ''
      self.addrAndKeysFieldsContainerLayer.style.display = 'block'
    }
    self.set_submitButtonNeedsUpdate()
  }

  //
  //
  // Runtime - Delegation - Navigation View special methods
  //
  navigationView_viewIsBeingPoppedFrom () {	// this will only get popped from when it's not the first in the nav stack, i.e. not adding first wallet,
    // so we'll need to get back into Mode_PickCreateOrUseExisting
    const self = this
    self.wizardController.PatchToDifferentWizardTaskMode_withoutPushingScreen( // to maintain the correct state
      self.wizardController.WizardTask_Mode_PickCreateOrUseExisting(),
      0 // back to 0 from 1
    )
  }

  //
  //
  // Runtime - Delegation - Interactions
  //
  // TODO: Paul handles both types of form submission here -- look to break them into separate form submission handlers to avoid issues
  _userSelectedNextButton () {
    const self = this
    {
      self.isDisabledFromSubmission = true
      self.context.userIdleInWindowController.TemporarilyDisable_userIdle()
      self.validationMessageLayer.ClearAndHideMessage()
      // add check to ensure that we're using a mnemonic seed login pathbefore we test to see if the mnemonic seed is valid
      if (self.mode_loginWith == 'MnemonicSeed') {
        try {
          const ret = self.context.monero_utils.seed_and_keys_from_mnemonic(
            self.lookup__mnemonicSeed(),
            self.context.nettype
          )
        } catch (error) {
          self.layer.scrollTop = 0 // because we want to show the validation err msg
          self.validationMessageLayer.SetValidationError('Invalid mnemonic!')
          self.isDisabledFromSubmission = false
          console.error('Invalid mnemonic!')
          __trampolineFor_failedWithErrStr(error)
          return
        }
      } else {
        try {
          const addr = self.lookup__addr()
          const viewKey = self.lookup__viewKey()
          const spendKey = self.lookup__spendKey()
          const ret = self.context.monero_utils.validate_components_for_login(
            addr,
            viewKey,
            spendKey, // expects string
            '', // expects string
            self.context.nettype
          )
        } catch (error) {
          console.error('Invalid input. Please make sure your address and keys have been properly entered.')
          self.layer.scrollTop = 0 // because we want to show the validation err msg
          self.validationMessageLayer.SetValidationError('Invalid input. Please make sure your address and keys have been properly entered.')
          self.isDisabledFromSubmission = false
          __trampolineFor_failedWithErrStr(error)
          return
        }
      }
      //
      self.rightBarButtonView.layer.innerHTML = commonComponents_activityIndicators.New_Graphic_ActivityIndicatorLayer_htmlString({ 'margin-top': '3px' })
      self.disable_submitButton()
      self.rightBarButtonView.layer.style.backgroundColor = 'rgba(0,0,0,0)' // special case / slightly fragile
      self.navigationController.navigationBarView.leftBarButtonView.SetEnabled(false)
      //
      self.toggleLoginModeButtonATagLayerView.SetEnabled(false)
      if (self.walletColorPickerInputView) {
        self.walletColorPickerInputView.SetEnabled(false)
      }
      if (self.walletNameInputLayer) {
        self.walletNameInputLayer.disabled = true
      }
      self.mnemonicTextAreaView.layer.disabled = true
      self.addrTextAreaView.layer.disabled = true
      self.viewKeyTextAreaView.layer.disabled = true
      self.spendKeyTextAreaView.layer.disabled = true
      self.addrAndKeysFieldsContainerLayer.disabled = true
    }
    function ____reEnable_userIdleAndScreenSleepFromSubmissionDisable () { // factored because we would like to call this on successful submission too!
      self.context.userIdleInWindowController.ReEnable_userIdle()
    }
    function ___reEnableFormFromSubmissionDisable () {
      self.isDisabledFromSubmission = false
      ____reEnable_userIdleAndScreenSleepFromSubmissionDisable()
      //
      self.rightBarButtonView.layer.innerHTML = 'Next'
      self.enable_submitButton()
      self.navigationController.navigationBarView.leftBarButtonView.SetEnabled(true)
      //
      self.toggleLoginModeButtonATagLayerView.SetEnabled(true)
      if (self.walletColorPickerInputView) {
        self.walletColorPickerInputView.SetEnabled(true)
      }
      if (self.walletNameInputLayer) {
        self.walletNameInputLayer.disabled = undefined
      }
      self.mnemonicTextAreaView.layer.disabled = undefined
      self.addrTextAreaView.layer.disabled = undefined
      self.viewKeyTextAreaView.layer.disabled = undefined
      self.spendKeyTextAreaView.layer.disabled = undefined
      self.addrAndKeysFieldsContainerLayer.disabled = undefined
    }
    function __trampolineFor_failedWithErrStr (errStr) {
      self.layer.scrollTop = 0 // because we want to show the validation err msg
      self.validationMessageLayer.SetValidationError(errStr)
      ___reEnableFormFromSubmissionDisable()
    }
    function __trampolineFor_didAddWallet () {
      ____reEnable_userIdleAndScreenSleepFromSubmissionDisable() // we must call this manually as we are not re-enabling the form (or it will break user idle!!)
      self.wizardController.ProceedToNextStep() // will dismiss
    }
    //
    const walletsListController = self.context.walletsListController
    const walletName = self.lookup__walletName()
    const colorHexString = self.lookup__colorHexString()
    if (self.mode_loginWith == Modes_LoginWith.MnemonicSeed) {
      const mnemonicSeed = self.lookup__mnemonicSeed()
      walletsListController.WhenBooted_ObtainPW_AddExtantWalletWith_MnemonicString(
        walletName,
        colorHexString,
        mnemonicSeed,
        function (err, walletInstance, wasWalletAlreadyInserted) {
          if (err) {
            __trampolineFor_failedWithErrStr(err)
            return
          }
          if (wasWalletAlreadyInserted === true) {
            __trampolineFor_failedWithErrStr('That wallet has already been added.')
            return // consider a 'fail'
          }
          // success
          __trampolineFor_didAddWallet()
        },
        function () { // user canceled password entry
          ___reEnableFormFromSubmissionDisable()
        }
      )
    } else if (self.mode_loginWith == Modes_LoginWith.AddrAndPrivKeys) {
      const addr = self.lookup__addr()
      const viewKey = self.lookup__viewKey()
      const spendKey = self.lookup__spendKey()
      walletsListController.WhenBooted_ObtainPW_AddExtantWalletWith_AddressAndKeys(
        walletName,
        colorHexString,
        addr,
        viewKey,
        spendKey,
        function (err, walletInstance, wasWalletAlreadyInserted) {
          if (err) {
            __trampolineFor_failedWithErrStr(err)
            return
          }
          if (wasWalletAlreadyInserted === true) {
            __trampolineFor_failedWithErrStr('That wallet has already been added.')
            return // consider a 'fail'
          }
          // success
          __trampolineFor_didAddWallet()
        },
        function () { // user canceled password entry
          ___reEnableFormFromSubmissionDisable()
        }
      )
    } else {
      throw Error('unrecognized self.mode_loginWith')
    }
  }
}
module.exports = UseExisting_MetaInfo_View
