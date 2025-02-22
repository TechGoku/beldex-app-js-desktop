'use strict'

const coinSymbol = 'BDX'
const coinUriPrefix = 'beldex:'

const URITypes = {
  addressAsFirstPathComponent: 1,
  addressAsAuthority: 2
}
exports.URITypes = URITypes

function New_RequestFunds_URI (args) {
  // -> String?
  const address = args.address
  if (!address) {
    throw Error('missing address')
    // return null
  }
  let mutable_uri = ''
  mutable_uri += coinUriPrefix
  {
    const uriType = args.uriType
    if (uriType === URITypes.addressAsAuthority) {
      mutable_uri += '//' // use for inserting a // so data detectors pick it up…
    } else if (uriType === URITypes.addressAsFirstPathComponent) {
      // nothing to do
    } else {
      throw Error('Illegal args.uriType')
    }
  }
  mutable_uri += address
  let isAppendingParam0 = true

  function addParam (parameterName, value) {
    if (
      value == null ||
            value == '' /* important */ ||
            typeof value === 'undefined'
    ) {
      return
    }
    let conjunctionStr = '&'
    if (isAppendingParam0 === true) {
      isAppendingParam0 = false
      conjunctionStr = '?'
    }
    mutable_uri += conjunctionStr
    mutable_uri += parameterName + '=' + encodeURIComponent(value)
  }

  {
    addParam('tx_amount', args.amount)
    if (
      (args.amountCcySymbol || '').toLowerCase() !=
            coinSymbol.toLowerCase()
    ) {
      addParam('tx_amount_ccy', args.amountCcySymbol)
    }
    addParam('tx_description', args.description)
    addParam('tx_payment_id', args.payment_id)
    addParam('tx_message', args.message)
  }
  return mutable_uri
}

exports.New_RequestFunds_URI = New_RequestFunds_URI

//
function New_ParsedPayload_FromPossibleRequestURIString (string, nettype, monero_utils/* pass this so this fn remains sync */) {
  // throws; -> {}
  //
  // detect no-scheme moneroAddr and possible OA addr - if has no monero: prefix
  if (string.indexOf(coinUriPrefix) !== 0) {
    const stringHasQMark = string.indexOf('?') !== -1
    if (stringHasQMark) {
      // fairly sure this is correct.. (just an extra failsafe/filter)
      throw Error('Unrecognized URI format')
    }
    const couldBeOAAddress = string.indexOf('.') != -1 // contains period - would be nice to get this from DoesStringContainPeriodChar_excludingAsXMRAddress_qualifyingAsPossibleOAAddress so maybe mymonero_core_js should gain local_modules/OpenAlias
    if (couldBeOAAddress) {
      return {
        address: string
      }
    }
    let address__decode_result
    try {
      address__decode_result = monero_utils.decode_address(
        string,
        nettype
      )
    } catch (e) {
      throw Error('No MyBeldex request info')
    }
    // then it looks like a monero address
    return {
      address: string
    }
  }
  const uriString = string
  const url = new URL(uriString)
  const protocol = url.protocol
  if (protocol !== coinUriPrefix) {
    throw Error('Request URI has non-Monero protocol')
  }
  let target_address = url.pathname // var instead of const as have to finalize it
  // it seems that if the URL has // in it, pathname will be empty, but host will contain the address instead
  if (
    target_address === '' ||
        typeof target_address === 'undefined' ||
        !target_address
  ) {
    target_address = url.host || url.hostname
  }
  if (target_address.indexOf('//') == 0) {
    target_address = target_address.slice(
      0 + '//'.length,
      target_address.length
    ) // strip prefixing "//" in case URL had protocol:// instead of protocol:
  }
  const searchParams = url.searchParams // needs to be parsed it seems
  //
  const payload = {
    address: target_address
  }
  const keyPrefixToTrim = 'tx_'
  const lengthOf_keyPrefixToTrim = keyPrefixToTrim.length
  searchParams.forEach(function (value, key) {
    let storeAt_key = key
    if (key.indexOf(keyPrefixToTrim) === 0) {
      storeAt_key = key.slice(lengthOf_keyPrefixToTrim, key.length)
    }
    payload['' + storeAt_key] = value
  })
  //
  return payload
}

exports.New_ParsedPayload_FromPossibleRequestURIString = New_ParsedPayload_FromPossibleRequestURIString
